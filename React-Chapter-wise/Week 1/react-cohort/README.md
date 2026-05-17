# React.js In-Depth Notes

# Table of Contents

1. React Fundamentals
2. JSX Deep Dive
3. Components
4. Props
5. State Management
6. Hooks (Detailed)
7. Component Lifecycle
8. Event Handling
9. Conditional Rendering
10. Lists & Keys
11. Forms
12. Context API
13. React Router v6
14. API Fetching
15. Performance Optimization
16. Styling Approaches
17. TypeScript with React
18. Higher Order Components
19. Custom Hooks
20. Error Boundaries
21. Portals
22. Lazy Loading & Suspense
23. Testing
24. Folder Structure
25. Common Mistakes
26. Project Architecture
27. React Interview Topics
28. Best Practices

---

# 1. React Fundamentals

React is a JavaScript library for building fast, reusable, component-based user interfaces.

## Why React?

* Reusable Components
* Efficient Rendering
* Virtual DOM
* Strong Ecosystem
* Declarative Syntax

---

## How React Works

```text id="0ij8el"
        USER ACTION
              |
              v
       +---------------+
       | State Changes |
       +---------------+
              |
              v
       +---------------+
       | Virtual DOM   |
       +---------------+
              |
      Diffing Algorithm
              |
              v
       +---------------+
       | Real DOM      |
       +---------------+
              |
           UI Update
```

---

# 2. JSX Deep Dive

JSX = JavaScript XML

It allows writing HTML-like syntax inside JavaScript.

---

## JSX Rules

### Must Return Single Parent

```jsx id="9njx1x"
return (
  <div>
    <h1>Hello</h1>
    <p>World</p>
  </div>
);
```

---

### JavaScript Inside JSX

```jsx id="ol5t3u"
const name = "John";

return <h1>Hello {name}</h1>;
```

---

### Expressions Allowed

```jsx id="ecru6o"
const age = 20;

return <p>{age >= 18 ? "Adult" : "Minor"}</p>;
```

---

## JSX Compilation Flow

```text id="55c3eh"
JSX Syntax
    |
    v
Babel Compiler
    |
    v
React.createElement()
    |
    v
Virtual DOM Object
```

---

# 3. Components

Components are reusable UI blocks.

## Types of Components

### Functional Components

```jsx id="1kh5a2"
function Welcome() {
  return <h1>Hello</h1>;
}
```

---

### Class Components

```jsx id="f1e8g5"
class Welcome extends React.Component {
  render() {
    return <h1>Hello</h1>;
  }
}
```

---

## Component Tree

```text id="np7l2l"
App
|
+-- Navbar
|
+-- Sidebar
|
+-- MainContent
|     |
|     +-- Card
|     +-- Card
|
+-- Footer
```

---

# 4. Props

Props = Read-only data passed between components.

---

## Parent to Child

```jsx id="djtzl8"
function Parent() {
  return <Child name="Alex" />;
}
```

```jsx id="tvicj0"
function Child(props) {
  return <h1>{props.name}</h1>;
}
```

---

## Props Flow

```text id="k4v79d"
Parent Component
       |
       | props
       v
Child Component
```

---

## Props Destructuring

```jsx id="j6z8g0"
function User({ name, age }) {
  return <p>{name} - {age}</p>;
}
```

---

# 5. State Management

State stores dynamic data.

---

## useState Basics

```jsx id="w9g8bm"
const [count, setCount] = useState(0);
```

---

## State Update Flow

```text id="jlwm6f"
User Click
    |
setState()
    |
Component Re-render
    |
Updated UI
```

---

## Functional Updates

```jsx id="3fz5ee"
setCount(prev => prev + 1);
```

Use functional updates when new state depends on previous state.

---

## State Rules

* Never mutate state directly
* State updates are asynchronous
* Updating state triggers re-render

---

## Wrong

```jsx id="vlg7pn"
count = count + 1;
```

---

## Correct

```jsx id="2t53a1"
setCount(count + 1);
```

---

# 6. Hooks (Detailed)

Hooks allow functional components to use React features.

---

# useState

```jsx id="4khon8"
const [value, setValue] = useState("");
```

---

# useEffect

Used for:

* API Calls
* Timers
* Event Listeners
* Side Effects

---

## useEffect Lifecycle

```text id="fc2ej7"
Render
   |
useEffect()
   |
Side Effect Runs
```

