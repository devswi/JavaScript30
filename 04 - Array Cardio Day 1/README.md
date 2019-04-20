# Array Cardio Day 1

这次的练习是 JavaScript 的数组练习。

**Q1 过滤出出生于 16 世纪的发明家**

**Answer**
``` javascript
const fifteen = inventors.filter(inventor => inventor.year >= 1500 && inventor.year < 1600);
```

JavaScript 的 `filter` 用法与 Swift 中集合类型的 `filter` 使用方法一样，需要保留的数据返回 `true` 既可。

> JavaScript 中提供了 `console.table` 方法，通过表格的样式打印出表格化的数据

**Q2 获取所有发明家的姓和名**

**Answer**

``` JavaScript
const fullNames = inventors.map(inventor => `${inventor.first} ${inventor.last}`);
```

JavaScript 的 `map` 用法与 Swfit 中的 `map` 使用方法也是一致的。通过参数中的 *callback* 方法，将原数组中的数据通过传入的方法做处理之后返回。

**Q3 根据出生年月进行排序。年长到年轻**

**Answer**

``` javascript
const ordered = inventors.sort((left, right) => left.year > right.year ? 1 : -1);
```

`sort` 方法与 Swift 中的同名方法，在返回值上略有区别。Swift 中返回值类型为 `Bool` 类型，在 JS 中，**如果期望排序后第一个参数出现在第二个参数前，则返回负数**。

**Q4 算出所有发明家年龄之和**

**Answer**

``` javascript
const totalYears = inventors.reduce((total, current) => total + current.passed - current.year, 0);
```

`reduce` 方法与 Swift 中的 `recude` 一致，只是在函数参数顺序有点变化。传入的函数中，第一个参数为累计值，第二个参数是当前的值。

**Q5 对发明家的在世年数做排序**

**Answer**

``` JavaScript
const oldest = inventors.sort((a, b) => (a.passed - a.year) < (b.passed - b.year) ? 1 : -1);
```

**Q6 创建一个数组，包含了所有巴黎街道名称中包含 `de` 的街道名**

[数据链接](https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris)

**Answer**

``` javascript
const category = document.querySelector('.mw-category');
const links = Array.from(document.querySelectorAll('a'));
const des = links.map(link => link.textContent).filter(content => content.includes('de'));
```

之前提到过 `querySelectorAll` 返回的值不是 *Array* 类型 而是 *NodeList* 类型。在 NodeList 的 `__proto__` 并不存在 `map` `reduce` 等数组操作方法。所以需要将结果转换为 *Array* 类型。之后就可以通过 `map` `reduce` 等方法进行一系列操作了。

**Q7 对 people 数组中的人名的 last name 进行排序**

**Answer**

``` javascript
const alpha = people.sort(function (a, b) { 
    const [aFirst, aLast] = a.split(', ');
    const [bFirst, bLast] = b.split(', ');
    return aLast > bLast ? 1 : -1;
});
```

通过 `String.prototype.split()` 方法，分割字符串。 `const [aFirst, aLast] = a.split(', ');` 这样的操作确实有意思。

**Q8 计算数组中每个值出现的次数**

**Answer**

``` javascript
const sum = data.reduce((result, current) => {
    if (!result[current]) {
        result[current] = 0;
    }
    result[current]++;
    return result;
}, {});
```
