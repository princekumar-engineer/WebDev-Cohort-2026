# React Notes: Props, `children`, and Behind the Scenes in React

* What are Props?
* What is `children`?
* How data flows between components
* What happens behind the scenes in React

---

# Your Code Example

## `App.jsx`

```jsx
import AvatarCard from "./components/AvatarCard.jsx";

const avatars = [
  {
    id: 1,
    name: "Nova",
    role: "Navigator",
    power: "Routing",
    initials: "NV",
  },
  {
    id: 2,
    name: "Flux",
    role: "State Keeper",
    power: "useState",
    initials: "FX",
  },
  {
    id: 3,
    name: "Memo",
    role: "Optimizer",
    power: "Memoization",
    initials: "MM",
  },
];

function Shell({ title, children }) {
  return (
    <section>
      <p>Reusable shell</p>

      <h2>{title}</h2>

      {children}

      <p>this is for test</p>
    </section>
  );
}

function App() {
  return (
    <>
      <h1>Children in React</h1>

      <Shell title="Batman">
        <h1>this is inside Shell</h1>
        <p>this is also inside shell</p>
      </Shell>

      <h1>hello from Rachit</h1>

      <section>
        {avatars.map((avatar) => (
          <AvatarCard
            key={avatar.id}
            level={avatar.id === 1 ? "Captain" : undefined}
            avatar={avatar}
          />
        ))}
      </section>
    </>
  );
}

export default App;
```

---

## `AvatarCard.jsx`

```jsx
function AvatarCard({ avatar, level = "Rookie" }) {
  return (
    <article>
      <div>{avatar.initials}</div>

      <h3>{avatar.name}</h3>

      <p>{avatar.role}</p>

      <p>Level: {level}</p>
    </article>
  );
}

export default AvatarCard;
```

---

# What are Props?

Props stands for:

> Properties

Props are used to pass data from one component to another.

---

## Parent → Child Flow

In your code:

```jsx
<AvatarCard avatar={avatar} />
```

`App` component is sending data to `AvatarCard`.

So:

* `App` = Parent Component
* `AvatarCard` = Child Component

---

## Receiving Props

```jsx
function AvatarCard({ avatar }) {
```

React receives the props object and destructures it.

---

# Behind the Scenes of Props

This:

```jsx
<AvatarCard avatar={avatar} />
```

internally becomes:

```js
AvatarCard({
  avatar: avatar,
});
```

React is simply calling the component function with an object.

---

## Full Props Object

If you write:

```jsx
function AvatarCard(props) {
  console.log(props);
}
```

You get:

```js
{
  avatar: {
    id: 1,
    name: "Nova",
    role: "Navigator",
    power: "Routing",
    initials: "NV"
  }
}
```

---

## Props Destructuring

Instead of:

```jsx
function AvatarCard(props) {
  return <h1>{props.avatar.name}</h1>;
}
```

We usually write:

```jsx
function AvatarCard({ avatar }) {
  return <h1>{avatar.name}</h1>;
}
```

Cleaner and easier to read.

---

# Multiple Props

Your component receives two props:

```jsx
<AvatarCard
  avatar={avatar}
  level="Captain"
/>
```

---

## Receiving Multiple Props

```jsx
function AvatarCard({ avatar, level }) {
```

---

# Default Props Value

Your code:

```jsx
function AvatarCard({ avatar, level = "Rookie" }) {
```

If `level` is not passed:

```jsx
<AvatarCard avatar={avatar} />
```

React automatically uses:

```js
level = "Rookie"
```

---

## Output Example

For Avatar 1:

```jsx
<AvatarCard
  level="Captain"
/>
```

Output:

```html
Level: Captain
```

---

For Avatar 2:

```jsx
<AvatarCard />
```

Output:

```html
Level: Rookie
```

---

# What is `children` in React?

`children` is a special React prop.

It represents everything written between opening and closing component tags.

---

## Your Example

```jsx
<Shell title="Batman">
  <h1>this is inside Shell</h1>

  <p>this is also inside shell</p>
</Shell>
```

Everything inside `Shell` becomes `children`.

---

# Behind the Scenes of `children`

React converts this into:

```js
Shell({
  title: "Batman",
  children: [
    <h1>this is inside Shell</h1>,
    <p>this is also inside shell</p>,
  ],
});
```

---

## Receiving `children`

```jsx
function Shell({ title, children }) {
```

---

## Rendering `children`

```jsx
{children}
```

This tells React:

> "Render whatever was placed inside the component."

---

## Output Structure

```html
<section>
  <p>Reusable shell</p>

  <h2>Batman</h2>

  <h1>this is inside Shell</h1>

  <p>this is also inside shell</p>

  <p>this is for test</p>
</section>
```

---

# Why `children` is Powerful

It allows reusable wrapper components.

Examples:

* Modal
* Card
* Layout
* Sidebar
* Dialog Box
* Protected Routes

---

## Example: Card Component

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}
```

Usage:

```jsx
<Card>
  <h1>Hello</h1>
  <p>Inside card</p>
</Card>
```

---

# Understanding `map()` with Props

Your code:

```jsx
{
  avatars.map((avatar) => (
    <AvatarCard
      key={avatar.id}
      avatar={avatar}
    />
  ));
}
```

---

## What Happens Here?

React loops through every avatar object.

For each object, it creates one component.

---

## First Iteration

```js
{
  id: 1,
  name: "Nova",
  role: "Navigator",
  power: "Routing",
  initials: "NV"
}
```

React creates:

```jsx
<AvatarCard avatar={avatar} />
```

---

# Behind the Scenes of `map()`

Equivalent to:

```js
AvatarCard({
  avatar: {
    id: 1,
    name: "Nova",
    role: "Navigator",
    power: "Routing",
    initials: "NV",
  },
});
```

---

# What is the `key` Prop?

```jsx
key={avatar.id}
```

`key` helps React uniquely identify list items.

---

# Why React Needs Keys

Imagine list:

```js
A
B
C
```

Now update to:

```js
A
C
```

React uses keys to know:

* Which item changed
* Which item was removed
* Which item should stay

---

# Important Note About `key`

`key` is special.

It is used internally by React.

You cannot access it like:

```jsx
props.key
```

It will be `undefined`.

---

# Data Flow in React

React follows:

> One-way data flow

Meaning:

```text
Parent → Child
```

Data moves downward using props.

---

## Example Flow

```text
App
 ├── Shell
 └── AvatarCard
```

`App` sends data to both components.

---

# React Component Mental Model

React components are simply JavaScript functions.

This:

```jsx
<AvatarCard avatar={avatar} />
```

is basically:

```js
AvatarCard({
  avatar: avatar,
});
```

React takes the returned JSX and converts it into DOM elements.

---

# Final Summary

## Props

* Used to pass data between components
* Parent sends data to child
* Props are read-only

Example:

```jsx
<AvatarCard avatar={avatar} />
```

---

## `children`

* Special React prop
* Represents content placed inside component tags

Example:

```jsx
<Shell>
  <h1>Hello</h1>
</Shell>
```

---

## Behind the Scenes

React converts components into function calls.

Example:

```js
Shell({
  title: "Batman",
  children: ...
});
```

---

## `map()`

* Used to render lists dynamically
* Creates multiple components from arrays

Example:

```jsx
{
  avatars.map((avatar) => (
    <AvatarCard avatar={avatar} />
  ));
}
```

---

## `key`

* Helps React track list items
* Must be unique
* Improves rendering performance

Example:

```jsx
key={avatar.id}
```

---

