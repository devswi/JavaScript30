# Day 01 Drum Kit

使用 JavaScript 实现爵士鼓的页面，通过敲击键盘上对象的按键，来播放不同的音调。

## 技术要点

- 事件监听
- 音频播放
- CSS 动画的添加与移除
- CSS 区别 px/em/rem

## 事件监听

监听全局的事件通过在 **window** 上添加事件监听，为了监听键盘的输入事件，需要监听 `"keydown"`。`addEventListener` 传递的第一个参数为需要监听的事件类型，第二个参数，传递接收事件回调的函数。

为了能够在相应按键的动画结束后移除添加的动画属性，需要监听 `"transitionend"` 事件，通过 `querySelectorAll` 可以选出所有满足条件的元素。

``` javascript
const keys = Array.from(document.querySelectorAll('.key')); // 选出所有属性包含 key 的元素
```

之后通过 `forEach` 遍历 `key` 添加事件监听，这里使用了箭头函数，优化了代码结构。例如

``` javascript
array.map(x => x * 2); // 使用箭头函数可以优化代码结构，增强代码的可读性
```

## 音频播放

页面中，通过 `data-key` 将页面元素与 `audio` 绑定起来。`data-key` 属于 `data-*` 一类的自定义属性。[参考资料]([similar](https://html.spec.whatwg.org/dev/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes))

> Custom data attributes are intended to store custom data, state, annotations, and similar, private to the page or application, for which there are no more appropriate attributes or elements.

简单说就是，当没有合适的属性或元素可以来存储自定义的数据、状态、声明等数据时，可以使用自定义的 `data-*` 属性。

``` javascript
const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
```

通过当前键盘按键的 **keyCode** 通过 `querySelector` 获取相应的 **audio** 标签，[可以在这里找到键盘按键的 keyCode](http://keycode.info/)。通过 ES6 的模板字符串 `${event.keyCode}`，可以动态的传入 keyCode。**Attention:** 模板字符串必须使用 **`** 包裹，而不是使用 **"**。

通过 `audio.play()` 播放相对应的音频，注意到上一行的 `audio.currentTime = 0`，重置了音频的播放时间，这是因为，如果当前有音频播放，多次调用 `audio.play()` 不会起作用。

## CSS 动画的添加与移除

当我们获取到需要添加的 CSS 样式的标签时，可以通过 `Element.classList.add()` 以及 `Element.classList.remove()` 来添加和移除动画。

``` javascript
function removeTransition(event) {
    if (event.propertyName !== 'transform') return; // skip it if it's not a transform 如果不是一个 transform 就忽略它
    this.classList.remove('playing') // 移除了添加的 playing 样式
}
```

> 如果无法确定 `this` 指代的什么，那就打印它

## CSS 区别 px/em/rem 

刚刚接触前端，在之前看到的教程中，像素单位大多使用 *px*。在 **JavaScript 30** 看到了 **rem** 单位，查阅了一些资料，整理如下。

### 区别

  - **px** 在缩放页面时无法动态调整
  - **em** 值不固定，相对于父级元素的大小，表示倍数
  - **rem** 值不固定，始终基于根元素 `<html>` 的大小，表示倍数


由于 em 是相对于父级字体的倍数，所以在多层嵌套内容时，使用 em 分别给它们设置字体大小时，往往需要重新计算。例如

``` html
<span>Outer <span>Innter</span> Outer</span>
```

``` css
span { font-size: 1.6em; }
```

结果是，外层 `span` 中的字体大小基于父级 `body` 标签字体大小的 1.6 倍，内层的 `span` 标签字体大小又基于外层的 `span` 标签，即 `body` 字体大小的 1.6 * 1.6 倍。WTF！！！

**rem** 的出现，完美的解决需要重复计算的问题，因为它始终基于根元素 `<html>`

> r (root) em

**Attention:**

为了兼容不支持 rem 的浏览器，需要在使用了 rem 的地方前面，写上对应的 px 值，不支持的浏览器也可以降级使用。

## 资源网站

 1. [查阅浏览器兼容性](https://caniuse.com/)
