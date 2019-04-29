# Day 12 Key Sequence Detection

第十二天实现了一个键盘事件监听，当输入了特定字符串后，在页面上添加一些特殊效果。

## Key Point

 * 全局绑定 `'keyup'` 事件，通过 `e.key` 获取用户输入
 * 截取与 `secretCode` 相同长度的用户输入字符串，比较两者，相同出发添加效果

``` javascript
const pressed = [];
const secretCode = 'jerry';

window.addEventListener('keyup', (e) => {
    console.log(e.key);
    pressed.push(e.key);
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
    if (pressed.join('').includes(secretCode)) {
        console.log('DING DING!');
        cornify_add();
    }
    console.log(pressed);
});
```

截取字符串操作，对用户输入的按键字符数组用到了 `Array.prototype.splice()` 方法，第一个参数传入了需要删除的起始位置下标，如果设置了负数就表示从后往前删除。第二个参数传入的是需要删除的长度。示例如下

``` javascript
var months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb', 'August');
// inserts at 1st index position
console.log(months);
// expected output: Array ['Jan', 'Feb', 'August', 'March', 'April', 'June']

months.splice(4, 1, 'May');
// replaces 1 element at 4th index
console.log(months);
// expected output: Array ['Jan', 'Feb', 'March', 'April', 'May']
```