---

## Run Once

```jsx id="gbr2n6"
useEffect(() => {
  console.log("Mounted");
}, []);
```

---

## Cleanup Function

```jsx id="g0l3kn"
useEffect(() => {
  const timer = setInterval(() => {}, 1000);

  return () => clearInterval(timer);
}, []);
```

---

# useRef

Stores mutable values without re-rendering.

```jsx id="9xggs0"
const inputRef = useRef();
```

---

## DOM Access

```jsx id="x8q75o"
<input ref={inputRef} />
```

---

# useMemo

Optimizes expensive calculations.

```jsx id="g7l8vx"
const result = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);
```

---

# useCallback

Memoizes functions.

```jsx id="m7v7xv"
const memoizedFn = useCallback(() => {
  doSomething();
}, []);
```

---

# useReducer

Better for complex state logic.

```jsx id="9f4zaj"
const [state, dispatch] = useReducer(reducer, initialState);
```

---

## Reducer Flow

```text id="n0l59k"
Dispatch Action
      |
      v
Reducer Function
      |
      v
Updated State
```

---

# useContext

Avoids prop drilling.

```jsx id="sn5l2f"
const value = useContext(UserContext);
```

---

# 7. Component Lifecycle

---

## Functional Lifecycle

```text id="xqg4s8"
Mount
  |
Render
  |
Update
  |
Unmount
```

---

## Class Lifecycle

```text id="e0mgdh"
constructor()
      |
render()
      |
componentDidMount()
      |
componentDidUpdate()
      |
componentWillUnmount()
```

---

# 8. Event Handling

---

## Click Event

```jsx id="vuwm2k"
<button onClick={handleClick}>
  Click
</button>
```

---

## Passing Arguments

```jsx id="79vv6o"
<button onClick={() => deleteUser(id)}>
  Delete
</button>
```

---

# 9. Conditional Rendering

---

## if Statement

```jsx id="ntt2j7"
if (isLoading) {
  return <Spinner />;
}
```

---

## Ternary Operator

```jsx id="yo9ymd"
{
  isLoggedIn ? <Home /> : <Login />
}
```

---

## Logical AND

```jsx id="w0qjvu"
{
  isAdmin && <AdminPanel />
}
```

---

# 10. Lists & Keys

---

## Rendering Lists

```jsx id="f6ub7h"
users.map(user => (
  <li key={user.id}>{user.name}</li>
));
```

---

## Why Keys Matter

```text id="gub9ho"
List Update
    |
React compares keys
    |
Efficient DOM update
```

---

# 11. Forms

---

# Controlled Components

```jsx id="jlwm8o"
const [email, setEmail] = useState("");
```

```jsx id="itqk26"
<input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

---

## Form Submission

```jsx id="iw9zj7"
function handleSubmit(e) {
  e.preventDefault();
}
```

---

## Form Flow

```text id="8x9e2d"
User Input
    |
onChange
    |
Update State
    |
Submit Form
```

---

# 12. Context API

Global state management solution.

---

## Context Setup

```jsx id="62bj4m"
const ThemeContext = createContext();
```

---

## Provider

```jsx id="j9h5li"
<ThemeContext.Provider value={theme}>
  <App />
</ThemeContext.Provider>
```

---

## Context Architecture

```text id="1cl3i0"
Context Provider
       |
       +-- Component A
       |
       +-- Component B
               |
               +-- Nested Component
```

---

# 13. React Router v6

---

## Installation

```bash id="9v4q5s"
npm install react-router-dom
```

---

## Basic Routing

```jsx id="71g2o9"
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
</BrowserRouter>
```

---

## Dynamic Routes

```jsx id="1d7t3w"
<Route path="/user/:id" element={<User />} />
```

---

## Navigation

```jsx id="qkq2do"
<Link to="/about">About</Link>
```

---

# 14. API Fetching

---

# Using fetch()

```jsx id="gckx6n"
useEffect(() => {
  fetch("/api/users")
    .then(res => res.json())
    .then(data => setUsers(data));
}, []);
```

---

# Using Axios

```jsx id="w9clg0"
axios.get("/api/users")
  .then(res => setUsers(res.data));
```

---

## API Flow

```text id="cxn8l8"
React Component
      |
API Request
      |
Server Response
      |
Update State
      |
