# Day 16 CSS Text Shadow Mouse Move Effect

今天的练习实现了一个鼠标移动修改文字阴影的效果。通过添加 `'mousemove'` 监听鼠标移动事件，计算鼠标移动的距离与阴影偏移的关系，修改文字阴影样式即可。

代码实现如下

``` javascript
const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
const walk = 500; // 100px

function shadow(e) {
    const { offsetWidth: width, offsetHeight: height } = hero;
    let { offsetX: x, offsetY: y } = e;

    if (this !== e.target) {
        x += e.target.offsetLeft;
        y += y + e.target.offsetTop;
    }

    const xWalk = Math.round((x / width * walk) - (walk / 2));
    const yWalk = Math.round((y / height * walk) - (walk / 2));

    text.style.textShadow = `
        ${xWalk}px ${yWalk}px 0 rgba(255, 0, 255, 0.7),
        ${xWalk * -1}px ${yWalk}px 0 rgba(0, 255, 255, 0.7),
        ${yWalk}px ${xWalk * -1}px 0 rgba(0, 255, 0, 0.7),
        ${yWalk * -1}px ${xWalk}px 0 rgba(0, 0, 255, 0.7)
    `;
}

hero.addEventListener('mousemove', shadow);
```

实现代码中 `const { offsetWidth: width, offsetHeight: height } = hero;` 这样的实现，被称之为解构赋值，[参考文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)。
