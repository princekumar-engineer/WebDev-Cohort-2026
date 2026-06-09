# 🛠️ Chapter 4 — Prettier & ESLint

---

# 🚀 Why Code Quality Matters

As projects grow:

* files become larger
* teams become bigger
* code becomes harder to manage

Without proper formatting and rules:

```txt id="zq2y7v"
Messy Code
     ↓
Confusing Structure
     ↓
More Bugs
     ↓
Hard Maintenance
```

To solve this, developers use:

* Prettier
* ESLint

---

# ✨ What is Prettier?

> Prettier is a code formatter.

Prettier

Prettier automatically formats code into a consistent style.

---

# 🎯 What Prettier Solves

Without Prettier:

```js id="gcf0nk"
const App=()=>{return React.createElement("h1",null,"Hello")}
```

With Prettier:

```js id="b7yyqk"
const App = () => {
  return React.createElement("h1", null, "Hello");
};
```

---

# ✅ Benefits of Prettier

* consistent formatting
* cleaner code
* easier readability
* saves time
* removes formatting arguments in teams

---

# ⚡ What Prettier Handles

Prettier formats:

* spacing
* indentation
* semicolons
* quotes
* line breaks
* object formatting

---

# 📦 Installing Prettier

```bash id="7cc9uv"
npm install --save-dev prettier
```

---

# 📄 Creating Prettier Config

Create:

```txt id="w2x3zv"
.prettierrc
```

Example:

```json id="slb7yv"
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2
}
```

---

# ⚡ Running Prettier

```bash id="4mfrdg"
npx prettier . --write
```

---

# 🧠 Prettier Workflow

```txt id="3xy0wu"
Write Code
     ↓
Run Prettier
     ↓
Automatic Formatting
     ↓
Clean Consistent Code
```

---

# 🔍 What is ESLint?

> ESLint is a code analysis tool that finds problems in JavaScript and React code.

ESLint

---

# 🎯 What ESLint Solves

ESLint detects:

* unused variables
* syntax mistakes
* bad coding practices
* potential bugs
* inconsistent patterns

---

# ❌ Example Without ESLint

```js id="bdz7kp"
const name = "React";

console.log(names);
```

Problem:

```txt id="83k7pv"
names is not defined
```

ESLint catches this immediately.

---

# ✅ Benefits of ESLint

* reduces bugs
* improves code quality
* enforces coding standards
* helps teams follow same practices
* catches errors early

---

# 📦 Installing ESLint

```bash id="j4k7sh"
npm install --save-dev eslint
```

---

# ⚡ Initialize ESLint

```bash id="79txg4"
npx eslint --init
```

This creates configuration files.

---

# 📄 Example ESLint Config

```js id="z2wqig"
export default [
  {
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
    },
  },
];
```

---

# 🔥 ESLint Workflow

```txt id="z6e7q0"
Write Code
     ↓
ESLint Scans Code
     ↓
Find Errors & Warnings
     ↓
Fix Problems
```

---

# 🆚 Prettier vs ESLint

| Feature              | Prettier   | ESLint       |
| -------------------- | ---------- | ------------ |
| Main Purpose         | Formatting | Code Quality |
| Fixes Style          | ✅ Yes      | ⚠️ Some      |
| Finds Bugs           | ❌ No       | ✅ Yes        |
| Improves Readability | ✅ Yes      | ✅ Yes        |
| Checks Logic Errors  | ❌ No       | ✅ Yes        |

---

# 🤝 Why Use Both Together?

Modern projects usually combine:

```txt id="dr9k7v"
Prettier
     +
ESLint
```

Because:

```txt id="5w7m5r"
Prettier → Makes code beautiful
ESLint   → Makes code safe
```

---

# ⚛️ In React Projects

React projects heavily use:

* Prettier
* ESLint

because React apps contain:

* many components
* reusable logic
* large file structures
* team collaboration

---

# 📦 Common React Setup

In modern React projects:

```txt id="m0lf1r"
Vite
  ↓
ESLint Included
  ↓
Add Prettier
  ↓
Configure Both Together
```

---

# 🧩 Example React Formatting

Without formatting:

```js id="efgt0x"
const App=()=>{return <h1>Hello React</h1>}
```

After Prettier:

```js id="d7mhz3"
const App = () => {
  return <h1>Hello React</h1>;
};
```

---

# 🔍 Example React ESLint Warning

```js id="q0p6te"
const App = () => {
  const name = "React";

  return <h1>Hello</h1>;
};
```

ESLint warns:

```txt id="hh7y6l"
'name' is assigned a value but never used
```

---

# 🧠 Complete Development Flow

```txt id="2cgr2n"
Write React Code
        ↓
Prettier Formats Code
        ↓
ESLint Checks Quality
        ↓
Fix Errors & Warnings
        ↓
Cleaner & Safer Application
```

---

# ⚡ Why Developers Love These Tools

These tools help:

* maintain large codebases
* improve readability
* reduce bugs
* speed up development
* enforce consistency

---

# 🚀 Industry Usage

Almost every modern project uses:

* Prettier
* ESLint

including React, Next.js, and enterprise applications.

---

# 📌 What You Learned

✅ What is Prettier

✅ What is ESLint

✅ Difference between them

✅ Why both are used together

✅ Installation basics

✅ React workflow integration

✅ Formatting vs code quality

---