Render UI
```

---

# 15. Performance Optimization

---

## React.memo

Prevents unnecessary re-renders.

```jsx id="v1ylzj"
export default React.memo(Component);
```

---

## Code Splitting

```jsx id="cvv3gy"
const Home = lazy(() => import("./Home"));
```

---

## Optimization Pipeline

```text id="k0h0zj"
Large App
    |
Optimization
    |
Smaller Bundles
    |
Faster Rendering
```

---

# 16. Styling Approaches

---

## CSS Modules

```css id="dhjv6u"
.button {
  color: red;
}
```

---

## Styled Components

```jsx id="i2q0qv"
const Button = styled.button`
  background: blue;
`;
```

---

## Tailwind CSS

```jsx id="q5rzt9"
<button className="bg-blue-500">
  Click
</button>
```

---

# 17. TypeScript with React

---

## Typed Props

```tsx id="q9h0bl"
interface Props {
  title: string;
}
```

---

## Functional Component

```tsx id="4okj56"
const Header: React.FC<Props> = ({ title }) => {
  return <h1>{title}</h1>;
};
```

---

# 18. Higher Order Components (HOCs)

Functions that enhance components.

---

## Example

```jsx id="yfzjlwm"
const Enhanced = withAuth(Component);
```

---

## HOC Flow

```text id="6x1k5r"
Original Component
        |
      HOC
        |
Enhanced Component
```

---

# 19. Custom Hooks

Reusable logic abstraction.

---

## Example

```jsx id="gfz0r6"
function useCounter() {
  const [count, setCount] = useState(0);

  return { count, setCount };
}
```

---

# 20. Error Boundaries

Catch UI rendering errors.

---

## Example

```jsx id="r6b1q5"
class ErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    console.log(error);
  }
}
```

---

# 21. Portals

Render components outside parent DOM hierarchy.

---

## Example

```jsx id="10kpje"
ReactDOM.createPortal(
  <Modal />,
  document.getElementById("portal")
);
```

---

# 22. Lazy Loading & Suspense

---

## Lazy Loading

```jsx id="79x00p"
const Dashboard = lazy(() => import("./Dashboard"));
```

---

## Suspense

```jsx id="j0m5aj"
<Suspense fallback={<Loader />}>
  <Dashboard />
</Suspense>
```

---

# 23. Testing

---

## Jest + React Testing Library

```jsx id="l1wn8w"
test("renders text", () => {
  render(<App />);
});
```

---

## Testing Process

```text id="crr1qe"
Write Component
      |
Write Test
      |
Run Jest
      |
Verify Result
```

---

# 24. Recommended Folder Structure

```text id="x5pvcc"
src/
|
+-- assets/
|
+-- components/
|
+-- pages/
|
+-- hooks/
|
+-- context/
|
+-- services/
|
+-- redux/
|
+-- utils/
|
+-- styles/
|
+-- App.jsx
|
+-- main.jsx
```

---

# 25. Common Mistakes

---

## Infinite Loop

```jsx id="7ovjlwm"
useEffect(() => {
  setCount(count + 1);
});
```

---

## Missing Keys

```jsx id="p6gjhm"
items.map(item => <li>{item}</li>)
```

---

## Direct State Mutation

```jsx id="trqgmu"
state.name = "Alex";
```

---

# 26. Project Architecture

---

## Scalable Architecture

```text id="llgp5q"
Frontend
   |
React Components
   |
State Management
   |
API Layer
   |
Backend Server
   |
Database
```

---

# 27. React Interview Topics

* Virtual DOM
* Reconciliation
* Hooks
* State vs Props
* Controlled vs Uncontrolled Components
* Context API
* Redux
* Memoization
* Lifecycle Methods
* React Fiber

---

# 28. React Best Practices

---

## DO

* Keep components small
* Reuse logic with hooks
* Use TypeScript
* Memoize expensive calculations
* Organize folder structure
* Use keys properly

---

## DON'T

* Mutate state directly
* Overuse Context
* Use index as key
* Create huge components
* Ignore cleanup functions

---

# Complete React Flow Architecture

```text id="15gbuh"
          USER INTERACTION
                  |
                  v
         +----------------+
         | React Component|
         +----------------+
                  |
            State Changes
                  |
                  v
         +----------------+
         | Virtual DOM    |
         +----------------+
                  |
          Diffing Process
                  |
                  v
         +----------------+
         | Real DOM       |
         +----------------+
                  |
                  v
              UI UPDATE
```
