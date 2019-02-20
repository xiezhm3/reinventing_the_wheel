let n: string | number | boolean; // union types 联合类型
n = 1;
// console.log(n.length);

n = '1';
console.log(n.length);

//interface
// 一旦定义了任意属性，那么确定属性和可选属性都必须是它的子属性
interface Person {
    readonly name: string; // readonly, 只读属性，不可改; 只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候
    age: number;
    gender?: string;
    [propName: number]: any;
}

const tom: Person = {
    name: 'Tom',
    age: 23,
    "gender": 'male',
    "1": 'sz',
    "2": 'china'
}

tom.age = 25;
console.log(tom[1]);

// array
const arr: (number | string)[] = [1, 2, 3, 4, 5, 'aass']; // 联合类型
arr.push(1222);

// array generic 数组泛型 -> ?
const genericArr: Array<number> = [1, 2, 3, 4, 5];

// interface
interface NumberArray {
    [index: number]: number; // 只要 index 的类型是 number，那么值的类型必须是 number
}

let f: NumberArray = [1, 2, 3, 4];

// 允许任意类型
let list: any[] = [1, 2, new Date(), '222'];

// 类数组（Array-like Object）
// 常见的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等
function sum() {
    let args: IArguments = arguments;
}

// function
function getSum(x: number, y: string): number {
    return Number(x + y);
}
getSum(1, '1');

//输入多余的（或者少于要求的）参数，是不被允许的
// getSum(1);
// getSum(1, '2', 3, 4);

// function expression
let mySum = function (x: number, y: number): number {
    return x + y;
}
// 上面的代码只对等号右侧的匿名函数进行了类型定义，
// 而等号左边的 mySum，是通过赋值操作进行类型推论而推断出来的。

// 手动给 sumExpression 添加类型，则应该是这样：
let sumExpression: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
}
/**
 * 注意不要混淆了 TypeScript 中的 => 和 ES6 中的 =>。
 * 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
 * */

// 使用interface定义函数的形状：
interface SearchFunc {
    (source: string, subString: string): boolean
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
    return source.search(subString) !== -1;
}

// 可选参数, 可选参数后面不允许再出现必须参数
function func(x: string, y?: string): string {
    if (y) {
        return x + y;
    }
}

// 参数默认值
function buildName(firstName: string, lastName: string = 'Xie'): string {
    return firstName + ' ' + lastName;
}

// ...rest 剩余参数
function push(array: any[], ...rest: any[]) {
    rest.forEach((item) => {
        array.push(item);
    });
    return array;
}

// 重载： 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join());
    } else if (typeof x === 'string') {
        return x.split('').reverse().join();
    }
}
/**
 * 我们重复定义了多次函数 reverse，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。
 * 注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。
*/


// 类型断言（Type Assertion）可以用来手动指定一个值的类型。

/**
* 
*something <类型>值
   或
 值 as 类型

 在 tsx 语法（React 的 jsx 语法的 ts 版）中必须用后一种
 */

// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法
// function getLength(something: number | string): number {
// return something.length; // error
// }

//我们确实需要在还不确定类型的时候就访问其中一个类型的属性或方法，比如：
function getLengthA(something: number | string): number {
    // if (something.length) { // error
    // return something.length;
    // } else {
    return something.toString().length;
    // }
}

// ==> 此时可以使用类型断言，将 something 断言成 string： 将一个联合类型的变量指定为一个更加具体的类型
function getLengthAT(something: number | string): number {
    if ((<string>something).length) {
        return (<string>something).length;
    } else {
        return something.toString().length;
    }
}

// 类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的：
// function toBoolean(something: string | number): boolean {
// return <boolean>something; // error
// }


// 引用第三方库的声明文件 declare
// 使用 declare 关键字来定义它的类型，帮助 TypeScript 判断我们传入的参数类型对不对：
declare var jQuery: (selector: string) => any

jQuery('#foo');
//通常我们会把类型声明放到一个单独的文件中，这就是声明文件：
// jQuery.d.ts
declare var $: (string) => any;
// 然后在使用到的文件的开头，用「三斜线指令」表示引用了声明文件：
/// <reference path="./jQuery.d.ts" />


/**
 * @types 的使用方式很简单，直接用 npm 安装对应的声明模块即可，以 jQuery 举例：
 * npm install @types/jquery --save-dev
*/