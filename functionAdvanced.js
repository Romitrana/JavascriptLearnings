//----------hoisting--------------

// func();

/*console.log(func)  
var func = function(){
    console.log("hello world");
}*/


/*const obj = { 
    name:"romit",
    age:22
}

console.log(obj.name)
const add = Symbol("pasta");
obj[add] = "jharkhand"
console.log(obj.pasta)*/



//----------temporal dead zone (TDZ)







//IIFE (Immediately invoked function expression)

(function hello(a,b){ 
    console.log("hello this is IIFE",a+b);
})(4,5);
// hello();


//please include semicolon in above IIFE when you define next IIFE immediately after that
(()=>console.log("i am ES6"))();


const val = (()=>"pasta")();
console.log(val)