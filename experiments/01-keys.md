I do this experiment to understand why we use key prop in list and what it actually do

We can use it in two ways:
1. by passing index

We can use this approach when we have static list that will not be changed in future. So, we do not do any delete, insert on sort operation.

What will happen with the list if we try to do that. Lets imagine that we have 3 elements in array and we want to delete middle one. In this case last element will have another index. It will be changed from 3 to 2, and React will think that second element with key 2 have not changed and my use old values from old second element. React works in that way that he relate component and its state and use key to identify that component.

2. by passing value that fully identify element in the list

By passing some strong identifier we help React to recognize change in right way and do correct update and re-render

## Що побачив після реалізації
| Режим | Підпис і текст у рядках після видалення | Що видно в консолі (mount/unmount) |
|---|---|---|
| `key={index}` | якщо ми для середнього інпута введемо якийсь вміст і видалимо його, то останній елемент, який став середнім також має такий самий інпут, як і попередній останній елемент | в тексті видалення я бачу, що, при видаленні першого елемента, у виводі маємо анмоут останнього елемента |
| `key={id}` | тут також все чітко, якщо ввели якесь значення, то коли видаляємо якийсь інпут, то лейбл з відповідним інпутом видаляється | тут чітко видно, що який елемент видаляємо, то для такого елемента ачимо вивід анмаунта|

| Режим | Підпис і текст у рядках після видалення | Що видно в консолі (mount/unmount) |
|---|---|---|
| `key={index}` | Key mode is `index`
Bф  Delete
C Delete
ResetSwitch key mode | mount:  a-123
mount:  b-123
mount:  c-123
unmount:  c-123 |
| `key={id}` | Key mode is `id`
B Delete
C Delete
ResetSwitch key mode | mount:  a-123
mount:  b-123
mount:  c-123
unmount:  a-123 |

In conclusion, what can I say, we can use index for a key prop if we have static list, we will not do any operation of deleting, inserting and sorting. In other case, we should not use index as a key because in that situation React will no be able to identify which component it should update, also it can reuse state from wrong component to other
