# Day 06 Type Ahead

第 6 天的练习，查找含有输入字符的美国城市或者州名。[数据接口](https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json)

## 技术要点

 * 数据请求 - fetch / promise
 * 数据处理 - 正则 / filter
 * 数据展示

### 数据请求

Fetch API 提供了一个获取资源的接口，用于替代传统的 XMLHttpRequest 技术。

> Ajax 技术基于 XMLHttpRequest

`fetch()` 方法必须接受一个参数 (资源路径)。无论请求成功还是失败，都会返回一个 `Promise` 对象。对！和 iOS 中的 `PromiseKit` 类似，可以使用 `then` 来处理请求结果。

``` javascript
fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));
```

> Tips
>
> 如果忘记了对象包含哪些方法，除了查阅文档，还可以在浏览器中打印这个对象值，在控制台中 **__proto__** 中查看原型属性。

`cities.push(...data)` 的使用方式是 ES6 添加的特性 --- [展开语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)。引用中文翻译，可以在函数调用/数组构造时, 将数组表达式或者 string 在语法层面展开；还可以在构造字面量对象时, 将对象表达式按 key-value 的方式展开。

### 数据处理

练习中使用到了 **RegExp** 来创建正则表达式对象，关于正则表达式的用法，不在这里的讨论范围之内。可以在代码中找到 `const regex = new RegExp(this.value, 'gi')` 初始化方法的第二个参数，传入了正则表达式的标志，进行高级搜索，下表列举了正则表达式的标志。

标志|描述
:---:|:---
g|全局搜索
i|不区分大小写搜索
m|多行搜索
y|执行 “粘性” 搜索，匹配从目标字符串的当前位置开始，可以使用 y 标志

包含一个标志的正则表达式，使用这个表达式：

``` javascript
var re = /pattern/flags;
```

或者

 ``` javascript
 var re = new RegExp("pattern", "flags");
 ```

 函数 `findMatches` 实现了对请求数据的匹配，完整代码如下

 ``` javascript
 function findMatches(wordToMatch, cities) {
    const regex = new RegExp(wordToMatch, 'gi');
    return cities.filter(place => place.city.match(regex) || place.state.match(regex));
}
 ```

 在传入 `filter` 的箭头函数中，通过 `String​.prototype​.match()` 来匹配与输入相同的城市名或州名，并过滤掉不符合的数据。

### 数据展示

通过对 **input** 标签的 `change` 和 `keyup` 事件的监听，实现了每输入一个字符都能在回调中获取到值。

``` javascript
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
```

接下来，看看主要的方法 `displayMatches` 如下

``` javascript
function displayMatches() {
    const matches = findMatches(this.value, cities);
    const html = matches.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`)
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`)
        return `
            <li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${numerWithCommas(place.population)}</span>
            </li>
        `
    }).join('');
    suggestions.innerHTML = html;
}
```

通过 `String.prototype​.replace()` 方法，第一个参数可以是一个字符串也可以是一个 **RegExp** 对象，第二个参数为想要替换的字符串。

之后通过 HTML DOM 的 `innerHTML` 属性，修改 HTML 内容。
