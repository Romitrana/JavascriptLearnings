/*function makeFunc() {
    const name = "Mozilla";
    function displayName() {
      console.log(name);
    }
    return displayName;
  }
  
  const myFunc = makeFunc();
  myFunc();
  // or 
  makeFunc()();*/



/* higher order function

let arr = [2, 4, 6, 8];
const logic = (n) => {
  return n * n;
};

const multiplelogic = (n) => {
  return n + n;
};

const ArrayMethod = function () {};
const Arr = new ArrayMethod();

ArrayMethod.prototype.multiple = function (arr, logic) {
  let output = [];
  for (let i = 0; i < arr.length; i++) {
    output.push(logic(arr[i]));
  }
  return output;
};

console.log(Arr.multiple(arr, multiplelogic));

Array.prototype.squareEach = function (logic) {
  const output = [];
  for (let i = 0; i < this.length; i++) {
    output.push(logic(this[i]));
  }
  return output;
};

console.log(arr.squareEach(logic)); */






