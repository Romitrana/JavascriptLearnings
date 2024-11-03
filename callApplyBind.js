// console.log("call-apply-bind method")

// call method

/*function greet(name){ 
    console.log(`Hello ${name}!; my name is ${this.name}`)  
    //here this points to the first argument of this function i.e person object
}
const person ={ 
    name:"romit"
}
greet.call(person,"mukesh");*/


//apply method4
/*function greet(name,address){ 
    console.log(`Hello ${name}!; my name is ${this.name} and i am from ${address}`)  
    //here this points to the first argument of this function i.e person object
}
const person ={ 
    name:"romit"
}
greet.apply(person,["mukesh","jharkhand"]);  //here we pass a list of arguments; */



//bind method
/*function greet(name){ 
    console.log(`Hello ${name}!; my name is ${this.name}`)  
    //here this points to the first argument of this function i.e person object
}
const person ={ 
    name:"romit"
}
const display = greet.bind(person,"mukesh");

display();*/




//some extra stuff
const obj = { 
    name:"romit",
    age:23,
    construct : function(n,a){ 
        this.name = n;
        this.age=a;
    }
}
console.log(obj.name)
console.log(obj.age)
obj.construct("laxmi",22);
console.log(obj.name)
console.log(obj.age)
