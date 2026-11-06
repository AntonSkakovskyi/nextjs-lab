I do this experiment to understand why we use key prop in list and what it actually do

We can use it in two ways:
1. by passing index

We can use this approach when we have static list that will not be changed in future. So, we do not do any delete, insert on sort operation.

What will happen with the list if we try to do that. Lets imagine that we have 3 elements in array and we want to delete middle one. In this case last element will have another index. It will be changed from 3 to 2, and React will think that second element with key 2 have not changed and my use old values from old second element. React works in that way that he relate component and its state and use key to identify that component.

2. by passing value that fully identify element in the list

By passing some strong identifier we help React to recognize change in right way and do correct update and re-render
