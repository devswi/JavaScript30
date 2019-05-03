# Day 15 LocalStorage and Event Delegation

第 15 天的练习是使用 LocalStorage 实现的类似 Todo List 的 web 页面。效果如下，[Preview](http://htmlpreview.github.io/?https://github.com/shiwei93/JavaScript30/blob/master/15%20-%20LocalStorage%20and%20Event%20Delegation/index.html)

JavaScript 中的 LocalStorage 类似于 iOS 开发中使用的 UserDefaults，用于存储本地数据。提供了如下 API。

 * `localStorage.setItem('key', value)`
 * `localStorage.getItem('key')`
 * `localStorage.clear()`
 * `localStorage.removeItem('key')`

> 与 UserDefaults 不同的是 localStorage 中只能存储字符串，因此这里使用了 `JSON.stringify()` 方法将 Object 转换成字符串，再使用 `JSON.parse()` 将字符串转成 Object。

声明 JavaScript 的 Object 时，ES6 提供了一个简写形式，

``` javascript
const item = {
    text,
    done: false
};
```

上面的代码与下面的代码一样

``` javascript
const item = {
    test: text,
    done: false
};
```
