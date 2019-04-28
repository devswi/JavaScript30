# Day 11 Custom Video Player

断了一天，甚是罪恶😆。今天是实现一个自定义的视频播放器。实现视频的播放、暂停、进度条托拽更新、音量加减、倍速播放、快进快退等功能。

[Preview](http://htmlpreview.github.io/?https://github.com/shiwei93/JavaScript30/blob/master/11%20-%20Custom%20Video%20Player/index.html)

## Key Point

功能实现大概分成了三个部分

 * 页面元素绑定
 * 事件监听
 * 功能实现

## 页面元素绑定

使用前面提到过的 `querySelector()` 和 `querySelectorAll()` 方法，将变量和页面元素进行绑定。代码如下 

``` javascript
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
```

## 事件监听

`video` 元素需要监听 `click`、`play`、`pause` 以及 `timeupdate` 事件，用来监听播放器页面的点击事件实现暂停/播放的快速切换，`play` 与 `pause` 事件来修改播放按钮，`timeupdate` 来修改视频的播放进度条。

``` javascript
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
```

播放暂停按钮监听了 `'click'` 事件，快进快退按钮也同样监听 `'click'` 事件，音量调节和倍速播放组件，需要监听 `'mousemove'` 和 `'change'`。

``` javascript
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
```

视频进度条组件监听了 `'click'`、`'mousemove'`、`'mousedown'` 和 `'mouseup'` 事件。这里为了事件只在鼠标按下时才会修改播放进度，添加了一个变量 `mousedown`，在 `'mousemove'` 的事件监听回调中，传如的箭头函数中用到了 `flag && func()` 的使用方式，在 flag 变量为 true 时，执行 func 方法。当 flag 为 false 时，直接返回。

``` javascript
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
```

## 功能实现

``` javascript
// 视频播放/暂停
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

// 更新播放按钮
function updateButton() {
    toggle.textContent = this.paused ? '►' : '❚ ❚';
}

// 快进与快退
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

// 音量调节与倍速播放
function handleRangeUpdate() {
    video[this.name] = this.value;
}

// 播放进度调整
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

// 进度条托拽
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
```
