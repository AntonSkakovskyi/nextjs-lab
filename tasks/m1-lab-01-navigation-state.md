# M1 / Lab 01 — експеримент: що переживає навігацію (layout, template, page)

Репозиторій: `nextjs-lab`. Теми: збереження state при навігації, layout vs template, порядок effect cleanup, Strict Mode у dev і production. Час: ~70–80 хв (одна сесія).

---

# Частина A. Опис для Антона

## Навіщо
Завдання має дві половини.

- **Перевірка (пояснення вже є в чаті).** Exit check модуля 0 показав дві прогалини: порядок cleanup (ти поставив cleanup перед новим render-ом) і Strict Mode (думка, що його треба вимикати в production). Тут ти бачиш це в логах на власні очі.
- **Прогноз (нове для модуля 1).** Що відбувається зі state Client Components у layout, template і page при різних видах навігації. Ці сценарії я навмисно не пояснював. У твоїй конфігурації (`cacheComponents: true`) є нюанс, якого немає в більшості туторіалів, тож прогноз тут справжній.

Lab також закриває хвіст M0 lab 01: ті самі інструменти (лог у render, логи setup/cleanup), але вже в Next.js.

## Що зробити (по порядку)

**0. Хвіст M0 (2 хв).**
В експерименті з keys заміни видалення за `label` на видалення за `id`. Коміт: `refactor: delete list item by id`.

**1. Прогноз (10 хв, до коду).**
Створи `experiments/02-navigation-state.md`, розділ Prediction. Англійською, без AI, 1–2 речення на пункт, у кожному є "because".

Сетап, про який прогнозуєш: у `/experiments/nav` є layout і template, кожен показує свій лічильник. Сторінки `/experiments/nav/a` і `/experiments/nav/b` теж мають власні лічильники. Перед кожним сценарієм ти натискаєш кожен лічильник кілька разів.

- **P1.** Через `<Link>`: `/a` → `/b` → назад на `/a`. Яке значення лічильника сторінки A після повернення?
- **P2.** Той самий маршрут: що з лічильником template після `/a` → `/b` і після повернення на `/a`?
- **P3.** Звичайний `<a href>` з `/a` на `/b`. Що з лічильником layout?
- **P4.** Через `<Link>`: `/a?x=1` → `/a?x=2`. Що з лічильником template?
- **P5.** Жорстке перезавантаження `/a` (F5). Де з'являться логи `init` від Counter: у консолі браузера, у терміналі з dev-сервером чи в обох?

Закоміть **окремим комітом до коду**: `docs: add predictions for navigation state experiment`.

**2. Код (30 хв).** Пишеш сам, Claude Code перевіряє за чеклістом і підказує.

Структура (якщо в проєкті є `src/`, то `src/app/...`):
```
app/experiments/nav/
  layout.tsx     Server Component: навігація + <Counter label="layout" /> + children
  template.tsx   Server Component: <Counter label="template" /> + children
  a/page.tsx     <Counter label="page a" /> + <ChatRoom />
  b/page.tsx     <Counter label="page b" />
Counter.tsx      'use client' (поклади туди, де в проєкті живуть компоненти)
ChatRoom.tsx     'use client'
```

Вимоги:
- **Counter:** prop `label`, кнопка +1 і три види логів:
  - у lazy-ініціалізаторі `useState(() => { ...; return 0; })` лог `init <label>` (виконується лише тоді, коли створюється новий instance);
  - у тілі компонента лог `render <label> <count>`;
  - `useEffect` з `[]`: лог `setup <label>` і cleanup з логом `cleanup <label>`.
- **ChatRoom:** state `roomId` (за замовчуванням `"general"`), дві кнопки для перемикання на `"general"` і `"random"`, лог у тілі `render room <roomId>`, `useEffect` з `[roomId]`: лог `connect <roomId>` і cleanup з логом `disconnect <roomId>`.
- **Навігація в layout:** `<Link>` на `/a`, `/b`, `/a?x=1`, `/a?x=2` і один звичайний `<a href>` на `/b`, підписаний так, щоб ти його не сплутав.
- layout і template **без** `'use client'`: вони просто імпортують клієнтський Counter.

Коміт: `feat: add navigation state experiment`.

**3. Спостереження (20 хв).**
Перед стартом:
- у DevTools → Console увімкни **Preserve log**;
- перед кожним сценарієм очищуй консоль;
- перед кожним сценарієм виставляй лічильники в різні значення (наприклад, layout 3, template 5, page 7), щоб було видно, що збереглося, а що скинулося.

Таблиця в розділі Results:

| # | Сценарій | layout | template | page | Логи (по порядку) |
|---|---|---|---|---|---|
| S1 | Link `/a` → `/b` | | | | |
| S2 | Link назад `/b` → `/a` | | | | |
| S3 | `<a href>` `/a` → `/b` | | | | |
| S4 | Link `/a?x=1` → `/a?x=2` | | | | |
| S5 | F5 на `/a` (браузер **і** термінал) | | | | |
| S6 | ChatRoom: `general` → `random` | | | | |
| S7 | Production: зупини dev, `npm run build && npm run start`, повтори S5 і S6 | | | | |

У колонках layout, template і page пиши значення лічильника після сценарію. S6 і S7 перевіряють те, що вже пояснено в чаті: запиши точний порядок логів і кількість дублів у dev проти production.

**4. Висновок (10 хв).**
Розділ Conclusion, англійською, без AI, 5–7 речень:
- Які прогнози не справдилися і чому (як ти це бачиш зараз).
- Чи завжди лог `cleanup` означав, що instance знищено? Як ти це визначив у цьому експерименті?
- Одне речення: коли ти взяв би template замість layout.

Коміт: `docs: add navigation state results and conclusion`.

