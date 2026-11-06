# M0 / Lab 01 — експеримент: keys і reconciliation

Репозиторій: `nextjs-lab`. Тема: ключі в списках, збереження state, Strict Mode. Час: ~30–40 хв.

---

# Частина A. Опис для Антона

## Навіщо
Діагностика показала хибну ментальну модель: ти думав, що з index-ключами React вважає елементи новими. Насправді він **реюзає instances за key**, тому state залишається на чужих даних. Це завдання дає побачити це на власні очі. Висновок має бути твоїм, тому порядок кроків важливий.

## Що зробити (по порядку)

**1. Прогноз (до коду, 5 хв).**
Створи `experiments/01-keys.md` і напиши **англійською, 3–4 речення, без AI**:
- Є 3 рядки (A, B, C), у кожному input з надрукованим текстом і підпис.
- Ключі це index. Видаляємо перший рядок. Що буде на екрані? Які instances React зробить unmount, а які залишить?
- Що буде, якщо ключі це `id`?

Закоміть **окремим комітом до написання коду**: `docs: add prediction for keys experiment`. Це доказ, що прогноз був до експерименту.

**2. Експеримент (15 хв).**
Зроби сторінку, наприклад `app/experiments/keys/page.tsx` із Client Component для демо:
- Список із 3 елементів зі стабільним `id` (задай `id` у даних, а не при render-і). У кожному рядку:
  - підпис з даними елемента;
  - **uncontrolled** `<input>` (щоб текст жив у DOM) з `defaultValue=""`;
  - кнопка Delete.
- Перемикач режиму: `key={index}` або `key={item.id}`.
- У кожному рядку `useEffect` з `console.log('mount', item.id)` і cleanup з `console.log('unmount', item.id)`.
- Кнопка Reset, щоб відновити список.

Закоміть: `feat: add keys experiment (index vs id)`.

**3. Запуск і спостереження (10 хв).**
Для кожного режиму: надрукуй різний текст у кожному input, видали **перший** рядок.
Запиши в таблицю (в `experiments/01-keys.md`, розділ Results), що побачив:

| Режим | Підпис і текст у рядках після видалення | Що видно в консолі (mount/unmount) |
|---|---|---|
| `key={index}` | якщо ми для середнього інпута введемо якийсь вміст і видалимо його, то останній елемент, який став середнім також має такий самий інпут, як і попередній останній елемент | в тексті видалення я бачу, що, при видаленні першого елемента, у виводі маємо анмоут останнього елемента |
| `key={id}` | тут також все чітко, якщо ввели якесь значення, то коли видаляємо якийсь інпут, то лейбл з відповідним інпутом видаляється | тут чітко видно, що який елемент видаляємо, то для такого елемента ачимо вивід анмаунта|

Врахуй: у dev Strict Mode при першому render-і ти побачиш **подвійні** mount/unmount логи. Це нормально, і це тема 3B із діагностики. Дивись на логи **після** кліку Delete.

**4. Висновок (5 хв).**
У розділі Conclusion, англійською, 3–4 речення, без AI:
- Що саме сталося при `key={index}` і чому.
- Чим відрізнився `key={id}`.
- Одне правило для себе: коли index допустимий.

Закоміть: `docs: add keys experiment results and conclusion`.

**5. Надішли мені (в чат ментора):** прогноз, таблицю результатів, висновок. Прогноз надсилай першим блоком. Розберу в новому форматі.

## Додатково (за бажанням)
- Режим `key={Math.random()}`: що в консолі й чому це антипатерн.
- `key` як скидання state: компонент `<Row key={selectedId} />` і поле, яке обнуляється при зміні вибору.

## Definition of done
- [ ] Прогноз закомічено **до** коду експерименту.
- [ ] Експеримент працює в обох режимах, перемикач є.
- [ ] Mount/unmount логи видно в консолі.
- [ ] Таблиця результатів заповнена своїми спостереженнями.
- [ ] Висновок англійською, 3–4 речення, без AI.
- [ ] Коміти у форматі Conventional Commits.
- [ ] Нічого не зламано (lint і typecheck проходять).

---

# Частина B. Промт для Claude Code

Вставляється на початку сесії (або в розділ Current focus у `CLAUDE.md`).

```
# Task: M0 / Lab 01 — keys and reconciliation experiment

## Context
I'm Anton. I'm learning Next.js, this is the nextjs-lab repo, Module 0 (React diagnostic).
My diagnostic showed a wrong mental model: I thought index keys make React treat shifted
items as new elements. In reality React reuses instances by key, so state (e.g. input text)
stays on the wrong data. This experiment exists so that I discover this myself.
Follow all rules from CLAUDE.md (red/green zone, hint ladder, English tip, short answers
to concept questions). This task adds the specifics below. If they conflict, the stricter wins.

## Goal
I build a small client-side experiment (list of 3 rows, uncontrolled inputs, delete button,
switch between key={index} and key={item.id}, useEffect mount/unmount logs), write a
prediction in English BEFORE running it, run it, record results, and write a short
conclusion in English.

## Red zone (do NOT do these, even if I ask)
- Do not write or edit the experiment component, the page, or the result table.
- Do not write the prediction or the conclusion, not even a draft or sample sentences.
- Do not explain what will happen with index keys vs id keys, and do not confirm or
  correct my prediction before my conclusion exists. If I ask "what will happen?", answer
  with a guiding question instead.
- Do not fix my bugs by editing files. Use the hint ladder: (1) a guiding question,
  (2) a pointer to the relevant React API or docs page, (3) pseudocode. Real code only after
  I say "show solution" after hint 3.

## Green zone (you may do these freely)
- Run the dev server, lint, typecheck, build, git status/log.
- Explain repo structure and Next.js basics (where to put a file, 'use client', routing).
- Read my files and check them against the checklist below.
- Give one English tip about my prediction or conclusion text (CLAUDE.md rule).

## Gate: prediction first
Before reviewing any experiment code, check with git log that a commit containing
experiments/01-keys.md with a prediction exists BEFORE the commit with experiment code.
If not, ask me to write the prediction first and stop. Don't review further until it exists.

## Review checklist (when I say "ready for review")
Report each item as OK / issue (with a hint, not a fix):
1. Items have a stable `id` defined in the data, not generated during render.
2. Inputs are uncontrolled (defaultValue, no value prop), so text lives in the DOM.
3. Delete removes the correct item from state immutably (no mutation).
4. A switch between key={index} and key={item.id} exists and really changes the key.
5. useEffect logs mount and has a cleanup that logs unmount.
6. Reset restores the initial list.
7. TypeScript strict passes, no `any`, lint passes.
8. Commits follow Conventional Commits, prediction commit is separate and earlier.
9. Results table is based on what I actually observed (don't judge correctness yet).

## After my conclusion exists
Only now you may compare my conclusion with what the experiment shows. Keep it to 5
sentences: confirm what is right, point out what is wrong or missing. Do not give a lecture;
the full explanation happens in my mentor chat.

## Definition of done
All checklist items OK, prediction committed before code, conclusion written by me
in English (3–4 sentences), lint and typecheck pass.

## Stop conditions
If I ask you to "just do it" or write the red-zone parts, remind me once of this task's
rules and offer the next hint instead. Don't write them.
```
