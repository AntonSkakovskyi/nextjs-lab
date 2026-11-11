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
