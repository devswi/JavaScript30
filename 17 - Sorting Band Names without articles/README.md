# Day 17 Sorting Band Names without articles

今天的练习是对数组的排序练习，特别的是需要去除字符串开头的 **a an the** 之后进行排序。

去除 **a an the** 的操作放到了一个 function 里，代码如下 

``` javascript
function strip(str) {
    return str.replace(/^(a |an |the )/i, '').trim();
}
```

`String.prototype.replace()` 接收两个参数，第一个参数可以是一个 *正则表达式* 或者 *待替换的子字符串*，第二个参数为 *新字符串* 或者 *函数*，返回替换后的新的字符串。

通过 `Array.prototype.sort()` 排序后，通过 map 方法，转换为 HTML 代码字符串，插入 HTML 代码中。
