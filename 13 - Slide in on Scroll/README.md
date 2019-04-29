# Day 13 Slide in on Scroll

第十三天的练习是实现页面滚动过程中，滑动到图片位置时，图片从左右伴随动画进入。

[Preview](http://htmlpreview.github.io/?https://github.com/shiwei93/JavaScript30/blob/master/13%20-%20Slide%20in%20on%20Scroll/index.html)

## Key Point

 * 监听滚动事件
 * 计算图片出现的位置，添加动画

详细代码如下 

``` javascript
const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide(e) {
    sliderImages.forEach((sliderImage) => {
        // half way through the image
        const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
        // bottom of the image
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;
        if (isHalfShown && isNotScrolledPast) {
            sliderImage.classList.add('active');
        } else {
            sliderImage.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', debounce(checkSlide));
```

本次练习的难点在于图片滑动出现的计算。

首先在滚动到图片一半的位置时，出发显示动画，`const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;`

 * `window.innerHeight` 表示浏览器内部视图窗口的高度
 * `window.scrollY` 表示当前页面在 Y 轴的滚动距离。

接下来获取图片底部到页面文本顶端的距离 `const imageBottom = sliderImage.offsetTop + sliderImage.height;`。`sliderImage.offsetTop` 表示图片最顶端的值，加上图片高度，就是图片底部到页面文档顶端的距离了

``` javascript
const isHalfShown = slideInAt > sliderImage.offsetTop;
const isNotScrolledPast = window.scrollY < imageBottom;
if (isHalfShown && isNotScrolledPast) {
    sliderImage.classList.add('active');
} else {
    sliderImage.classList.remove('active');
}
```

设置两个变量，分别表示图片是否显示一半和图片是否已经全部滚动出去，当两个条件都满足时，添加图片出现动画，否则从 img 元素的 `classList` 中移除动画。
