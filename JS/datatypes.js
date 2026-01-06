/* 
1) Primitive Datatype : predefined | immutable | stored in stack | stored by value
2) Non-Primitive Datatype : User-defined | mutable | stored in heap | stored by reference

                              PRIMITIVE DATATYPE 
datatype	 typeof return value	    Object wrapper
Null	    "object" (it's a bug in js)	    N/A
Undefined	"undefined"	                    N/A
Boolean	    "boolean"	                    Boolean
Number	    "number"	                    Number
BigInt	    "bigint"	                    BigInt
String	    "string"	                    String
Symbol	    "symbol"	                    Symbol
*/

// ----------------------null-----------------------
// console.log(typeof null) //object its's bug
// console.log("romit"+null) //romitnull -> null converted to string and appended to "romit"
// console.log(null==undefined) //true
// console.log(null===undefined) //false
//"use strict" Strict mode makes JavaScript safer, cleaner, and less error-prone by enforcing stricter rules.
//let a = 5;
//b = a; //under "use strict" Mode it will throw a reference error
//console.log(b);

//---------------------undefined------------------------
// console.log(a) //cannot be accessed before initialization in case of let & const in case of var it will be undefined
// const a=4;

// let a;
// console.log(a); //undefined

// const obj = {
//   name: "romit",
//   age: 24,
// };
// console.log(obj.name); //romit
// console.log(obj.address); //undefined

//--------------------boolean---------------------
//truthy values
// console.log(Boolean(true))
// console.log(Boolean(1))
// console.log(Boolean("romit"))
// console.log(Boolean("false"))
// console.log(Boolean([]))
// console.log(Boolean({}))
// console.log(Boolean(function(){}))
// console.log(Boolean("0"))

//falsy values
// console.log(Boolean(false))
// console.log(Boolean(0))
// console.log(Boolean(''))
// console.log(Boolean(""))
// console.log(Boolean(NaN))
