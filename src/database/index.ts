import * as SQLite from 'expo-sqlite';
import {MODULES} from '../data/modules';

let db: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db;
  db = await SQLite.openDatabaseAsync('ozumucun.db');
  return db;
}

export async function initDatabase(): Promise<void> {
  const database = await getDatabase();

  await database.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      language TEXT DEFAULT 'az',
      selected_archetype TEXT,
      level INTEGER DEFAULT 1,
      xp INTEGER DEFAULT 0,
      current_streak INTEGER DEFAULT 0,
      longest_streak INTEGER DEFAULT 0,
      last_active_date TEXT,
      onboarding_complete INTEGER DEFAULT 0,
      pain_point TEXT,
      commitment TEXT,
      notification_time TEXT DEFAULT '09:00'
    );

    CREATE TABLE IF NOT EXISTS modules (
      id INTEGER PRIMARY KEY,
      title_az TEXT,
      title_en TEXT,
      title_ru TEXT,
      chapter_ref INTEGER,
      is_unlocked INTEGER DEFAULT 0,
      is_completed INTEGER DEFAULT 0,
      completed_date TEXT,
      concept_read INTEGER DEFAULT 0,
      reflection_done INTEGER DEFAULT 0,
      practice_done INTEGER DEFAULT 0,
      quiz_done INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS reflections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      module_id INTEGER,
      prompt_az TEXT,
      prompt_en TEXT,
      prompt_ru TEXT,
      user_text TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY(module_id) REFERENCES modules(id)
    );

    CREATE TABLE IF NOT EXISTS checkins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT UNIQUE,
      morning_score INTEGER,
      evening_text TEXT,
      morning_time TEXT,
      evening_time TEXT
    );

    CREATE TABLE IF NOT EXISTS badges (
      id TEXT PRIMARY KEY,
      name_az TEXT,
      name_en TEXT,
      name_ru TEXT,
      description_az TEXT,
      description_en TEXT,
      description_ru TEXT,
      earned_date TEXT,
      type TEXT
    );

    CREATE TABLE IF NOT EXISTS practices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      module_id INTEGER,
      description_az TEXT,
      description_en TEXT,
      description_ru TEXT,
      completed_date TEXT,
      FOREIGN KEY(module_id) REFERENCES modules(id)
    );

    CREATE TABLE IF NOT EXISTS streaks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      start_date TEXT,
      end_date TEXT,
      length INTEGER
    );
  `);

  await seedModules(database);
  await ensureUserExists(database);
}

async function seedModules(database: SQLite.SQLiteDatabase): Promise<void> {
  const existing = await database.getFirstAsync<{count: number}>(
    'SELECT COUNT(*) as count FROM modules',
  );

  if (existing && existing.count > 0) return;

  for (let i = 0; i < MODULES.length; i++) {
    const m = MODULES[i];
    await database.runAsync(
      `INSERT OR IGNORE INTO modules
        (id, title_az, title_en, title_ru, chapter_ref, is_unlocked)
        VALUES (?, ?, ?, ?, ?, ?)`,
      [m.id, m.title_az, m.title_en, m.title_ru, m.chapter, i === 0 ? 1 : 0],
    );
  }
}

async function ensureUserExists(database: SQLite.SQLiteDatabase): Promise<void> {
  const user = await database.getFirstAsync<{id: number}>(
    'SELECT id FROM users WHERE id = 1',
  );
  if (!user) {
    await database.runAsync(
      `INSERT INTO users (id, language, level, xp, current_streak, longest_streak, onboarding_complete)
       VALUES (1, 'az', 1, 0, 0, 0, 0)`,
    );
  }
}

// ─── User ────────────────────────────────────────────────────────────────────

export interface UserRecord {
  id: number;
  language: string;
  selected_archetype: string | null;
  level: number;
  xp: number;
  current_streak: number;
  longest_streak: number;
  last_active_date: string | null;
  onboarding_complete: number;
  pain_point: string | null;
  commitment: string | null;
  notification_time: string;
}

export async function getUser(): Promise<UserRecord | null> {
  const database = await getDatabase();
  return database.getFirstAsync<UserRecord>('SELECT * FROM users WHERE id = 1');
}

export async function updateUser(
  fields: Partial<Omit<UserRecord, 'id'>>,
): Promise<void> {
  const database = await getDatabase();
  const entries = Object.entries(fields);
  if (entries.length === 0) return;
  const set = entries.map(([k]) => `${k} = ?`).join(', ');
  const values = entries.map(([, v]) => v);
  await database.runAsync(`UPDATE users SET ${set} WHERE id = 1`, values);
}

export async function addXP(amount: number): Promise<{newXP: number; newLevel: number}> {
  const user = await getUser();
  if (!user) return {newXP: 0, newLevel: 1};

  const newXP = user.xp + amount;
  const newLevel = xpToLevel(newXP);
  await updateUser({xp: newXP, level: newLevel});
  return {newXP, newLevel};
}

export function xpToLevel(xp: number): number {
  if (xp >= 1000) return 4;
  if (xp >= 500) return 3;
  if (xp >= 200) return 2;
  return 1;
}

export function levelThresholds(): number[] {
  return [0, 200, 500, 1000];
}

// ─── Modules ─────────────────────────────────────────────────────────────────

export interface ModuleRecord {
  id: number;
  title_az: string;
  title_en: string;
  title_ru: string;
  chapter_ref: number;
  is_unlocked: number;
  is_completed: number;
  completed_date: string | null;
  concept_read: number;
  reflection_done: number;
  practice_done: number;
  quiz_done: number;
}

export async function getModules(): Promise<ModuleRecord[]> {
  const database = await getDatabase();
  return database.getAllAsync<ModuleRecord>('SELECT * FROM modules ORDER BY id');
}

export async function getModule(id: number): Promise<ModuleRecord | null> {
  const database = await getDatabase();
  return database.getFirstAsync<ModuleRecord>(
    'SELECT * FROM modules WHERE id = ?',
    [id],
  );
}

export async function markModuleStep(
  moduleId: number,
  step: 'concept_read' | 'reflection_done' | 'practice_done' | 'quiz_done',
): Promise<void> {
  const database = await getDatabase();
  await database.runAsync(
    `UPDATE modules SET ${step} = 1 WHERE id = ?`,
    [moduleId],
  );

  const mod = await getModule(moduleId);
  if (
    mod &&
    mod.concept_read &&
    mod.reflection_done &&
    mod.practice_done &&
    mod.quiz_done &&
    !mod.is_completed
  ) {
    const today = new Date().toISOString().split('T')[0];
    await database.runAsync(
      `UPDATE modules SET is_completed = 1, completed_date = ? WHERE id = ?`,
      [today, moduleId],
    );
    // Unlock next module
    await database.runAsync(
      `UPDATE modules SET is_unlocked = 1 WHERE id = ?`,
      [moduleId + 1],
    );
  }
}

// ─── Reflections ─────────────────────────────────────────────────────────────

export interface ReflectionRecord {
  id: number;
  module_id: number;
  prompt_az: string;
  prompt_en: string;
  prompt_ru: string;
  user_text: string;
  created_at: string;
}

export async function saveReflection(
  moduleId: number,
  promptAz: string,
  promptEn: string,
  promptRu: string,
  text: string,
): Promise<void> {
  const database = await getDatabase();
  await database.runAsync(
    `INSERT INTO reflections (module_id, prompt_az, prompt_en, prompt_ru, user_text)
     VALUES (?, ?, ?, ?, ?)`,
    [moduleId, promptAz, promptEn, promptRu, text],
  );
}

export async function getReflections(moduleId?: number): Promise<ReflectionRecord[]> {
  const database = await getDatabase();
  if (moduleId !== undefined) {
    return database.getAllAsync<ReflectionRecord>(
      'SELECT * FROM reflections WHERE module_id = ? ORDER BY created_at DESC',
      [moduleId],
    );
  }
  return database.getAllAsync<ReflectionRecord>(
    'SELECT * FROM reflections ORDER BY created_at DESC',
  );
}

export async function getReflectionFrom30DaysAgo(): Promise<ReflectionRecord | null> {
  const database = await getDatabase();
  const d = new Date();
  d.setDate(d.getDate() - 30);
  const target = d.toISOString().split('T')[0];
  return database.getFirstAsync<ReflectionRecord>(
    `SELECT * FROM reflections WHERE date(created_at) = ? LIMIT 1`,
    [target],
  );
}

export async function searchReflections(query: string): Promise<ReflectionRecord[]> {
  const database = await getDatabase();
  return database.getAllAsync<ReflectionRecord>(
    `SELECT * FROM reflections WHERE user_text LIKE ? ORDER BY created_at DESC`,
    [`%${query}%`],
  );
}

export async function getAllReflectionsText(): Promise<string> {
  const database = await getDatabase();
  const rows = await database.getAllAsync<ReflectionRecord>(
    'SELECT * FROM reflections ORDER BY created_at ASC',
  );
  return rows
    .map(r => `[${r.created_at}]\n${r.user_text}`)
    .join('\n\n---\n\n');
}

// ─── Check-ins ───────────────────────────────────────────────────────────────

export interface CheckinRecord {
  id: number;
  date: string;
  morning_score: number | null;
  evening_text: string | null;
  morning_time: string | null;
  evening_time: string | null;
}

export async function getTodayCheckin(): Promise<CheckinRecord | null> {
  const database = await getDatabase();
  const today = new Date().toISOString().split('T')[0];
  return database.getFirstAsync<CheckinRecord>(
    'SELECT * FROM checkins WHERE date = ?',
    [today],
  );
}

export async function saveMorningCheckin(score: number): Promise<void> {
  const database = await getDatabase();
  const today = new Date().toISOString().split('T')[0];
  const now = new Date().toISOString();
  await database.runAsync(
    `INSERT INTO checkins (date, morning_score, morning_time)
     VALUES (?, ?, ?)
     ON CONFLICT(date) DO UPDATE SET morning_score = ?, morning_time = ?`,
    [today, score, now, score, now],
  );
  await updateStreak();
}

export async function saveEveningCheckin(text: string): Promise<void> {
  const database = await getDatabase();
  const today = new Date().toISOString().split('T')[0];
  const now = new Date().toISOString();
  await database.runAsync(
    `INSERT INTO checkins (date, evening_text, evening_time)
     VALUES (?, ?, ?)
     ON CONFLICT(date) DO UPDATE SET evening_text = ?, evening_time = ?`,
    [today, text, now, text, now],
  );
}

export async function getCheckinDates(): Promise<string[]> {
  const database = await getDatabase();
  const rows = await database.getAllAsync<{date: string}>(
    'SELECT date FROM checkins ORDER BY date ASC',
  );
  return rows.map(r => r.date);
}

// ─── Streaks ─────────────────────────────────────────────────────────────────

async function updateStreak(): Promise<void> {
  const user = await getUser();
  if (!user) return;

  const today = new Date().toISOString().split('T')[0];
  if (user.last_active_date === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = yesterday.toISOString().split('T')[0];

  const isConsecutive = user.last_active_date === yStr;
  const newStreak = isConsecutive ? user.current_streak + 1 : 1;
  const longestStreak = Math.max(user.longest_streak, newStreak);

  await updateUser({
    current_streak: newStreak,
    longest_streak: longestStreak,
    last_active_date: today,
  });
}

// ─── Badges ──────────────────────────────────────────────────────────────────

export interface BadgeRecord {
  id: string;
  name_az: string;
  name_en: string;
  name_ru: string;
  description_az: string;
  description_en: string;
  description_ru: string;
  earned_date: string | null;
  type: string;
}

const BADGE_DEFINITIONS: Omit<BadgeRecord, 'earned_date'>[] = [
  {id: 'courage', name_az: 'Cəsarət', name_en: 'Courage', name_ru: 'Смелость', description_az: 'Zəif bir suala cavab verdin', description_en: 'You answered a vulnerable question', description_ru: 'Ты ответил на уязвимый вопрос', type: 'courage'},
  {id: 'streak7', name_az: '7 Günlük', name_en: '7 Days', name_ru: '7 дней', description_az: '7 gün ardıcıl düşündün', description_en: 'You reflected for 7 consecutive days', description_ru: 'Ты размышлял 7 дней подряд', type: 'streak'},
  {id: 'streak30', name_az: '30 Günlük', name_en: '30 Days', name_ru: '30 дней', description_az: '30 gün ardıcıl məşq etdin', description_en: 'You practiced for 30 consecutive days', description_ru: 'Ты практиковал 30 дней подряд', type: 'streak'},
  {id: 'artistOfLove', name_az: 'Sevgi Ustası', name_en: 'Artist of Love', name_ru: 'Мастер любви', description_az: 'Sən artıq sevməyi seçirsən', description_en: 'You now choose to love', description_ru: 'Ты теперь выбираешь любить', type: 'level'},
  {id: 'activeListener', name_az: 'Aktiv Dinləyici', name_en: 'Active Listener', name_ru: 'Активный слушатель', description_az: 'Dinləmənin sənətini öyrəndin', description_en: 'You learned the art of listening', description_ru: 'Ты научился искусству слушать', type: 'practice'},
  {id: 'unconditionalGiver', name_az: 'Şərtsiz Verən', name_en: 'Unconditional Giver', name_ru: 'Безусловный дающий', description_az: 'Gözləmədən verdin', description_en: 'You gave without expecting return', description_ru: 'Ты давал, не ожидая взамен', type: 'practice'},
  {id: 'selfRespect', name_az: 'Öz-hörmət', name_en: 'Self-Respect', name_ru: 'Самоуважение', description_az: 'Özünə hörmət etməyi seçdin', description_en: 'You chose to respect yourself', description_ru: 'Ты выбрал уважать себя', type: 'practice'},
];

export async function earnBadge(badgeId: string): Promise<boolean> {
  const database = await getDatabase();
  const existing = await database.getFirstAsync<BadgeRecord>(
    'SELECT * FROM badges WHERE id = ?',
    [badgeId],
  );
  if (existing?.earned_date) return false;

  const def = BADGE_DEFINITIONS.find(b => b.id === badgeId);
  if (!def) return false;

  const today = new Date().toISOString().split('T')[0];
  await database.runAsync(
    `INSERT INTO badges (id, name_az, name_en, name_ru, description_az, description_en, description_ru, earned_date, type)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET earned_date = ?`,
    [def.id, def.name_az, def.name_en, def.name_ru, def.description_az, def.description_en, def.description_ru, today, def.type, today],
  );
  return true;
}

export async function getEarnedBadges(): Promise<BadgeRecord[]> {
  const database = await getDatabase();
  return database.getAllAsync<BadgeRecord>(
    'SELECT * FROM badges WHERE earned_date IS NOT NULL ORDER BY earned_date DESC',
  );
}

export async function checkStreakBadges(streak: number): Promise<void> {
  if (streak >= 7) await earnBadge('streak7');
  if (streak >= 30) await earnBadge('streak30');
}

// ─── Delete all ──────────────────────────────────────────────────────────────

export async function deleteAllData(): Promise<void> {
  const database = await getDatabase();
  await database.execAsync(`
    DELETE FROM reflections;
    DELETE FROM checkins;
    DELETE FROM badges;
    DELETE FROM practices;
    DELETE FROM streaks;
    UPDATE users SET xp = 0, level = 1, current_streak = 0, longest_streak = 0,
      last_active_date = NULL, onboarding_complete = 0;
    UPDATE modules SET is_completed = 0, completed_date = NULL,
      concept_read = 0, reflection_done = 0, practice_done = 0, quiz_done = 0,
      is_unlocked = CASE WHEN id = 1 THEN 1 ELSE 0 END;
  `);
}
