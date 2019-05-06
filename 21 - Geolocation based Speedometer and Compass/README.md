# Day 21 - Geolocation based Speedometer and Compass

[预览](http://htmlpreview.github.io/?https://github.com/shiwei93/JavaScript30/blob/master/21%20-%20Geolocation%20based%20Speedometer%20and%20Compass/index.html)

第 21 天的练习比较简单，通过 `NavigatorGeolocation.geolocation` 访问当前设备的位置信息。代码如下

``` javascript
const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');

navigator.geolocation.watchPosition((data) => {
console.log(data);
speed.textContent = data.coords.speed || '0';
arrow.style.transform = `rotate(${data.coords.heading}deg)`;
}, (error) => {
console.log(error);
});
```