**5. Надішли мені (в чат ментора):** прогноз першим блоком, потім таблицю і висновок. Розберу у форматі «спершу пояснення, потім розбір твоєї відповіді». Документацію Next.js про ці сценарії читай **після** висновку.

## Додатково (за бажанням)
- Додай сторінки `c` і `d`, пройди `/a` → `/b` → `/c` → `/d` → `/a` через Link. Чи збереглося значення на сторінці A? Порівняй із S2.
- Додай вкладений `a/layout.tsx` зі своїм лічильником і перевір, що з ним при переході `/a` → `/b`.

## Definition of done
- [ ] Хвіст M0: видалення за `id`, коміт.
- [ ] Прогноз P1–P5 закомічено **до** коду експерименту.
- [ ] Експеримент працює, усі логи видно.
- [ ] Таблиця S1–S7 заповнена своїми спостереженнями, включно з production-запуском.
- [ ] Висновок англійською, 5–7 речень, без AI.
- [ ] Коміти у форматі Conventional Commits.
- [ ] Lint, typecheck і build проходять.

---

# Частина B. Промт для Claude Code

Вставляється на початку сесії (або в розділ Current focus у `CLAUDE.md`).

```
# Task: M1 / Lab 01 — what survives navigation (layout, template, page)

## Context
I'm Anton, learning Next.js in the nextjs-lab repo (Next.js 16.4, App Router,
cacheComponents and partialPrefetching enabled). Module 1: mental model, App Router,
layouts, navigation. This experiment has two parts:
- Verify (already explained by my mentor): effect cleanup order when a dependency
  changes, and Strict Mode in development vs a production build.
- Predict (not explained yet): what happens to Client Component state in a layout,
  a template and a page during different kinds of navigation.
I must discover the second part myself.
Follow all rules from CLAUDE.md (red/green zone, hint ladder, English tip, short answers
to concept questions). This task adds the specifics below. If they conflict, the stricter wins.

## Goal
I build app/experiments/nav with a layout, a template, pages a and b, a Counter client
component (lazy-init log, render log, effect setup/cleanup logs) and a ChatRoom client
component (roomId state, connect/disconnect effect). I commit predictions P1–P5 in
experiments/02-navigation-state.md BEFORE the code, run scenarios S1–S7, record the
results, and write a conclusion in English.

## Red zone (do NOT do these, even if I ask)
- Do not write or edit Counter, ChatRoom, layout.tsx, template.tsx, the pages, the
  predictions, the results table or the conclusion. No drafts, no sample sentences.
- Before my conclusion exists, do not explain or hint what happens to the state, DOM or
  effects of layouts, templates or pages during navigation: Link navigation, going back,
  a plain <a> link, search param changes, or full reloads. Do not say where the logs will
  appear (browser vs terminal). Do not quote or summarize the Next.js docs on these
  topics, including the docs bundled in node_modules/next/dist/docs.
  If I ask "what will happen?" or "is this a bug?", answer with a guiding question.
- Do not "fix" the plain <a> link. It is intentional.
- Do not fix my bugs by editing files. Use the hint ladder from CLAUDE.md.

## Green zone (you may do these freely)
- Run the dev server, lint, typecheck, build, `next start`, git status/log.
- Explain where files go in the App Router, that page.tsx, layout.tsx and template.tsx
  are special files, what 'use client' means, and that a Server Component can import
  and render a Client Component. Do not explain how layout and template differ during
  navigation.
- Explain DevTools usage (Console filters, Preserve log, clearing the console).
- Help with build or type errors using hints.
- Read my files and check them against the checklist below.
- Give one English tip about my predictions or conclusion text (CLAUDE.md rule).

## Gate: predictions first
Before reviewing any experiment code, check with git log that a commit adding
experiments/02-navigation-state.md with predictions P1–P5 exists BEFORE the commit with
the experiment code. If not, ask me to write the predictions first and stop.

## Review checklist (when I say "ready for review")
Report each item as OK / issue (with a hint, not a fix):
1. layout.tsx and template.tsx have no 'use client'; Counter and ChatRoom start with
   'use client'.
2. Counter: typed `label` prop; a log in a lazy useState initializer (`init <label>`);
   a log in the component body (`render <label> <count>`); a useEffect with [] that logs
   `setup <label>` and returns a cleanup that logs `cleanup <label>`.
3. ChatRoom: roomId state with two buttons; a render log; a useEffect with [roomId] that
   logs `connect <roomId>` and a cleanup that logs `disconnect <roomId>`;
   exhaustive-deps passes.
4. The layout renders its Counter, children, and navigation with <Link> to /a, /b,
   /a?x=1, /a?x=2 plus one labelled plain <a href> to /b. If lint flags the <a>,
   a one-line disable with a reason comment is OK.
5. The template renders its own Counter and children.
6. Each page renders its own Counter; page a also renders ChatRoom.
7. No hydration warnings in the browser console. If there are any, give a hint, no fix.
8. TypeScript strict, no `any`; lint, typecheck and build pass.
9. Commits follow Conventional Commits; the predictions commit is separate and earlier.
10. The results table covers S1–S7 (including the production run) and is based on what
    I observed. Don't judge correctness yet.

## After my conclusion exists
Only now you may compare my conclusion with the observations, in at most 5 sentences:
confirm what is right, point out what is wrong or missing. Then you may point me to the
relevant pages in node_modules/next/dist/docs to read myself. No lecture: the full
explanation happens in my mentor chat.

## Definition of done
All checklist items OK, predictions committed before the code, S1–S7 recorded,
conclusion written by me in English (5–7 sentences), lint, typecheck and build pass.

## Stop conditions
If I ask you to "just do it", to write the red-zone parts, or to reveal the answers,
remind me once of this task's rules and offer the next hint instead.
```
