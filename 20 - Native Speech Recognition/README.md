# Day 20 Native Speech Recognition

第 20 天的练习是利用浏览器的 `Speech​Recognition` 方法，识别语音输入展示到页面中。[预览](http://htmlpreview.github.io/?https://github.com/shiwei93/JavaScript30/blob/master/20%20-%20Native%20Speech%20Recognition/index.html)

## 主要参考点

 1. 根据浏览器兼容性，初始化相应的 `Speech​Recognition`
 2. 监听识别结果事件，显示到页面中

## 初始化 Speech​Recognition

之前的练习中提到 Javascript 中 `||` 的特殊用法，于是依据浏览器兼容性，初始化代码可以这么写 

``` javascript
const recognition = new webkitSpeechRecognition() || new SpeechRecognition();

recognition.interimResults = true;
```

`interimResults` 的作用是控制识别结果是否返回，如果设置为 true，则会一直返回识别结果。

## 事件监听

本例中，主要监听 `'result'` 事件，即当有识别结果，就会执行传入的函数方法

``` javascript
recognition.addEventListener('result', (e) => {
   const results = Array.from(e.results)
       .map(result => result[0])
       .map(result => result.transcript)
       .join('');

   const poopScript = results.replace(/good/gi, '👍');
   p.textContent = poopScript;

   if (e.results[0].isFinal) {
       p = document.createElement('p');
       words.appendChild(p);
   }
});
```

事件传入的 event 有 `results` 字段表示了识别的结果，通过 `Array.from()` 转换为数组。当 `e.results[0].isFinal` 为 true 时，表示一句话识别完成，这时将处理好的 HTML 代码插入 DOM 中。
