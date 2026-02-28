// const username = {
//   phone: "iphone",
//   age: {
//     a: 40,
//     b: {
      
//     }
//   }
// }

// const mycopy = username
// const copyName = { ...username }


// copyName.age.a = 5


console.log(this);

// 🧪 In regular function (non-strict) → this defaults to global object
function ranveerOnGlobalStage() {
  return typeof this;
}
console.log(ranveerOnGlobalStage());

// ⚠️ Regular function → this is global (or undefined in strict mode)
function ranveerWithNoScript() {
  return this;
}
console.log(ranveerWithNoScript());
