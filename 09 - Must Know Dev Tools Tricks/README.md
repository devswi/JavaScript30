# Day 09 Must Know Dev Tools Tricks

第九天的练习，是熟悉一些浏览器调试的小技巧。

## 页面添加断点

按下 F12 打开 Chrome 的开发者工具，在 Elements 选项卡中，选择某个标签，右键，**Break On** 下的 **attribute modifications**。就可以为该页面元素添加断点。在本例中 `<p onClick="makeGreen()">xBREAKxDOWNx</p>` p 标签添加了 `onClock` 事件，并执行 `makeGreen()` 方法。添加断点之后就可以在点击时，跳转到 `makeGreen()` 函数中。

## Console

### Console.log()

除了直接传入字符串打印外，还可以格式化字符串打印，例如

Format|Description
:---|:---
%s|字符串
%f|浮点数
%o|对象
%d|整数
%c|设定输出样式

列举一个不曾见过的 **%c** 的例子，

``` javascript
console.log('%cThis is a string which has different style.', 'color: #00ffff; font-size: 2rem');
```

在 Chrome 中，打印的结果如图所示 ![format](https://res.cloudinary.com/dxe4zc5py/image/upload/v1556158117/Blog/console-format.png)

### Warning/Error/Info

``` javascript
// Warning
console.warn('Whoops!');

// Error
console.error('Shit!');

// Info
console.info('OH some information!');
```

打印结果为 ![warning/error/info](https://res.cloudinary.com/dxe4zc5py/image/upload/v1556158826/Blog/console-warn-error-info.png)

> console.info() 的打印结果前面的 (i) icon 去哪了？
> 
> 看这个 [issue](https://bugs.chromium.org/p/chromium/issues/detail?id=714235)

### console.assert()

与 Swift 中的断言相同，当条件不为 true 时，就会抛出错误并打印出设置的显示信息

### clearing

`console.clear()` 可以清除控制台的打印的信息。

### 查看 DOM 元素

在获取了 DOM 元素后，可以直接打印输出

 * `console.log()` 输出了 DOM 的 HTML 标签
 * `console.dir()` 输出了 DOM 元素的属性列表

``` javascript
const p = document.querySelector('p');
console.dir(p);
console.log(p);
```

上述代码的执行结果如下图

![dir-and-log](https://res.cloudinary.com/dxe4zc5py/image/upload/v1556159455/Blog/log-and-dir.png)

### 分组打印

分组打印可以在遍历集合类型时，美化在控制台的显示效果，例如如下的代码片段

``` javascript
dogs.forEach(dog => console.log(`${dog.name} is ${dog.age * 2} years old.`));

dogs.forEach((dog) => {
    console.group(`${dog.name}`); 
    console.log(`${dog.name} is ${dog.age * 2} years old.`);
    console.groupEnd(`${dog.name}`);
});
```

在 Chrome 的 Console 中打执行结果如下 ![console-group](https://res.cloudinary.com/dxe4zc5py/image/upload/v1556159774/Blog/console-group.png)

### console.count() 计数

通过 console.count() 可以对输出对象进行计数。

### console.time() 计时

通过 `console.time('name')` 和 `console.timeEnd('name')` 控制计时的开始点和结束点。

> 传入 `time()` 的名称**必须保持一致**。

例如可以使用 `console.time()` 计算网络请求返回的事件。

``` javascript
console.time('fetch github data');
fetch('https://api.github.com/users/shiwei93')
    .then(data => data.json())
    .then((json) => {
        console.timeEnd('fetch github data');
        console.log(json);
    });
```

等待接口返回之后，在控制台就会打印出 **fetch github data: 1570.6181640625ms**