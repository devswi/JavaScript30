const people = [
    { name: 'Wes', year: 1988 },
    { name: 'Kait', year: 1986 },
    { name: 'Irv', year: 1970 },
    { name: 'Lux', year: 2015 }
];

const comments = [
    { text: 'Love this!', id: 523423 },
    { text: 'Super good', id: 823423 },
    { text: 'You are the best', id: 2039842 },
    { text: 'Ramen is my fav food ever', id: 123523 },
    { text: 'Nice Nice Nice!', id: 542328 }
];

// Some and Every checks
// Array.prototype.some()
// 是否包含年龄大于等于 19 岁的成年人

// const isAdult = people.some(function(person) {
//     const currentYear = (new Date()).getFullYear();
//     if (currentYear - person.year >= 19) {
//         return true;
//     }
// });

const isAdult = people.some(person => (new Date()).getFullYear() - person.year >= 19);

console.log(isAdult);

// Array.prototype.every()
// 是否所有人的年龄都大于 19 岁
const isAnybodyAdult = people.every(person => (new Date()).getFullYear() - person.year >= 19);

console.log(isAnybodyAdult);

// Array.prototype.find()
// find() 与 filter() 类似，但只返回符合条件的第一个值
// 找出 ID 为 823423 的评论
const comment = comments.find(comment => comment.id === 823423);

console.log(comment);

// Array.prototype.findIndex()
// 找到并删除 ID 为 823423 的评论
const index = comments.findIndex(comment => comment.id === 823423);
console.log(index);

const newComments = [
    ...comments.slice(0, index),
    ...comments.slice(index + 1)
]
console.table(newComments);