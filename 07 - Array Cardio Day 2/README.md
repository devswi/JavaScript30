# Day 07 Array Cardio Day 2

今天的练习是关于 JavaScript 数组的第二次练习。这次主要涉及 JavaScript 数组的如下 API。

 * `Array.prototype.some()`
 * `Array.prototype.every()`
 * `Array.prototype.find()`
 * `Array.prototype.findIndex()`

给定如下测试数据

``` javascript
const people = [
    { name: 'Wes', year: 1988 },
    { name: 'Kait', year: 1986 },
    { name: 'Irv', year: 1970 },
    { name: 'Lux', year: 2015 }
];

const comments = [
    { text: 'Love this!', id: 523423 },
    { text: 'Super good', id: 823423 },
    { text: 'You are the best', id: 2039842 },
    { text: 'Ramen is my fav food ever', id: 123523 },
    { text: 'Nice Nice Nice!', id: 542328 }
];
```

### `Array.prototype.some()`

类比 Swift 集合类型中的 `contains(where:)` 方法，用来判断数组中是否包含特定条件的 element。例如，查找 **people** 数组中是否包含 19 岁以上的成年人，答案如下

``` javascript
const isAdult = people.some(person => (new Date()).getFullYear() - person.year >= 19);
```

### `Array.prototype.every()`

类比 Swift 4.2 新增的 `allSatisfy(_:)` 方法，用来判断数组中是否所有元素都满足特定的条件。例如，**是否所有人的年龄都大于 19 岁**

``` javascript
const isAnybodyAdult = people.every(person => (new Date()).getFullYear() - person.year >= 19);
```

说实话，Swift 这个 `allSatisfy` 方法名，都 Swift 5.0 我才第一次知道这个方法。

### `Array.prototype.find()`

类比 Swift 中的 `first(where:)` 方法，返回第一个满足条件的数组元素。例如，**找出 ID 为 823423 的评论**。

``` javascript
const comment = comments.find(comment => comment.id === 823423);
```

### `Array.prototype.findIndex()`

类比 Swift 中的 `firstIndex(where:)` 方法，都返回了第一个满足条件的数组元素的下标。例如，**找到并删除 ID 为 823423 的评论**。

``` javascript
const index = comments.findIndex(comment => comment.id === 823423);
```

通过 `slice()` 方法，分割数组，通过上一天的练习提到的[展开语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)，展开数组，创建新的数组。
