// Array Cardio Day 1

// Some data we can work with

const inventors = [
    {
        first: 'Albert', last: 'Einstein', year: 1879, passed: 1955,
    },
    {
        first: 'Isaac', last: 'Newton', year: 1643, passed: 1727,
    },
    {
        first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642,
    },
    {
        first: 'Marie', last: 'Curie', year: 1867, passed: 1934,
    },
    {
        first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630,
    },
    {
        first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543,
    },
    {
        first: 'Max', last: 'Planck', year: 1858, passed: 1947,
    },
    {
        first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979,
    },
    {
        first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852,
    },
    {
        first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905,
    },
    {
        first: 'Lise', last: 'Meitner', year: 1878, passed: 1968,
    },
    {
        first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909,
    },
];

// Array.prototype.filten()
// 1. 过滤出出生于 16 世纪的发明家
// const fifteen = inventors.filter(function(inventor) {
//     if (inventor.year >= 1500 && inventor.year < 1600) {
//         return true; // if return true means keep it;
//     }
// });

// 使用箭头函数
const fifteen = inventors.filter(inventor => inventor.year >= 1500 && inventor.year < 1600);

console.log(fifteen);
console.table(fifteen);

// Array.prototype.map()
// 2. 获取所有发明家的姓和名
const fullNames = inventors.map(inventor => `${inventor.first} ${inventor.last}`);

console.table(fullNames);

// Array.prototype.sort()
// 3. 根据出生年月进行排序。年长到年轻
const ordered = inventors.sort((left, right) => (left.year > right.year ? 1 : -1));
console.table(ordered);

// Array/prototype.reduce()
// 4. 计算出所有发明家年龄之和
const totalYears = inventors.reduce((total, current) => total + current.passed - current.year, 0);
console.log(totalYears);

// 5. 对发明家的在世年数做排序
const oldest = inventors.sort((a, b) => ((a.passed - a.year) < (b.passed - b.year) ? 1 : -1));
console.table(oldest);

// 6. 创建一个数组，包含了所有巴黎街道名称中包含 `de` 的街道名
// 参考链接：https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
// 在浏览器中打开维基百科的页面，查看网页元素，并在控制台中尝试
// const category = document.querySelector('.mw-category');
// const links = Array.from(document.querySelectorAll('a'));
// const des = links.map(link => link.textContent).filter(content => content.includes('de'));

// 7. 排序练习
// 对 people 数组中的人名的 last name 进行排序
const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];

const alpha = people.sort((a, b) => {
    const [, aLast] = a.split(', ');
    const [, bLast] = b.split(', ');
    return aLast > bLast ? 1 : -1;
});
console.log(alpha);

// 8. Reduce 练习
// 计算数组中每个值出现的次数
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck'];

const sum = data.reduce((result, current) => {
    const resultValue = result;
    if (!resultValue[current]) {
        resultValue[current] = 0;
    }
    resultValue[current] += 1;
    return resultValue;
}, {});
console.table(sum);
