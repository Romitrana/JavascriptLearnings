console.log("functions in js");
/*
//---------------function declaration or function statement <----they are hoisted 

console.log(fun1(3));   <----not throw error
function fun1(n){ 
return n*n;
}
console.log(fun1(3));

//---------------function expression   <------they are not hoisted 

console.log(sum(7,4))  <----throw an error
const sum = function s(a,b){ 
    return a+b;
}
console.log(sum(7,4))  */

//----------------recursion
/*const fact = function fc(n){ 
if(n==0 || n==1) return 1;
return n*fc(n-1);
}
console.log(fact(5));  <----120 */

//----------------arguments objects

/*function print(name,age,add){ 
    console.log(`1 = Hello there! my name is ${name}, i am ${age} years old and i'm from ${add}`);
    console.log(`2 = Hello there! my name is ${arguments[0]}, i am ${arguments[1]} years old and i'm from ${arguments[2]} ${arguments[8]}`);
}
print("romit",22,"jharkhand");  */

//---------------default and rest parameter

/*function fun(height=5,age=21,...val){  <----default arguments and rest operator
console.log(`height = ${height}\n age = ${age}\n max = ${Math.max(...val)} \n min = ${Math.min(...val)}`)
}

fun(56,undefined,9,11,24); */

//----------------arrow function

// const arrow = () => 'this is arrow function';
// console.log(arrow());

// const arrow = (a=5,b=6) =>a+b;
// console.log(arrow(9,9));

//----------------first class function

/*function func(fn) {
  return fn;
}
const b = () => {
  console.log("this is function b");
};

func(b());*/