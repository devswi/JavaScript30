# Day 25 Event Capture, Propagation, Bubbling and Once

今天的练习是关于 JavaScript 的事件流，下面做一些扩展与整理。

## 事件流

**事件流**描述的是从页面中接收事件的顺序。IE 和 Netscape 团队提出了两种相反的事件流概念。IE 的事件流是事件冒泡流，而 Netscape 的事件流是事件捕获流。

## 事件冒泡

**事件冒泡**，即事件开始时由最具体的元素接收，然后逐层向上传播到较为不具体的节点。例如下面的代码

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Title</title>
</head>
<body>
    <div>Click Me!</div>
</body>
</html>
```

如果单击页面中的 `<div>` 元素，那么这个 click 事件会按照如下顺序传播：

 1. `<div>`
 2. `<body>`
 3. `<html>`
 4. `document`

## 事件捕获

**事件捕获**的思想是不太具体的节点应该更早的接收到事件，而具体的节点应该最后接收到事件。使用上文提到的例子，点击 `<div>` 元素时，事件的传播顺序就会变成

 1. `document`
 2. `<html>`
 3. `<body>`
 4. `<div>`

## DOM 事件流

“DOM2 级事件” 规定了事件流包括三个阶段

 1. 捕获阶段 `CAPTURING_PHASE`
 2. 目标阶段 `AT_TARGET`
 3. 冒泡阶段 `BUBBLING_PHASE`

我们可以通过事件对象的 `eventPhase` 属性，得知事件处于哪个阶段。

DOM 事件在传播时，会从根节点开始往下传递到 `target`，若注册了事件监听，则监听器处于捕获阶段，为截获事件提供了机会。

`target` 就是触发事件的具体对象，这时注册在 `target` 上的事件监听器处于目标阶段。

最后，事件再往上从 `target` 一路逆向传递到根节点，若注册了事件监听器，则监听器处于冒泡阶段，可以在这个阶段对事件作出响应。

以前面的 HTML 实例代码为例，单击 `<div>` 元素完整的事件流如下如所示

![图片来源于《JavaScript 高级程序设计》](https://res.cloudinary.com/dxe4zc5py/image/upload/v1557293001/Blog/281557292962_.pic.jpg)

在 DOM 事件流中，实际的目标 `<div>` 在捕获阶段不会接收到事件。这意味着在捕获阶段，事件从 document 到 `<html>` 再到 `<body>` 后就停止了。下一个阶段是**处于目标**阶段，于是事件在 `<div>` 上发生，并在事件处理中被看成冒泡阶段的一部分。然后冒泡阶段发生，事件又传回了 document。

## 事件处理

在今天的练习中，通过 `Event​Target​.add​Event​Listener()` 来添加事件监听。

### 语法

> *target.addEventListener(type, listener[, options]);*
>
> *target.addEventListener(type, listener[, useCapture]);*

方法接收三个参数

> **type**
>
> 表示需要监听的[事件类型](https://developer.mozilla.org/zh-CN/docs/Web/Events)
>
> **listener**
>
> 当所监听的事件类型触发时，接到一个事件通知对象。`listener` 必须是一个实现了 [`EventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventListener) 接口的对象，或者是一个函数。
>
> **options** 可选
>
>   1. `capture` 默认为 false，即事件只会在冒泡阶段才会被执行。若为 true，即事件在捕获阶段就会被执行
>   2. `once` 表示事件监听被添加后之后执行一次，默认为 false。如果被设置为 true，listener 在被调用后就会被移除。
>
> **useCapture** 可选
>
> 默认为 false，表示注册事件是冒泡事件。若为 true，则表示注册事件为捕获事件。

``` javascript
one.addEventListener('click', (e) => { 
            console.log("one capture mode", e.eventPhase);
}, true);
one.addEventListener('click', (e) => { 
   console.log("one bubble mode", e.eventPhase);
}, false);
two.addEventListener('click', (e) => {
   console.log("two capture mode 2");
}, true)
two.addEventListener('click', (e) => { console.log("two bubble mode", e.eventPhase); }, false);
three.addEventListener('click', (e) => { console.log("three capture mode", e.eventPhase); }, true);
three.addEventListener('click', (e) => { console.log("three bubble mode", e.eventPhase); }, false);
```

打印结果为

> one capture mode 1
> 
> two capture mode 1
> 
> three capture mode 2
> 
> three bubble mode 2
> 
> tow bubble mode 3
> 
> one bubble mode 3

且打印顺序不和事件注册顺序有关。

### 阻止事件冒泡

``` javascript
two.addEventListener('click', (e) => { 
   console.log("two capture mode", e.eventPhase);
   e.stopPropagation();
}, true);
```

通过 `stopPropagation()` 可以阻止事件的冒泡，也阻止了事件的继续捕获。但无法阻止同一个元素其他绑定事件的执行。

使用 `stopImmediatePropagation()` 即阻止了事件的继续传递，也阻止了同一个元素的其他绑定事件的执行。
