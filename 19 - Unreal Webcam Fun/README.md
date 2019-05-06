# Day 19 Unreal Webcam Fun

今天的练习是使用摄像头，实时记录，并通过 canvas 实时绘制到画布中。

通过 `Media​Devices​.get​User​Media()` 方法，在通过授权之后，可以获取摄像头图像。具体代码如下  

``` javascript
navigator.mediaDevices.getUserMedia({ video: true, audio: false})
    .then((videostream) => {
        console.log(videostream);
        video.srcObject = videostream;
        video.onloadedmetadata = function() { 
            video.play();
        };
    })
    .catch((error) => {
        console.error('OH, Don\'t have permission to use your local cam!', error);
    });
```

<!--- more --->

通过授权之后，返回一个 promise 对象，将返回值通过 `HTMLMedia​Element​.src​Object` 传入 video 中，可以在 video 标签中实时播放摄像头获取到的头像。`srcObject` 属性可以接收一个 `MediaStream`，一个 `MediaSource`，一个 `Blob` 或一个 `File` 对象。当资源文件的元数据加载完成时，就会调用 `Global​Event​Handlers​.onloadedmetadata` 参数，示例中传入了一个 function，用来开始播放视频。

给 video 标签添加 `'canplay'` 事件监听，`video.addEventListener('canplay', printToCanvas);`，当视频可以播放时，调用 `printToCanvas` 方法，绘制到 canvas 画布中。来看一下 `printToCanvas` 方法的代码实现

``` javascript
function printToCanvas() {
    const { videoWidth: width, videoHeight: height} = video;
    canvas.height = height;
    canvas.width = width;
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);

        let imagedata = ctx.getImageData(0, 0, width, height);

        // imagedata = redEffect(imagedata);
        imagedata = rgbsplit(imagedata);
        // ctx.globalAlpha = 0.2;

        // imagedata = greenScreen(imagedata);

        ctx.putImageData(imagedata, 0, 0);
    }, 16);
}
```

首先通过解构赋值获取视频组件的宽高，**注意**，一定要设置 canvas 画布的宽高。接下来在 `setIntervale()` 中甚至重复时间的间隔为 16ms 即屏幕每次刷新的时间间隔，达到绘制摄像头每一帧图像的目的。

 1. `ctx.drawImage()` 将视频流绘制到 canvas 中
 2. `ctx.getImageData()` 返回一个 `ImageData` 对象，用来描述 canvas 区域隐含的像素数据，这个区域通过矩形表示，起始点为 (sx, sy)、宽为 sw、高为 sh。[文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/getImageData)
 3. `ctx.putImageData()` 是 Canvas 2D API 将数据从已有的 `ImageData` 对象绘制到位图的方法。 如果提供了一个绘制过的矩形，则只绘制该矩形的像素。此方法不受画布转换矩阵的影响。[文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/putImageData)

## 拍照实现

``` javascript
function takePhoto() {
    snap.currentTime = 0;
    snap.play();

    let data = canvas.toDataURL('image/jpeg');
    let link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src=${data} alt=handsome>`;
    strip.insertBefore(link, strip.firstChild);
}
```

通过将 `HTMLCanvas​Element​.toDataURL()` 方法，获取当前 canvas 画布中的图像数据地址，接着新建一个 `a` 标签，并将其 href 属性设置为获取到的 canvas 画布图像数据的 URL。
