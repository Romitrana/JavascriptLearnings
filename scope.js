console.log("scope")

const globalVar = 100;
function func1(){
      let a = 6;
    function fun2(){ 
        console.log("inside fun2",a);
    }
    console.log("inside func1",a)
    fun2();

    //block
    {
    //let s = "blockelement"; //no access outside as it has blocked scoped (let and const)
    var s = "blockelement";  // can be accessed outside block as it is function scoped
    console.log("inside block",a,s)
    }

    console.log(s)

    //access global variable
console.log("this is global variable : ",globalVar);
}

func1();
// console.log(s) //not accessable



{ 
let a =9;
{ 
var b = 88;
console.log(a,b)
}

console.log(a,b)
}

console.log(b)

