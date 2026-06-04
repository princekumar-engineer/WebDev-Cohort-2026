// 🧭 JS "this" — Quick Notes

// 🌍 Global context → this refers to global object (window in browser, global in Node)
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

// 🧩 Method call → this refers to object before dot
const bollywoodFilm = {
  name: "Bajirao Mastani",
  lead: "Ranveer",

  introduce() {
    return `${this.lead} performs in ${this.name}`;
  },
};

const bollywoodFilm2 = {
  name: "Dhurandhar",
  lead: "Ranveer",

  introduce() {
    return `${this.lead} performs in ${this.name}`;
  },
};

console.log(bollywoodFilm.introduce());
console.log(bollywoodFilm2.introduce());

// ➡️ Arrow inside method → inherits this from outer scope
const filmDirector = {
  name: "Sanjay Leela Bhansali",
  cast: ["Ranveer", "Deepika", "Priyanka"],

  announceCast() {
    this.cast.forEach((actor) => {
      console.log(`${this.name} introduces ${actor}`);
    });
  },
};

filmDirector.announceCast();

// ⚠️ Nested regular function loses this
const filmSet = {
  crew: "Spot boys",
  prepareProps() {
    console.log(`Outer this.crew: ${this.crew}`);

    function arrangeChairs() {
      // this is global / undefined
      console.log(`Inner this.crew: ${this.crew}`);
    }
    arrangeChairs();

    // ✅ Arrow keeps outer this
    const arrangeLights = () => {
      console.log(`Arrow this.crew: ${this.crew}`);
    };
    arrangeLights();
  },
};

filmSet.prepareProps();

// 🔌 Detached method loses object context
const actor = {
  name: "Ranveer",
  bow() {
    return `${this.name} takes a bow`;
  },
};

console.log(actor.bow());

const detachedBow = actor.bow;

// ⚠️ this becomes global / undefined
console.log(detachedBow());

// 🧪 Regular vs arrow function this
const myfunctionOne = function () {
  console.log(this); // dynamic this
};

const myfunctionTwo = () => {
  console.log(this); // lexical this (outer scope)
};

myfunctionOne();
myfunctionTwo();

// 🧠 Key Takeaways:
// - this depends on how function is called
// - Method call → this = object
// - Regular function → global or undefined
// - Arrow function → inherits outer this
// - Detached method loses binding
// - Nested functions can lose context
// - forEach + arrow preserves this