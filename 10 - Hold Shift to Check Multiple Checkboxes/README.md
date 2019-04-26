# Day 10 Hold Shift to Check Multiple Checkboxes

第 10 天啦，今天实现的是类似 Gmail 网页，按住 `Shift` 点选邮件，可以选中点选区间中的所有邮件。

[Preview](http://htmlpreview.github.io/?https://github.com/shiwei93/JavaScript30/blob/master/10%20-%20Hold%20Shift%20to%20Check%20Multiple%20Checkboxes/index.html)

## Key Point

这次的练习在 JavaScript 方面没有新增操作，主要是一个思路的实现。在 CSS 方面，接触了一些新的功能。

 * CSS Selector
 * JavaScript 实现思路

## CSS Selector

乍一看，好像是个新的概念，其实在之前用到过的 `::after` 伪元素，也是 CSS Selector 中的一种。

``` css
input:checked + p {
    background: #f9f9f9;
    text-decoration: line-through;
}
```

首先 `input:checked` 就是一个伪类，它选定了所有被选中的 `<input>` 标签。`input:checked + p` 又表示了，所有被选中的 `<input>` 标签下的**一个** `<p>` 标签。这样的 CSS 样式在 `<input>` 被选中后，`<input>` 和下面的 `<p>` 标签的背景色和文本修饰都会修改。

`text-decoration` 有三种样式，分别是 `overline`/`line-througe`/`underline`。[示例看这里](https://codepen.io/shiwei93/pen/LvMrwz)

下面列举了类似与 `input:checked + p` 的 Selector。

Selector|Example|Description
:---|:---|:---
element, element|div, p|选择所有 `<div>` 和 `<p>` 元素
element element|div p|选择所有 `<div>` 标签内部的 `<p>` 标签
element > element|div > p|选择所有 `<div>` 的一级子标签中的 `<p>` 标签
element ~ element|p ~ ul|选择所有 `<p>` 下面的第一个 `<ul>` 标签

## JavaScript 实现思路

第一步 `querySelectorAll()` 选择所有 `class` 为 `.inbox` 的标签下，所有 type 为 `"checkbox"` 的 `<input>` 标签，之后依次添加事件监听。

``` javascript
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));
```

第二步，在点击事件响应的方法中，通过变量 `let lastChecked` 保存最近一次选中的 **checkbox**。通过遍历所有的 **checkbox**，如果遍历到的 checkbox 是保存的最后一个，或者是当前选中的这个，则通过另一个变量 `inBetween` 来记录。即，当选中一个之后 `inBetween` 置为 true，再次有选中时 `inBetween` 置为 false。来看具体代码

``` javascript
let lastChecked;

function handleCheck(e) {
    let inBetween = false;

    if (e.shiftKey && this.checked && lastChecked && lastChecked.checked) {
        checkboxes.forEach((checkbox) => {
            if (checkbox === this || checkbox === lastChecked) {
                inBetween = !inBetween;
            }

            if (inBetween) {
                checkbox.checked = true;
            }
        });
    }

    if (this.checked) {
        lastChecked = this;
    }
}
```
