# Day 02 CSS + JS Clock

使用 CSS + JS 实现的时钟，实时显示当前的时间。这里没有仿照 JavaScript 30 的样式制作，而是选择了 [这篇](https://cssanimation.rocks/clocks/) 进行了一些简化和修改。

## 技术要点

时钟的项目，技术难点不在 JavaScript 中，实际 JavaScript 涉及的内容并不多。主要的代码和 [Day 01 Drum Kit](https://github.com/shiwei93/JavaScript30/tree/master/01%20-%20Drum%20Kit) 类似，需要注意的是秒针在 59s 到 0s 时切换。由于为了实现更自然的秒针移动效果，动画使用了贝塞尔曲线，并设置了动画时间 `transition: all .2s cubic-bezier(0.4, 2.08, 0.55, .44)` 会导致秒钟角度从 354&deg; 切换到 0&deg; 时由于动画时长的 0.2s 会有在 0.2s 内指针旋转一周的问题。解决方式如下

``` javascript
const container = document.querySelector(`.${hand.hand}-keyframes`);
if (hand.hand === 'seconds') {
    container.style.transition = 'all ' + (hand.angle === 0 ? 0 : 0.2) + 's cubic-bezier(0.4, 2.08, 0.55, .44)';
}
```

当判断到秒钟指针时，如果角度为 0&deg; 时，修改动画时长为 0s，否则修改动画时长为 0.2s。

第二点就是新接触到的 CSS 的伪元素。为了区分伪类和伪元素，CSS 3 中伪元素使用双冒号写法。

> element:after { style properties } /* CSS 2*/
> 
> element::after { style properties } /* CSS 3*/
>
> 为了向下兼容，推荐使用的单引号

那么问题来了，什么是伪类呢？

### 伪类

CSS 伪类 是添加到选择器的关键字，指定要选择的元素的特殊状态。例如，:hover 可被用于在用户将鼠标悬停在按钮上时改变按钮的颜色。伪类又可以分为 **状态伪类** 和 **结构化伪类**，[伪类与伪元素的一些简单示例](https://codepen.io/shiwei93/pen/LvmVgV)

#### 状态伪类

状态伪类通常出现在用户执行某个操作的情况下。伪类的语法结构为

``` CSS
selector:pseudo-class {
  property: value;
}
```

类似于普通的类，你可以在一个选择器中同时一起写多个伪类，下表列举了部分状态伪类

pseudo-class|作用
:----|:----
:link|链接未点击之前的状态
:visited|链接被点过之后的状态
:hover|鼠标移动到元素上时的状态
:active|与 `:focus` 类似，但只发生在鼠标被按下到被释放的这段时间里
:focus|选择已获取焦点的元素，常用与表单

#### 结构化伪类

结构化伪类大多见名知意，下面就简单举个例子。

``` html
<ul>
  <li>This line 1</li>
  <li>This line 2</li>
  <li>This line 3</li>
</ul>
```

例如，我们希望第一行文本的颜色是 orange，第二行是 green，第三行是 red。使用伪类时，就可以通过如下的样式实现

``` css
li:first-child {
  color: orange;
}

li:last-child {
  color: red;
}

li:nth-child(2) {
  color: green;
}
```

### 伪元素

伪元素是一个附加至选择器末的关键词，允许你对被选择元素的特定部分修改样式。与 `::after` 类似的是 `::before`，用于在 CSS 渲染中向元素逻辑上的头部和尾部添加内容。这些添加不会出现在 DOM 中，不会改变文档内容，不可复制，仅在 CSS 渲染层加入。所有应当避免在 `::before` 和 `::after` 中展示有实际意义的内容，而只用来显示修饰性的内容。

pseudo-element | 作用 | 注意事项
:----|:---|:----
::before|向元素逻辑上的头部添加内容| 需要声明 `content` 属性
::after|向元素逻辑上的尾部添加内容| 需要声明 `content` 属性
::backdrop|与伪类 `:fullscreen` 连用，修改全屏后元素的背景色|必须使用双冒号(EXPERIMENTAL)
::first-letter|匹配元素中文本首字母，被修饰的首字母不在 DOM 中|
::first-line|匹配元素中第一行的文本|只能用在 `display: block` 的元素中
::placeholder|匹配占位符文本，只有元素设置了 `placeholder` 属性才会生效|实现不是 CSS 标准，慎用
::selection|匹配被选中高亮的部分|必须使用双冒号

### 伪元素使用单冒号还是双冒号

这个问题，引用 w3c 标准的描述

> Please note that the new CSS3 way of writing pseudo-elements is to use a double colon, eg a::after { … }, to set them apart from pseudo-classes. You may see this sometimes in CSS. CSS3 however also still allows for single colon pseudo-elements, for the sake of backwards compatibility, and we would advise that you stick with this syntax for the time being.

### 参考资料

 1. [伪元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-elements)
 2. [伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)