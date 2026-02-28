// 🏏 JS Classes — Quick Notes

// 🧱 Class declaration (syntactic sugar over prototypes)
class Cricketer {
  constructor(name, role) {
    // constructor runs when new object is created
    this.name = name;
    this.role = role;
    this.matchesPlayed = 0;
    this.stamina = 100;
  }

  // Methods are added to prototype (shared across instances)
  introduce() {
    return `${this.name} the ${this.role} | matchesPlayed: ${this.matchesPlayed} | stamina: ${this.stamina} `;
  }
}

// 🆕 Creating instances
const player1 = new Cricketer("Virat", "Batsman");
const player2 = new Cricketer("Bumrah", "Bowler");

// hasOwnProperty → checks own properties only
console.log(player1.hasOwnProperty("name"));

// typeof class → function (because class is special function)
console.log(typeof Cricketer);

// ⚠️ ARROW vs NORMAL function in class context
// Arrow → lexical this (fixed)
// Normal → depends on call-site

class Debutant {
  constructor(name) {
    this.name = name;

    // ➡️ Arrow function (created per instance)
    // this is permanently bound to instance
    this.walkOutArrow = () =>
      `${this.name} walks out to bat for the first time`;

    // 🔁 Normal function (created per instance)
    this.walkOutFunction = function () {
      return `${this?.name} walks out to bat for the first time`;
    };
  }
}

const debutant = new Debutant("Shubman");

// Detaching methods
const arrowFn = debutant.walkOutArrow;
const normalFn = debutant.walkOutFunction;

// ✅ Arrow function keeps lexical `this`
console.log(arrowFn());
// Shubman walks out to bat for the first time


// ⚠️ Normal function loses context when detached
// In strict mode → this = undefined
// Optional chaining prevents crash
console.log(normalFn());
// undefined walks out to bat for the first time


// Explicitly changing call-site
console.log(normalFn.call({}));
// undefined walks out to bat for the first time


const debutant2 = new Debutant("Yashasvi");

// Functions are created per instance
console.log(debutant.walkOutArrow === debutant2.walkOutArrow); // false
console.log(debutant.walkOutFunction === debutant2.walkOutFunction); // false

// 🧠 Extra Key Points:
// - class is syntactic sugar over constructor + prototype
// - Methods outside constructor are shared via prototype
// - Arrow functions don’t have their own `this`
// - Normal functions depend on call-site
// - new keyword creates object + binds this + links prototype
// - Per-instance functions increase memory usage