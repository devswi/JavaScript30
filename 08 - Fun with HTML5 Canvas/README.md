# Day 08 Fun with HTML5 Canvas

第 8 天的练习是使用 HTML5 新增的 **Canvas**，创建一个简单的画板。画笔的颜色呈彩虹色渐变，画笔的粗细也会渐变循环。

> **Canvas** 和 iOS 开发中常用的 **Core Graphics** 有许多相似的地方。

在页面中使用 **Canvas**，只需要添加 `<canvas>` 标签即可。本例中，添加了如下标签

``` HTML
<canvas id="draw"></canvas>
```

JavaScript 中，通过 `querySelector('#draw')` 获取到 canvas 页面元素。接下来通过 `HTMLCanvasElement.getContext()` 方法获取上下文，这一点与 iOS 中的 `UIGraphicsGetCurrentContext()` 一样。不同的是 `HTMLCanvasElement.getContext()` 有两个可选参数，[具体解释](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/getContext)。下面简单列举一下 `contextType` 的属性

**上下文类型 contextType**

 * "2d"，创建一个 `CanvasRenderingContext2D` 对象，用于渲染二维图形的上下文
 * "webgl"，创建一个 `WebGLRenderingContext` 对象，用于渲染三维图形的上下文，只能用于浏览器实现 [WebGl](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) 版本1
 * "webgl2"，创建一个 `WebGL2RenderingContext` 对象，用于渲染三维图形的上下文，只能用于浏览器实现 [WebGl](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) 版本2
 * "bitmaprenderer"，创建一个 `ImageBitmapRenderingContext` 只提供功能去替换指定 `canvas` 的 `ImageBitmap` 内容

``` javascript
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#bada55';
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
```

通过 `window.innerWidth` 和 `window.innerHeight` 获取浏览器窗口的实际大小，重新定义 canvas 画布的大小。通过 `strokeStyle`、`lineCap`、`lineJoin` 分别设置线条的填充色、线条结尾的类型、线条相交拐点的类型。是不是很熟悉？`Core Graphics` 里都有相同的概念。

希望能够在鼠标按下之后开始绘制，并且在鼠标松开或离开窗口时停止绘制。所以定义了一个控制变量 `let isDrawing = false`。接下来定义事件的监听，在监听到 `"mousedown"` 时，将 **isDrawing** 置为 `true`。监听到 `"mouseup"` 和 `"mouseout"` 时，将 **isDrawing** 置为 `false`。

``` javascript
// 监听到鼠标按下事件时，isDrawing 置为 true
canvas.addEventListener('mousedown', (event) => [isDrawing, lastX, lastY] = [true, event.offsetX, event.offsetY]);
// 监听到鼠标松开事件时，isDrawing 置为 false
canvas.addEventListener('mouseup', () => isDrawing = false);
// 监听到鼠标离开屏幕事件时，isDrawing 置为 false
canvas.addEventListener('mouseout', () => isDrawing = false);
```

> 在 `"mousedown"` 事件中，记录了鼠标按下时的坐标，并以这个点作为图形绘制的起点

通过对 `"mousemove"` 事件的监听，来实时绘制鼠标轨迹图形。

``` javascript
canvas.addEventListener('mousemove', draw);
```

接下来看一下 `draw` 方法。

``` javascript
function draw(e) {
    if (!isDrawing) return;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath(); // 开始绘图
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
    // lastX = e.offsetX;
    // lastY = e.offsetY;

    hue++;
    if (hue >= 360) {
        hue = 0;
    }
    
    if (ctx.lineWidth >= 50 || ctx.lineWidth <= 1) {
        direction = !direction;
    }
    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
}
```

这里的颜色使用 [Colors HSL](https://www.w3schools.com/colors/colors_hsl.asp) 和 HSB 的概念一样，只是 HSL 中最后的亮度用了 *lightness* 而 HSB 中最后的亮度用了 *brightness*。

`beginPath()` 清空字路径列表开始一个新的路径。当创建一个新路径之前，调用此方法。`moveTo(x, y)` 将新路径的起点移动到 (x, y) 坐标。`lineTo(x, y)` 使用直线连接子路径最后的坐标到 (x, y)。`stroke()` 对线条进行颜色填充。


