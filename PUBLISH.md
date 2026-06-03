# Публикация в Google Play — 5 шагов

Всё уже настроено. Тебе нужно сделать только это:

---

## Шаг 1 — Создай Expo аккаунт (бесплатно, 1 минута)

Перейди на → **expo.dev** → "Sign Up"  
Email: твой email  
Это нужно для облачной сборки.

---

## Шаг 2 — Войди и запусти сборку

Открой терминал в папке проекта:

```
cd "C:\Users\Ramin\Desktop\ozum ucun"
eas login
eas build:configure
eas build --platform android --profile production
```

Сборка займёт **10–15 минут в облаке**.  
По окончании получишь ссылку для скачивания `.aab` файла.

---

## Шаг 3 — Создай Google Play Developer аккаунт

→ **play.google.com/console**  
Стоит **$25 один раз**.  
После этого можешь публиковать неограниченно.

---

## Шаг 4 — Создай приложение в Play Console

- "Create app"
- Название: **Özüm üçün**
- Язык: Azerbaijani  
- Тип: App  
- Бесплатное: ✓

Заполни описания (готовые тексты в файле `store-listing.txt` ниже).

---

## Шаг 5 — Загрузи AAB

- Production → Create new release
- Загрузи `app-release.aab` (скачаешь после шага 2)
- Release notes: "First release / İlk buraxılış / Первый выпуск"
- Submit → проверка займёт 3–7 дней

---

## Готовые тексты для Play Store

**Краткое описание (AZ):**  
Özünü tanı. Özünü seç. Fromm ilə fəlsəfi özüöyrənmə.

**Краткое описание (EN):**  
Know yourself. Choose yourself. Philosophy & self-discovery with Fromm.

**Краткое описание (RU):**  
Познай себя. Выбери себя. Философское самопознание с Фроммом.

**Полное описание (AZ):**  
«Özüm üçün» — Erich Fromm-un «Sevmək Sənəti» əsərinə əsaslanan fəlsəfi özüöyrənmə tətbiqidir. 10 modul, 3 dil, tam offline. Sevgini sənət kimi öyrən.

**Полное описание (EN):**  
"For Myself" is a philosophical self-discovery app based on Erich Fromm's "The Art of Loving." 10 modules, 3 languages, fully offline. Learn love as an art.

**Полное описание (RU):**  
«Для себя» — приложение для философского самопознания на основе «Искусства любить» Эриха Фромма. 10 модулей, 3 языка, полностью офлайн. Учись любить как искусству.

---

## Ключ подписи — СОХРАНИ!

Файл: `android/app/ozumucun-release.keystore`  
Пароль: `OzumUcun2024!`  
Alias: `ozumucun`

⚠️ Без этого файла ты не сможешь обновлять приложение. Скопируй в надёжное место.

---

## Категория и рейтинг

- Category: **Education**  
- Content rating: **Everyone**  
- Ads: No  
- In-app purchases: No
