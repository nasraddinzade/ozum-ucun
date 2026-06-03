export interface QuizQuestion {
  question_az: string;
  question_en: string;
  question_ru: string;
  options_az: string[];
  options_en: string[];
  options_ru: string[];
  correctIndex: number;
  explanation_az: string;
  explanation_en: string;
  explanation_ru: string;
}

export interface ModuleSeed {
  id: number;
  chapter: number;
  title_az: string;
  title_en: string;
  title_ru: string;
  description_az: string;
  description_en: string;
  description_ru: string;
  concept_az: string;
  concept_en: string;
  concept_ru: string;
  quote_az: string;
  quote_en: string;
  quote_ru: string;
  reflectionPrompt_az: string;
  reflectionPrompt_en: string;
  reflectionPrompt_ru: string;
  isVulnerablePrompt: boolean;
  practice_az: string;
  practice_en: string;
  practice_ru: string;
  badgeId: string | null;
  quiz: QuizQuestion[];
  xpReward: number;
  readMinutes: number;
}

export const MODULES: ModuleSeed[] = [
  {
    id: 1,
    chapter: 1,
    title_az: 'Sevgi nədir?',
    title_en: 'What is Love?',
    title_ru: 'Что такое любовь?',
    description_az: 'Fromm-un tezisi: sevgi hiss deyil, sənətdir.',
    description_en: "Fromm's thesis: love is not a feeling, it is an art.",
    description_ru: 'Тезис Фромма: любовь — это не чувство, это искусство.',
    concept_az: `Biz hamımız sevgini yanlış başa düşürük.

Biz düşünürük ki sevgi bir hissiyyatdır — qəlbimizin qanrılması, daxilimizdə bir şeyin "tıqqıldaması". Biz düşünürük ki ya sevgi var, ya da yoxdur. Ya baş verir, ya yox.

Erich Fromm bunu tamamilə inkar edir.

Fromm-a görə sevgi, musiqi çalmaq kimi bir sənətdir. Sevgini öyrənmək olar. Sevgini məşq etmək olar. Sevgini itirmək olar — lazımi diqqəti verməsən.

Musiqi çalmağı öyrənmək üçün sənə nə lazımdır? Nəzəriyyə. Məşq. Səbir. Əzm. Sevgini öyrənmək üçün də eyni şey lazımdır.

Problem nədir? Biz heç vaxt bunu öyrənmirik. Biz düşünürük ki sevgi "gəlir". Biz film baxırıq, mahnı dinləyirik, nağıl oxuyuruq — hamısı sevginin bir hiss kimi gəldiyini söyləyir.

Amma Fromm soruşur: bu cür düşüncə sizi xoşbəxt etdi mi? Bu cür düşüncə davamlı münasibət yaratdı mi?

Sevginin tərifi: birisinin böyüməsini istəmək. Onun tam insan olmasına kömək etmək. Bunu etmək üçün nəzəriyyə, məşq, diqqət lazımdır.

Bu ağır səslənir. Çünki o ağırdır. Amma başqa cür olmur.`,
    concept_en: `We all misunderstand love.

We think love is a feeling — a flutter in the chest, something that either happens or doesn't. Either it's there, or it isn't.

Erich Fromm rejects this entirely.

For Fromm, love is an art — like playing music. Love can be learned. Love can be practiced. Love can be lost, if you stop paying attention.

What do you need to learn music? Theory. Practice. Patience. Dedication. The same is true for love.

The problem? We never learn it. We assume love just "arrives." We watch films, listen to songs, read stories — all of them tell us love is a feeling that happens to us.

But Fromm asks: Has this idea made you happy? Has this idea created lasting relationships?

The definition of love: to want another's growth. To help them become fully human. This requires theory, practice, and attention.

This sounds difficult. Because it is. But there is no other way.`,
    concept_ru: `Мы все неправильно понимаем любовь.

Мы думаем, что любовь — это чувство: трепет в груди, что-то, что либо происходит, либо нет. Либо она есть, либо её нет.

Эрих Фромм полностью отвергает это.

По Фромму, любовь — это искусство, как игра на музыкальном инструменте. Любви можно научиться. Любовь можно практиковать. Любовь можно потерять, если перестать уделять ей внимание.

Что нужно, чтобы научиться музыке? Теория. Практика. Терпение. Преданность. То же самое верно и для любви.

В чём проблема? Мы никогда этому не учимся. Мы думаем, что любовь просто «приходит». Мы смотрим фильмы, слушаем песни, читаем истории — все они говорят нам, что любовь — это чувство, которое случается с нами.

Но Фромм спрашивает: сделала ли тебя счастливым эта идея? Создала ли она прочные отношения?

Определение любви: хотеть роста другого человека. Помогать ему стать полноценным человеком. Это требует теории, практики и внимания.

Это звучит сложно. Потому что это сложно. Но другого пути нет.`,
    quote_az: 'Sevmək bir hissiyyat deyil — bu bir sənətdir. Və hər sənət kimi, öyrənmək tələb edir.',
    quote_en: 'Love is not a feeling — it is an art. And like every art, it requires learning.',
    quote_ru: 'Любовь — это не чувство, это искусство. И, как всякое искусство, она требует обучения.',
    reflectionPrompt_az: 'Nə vaxt sevgini hissiyyatla qarışdırdım? Həvəsi sevgidən fərqləndirən nədir?',
    reflectionPrompt_en: 'When did I confuse love with infatuation? What separates genuine love from passion?',
    reflectionPrompt_ru: 'Когда я путал любовь с влюблённостью? Что отличает настоящую любовь от страсти?',
    isVulnerablePrompt: false,
    practice_az: 'Bu gün bir nəfəri seç və ona 10 dəqiqə boyunca tam diqqətini ver. Telefon yoxdur. Plaşlar yoxdur. Yalnız o insan.',
    practice_en: 'Today, choose one person and give them your complete attention for 10 minutes. No phone. No plans. Just them.',
    practice_ru: 'Сегодня выбери одного человека и удели ему полное внимание на 10 минут. Без телефона. Без планов. Только он.',
    badgeId: null,
    xpReward: 60,
    readMinutes: 4,
    quiz: [
      {
        question_az: 'Fromm-a görə sevginin əsas problemi nədir?',
        question_en: 'According to Fromm, what is the main problem of love?',
        question_ru: 'По Фромму, в чём главная проблема любви?',
        options_az: ['Sevilmək istəyi', 'Sevməyi bilməmək', 'Doğru insanı tapmaq', 'Qorxudan qaçmaq'],
        options_en: ['The desire to be loved', 'Not knowing how to love', 'Finding the right person', 'Escaping fear'],
        options_ru: ['Желание быть любимым', 'Неумение любить', 'Найти правильного человека', 'Бегство от страха'],
        correctIndex: 1,
        explanation_az: 'Fromm deyir ki, problem sevilmək deyil, sevməkdir. Sevmək aktiv bir məşqdir.',
        explanation_en: 'Fromm says the problem is not being loved, but loving. Loving is an active practice.',
        explanation_ru: 'Фромм говорит, что проблема не в том, чтобы быть любимым, а в том, чтобы любить. Любить — это активная практика.',
      },
      {
        question_az: 'Aşağıdakılardan hansı sevginin əlamətləri deyil?',
        question_en: 'Which of the following is NOT a sign of love?',
        question_ru: 'Что из следующего НЕ является признаком любви?',
        options_az: ['Birisinin böyüməsini istəmək', 'Həvəs və intensivlik hissi', 'Birisinin tam insan olmasına kömək etmək', 'Diqqət, bilik, məsuliyyət'],
        options_en: ['Wanting someone to grow', 'The feeling of passion and intensity', "Helping someone become fully human", 'Care, knowledge, responsibility'],
        options_ru: ['Желать роста другого человека', 'Чувство страсти и интенсивности', 'Помогать кому-то стать полноценным человеком', 'Забота, знание, ответственность'],
        correctIndex: 1,
        explanation_az: 'Həvəs (infatuation) intensiv hissiyyatdır, amma Fromm ona görə sevgi deyil. Sevgi aktiv diqqət, bilik, məsuliyyət tələb edir.',
        explanation_en: 'Passion is an intense feeling, but Fromm says it is not love. Love requires active care, knowledge, and responsibility.',
        explanation_ru: 'Страсть — это интенсивное чувство, но Фромм говорит, что это не любовь. Любовь требует активной заботы, знания и ответственности.',
      },
    ],
  },
  {
    id: 2,
    chapter: 2,
    title_az: 'İnsan Vəziyyəti',
    title_en: 'The Human Condition',
    title_ru: 'Человеческое состояние',
    description_az: 'Biz ayrı doğulmuşuq. Sevgi ayrılığın cavabıdır.',
    description_en: 'We are born separate. Love is the answer to isolation.',
    description_ru: 'Мы рождаемся отдельными. Любовь — ответ на изоляцию.',
    concept_az: `İnsan özünəməxsus bir varlıqdır.

Biz heyvanlar arasında yeganə varlığıq ki özümüzdən xəbərimiz var. Biz keçmişimizi bilirik, gələcəyimizi görürük, ölümlü olduğumuzu anlayırıq. Bu bilik bizə böyük ağırlıq verir.

Fromm buna "ayrılıq" deyir — başqalarından, təbiətdən, özümüzdən ayrı olduğumuzun hissi.

Bu hiss dözülməzdir. İnsan onu aradan qaldırmaq üçün hər şeyi edir. Bəzən sürüyə qatılır — milli kimliyə, dini cəmiyyətə, ideologiyaya. Bəzən məhvinə doğru gedir — spirt, narkotik, frenzilik. Bəzən sevgini axtarır.

Sevgi yeganə sağlam cavabdır.

Sevgidə iki fərdi ayrılığı qoruya biləriksən — amma ikisi bir-birinə toxunur. Bu birliyin qorunduğu vəziyyəti Fromm "birlik" adlandırır.

Amma diqqət et: Fromm iki növ birliyi fərqləndirir:
- Simbioz: bir-birinin içinə keçmək, eriyib getmək. Bu sevgi deyil. Bu itirmişdir.
- Yetkin birlik: hər biri tam insan olaraq qalır, amma bir-birinə açılır.

Sorun odur ki biz çox vaxt simbioz istəyirik. Çünki ayrılıq ağrıdır. Amma simbioz da ağrıdır — sadəcə daha yavaş.`,
    concept_en: `The human being is a unique creature.

We are the only animals who are aware of ourselves. We know our past, foresee our future, understand that we will die. This knowledge gives us a great burden.

Fromm calls this "separateness" — the feeling of being apart from others, from nature, from ourselves.

This feeling is unbearable. Human beings do everything to overcome it. Sometimes they merge into a herd — national identity, religious community, ideology. Sometimes they move toward destruction — alcohol, drugs, frenzy. Sometimes they seek love.

Love is the only healthy answer.

In love, you can preserve two separate individuals — but they touch each other. Fromm calls this state of unity "union."

But pay attention: Fromm distinguishes two kinds of union:
- Symbiosis: melting into each other, losing yourself. This is not love. This is dissolution.
- Mature union: each person remains fully themselves, but opens up to the other.

The trouble is we usually want symbiosis. Because separateness is painful. But symbiosis is also painful — just slower.`,
    concept_ru: `Человек — уникальное существо.

Мы единственные животные, осознающие себя. Мы знаем своё прошлое, предвидим будущее, понимаем, что смертны. Это знание накладывает на нас огромное бремя.

Фромм называет это «отделённостью» — ощущением оторванности от других, от природы, от самих себя.

Это ощущение невыносимо. Человек делает всё, чтобы преодолеть его. Иногда сливается с толпой — с национальной идентичностью, религиозным сообществом, идеологией. Иногда движется к разрушению — алкоголь, наркотики, исступление. Иногда ищет любви.

Любовь — единственный здоровый ответ.

В любви можно сохранить двух отдельных людей — но они соприкасаются друг с другом. Фромм называет это состояние единства «слиянием».

Но обрати внимание: Фромм различает два вида слияния:
- Симбиоз: раствориться в другом, потерять себя. Это не любовь. Это растворение.
- Зрелое единство: каждый остаётся полноценным человеком, но открывается другому.

Беда в том, что мы обычно хотим симбиоза. Потому что отделённость — это боль. Но симбиоз тоже боль — только медленнее.`,
    quote_az: 'Ayrılıq insanın ən dərin narahatlığının mənbəyidir.',
    quote_en: 'Separateness is the source of man\'s deepest anxiety.',
    quote_ru: 'Отделённость является источником самой глубокой тревоги человека.',
    reflectionPrompt_az: 'Ayrılıq mənə necə hiss etdirir? Onu aradan qaldırmaq üçün nə etmişəm — sağlam yollarla, sağlam olmayan yollarla?',
    reflectionPrompt_en: 'What does separateness feel like to me? What have I done to overcome it — in healthy ways, in unhealthy ways?',
    reflectionPrompt_ru: 'Как ощущается для меня отделённость? Что я делал, чтобы преодолеть её — здоровыми и нездоровыми способами?',
    isVulnerablePrompt: false,
    practice_az: 'Bu gün bir həqiqi söhbət et — telefon yoxdur, pauza yoxdur. Sadəcə o insanla ol.',
    practice_en: 'Have one real conversation today — no phones, no distractions. Just be with that person.',
    practice_ru: 'Проведи сегодня один настоящий разговор — без телефона, без отвлечений. Просто будь с этим человеком.',
    badgeId: null,
    xpReward: 60,
    readMinutes: 5,
    quiz: [
      {
        question_az: 'Fromm-a görə insan ayrılığını aradan qaldırmağın sağlam yolu nədir?',
        question_en: 'According to Fromm, what is the healthy way to overcome human separateness?',
        question_ru: 'По Фромму, каков здоровый способ преодолеть человеческую отделённость?',
        options_az: ['Sürüyə qatılmaq', 'Yetkin sevgi', 'Simbioz', 'Fərdiyyəti itirmək'],
        options_en: ['Merging with a herd', 'Mature love', 'Symbiosis', 'Losing individuality'],
        options_ru: ['Слияние с толпой', 'Зрелая любовь', 'Симбиоз', 'Потеря индивидуальности'],
        correctIndex: 1,
        explanation_az: 'Fromm yetkin sevgini tövsiyə edir — burada hər iki fərd özünü qoruyur, amma birləşir.',
        explanation_en: 'Fromm recommends mature love — where both individuals remain themselves while becoming united.',
        explanation_ru: 'Фромм рекомендует зрелую любовь — где оба человека остаются собой, но объединяются.',
      },
    ],
  },
  {
    id: 3,
    chapter: 3,
    title_az: 'Valideyn Sevgisi',
    title_en: 'Love Between Parent and Child',
    title_ru: 'Родительская любовь',
    description_az: 'İlkin sevgi bizi necə şəkillendirir.',
    description_en: 'How early love shapes who we become.',
    description_ru: 'Как ранняя любовь формирует нас.',
    concept_az: `İlk sevgimiz valideynlərimizlə başlayır.

Ana sevgisi şərtsizdir — "Mən səni sevdiyim üçün sevi — çünki sən mövcudsan." Ata sevgisi isə şərtlidir — "Mən sənin nailiyyətlərini sevdiyim üçün seni severəm."

Fromm deyir ki, sağlam inkişaf üçün ikisi lazımdır. Amma problem yaranır.

Bir çox valideyn şərtsiz sevgi iddiasındadır, amma əslində şərtli sevgi verir. "Aylığını yaxşı alsan, seni sevərəm." "Itaətkər olsan, seni sevərəm." Bunu açıq demir. Amma uşaq hiss edir.

Bu hiss böyükdə belə bir inanca çevrilir: "Mən sevilmək üçün bir şey etməliyəm." Bu inanc münasibətləri məhv edir.

Digər tərəf: valideynlər bəzən öz narahaatlıqlarını sevgi kimi göstərir. "Sən olmadan yaşaya bilmərəm" — bu sevgi deyil. Bu — valideynin öz ayrılıq qorxusudur.

Müvafiq sual: Mənin valideynlərimin sevgisi hansı növ idi? Mən onu necə gəzdirirəm?

Bu sualı cavablandırmaq — hər şeyin başlanğıcıdır.`,
    concept_en: `Our first experience of love is with our parents.

A mother's love is unconditional — "I love you because you exist." A father's love is conditional — "I love you because of what you achieve."

Fromm says both are necessary for healthy development. But problems arise.

Many parents claim unconditional love but actually give conditional love. "I'll be proud if you do well in school." "I'll approve if you obey." They don't say it openly. But the child feels it.

This feeling becomes a belief in adulthood: "I must earn love." This belief destroys relationships.

The other side: parents sometimes dress their own anxiety as love. "I cannot live without you" — this is not love. This is the parent's fear of separateness.

The relevant question: What kind of love did my parents give? How do I carry it forward?

Answering this question honestly is where everything begins.`,
    concept_ru: `Наш первый опыт любви — с родителями.

Материнская любовь безусловна — «Я люблю тебя, потому что ты существуешь». Отцовская любовь условна — «Я люблю тебя за твои достижения».

Фромм говорит, что оба необходимы для здорового развития. Но возникают проблемы.

Многие родители претендуют на безусловную любовь, но на самом деле дают условную. «Я буду гордиться тобой, если ты хорошо учишься». «Я одобрю тебя, если ты будешь послушен». Они не говорят этого открыто. Но ребёнок чувствует.

Это чувство во взрослом возрасте превращается в убеждение: «Я должен заслужить любовь». Это убеждение разрушает отношения.

Другая сторона: родители иногда наряжают свою тревогу в любовь. «Я не могу жить без тебя» — это не любовь. Это страх родителя перед отделённостью.

Важный вопрос: Какой была любовь моих родителей? Как я её несу дальше?

Честный ответ на этот вопрос — с этого всё начинается.`,
    quote_az: 'Ana sevgisi şərtsizdir: uşağın onu qazanması lazım deyil.',
    quote_en: 'Motherly love is unconditional; it does not need to be deserved.',
    quote_ru: 'Материнская любовь безусловна; её не нужно заслуживать.',
    reflectionPrompt_az: 'Uşaqlıq özümə bir məktub yaz. Ona nə demək istərdin? Sən nə eşitmək istəyirdin?',
    reflectionPrompt_en: 'Write a letter to your childhood self. What would you tell them? What did you need to hear?',
    reflectionPrompt_ru: 'Напиши письмо своему детскому «я». Что бы ты ему сказал? Что тебе нужно было услышать?',
    isVulnerablePrompt: true,
    practice_az: 'Seni sevən birinə — mükəmməl olmasa belə — təşəkkür et. Şifahi, mesajla, ya da ürəyindən.',
    practice_en: 'Thank someone who loved you — even imperfectly. In person, by message, or in your heart.',
    practice_ru: 'Поблагодари кого-то, кто любил тебя — пусть и несовершенно. Лично, сообщением или в своём сердце.',
    badgeId: 'courage',
    xpReward: 80,
    readMinutes: 5,
    quiz: [
      {
        question_az: 'Fromm-a görə ana sevgisi ilə ata sevgisi arasındakı əsas fərq nədir?',
        question_en: 'According to Fromm, what is the key difference between motherly and fatherly love?',
        question_ru: 'По Фромму, в чём ключевое различие между материнской и отцовской любовью?',
        options_az: ['Ana daha çox sevir', 'Ana şərtsiz, ata şərtli sevir', 'Ata daha güclüdür', 'Heç bir fərq yoxdur'],
        options_en: ['Mothers love more', 'Mother loves unconditionally, father conditionally', 'Fathers are stronger', 'There is no difference'],
        options_ru: ['Матери любят больше', 'Мать любит безусловно, отец условно', 'Отцы сильнее', 'Нет разницы'],
        correctIndex: 1,
        explanation_az: 'Fromm-a görə ana sevgisi "sən mövcudsan" əsasındadır, ata sevgisi isə "sən nailiyyət göstərirsən" əsasındadır.',
        explanation_en: "For Fromm, motherly love is based on existence, fatherly love on achievement.",
        explanation_ru: 'Для Фромма материнская любовь основана на существовании, отцовская — на достижениях.',
      },
    ],
  },
  {
    id: 4,
    chapter: 4,
    title_az: 'Qardaş Sevgisi',
    title_en: 'Brotherly Love',
    title_ru: 'Братская любовь',
    description_az: 'Bərabərlər arasında sevgi. Başqasının böyüməsinə həqiqi maraq.',
    description_en: 'Love between equals. Genuine interest in another\'s becoming.',
    description_ru: 'Любовь между равными. Подлинный интерес к становлению другого.',
    concept_az: `Qardaş sevgisi bütün sevgilərin əsasıdır.

Fromm bunu belə təyin edir: "Bütün insanlara olan məhəbbət, nə xüsusiyyətindən, nə faydasından asılı olmayan."

Bu o deməkdir ki, sadəcə sənin üçün faydalı olduğuna görə deyil, sadəcə sənin ailən olduğuna görə deyil — bütün insanlara açıq olan sevgi.

Bu çox mücərrəd görünür. Amma Fromm buna praktik məna verir: insanları gördüyün kimi görmək, onlara ehtiyacın var kimi yox.

Biz çox vaxt insanları rolları ilə görürük. Müdir. Müştəri. Həyat yoldaşı. Qardaş. Bu rollar onların kim olduğunu örtür.

Qardaş sevgisi isə soruşur: Bu insan əslində kim olmaq istəyir? Onun böyüməsinə nə mane olur? Mən bu böyüməyə necə kömək edə bilərəm?

Bu çətin sualdır — çünki cavab vermək üçün əvvəlcə dinləmək lazımdır. Həqiqətən dinləmək. Cavab planlamadan.

Bu gün sən kimi həqiqətən dinlədin?`,
    concept_en: `Brotherly love is the foundation of all love.

Fromm defines it as: "Love of all human beings, independent of their qualities or usefulness."

This means love that is not contingent on what someone can do for you, or whether they're family — love that extends to all people.

This sounds very abstract. But Fromm gives it practical meaning: to see people as they are, not as you need them to be.

We usually see people through their roles. Boss. Customer. Partner. Sibling. These roles obscure who they actually are.

Brotherly love asks: Who does this person want to become? What stands in the way of their growth? How can I support that growth?

This is a difficult question — because answering it requires first listening. Really listening. Without planning your response.

Who did you truly listen to today?`,
    concept_ru: `Братская любовь — основа всякой любви.

Фромм определяет её как: «Любовь ко всем людям, независимо от их качеств или полезности».

Это означает любовь, которая не зависит от того, что человек может сделать для тебя, или от того, является ли он твоей семьёй — любовь, распространяющаяся на всех людей.

Это звучит очень абстрактно. Но Фромм придаёт этому практический смысл: видеть людей такими, какие они есть, а не такими, какими они тебе нужны.

Мы обычно видим людей через их роли. Начальник. Клиент. Партнёр. Брат. Эти роли скрывают то, кем они на самом деле являются.

Братская любовь спрашивает: кем этот человек хочет стать? Что мешает его росту? Как я могу поддержать этот рост?

Это трудный вопрос — потому что ответить на него можно, только сначала выслушав. По-настоящему выслушав. Без планирования ответа.

Кого ты по-настоящему выслушал сегодня?`,
    quote_az: 'Qardaş sevgisi məsuliyyət, diqqət, hörmət, bilik hissidir — başqa bir insan həyatına münasibətdə.',
    quote_en: 'Brotherly love is the sense of responsibility, care, respect, and knowledge in regard to another human being.',
    quote_ru: 'Братская любовь — это чувство ответственности, заботы, уважения и знания по отношению к другому человеку.',
    reflectionPrompt_az: 'İnsanları olduqları kimi görürəm, yoxsa lazım olduğu kimi? Son bir həftədə biri ilə həqiqətən maraqlandım mi?',
    reflectionPrompt_en: 'Do I see people as they are, or as I need them to be? In the past week, was I genuinely interested in someone else\'s inner world?',
    reflectionPrompt_ru: 'Вижу ли я людей такими, какие они есть, или такими, какими они мне нужны? За последнюю неделю был ли я по-настоящему заинтересован во внутреннем мире другого человека?',
    isVulnerablePrompt: false,
    practice_az: 'Bu gün birini cavab planlamadan dinlə. Sadəcə ol. Hər şeyi gözlə.',
    practice_en: 'Listen to someone today without planning your response. Just be present. Notice everything.',
    practice_ru: 'Выслушай кого-нибудь сегодня, не планируя ответа. Просто будь рядом. Замечай всё.',
    badgeId: 'activeListener',
    xpReward: 60,
    readMinutes: 4,
    quiz: [
      {
        question_az: 'Aşağıdakılardan hansı qardaş sevgisinin ifadəsidir?',
        question_en: 'Which of the following is an expression of brotherly love?',
        question_ru: 'Что из следующего является выражением братской любви?',
        options_az: ['Birinə öz arzuların əsasında kömək etmək', 'Birisini həqiqətən dinləmək', 'Birisinin sizi sevməsini gözləmək', 'Böyük ödənişlər vermək'],
        options_en: ['Helping someone based on your own desires', 'Genuinely listening to someone', 'Waiting for someone to love you first', 'Making grand gestures'],
        options_ru: ['Помогать кому-то на основе своих желаний', 'По-настоящему слушать кого-то', 'Ждать, пока кто-то полюбит тебя первым', 'Делать грандиозные жесты'],
        correctIndex: 1,
        explanation_az: 'Fromm-a görə qardaş sevgisi birisini həqiqətən görmək və dinləməkdən başlayır.',
        explanation_en: 'For Fromm, brotherly love begins with truly seeing and listening to someone.',
        explanation_ru: 'По Фромму, братская любовь начинается с того, чтобы по-настоящему видеть и слушать кого-то.',
      },
    ],
  },
  {
    id: 5,
    chapter: 5,
    title_az: 'Ana Sevgisi',
    title_en: 'Motherly Love',
    title_ru: 'Материнская любовь',
    description_az: 'Şərtsiz vermək. Sahib olan sevginin təhlükəsi.',
    description_en: 'Unconditional giving. The danger of possessive love.',
    description_ru: 'Безусловная отдача. Опасность собственнической любви.',
    concept_az: `Ana sevgisi ən güclü sevgi növlərindən biridir — amma eyni zamanda ən təhlükəli.

Niyə təhlükəli? Çünki o, asanlıqla özünü gizlədə bilər.

Şərtsiz, qayğıkeş ana sevgisi gözəldir. Amma bəzən "sevgi" kimi görünən şey əslında anın öz qorxusudur. "Sən olmadan yaşaya bilmərəm" deyəndə ana sanki sevir. Amma əslində — o, öz ayrılıq qorxusunu uşağa yükləyir.

Bu yük uşaq üçün ağırdır. O, böyüyür, amma anasının ehtiyacı üzərindən. "Mən olmadan o yaşaya bilməz" hissi böyükdə belə bir məntiqə çevrilir: "Mən qayğı göstərsəm, sevilirəm."

Fromm bunu "simbioz" adlandırır. Sevgi yox — istismar. Hər ikisi tərəfindən.

Həqiqi ana sevgisi isə verməyi öyrədir, almağı yox. O, uşağın böyüməsini istəyir — hətta uşaq onu tərk etmək istəsə belə. Bu ağrılıdır. Amma bu sevgidir.

Sən nə vaxt verdin — almaq üçün? Nə vaxt verdin — həqiqətən vermək üçün?`,
    concept_en: `Motherly love is one of the most powerful kinds of love — and one of the most dangerous.

Why dangerous? Because it can easily disguise itself.

Unconditional, caring motherly love is beautiful. But sometimes what looks like love is actually the mother's own fear. "I cannot live without you" sounds like love. But in reality — the mother is projecting her own fear of separateness onto her child.

This burden is heavy for the child. They grow up, but through the lens of their parent's need. "She can't live without me" becomes, in adulthood, a logic: "If I give care, I am loved."

Fromm calls this "symbiosis." Not love — exploitation. By both parties.

True motherly love teaches giving, not taking. It wants the child to grow — even if growth means leaving. This is painful. But this is love.

When did you give in order to receive? When did you give in order to truly give?`,
    concept_ru: `Материнская любовь — один из самых мощных видов любви, и одновременно один из самых опасных.

Почему опасный? Потому что он легко маскируется.

Безусловная, заботливая материнская любовь прекрасна. Но иногда то, что выглядит как любовь, на самом деле является страхом самой матери. «Не могу жить без тебя» звучит как любовь. Но в действительности — мать проецирует свой страх одиночества на ребёнка.

Это бремя тяжело для ребёнка. Он вырастает, но через призму потребности родителя. «Она не может без меня» становится во взрослом возрасте логикой: «Если я забочусь, меня любят».

Фромм называет это «симбиозом». Не любовь — эксплуатация. С обеих сторон.

Настоящая материнская любовь учит давать, а не брать. Она хочет роста ребёнка — даже если рост означает уход. Это больно. Но это любовь.

Когда ты давал, чтобы получить? Когда ты давал, чтобы по-настоящему дать?`,
    quote_az: 'Həqiqi sevgi vermək deməkdir — almaq deyil. Özünü itirmək deyil — özünü tapmaq.',
    quote_en: 'True love means giving — not taking. Not losing yourself — but finding yourself.',
    quote_ru: 'Настоящая любовь означает давать, а не брать. Не терять себя — а находить себя.',
    reflectionPrompt_az: 'Nə vaxt ehtiyac hissindən verdim? Nə vaxt şərtsiz verdim? Bu iki hissin fərqi nə idi?',
    reflectionPrompt_en: 'When did I give out of need? When did I give unconditionally? What was the difference between those two feelings?',
    reflectionPrompt_ru: 'Когда я давал из нужды? Когда я давал безусловно? В чём было различие между этими двумя чувствами?',
    isVulnerablePrompt: true,
    practice_az: 'Bu gün bir şey ver — vaxt, diqqət, kömək — heç bir gözlənti olmadan. Özünü bir müddət sonra izlə: necə hiss edirsən?',
    practice_en: 'Give something today — time, attention, or help — with zero expectation. Then watch yourself: how does it feel?',
    practice_ru: 'Дай что-нибудь сегодня — время, внимание или помощь — без каких-либо ожиданий. Затем наблюдай за собой: как ты себя чувствуешь?',
    badgeId: 'unconditionalGiver',
    xpReward: 80,
    readMinutes: 4,
    quiz: [
      {
        question_az: 'Fromm-a görə sahib olan (possessive) sevginin əsas problemi nədir?',
        question_en: 'According to Fromm, what is the core problem of possessive love?',
        question_ru: 'По Фромму, в чём основная проблема собственнической любви?',
        options_az: ['Çox intensiv olması', 'Özünün qorxu və ehtiyacını sevgi kimi maskalatması', 'Ağır qərar tələb etməsi', 'Həmişə uğursuzluğa məhkum olması'],
        options_en: ['Being too intense', 'Masking one\'s own fear and need as love', 'Requiring hard decisions', 'Being doomed to failure'],
        options_ru: ['Быть слишком интенсивной', 'Маскировать собственный страх и нужду как любовь', 'Требовать трудных решений', 'Быть обречённой на провал'],
        correctIndex: 1,
        explanation_az: 'Sahib olan sevgi öz ehtiyacını başqasına proyeksiya edir. Bu, birisini sevmək kimi görünür, amma əslında onu istifadə etməkdir.',
        explanation_en: 'Possessive love projects one\'s own need onto another. It looks like loving them but is actually using them.',
        explanation_ru: 'Собственническая любовь проецирует свою нужду на другого. Это выглядит как любовь к нему, но на самом деле это использование его.',
      },
    ],
  },
  {
    id: 6,
    chapter: 6,
    title_az: 'Erotik Sevgi',
    title_en: 'Erotic Love',
    title_ru: 'Эротическая любовь',
    description_az: '"Tamamlanmaq" mifi. Həqiqi yaxınlıq ilə birləşmə fantaziyası.',
    description_en: 'The myth of "completion." Real intimacy vs. the fusion fantasy.',
    description_ru: 'Миф о «завершённости». Настоящая близость против фантазии слияния.',
    concept_az: `Biz hamımız "yarım alma" nağılına inandıq.

Fikir beledir: kimsə orada var — sənin "tam" olduğun şəxs. Sən onu tapanda tamdır. Onlar olmadan — çatışmazsan. Həm fiziki, həm emosional cəhətdən.

Bu fikir mədəniyyətimizdə hər yerdədir. Mahnılar. Filmlər. "Sən məni tamamlayırsan" cümləsi.

Fromm bunun romantik bir yalan olduğunu söyləyir.

Erotik sevgi güclüdür — çünki o, ən tam özünü açmadır. Bütün qorxularla. Bütün utanclarla. Bütün çatışmazlıqlarla. İkisi birlikdə tam bir şey yaradır — bu, Fromm-un dediyi "birlik"dir.

Amma problem odur ki, biz birlikdə tam olmaq istəyirik — öncə özümüz tam olmadan.

Bu mümkün deyil. İki tam insan bir-birinə qoşulur — iki yarım deyil. İki yarım qoşulanda — sadəcə iki yarım qalır. Yalnız güclü olanlar zəiflər.

Soruşmaq lazımdır: Mənim tərəfdaşım mənə nə verir? Bu verimə ehtiyacım varmı — yoxsa bu sadəcə istəkdir?`,
    concept_en: `We all believed the fairy tale of the "missing half."

The idea is: there is someone out there who makes you "complete." When you find them, you're whole. Without them — you're lacking. Physically, emotionally.

This idea is everywhere in our culture. Songs. Films. The phrase "you complete me."

Fromm says this is a romantic lie.

Erotic love is powerful — because it is the most complete act of self-disclosure. With all your fears. All your shame. All your imperfections. Two people together create something whole — this is what Fromm calls "union."

But the problem is that we want to be whole together — before becoming whole individually.

This is impossible. Two complete people join together — not two halves. When two halves join — only two halves remain. Only the strongest survive.

The question to ask: What does my partner give me? Do I need this gift — or is it merely a want?`,
    concept_ru: `Мы все верили в сказку о «недостающей половине».

Идея такова: там есть кто-то, кто делает тебя «полным». Когда ты его находишь, ты целый. Без него — тебе чего-то не хватает. Физически, эмоционально.

Эта идея повсюду в нашей культуре. Песни. Фильмы. Фраза «ты дополняешь меня».

Фромм говорит, что это романтическая ложь.

Эротическая любовь сильна — потому что это наиболее полное раскрытие себя. Со всеми своими страхами. Всем стыдом. Всеми несовершенствами. Два человека вместе создают нечто целое — это то, что Фромм называет «слиянием».

Но проблема в том, что мы хотим стать целыми вместе — прежде чем стать целыми по отдельности.

Это невозможно. Два целых человека объединяются — не две половины. Когда две половины объединяются — остаются только две половины. Выживают только сильнейшие.

Нужно задать вопрос: что даёт мне мой партнёр? Нуждаюсь ли я в этом даре — или это просто желание?`,
    quote_az: 'Erotik sevgi iki insanın birliyi ilə başlayır — amma hər ikisi özlərini qoruyur.',
    quote_en: 'Erotic love begins with the union of two people — but both remain themselves.',
    quote_ru: 'Эротическая любовь начинается со слияния двух людей — но оба остаются собой.',
    reflectionPrompt_az: 'Romantik sevgi haqqında hansı illüziyaları saxlayıram? Tamamlanmağı bir insandan gözlədim mi?',
    reflectionPrompt_en: 'What illusions do I hold about romantic love? Have I expected completion from another person?',
    reflectionPrompt_ru: 'Какие иллюзии о романтической любви я храню? Ожидал ли я завершённости от другого человека?',
    isVulnerablePrompt: true,
    practice_az: 'Bu gün özün haqqında bir şey adlandır ki, öz başına tamdır. Tərəfdaşsız, ailəsiz, başqasız.',
    practice_en: 'Today, name one way you are whole on your own. Without a partner, without family, without anyone else.',
    practice_ru: 'Сегодня назови один способ, которым ты целен сам по себе. Без партнёра, без семьи, без кого-либо ещё.',
    badgeId: 'courage',
    xpReward: 80,
    readMinutes: 5,
    quiz: [
      {
        question_az: 'Fromm-a görə sağlam erotik sevginin əsasında nə dayanır?',
        question_en: 'According to Fromm, what is the foundation of healthy erotic love?',
        question_ru: 'По Фромму, на чём основана здоровая эротическая любовь?',
        options_az: ['Fiziki cəlb', 'İki tam insanın birliyi', 'Tamamlanma ehtiyacı', 'Güclü hissiyyatlar'],
        options_en: ['Physical attraction', 'The union of two complete individuals', 'The need to be completed', 'Strong feelings'],
        options_ru: ['Физическое влечение', 'Союз двух целостных людей', 'Потребность в завершённости', 'Сильные чувства'],
        correctIndex: 1,
        explanation_az: 'Fromm-a görə erotik sevgi iki tam insanın birliyi olmalıdır, iki yarımın yox.',
        explanation_en: "For Fromm, erotic love must be the union of two whole people, not two halves.",
        explanation_ru: 'По Фромму, эротическая любовь должна быть союзом двух целостных людей, а не двух половин.',
      },
    ],
  },
  {
    id: 7,
    chapter: 7,
    title_az: 'Özünə Sevgi',
    title_en: 'Self-Love',
    title_ru: 'Любовь к себе',
    description_az: 'Fromm: Özünə sevgi narsisizm deyil. Bu, öz ehtiyaclarına hörmətdir.',
    description_en: "Fromm: Self-love is NOT narcissism. It is respect for your own needs.",
    description_ru: 'Фромм: Любовь к себе — НЕ нарциссизм. Это уважение к своим потребностям.',
    concept_az: `"Özünü sev" deyəndə insanlar çox vaxt bunu egoizmlə qarışdırır.

Fromm bu anlaşılmazlığa ciddi cavab verir.

Egoizm — başqaları hesabına özünü düşünmək. Özünə sevgi — özünə qayğı göstərmək, özünü tanımaq, özünü inkişaf etdirmək.

Fromm deyir ki, özünü sevə bilməyən biri başqasını da sevə bilməz.

Bu paradoks kimi görünür. Amma düşün: biri özündən nifrət edərək başqasını sevə bilər mi? Xeyr. O, başqasını "sevir" — çünki özü üçün yaşamağa qorxur. Bu asılılıqdır, sevgi deyil.

Sağlam özünə sevgi nədir? Öz ehtiyaclarını tanımaq. Öz hüdudlarını müəyyənləşdirmək. Özünə hörmətlə davranmaq. Öz böyüməni prioritet etmək — başqalarını istismar etmədən.

Biz — xüsusilə qadınlar — günahkarlıq hissi olmadan özünə vaxt ayırmaq üçün izin almağa ehtiyac duyuruq. Bu izin lazım deyil.

Sən özünü sev ki, başqalarını sevə biləsən. Bu, başlanğıcdır.`,
    concept_en: `When people hear "love yourself," they often confuse it with selfishness.

Fromm has a serious answer to this confusion.

Selfishness — thinking only of yourself at the expense of others. Self-love — caring for yourself, knowing yourself, growing yourself.

Fromm says: one who cannot love themselves cannot love others either.

This seems like a paradox. But think: can someone who hates themselves truly love another? No. They "love" another — because they are afraid to live for themselves. That is dependency, not love.

What is healthy self-love? Knowing your own needs. Setting your own limits. Treating yourself with respect. Prioritising your own growth — without exploiting others.

We — especially women — feel we need permission to take time for ourselves without guilt. No permission is required.

Love yourself so that you can love others. This is the beginning.`,
    concept_ru: `Когда люди слышат «люби себя», они часто путают это с эгоизмом.

У Фромма есть серьёзный ответ на это заблуждение.

Эгоизм — думать только о себе за счёт других. Любовь к себе — заботиться о себе, знать себя, развиваться.

Фромм говорит: тот, кто не умеет любить себя, не может любить и других.

Это кажется парадоксом. Но подумай: может ли тот, кто ненавидит себя, по-настоящему любить другого? Нет. Он «любит» другого — потому что боится жить для себя. Это зависимость, а не любовь.

Что такое здоровая любовь к себе? Знать свои потребности. Устанавливать свои границы. Относиться к себе с уважением. Приоритизировать собственный рост — не эксплуатируя других.

Мы — особенно женщины — чувствуем, что нам нужно разрешение уделять себе время без чувства вины. Никакого разрешения не требуется.

Люби себя, чтобы любить других. Это начало.`,
    quote_az: 'Başqasını sevmək kimi özünü sevmək də mövcudluğun təsdiqlənməsidir, öz güclərinin artımı, öz xoşbəxtliyinin ifadəsidir.',
    quote_en: 'Love of oneself, just as love of others, is the affirmation of one\'s own existence, the growth of one\'s own powers, the expression of one\'s own happiness.',
    quote_ru: 'Любовь к себе, так же как любовь к другим, есть утверждение собственного существования, рост собственных сил, выражение собственного счастья.',
    reflectionPrompt_az: 'Günah hissiylə özümdən nəyi məhrum edirəm? Özümü sevmək mənə nəyi ifadə edir?',
    reflectionPrompt_en: 'What do I deny myself out of guilt or obligation? What does loving myself mean to me in practice?',
    reflectionPrompt_ru: 'Чего я лишаю себя из чувства вины или обязательства? Что означает для меня любить себя на практике?',
    isVulnerablePrompt: true,
    practice_az: 'Bu gün YALNIZ sən istədiyin üçün bir şey et. Heç kimsə üçün deyil. Tam olaraq sən istədiyin şeyi.',
    practice_en: 'Today, do one thing purely because YOU want to. Not for anyone else. Exactly what you desire.',
    practice_ru: 'Сделай сегодня одну вещь исключительно потому, что ТЫ этого хочешь. Не для кого-то другого. Именно то, чего ты желаешь.',
    badgeId: 'selfRespect',
    xpReward: 100,
    readMinutes: 5,
    quiz: [
      {
        question_az: 'Fromm-a görə egoizmlə özünə sevgi arasındakı fərq nədir?',
        question_en: 'According to Fromm, what is the difference between selfishness and self-love?',
        question_ru: 'По Фромму, в чём разница между эгоизмом и любовью к себе?',
        options_az: ['Heç bir fərq yoxdur', 'Egoizm başqaları hesabına özünü düşünür; özünə sevgi öz böyüməsinə qayğı göstərir', 'Özünə sevgi güclü, egoizm isə zəifdir', 'Egoizm sağlamlıdır, özünə sevgi deyil'],
        options_en: ['There is no difference', 'Selfishness prioritizes the self at others\' expense; self-love cares for one\'s own growth', 'Self-love is strong, selfishness is weak', 'Selfishness is healthy, self-love is not'],
        options_ru: ['Нет разницы', 'Эгоизм ставит себя выше других; любовь к себе заботится о собственном росте', 'Любовь к себе — это сила, эгоизм — слабость', 'Эгоизм здоров, любовь к себе — нет'],
        correctIndex: 1,
        explanation_az: 'Fromm-a görə egoizm başqaları hesabına özünü düşünmékdir. Özünə sevgi isə öz böyüməsinə qayğı göstərmək — başqaları zərərinə deyil.',
        explanation_en: "For Fromm, selfishness is caring for oneself at others' expense. Self-love is caring for one's own growth — without harming others.",
        explanation_ru: "По Фромму, эгоизм — это забота о себе за счёт других. Любовь к себе — это забота о собственном росте, не причиняя вреда другим.",
      },
    ],
  },
  {
    id: 8,
    chapter: 8,
    title_az: 'Allaha Sevgi (Dünyəvi Versiyon)',
    title_en: 'Love of God (Secular Version)',
    title_ru: 'Любовь к Богу (светская версия)',
    description_az: 'İnananlar üçün deyil: həyatın özünə sevgi. Yaratmaqda, öyrənməkdə, böyüməkdə məna.',
    description_en: 'Not for believers: love of life itself. Meaning in creation, learning, growth.',
    description_ru: 'Не для верующих: любовь к самой жизни. Смысл в творчестве, учёбе, росте.',
    concept_az: `"Allaha sevgi" ifadəsi çoxunu uzaqlaşdırır. Amma Fromm bunu çox daha geniş düşünür.

O deyir ki, insan həmişə bir şeyin üstündə durmağa ehtiyac duyur — özündən böyük bir şey. Bu şey din ola bilər. Amma olmaya da bilər.

Dünyəvi versiyada bu: həyatın özünə ehtiram. Gözəlliyin, yaradıcılığın, öyrənmənin, böyüməyin qiymətləndirilməsi.

Bir musiqiçi çaldıqda — o anda, musiqi ondan keçdikdə — bu an Fromm-un "Allaha sevgi" adlandırdığı şeyin dünyəvi ekvivalentidir.

Filosof dərin bir sual üzərində düşünəndə. Valideyn körpəsini tamaşa edəndə. İnsan müəllimini ilk dəfə anlayanda.

Bu anlar — tam mövcudluq anları — mənalıdır.

Sual: Sənin üçün bu nədir? Sən tam mövcud olduğun an hansıdır? Sənin üçün həyat nəyə şükür etməyə layiqdir?`,
    concept_en: `The phrase "love of God" puts many people off. But Fromm thinks of it far more broadly.

He says that human beings always need something to stand upon — something larger than themselves. This can be religion. But it doesn't have to be.

In the secular version, this is: reverence for life itself. Appreciation of beauty, creativity, learning, growth.

When a musician plays — in that moment, as music passes through them — this is the secular equivalent of what Fromm calls "love of God."

A philosopher thinking deeply about a question. A parent watching their child. A person truly understanding their teacher for the first time.

These moments — moments of full presence — are meaningful.

The question: What is this for you? When are you most fully present? For what does life, in your experience, seem worth being grateful for?`,
    concept_ru: `Фраза «любовь к Богу» отталкивает многих. Но Фромм думает об этом гораздо шире.

Он говорит, что людям всегда нужна точка опоры — что-то большее, чем они сами. Это может быть религия. Но не обязательно.

В светской версии это: благоговение перед жизнью. Признание красоты, творчества, обучения, роста.

Когда музыкант играет — в тот момент, когда музыка проходит через него — это светский эквивалент того, что Фромм называет «любовью к Богу».

Философ, глубоко размышляющий над вопросом. Родитель, наблюдающий за своим ребёнком. Человек, впервые по-настоящему понимающий своего учителя.

Эти моменты — моменты полного присутствия — значимы.

Вопрос: что это для тебя? Когда ты наиболее полно присутствуешь? За что, по твоему опыту, жизнь кажется достойной благодарности?`,
    quote_az: 'Sevgi özünü aşmaqdır, başqasına yönəlməkdir, daralmış özündən çıxmaqdır.',
    quote_en: 'Love is transcending oneself, turning toward another, escaping the prison of one\'s confined self.',
    quote_ru: 'Любовь — это преодоление себя, обращение к другому, выход из тюрьмы своего замкнутого «я».',
    reflectionPrompt_az: 'Mən nəyi şərtsiz sevirəm? Hansı an tam mövcud oluram? O anda nə hiss edirəm?',
    reflectionPrompt_en: 'What do I love unconditionally? In what moments am I most fully alive? What do I feel in those moments?',
    reflectionPrompt_ru: 'Что я люблю безусловно? В какие моменты я наиболее полно живу? Что я чувствую в эти моменты?',
    isVulnerablePrompt: false,
    practice_az: 'Bu gün gözəl bir şey et — yalnız öz xatirinə. Faydası olmayan, "məhsuldar" olmayan — amma gözəl olan bir şey.',
    practice_en: 'Do something beautiful today — for its own sake. Not useful, not "productive" — just beautiful.',
    practice_ru: 'Сделай сегодня что-то красивое — ради самого этого. Не полезное, не «продуктивное» — просто красивое.',
    badgeId: null,
    xpReward: 60,
    readMinutes: 4,
    quiz: [
      {
        question_az: 'Fromm-un dünyəvi "Allaha sevgi" anlayışı nəyi əhatə edir?',
        question_en: 'What does Fromm\'s secular concept of "love of God" encompass?',
        question_ru: 'Что охватывает светская концепция Фромма «любви к Богу»?',
        options_az: ['Dini ibadət', 'Gözəllik, yaradıcılıq, öyrənmə və böyüməyə ehtiram', 'Supranaturalist inanc', 'Kilsəyə getmək'],
        options_en: ['Religious worship', 'Reverence for beauty, creativity, learning, and growth', 'Supernatural belief', 'Going to church'],
        options_ru: ['Религиозное поклонение', 'Уважение к красоте, творчеству, обучению и росту', 'Сверхъестественное убеждение', 'Посещение церкви'],
        correctIndex: 1,
        explanation_az: 'Fromm-un dünyəvi versiyasında "Allaha sevgi" yaşamaqla, gözəllikdə, böyüməkdə mənaya olan bağlılıqdır.',
        explanation_en: "In Fromm's secular version, 'love of God' is devotion to meaning through living, beauty, and growth.",
        explanation_ru: "В светской версии Фромма «любовь к Богу» — это преданность смыслу через жизнь, красоту и рост.",
      },
    ],
  },
  {
    id: 9,
    chapter: 9,
    title_az: 'Müasir Cəmiyyətdə Sevgi Niyə Uğursuz Olur?',
    title_en: 'Why Love Fails in Modern Society',
    title_ru: 'Почему любовь терпит неудачу в современном обществе?',
    description_az: 'Marketinq, konsumerizm, narsisizm. Daha çox bağlantı ilə niyə daha tənha oluruq.',
    description_en: 'Marketing, consumerism, narcissism. Why we are lonelier despite more connection.',
    description_ru: 'Маркетинг, консьюмеризм, нарциссизм. Почему мы одиноки при большем количестве связей.',
    concept_az: `Fromm bu kitabı 1956-cı ildə yazdı. Amma elə bil bu gün yazıb.

O deyir ki, müasir cəmiyyətin özü sevgiyə düşməndir.

Niyə? Çünki kapitalist cəmiyyət hər şeyi — insanlar da daxil olmaqla — məhsula çevirir. Biz "bazar"ıq. Biz özümüzü satmağa çalışırıq. Profil şəkli. CV. İnstagram. Hər şey bir nümayiş.

Bu vəziyyətdə münasibət nə olur? Transaksiya. "Mən sənin üçün bu qədər cavab verirəm, sən mənim üçün bu qədər."

Sosial mediaya bax: biz daha çox bağlı görünürük. Amma araşdırmalar göstərir ki, daha tənhayıq. Niyə? Çünki bağlantı var, amma əlaqə yoxdur. Sözlər var, amma dinləmə yoxdur.

Fromm deyir: bu sistemi dəyişmək üçün gücün olmaya bilər. Amma öz həyatını dəyişmək üçün var.

Öz həyatında nəni azaldacaqsan? Nəyi artıracaqsan?`,
    concept_en: `Fromm wrote this book in 1956. Yet it reads like it was written today.

He says that modern society itself is hostile to love.

Why? Because capitalist society turns everything — including people — into products. We are "the market." We try to sell ourselves. Profile photo. CV. Instagram. Everything is a performance.

What happens to relationships in this context? Transaction. "I'm worth this much to you, you're worth this much to me."

Look at social media: we seem more connected. But research shows we are lonelier. Why? Because there is connectivity but no connection. There are words but no listening.

Fromm says: you may not have the power to change the system. But you do have the power to change your own life.

What will you reduce in your own life? What will you grow?`,
    concept_ru: `Фромм написал эту книгу в 1956 году. Но читается как написанная сегодня.

Он говорит, что современное общество само по себе враждебно любви.

Почему? Потому что капиталистическое общество превращает всё — включая людей — в продукты. Мы — «рынок». Мы пытаемся себя продать. Фото профиля. Резюме. Instagram. Всё — это перформанс.

Что происходит с отношениями в этом контексте? Сделка. «Я стою для тебя столько, ты — столько для меня».

Посмотри на социальные сети: мы кажемся более связанными. Но исследования показывают, что мы более одиноки. Почему? Потому что есть подключённость, но нет связи. Есть слова, но нет слушания.

Фромм говорит: у тебя может не быть силы изменить систему. Но у тебя есть сила изменить свою жизнь.

Что ты сократишь в своей жизни? Что вырастишь?`,
    quote_az: 'Müasir insan özünü yaxşı təşkil olunmuş, yaxşı işləyən bir maşına çevirdi — amma diri deyil.',
    quote_en: 'Modern man has transformed himself into a commodity; he experiences his life energy as an investment which must bring him the maximum profit obtainable.',
    quote_ru: 'Современный человек превратил себя в товар; он переживает свою жизненную энергию как инвестицию, которая должна принести ему максимальную прибыль.',
    reflectionPrompt_az: 'Yaşadığım dünya sevgini necə çətinləşdirir? Bu həftə dijiital distraksiyalar məni nə qədər əlaqəni kəsdi?',
    reflectionPrompt_en: 'How does the world I live in make love harder? This week, how much did digital distractions cut me off from real connection?',
    reflectionPrompt_ru: 'Как мир, в котором я живу, усложняет любовь? На этой неделе насколько цифровые отвлечения отрезали меня от реальной связи?',
    isVulnerablePrompt: false,
    practice_az: 'Bu gün bir rəqəmsal distraksiyadan imtina et. Sosial media. Televiziya. Telefonla yemək yerimək. Birini seç. Bir gün yoxdur.',
    practice_en: 'Unplug from one digital distraction today. Social media. Television. Phone at meals. Choose one. Just one day.',
    practice_ru: 'Отключись от одного цифрового отвлечения сегодня. Социальные сети. Телевидение. Телефон за едой. Выбери одно. Всего один день.',
    badgeId: null,
    xpReward: 60,
    readMinutes: 4,
    quiz: [
      {
        question_az: 'Fromm-a görə müasir cəmiyyətin sevgiyə qarşı əsas düşmənçiliyi nədir?',
        question_en: 'According to Fromm, what is modern society\'s main hostility toward love?',
        question_ru: 'По Фромму, в чём главная враждебность современного общества к любви?',
        options_az: ['Texnologiya çox sürətlidir', 'Hər şeyi məhsula çevirmək — insanlar da daxil', 'İnsanlar çox sərbəstdir', 'Din azalıb'],
        options_en: ['Technology moves too fast', 'Turning everything — including people — into commodities', 'People have too much freedom', 'Religion has declined'],
        options_ru: ['Технологии движутся слишком быстро', 'Превращение всего — включая людей — в товары', 'У людей слишком много свободы', 'Религия угасла'],
        correctIndex: 1,
        explanation_az: 'Fromm-a görə kapitalist cəmiyyəti insanları, o cümlədən münasibətləri, bazar məntiqi ilə görür. Bu, sevgiyə düşməndir.',
        explanation_en: "For Fromm, capitalist society sees people — including relationships — through market logic. This is hostile to love.",
        explanation_ru: "По Фромму, капиталистическое общество рассматривает людей — включая отношения — через рыночную логику. Это враждебно любви.",
      },
    ],
  },
  {
    id: 10,
    chapter: 10,
    title_az: 'Sevginin Məşqi',
    title_en: 'The Practice of Love',
    title_ru: 'Практика любви',
    description_az: 'İntizam, diqqət, səbir, inam. Narsisizmi gündəlik işlə aşmaq.',
    description_en: 'Discipline, concentration, patience, faith. Overcoming narcissism through daily practice.',
    description_ru: 'Дисциплина, концентрация, терпение, вера. Преодоление нарциссизма через ежедневную практику.',
    concept_az: `Son modul. Amma bu son deyil — bu başlanğıcdır.

Fromm deyir ki, hər sənəti öyrənmək üçün dörd şey lazımdır:
1. **İntizam** — hər gün məşq etmək. Hər gün öyrənmək. Əhval-ruhiyyə fərq etmir.
2. **Diqqət** — tam mövcud olmaq. Düşüncələr gəldikdə, onları kənara qoymaq.
3. **Səbir** — nəticəni tələsik istəməmək. Hər bir addımı dəyərləndirmək.
4. **İnam** — özünə, prosesə, insanlığa inam.

Narsisizm bu dörd şeyin əksidir. Narsisizm deyir: "Mən artıq tamdır. Mən öyrənməyə ehtiyac duymuram. Mən düzgünəm."

Sevgi isə deyir: "Mən daha çox öyrənə bilərəm. Mən böyüyə bilərəm. Mən dəyişə bilərəm."

Bu modul sonu sənin üçün bir sual var: 10 modul boyunca nə öyrəndin? Nə dəyişdi? Bu bilikdən nə edəcəksən?

Sevgi işdir. Bu gün onunla başla.`,
    concept_en: `The final module. But this is not an ending — it is a beginning.

Fromm says that learning any art requires four things:
1. **Discipline** — practising every day. Learning every day. Regardless of mood.
2. **Concentration** — being fully present. When thoughts come, setting them aside.
3. **Patience** — not rushing results. Valuing every step.
4. **Faith** — faith in yourself, the process, humanity.

Narcissism is the opposite of these four things. Narcissism says: "I am already complete. I don't need to learn. I am right."

Love says: "I can learn more. I can grow. I can change."

One question for you at the end of this module: across 10 modules, what did you learn? What changed? What will you do with this knowledge?

Love is work. Begin it today.`,
    concept_ru: `Последний модуль. Но это не конец — это начало.

Фромм говорит, что для освоения любого искусства необходимы четыре вещи:
1. **Дисциплина** — практиковать каждый день. Учиться каждый день. Независимо от настроения.
2. **Концентрация** — быть полностью присутствующим. Когда приходят мысли, откладывать их в сторону.
3. **Терпение** — не торопить результаты. Ценить каждый шаг.
4. **Вера** — вера в себя, в процесс, в человечество.

Нарциссизм — противоположность этим четырём вещам. Нарциссизм говорит: «Я уже совершенен. Мне не нужно учиться. Я прав».

Любовь говорит: «Я могу узнать больше. Я могу вырасти. Я могу измениться».

Один вопрос для тебя в конце этого модуля: за 10 модулей, чему ты научился? Что изменилось? Что ты сделаешь с этим знанием?

Любовь — это труд. Начни его сегодня.`,
    quote_az: 'Sevgi bir sənətdir. Öyrənilməli, məşq edilməli, seçilməli olan.',
    quote_en: 'Love is an art. To be learned, to be practiced, to be chosen.',
    quote_ru: 'Любовь — это искусство. Которому нужно учиться, которое нужно практиковать, которое нужно выбирать.',
    reflectionPrompt_az: 'Bu 10 modul boyunca nə öyrəndim? Özüm haqqında nə dəyişdi? Bu bilikdən nə edəcəyəm?',
    reflectionPrompt_en: 'Across these 10 modules, what did I learn? What changed in how I see myself? What will I do with this knowledge?',
    reflectionPrompt_ru: 'За эти 10 модулей, чему я научился? Что изменилось в том, как я вижу себя? Что я сделаю с этим знанием?',
    isVulnerablePrompt: true,
    practice_az: 'Bu gün sevgi üçün bir niyyət qoy. Konkret. Ölçülə bilən. Bu gün. Yalnız bu gün.',
    practice_en: 'Set one intention for love today. Concrete. Measurable. Today. Just today.',
    practice_ru: 'Установи сегодня одно намерение для любви. Конкретное. Измеримое. Сегодня. Только сегодня.',
    badgeId: 'artistOfLove',
    xpReward: 150,
    readMinutes: 5,
    quiz: [
      {
        question_az: 'Fromm sevgini məşq etmək üçün hansı dörd elementi sadalayır?',
        question_en: 'What four elements does Fromm list for practising love?',
        question_ru: 'Какие четыре элемента перечисляет Фромм для практики любви?',
        options_az: ['Sürət, güc, hiss, cəsarət', 'İntizam, diqqət, səbir, inam', 'Diqqət, həyəcan, enerji, istək', 'Məşq, sınaq, uğursuzluq, qələbə'],
        options_en: ['Speed, strength, feeling, courage', 'Discipline, concentration, patience, faith', 'Attention, excitement, energy, desire', 'Practice, trial, failure, victory'],
        options_ru: ['Скорость, сила, чувство, смелость', 'Дисциплина, концентрация, терпение, вера', 'Внимание, возбуждение, энергия, желание', 'Практика, испытание, неудача, победа'],
        correctIndex: 1,
        explanation_az: 'Fromm-a görə hər sənəti öyrənmək üçün — sevgi də daxil — intizam, diqqət, səbir və inam lazımdır.',
        explanation_en: 'For Fromm, learning any art — including love — requires discipline, concentration, patience, and faith.',
        explanation_ru: 'По Фромму, для освоения любого искусства — включая любовь — необходимы дисциплина, концентрация, терпение и вера.',
      },
    ],
  },
];
