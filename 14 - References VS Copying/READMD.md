# References VS Copying

今天的练习是来了解一下 JavaScript 中关于引用与拷贝的问题。

## 值类型

在 JavaScript 中，**string**/**number**/**boolean**/**null**/**undefined** 等基本类型是值类型。例如下面的例子

``` javascript
let age = 100;
let age2 = age;
console.log(age, age2);
// 100 100
age = 200;
console.log(age, age2); 
// 200 100
```

值类型的变量，将一个变量赋值给另一个变量时，拷贝了当前变量。因此对原值的拷贝不会影响被赋值的变量。

## 引用类型

在 JavaScript 中，**Object**/**Function**/**Array**/**Set**/**Map** 等属于引用类型。同样在将一个变量赋值给另一个变量时，拷贝原始对象的地址。因此对原值的任何修改都会对被赋值的对象产生相同的改变。

``` javascript
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const team = players;
console.log(players, team);
players.push('Sze');
console.log(players, team);
```

在 console 中看到的打印结果如下 

![references](https://res.cloudinary.com/dxe4zc5py/image/upload/v1556721420/Blog/references-array.png)

对与数组的拷贝可以通过如下方式实现

``` javascript
// 数组的拷贝可以使用 slice() 方法
const team2 = players.slice();
// Or
const team3 = [].concat(players);
// Or
const team4 = [...players];
// Or
const team5 = Array.from(players);
```

对于对象类型的拷贝可以通过 `Object.assign()` 方法实现，例如

``` javascript
const person = {
    name: 'sze wei',
    age: 26,
};

// Correct
const cap2 = Object.assign({}, person, { numebr: 99, age: 12 });
console.log(cap2);
```

这样看来好像确实拷贝了 *person* 对象，对如果改写一下 *person* 对象的结构

``` javascript
const wes = {
    name: 'wes',
    age: 100,
    social: {
        twitter: '@wesbos',
        facebook: 'wesbos.developer'
    }
};
```

此时再次使用 `const dev = Object.assign({}, wes);` 进行拷贝后，修改 `dev.social.twitter: '@cool'` 后，会发现原值 `wes.social.twitter` 的值也被修改了。因为 `Object.assign()` 只会拷贝最上层的属性。视频中提到了一个小技巧，可以拷贝所有对象。

``` javascript
const dev2 = JSON.parse(JSON.stringify(wes));
```

代码其实很容易理解，首先将对象通过 `JSON.stringify()` 方法转为字符串，之后再使用 `JSON.parse()` 方法转成新的对象。
