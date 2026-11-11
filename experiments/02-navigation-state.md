## Predictions

P1. I do not remember how Link component actually works, but I assume it works as a part of React library, so it changes route and url become updated, and I think in that case, counter remains with same value
P2. I think it we be updated. At this question it would be good if i knew actual difference between layout and template. In my understanding, layout we use for fully different routes that may have different shape of the page, and template we use when we want have same the same shape of the page just for different objects (for example for different profiles, orders of products), but in that case we would just use order/[id].tsx or something in that way
P3. Since we are using raw link with a tag it will fully redirect us and we are not able to restore state that we had, so we will start from the initial
P4. Haha. Tricky question. To be honest, I am not sure what we will have, but I feel that it does not affect us, so we will have same counter
P5. Value will be updated. I am sure about what logs you are taking. Random shot, let it be on dev-server


## Results

At the beginning I am setting layout - 1, template - 2, page a - 3

| # | Сценарій | layout | template | page | Логи (по порядку) |
|---|---|---|---|---|---|
| S1 | Link `/a` → `/b` | 1 | 0 | B = 0 | init counter <template>
Counter.tsx:10 init counter <template>
Counter.tsx:30 render counter <template> <0>
Counter.tsx:30 render counter <template> <0>
Counter.tsx:10 init counter <Page B>
Counter.tsx:10 init counter <Page B>
Counter.tsx:30 render counter <Page B> <0>
Counter.tsx:30 render counter <Page B> <0>
Counter.tsx:24 cleanup counter <template>
Counter.tsx:24 cleanup counter <Page A>
ChatRoom.tsx:11 disconnect room <general>
Counter.tsx:21 setup counter <template>
Counter.tsx:21 setup counter <Page B>
Counter.tsx:24 cleanup counter <template>
Counter.tsx:24 cleanup counter <Page B>
Counter.tsx:21 setup counter <template>
Counter.tsx:21 setup counter <Page B> |
| S2 | Link назад `/b` → `/a` | 1 | 2 | 3 | render counter <Page A> <3>
Counter.tsx:30 render counter <Page A> <3>
ChatRoom.tsx:15 render room <general>
ChatRoom.tsx:15 render room <general>
Counter.tsx:24 cleanup counter <template>
Counter.tsx:24 cleanup counter <Page B>
Counter.tsx:21 setup counter <template>
Counter.tsx:21 setup counter <Page A>
ChatRoom.tsx:8 connect room <general>
Counter.tsx:24 cleanup counter <template>
Counter.tsx:24 cleanup counter <Page A>
ChatRoom.tsx:11 disconnect room <general>
Counter.tsx:21 setup counter <template>
Counter.tsx:21 setup counter <Page A>
ChatRoom.tsx:8 connect room <general> |
| S3 | `<a href>` `/a` → `/b` | 0 | 0 | 0 | init counter <layout>
Counter.tsx:10 init counter <layout>
Counter.tsx:30 render counter <layout> <0>
Counter.tsx:30 render counter <layout> <0>
Counter.tsx:21 setup counter <layout>
Counter.tsx:24 cleanup counter <layout>
Counter.tsx:21 setup counter <layout>
Counter.tsx:10 init counter <template>
Counter.tsx:10 init counter <template>
Counter.tsx:30 render counter <template> <0>
Counter.tsx:30 render counter <template> <0>
Counter.tsx:21 setup counter <template>
Counter.tsx:24 cleanup counter <template>
Counter.tsx:21 setup counter <template>
Counter.tsx:10 init counter <Page B>
Counter.tsx:10 init counter <Page B>
Counter.tsx:30 render counter <Page B> <0>
Counter.tsx:30 render counter <Page B> <0>
Counter.tsx:21 setup counter <Page B>
Counter.tsx:24 cleanup counter <Page B>
Counter.tsx:21 setup counter <Page B> |
| S4 | Link `/a?x=1` → `/a?x=2` | 1 | 2 | 3 | render counter <Page A> <3>
Counter.tsx:30 render counter <Page A> <3>
ChatRoom.tsx:15 render room <general>
ChatRoom.tsx:15 render room <general> |
| S5 | F5 на `/a` (браузер **і** термінал) | 0 | 0 | 0 | init counter <layout>
Counter.tsx:10 init counter <layout>
Counter.tsx:30 render counter <layout> <0>
Counter.tsx:30 render counter <layout> <0>
Counter.tsx:21 setup counter <layout>
Counter.tsx:24 cleanup counter <layout>
Counter.tsx:21 setup counter <layout>
Counter.tsx:10 init counter <template>
Counter.tsx:10 init counter <template>
Counter.tsx:30 render counter <template> <0>
Counter.tsx:30 render counter <template> <0>
Counter.tsx:21 setup counter <template>
Counter.tsx:24 cleanup counter <template>
Counter.tsx:21 setup counter <template>
Counter.tsx:10 init counter <Page A>
Counter.tsx:10 init counter <Page A>
Counter.tsx:30 render counter <Page A> <0>
Counter.tsx:30 render counter <Page A> <0>
ChatRoom.tsx:15 render room <general>
ChatRoom.tsx:15 render room <general>
Counter.tsx:21 setup counter <Page A>
ChatRoom.tsx:8 connect room <general>
Counter.tsx:24 cleanup counter <Page A>
ChatRoom.tsx:11 disconnect room <general>
Counter.tsx:21 setup counter <Page A>
ChatRoom.tsx:8 connect room <general> |
| S6 | ChatRoom: `general` → `random` | 1 | 2 | 3 | render room <random>
ChatRoom.tsx:15 render room <random>
ChatRoom.tsx:11 disconnect room <general>
ChatRoom.tsx:8 connect room <random> |
| S7 | Production: зупини dev, `npm run build && npm run start`, повтори S5 і S6 | 0\1 | 0\2 | 0\3 | init counter <layout>
2n7wdj-o4dp5w.js:1 render counter <layout> <0>
2n7wdj-o4dp5w.js:1 setup counter <layout>
2n7wdj-o4dp5w.js:1 init counter <template>
2n7wdj-o4dp5w.js:1 render counter <template> <0>
2n7wdj-o4dp5w.js:1 setup counter <template>
2n7wdj-o4dp5w.js:1 init counter <Page A>
2n7wdj-o4dp5w.js:1 render counter <Page A> <0>
0-mse_jlv685t.js:1 render room <general>
2n7wdj-o4dp5w.js:1 setup counter <Page A>
0-mse_jlv685t.js:1 connect room <general>

---

0-mse_jlv685t.js:1 render room <random>
0-mse_jlv685t.js:1 disconnect room <general>
0-mse_jlv685t.js:1 connect room <random>
|


## Conclusion

To be honest, at this point I still do not understand difference between layout and template. From log view seems like template do not share the same state between routes it has its own for each, because when we performed navigation from a to b route template counter became 0 and after going back it was 2 as at the start

Regarding strict mode I understood difference between dev and prod mode we do init/render/setup step twice and one cleanup state. And I checked how it works when we run our app in production mode (build + start)

Regarding our navigation manipulation
P1. If go from a to b and than back to a in that case state for a page remains the same
P2. Template has its own state for each page
P3. It updates all counters and fully rerun page setup
P4. It remains the same, so url parameters does not effect on template state, React sees it like the same page, but of cause you can do some extra stuff with use of url parameters
P5. It updates page fully like <a> but I forgot to check what do we have in logs in terminal
