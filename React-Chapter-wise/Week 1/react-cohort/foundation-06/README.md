# React Notes: Forms in React — Manual Form vs React Hook Form

Using your code examples, let's understand:

* What are forms in React
* Controlled components
* Manual form handling
* React Hook Form
* Validation
* Submission handling
* Behind the scenes
* Performance differences
* Why React Hook Form exists

---

# Your Application Structure

You created two approaches:

* Manual Controlled Form
* React Hook Form (RHF)

And switch between them using tabs.

---

# `App.jsx`

```jsx
import { useState } from "react";

import "./App.css";
import ManualForm from "./ManualForm";
import HookForm from "./HookForm";

function App() {
  const [tab, setTab] = useState("manual");

  return (
    <>
      <div>
        <div className="shell">
          <h1>Job application</h1>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, ipsa?
          </p>
        </div>

        <div className="tab">
          <button onClick={() => setTab("manual")}>
            Controlled - Manual
          </button>

          <button onClick={() => setTab("rhf")}>
            React hook form
          </button>
        </div>

        <h1>Getting started with react</h1>

        {tab === "manual" ? <ManualForm /> : <HookForm />}
      </div>
    </>
  );
}

export default App;
```

---

# What is Happening in `App.jsx`?

You are using:

```jsx
const [tab, setTab] = useState("manual");
```

to switch between two form systems.

---

# Conditional Rendering

```jsx
{
  tab === "manual" ? <ManualForm /> : <HookForm />;
}
```

If:

```js
tab === "manual"
```

React renders:

```jsx
<ManualForm />
```

Otherwise:

```jsx
<HookForm />
```

---

# This is Called

> Conditional Rendering

---

# What is a Form in React?

A form is used to:

* collect user input
* validate data
* submit data

Examples:

* Login forms
* Registration forms
* Job applications
* Payment forms

---

# Two Main Approaches in React

| Approach               | Description                      |
| ---------------------- | -------------------------------- |
| Manual Controlled Form | React controls every input       |
| React Hook Form        | Library manages form efficiently |

---

# Manual Form (Controlled Components)

---

# `ManualForm.jsx`

```jsx
const [values, setValues] = useState({
  name: "",
  email: "",
  role: "Frontend",
  experience: "",
  cover: "",
});
```

---

# What is Happening Here?

React stores all form data inside state.

---

# Controlled Component

A controlled component means:

> React fully controls the input value.

---

# Example

```jsx
<input value={values.name} onChange={set("name")} />
```

---

# Why is This Controlled?

Because:

```jsx
value={values.name}
```

makes React the source of truth.

The input value comes from state.

---

# Flow of Controlled Input

```text
User types
    ↓
onChange runs
    ↓
setValues updates state
    ↓
React re-renders
    ↓
Input gets new value
```

---

# Understanding `set(field)`

```jsx
function set(field) {
  return (e) =>
    setValues((v) => ({
      ...v,
      [field]: e.target.value,
    }));
}
```

---

# What Does This Do?

This creates reusable input handlers.

---

# Example

```jsx
onChange={set("name")}
```

becomes:

```js
(e) => {
  setValues((v) => ({
    ...v,
    name: e.target.value,
  }));
}
```

---

# Behind the Scenes

Suppose user types:

```text
Rahul
```

React updates state:

```js
{
  name: "Rahul",
  email: "",
}
```

Then React re-renders component.

---

# Why Use Spread Operator?

```js
...v
```

preserves old values.

Without it:

```js
setValues({
  name: "Rahul"
});
```

would erase other fields.

---

# Validation in Manual Form

```jsx
function validate(v) {
  const e = {};

  if (!v.name.trim())
    e.name = "Name is required";

  if (!v.email.trim())
    e.email = "Email is required";

  return e;
}
```

---

# What Happens Here?

You manually check:

* empty name
* empty email

and create error messages.

---

# Submit Flow

```jsx
function submit(ev) {
  ev.preventDefault();

  const e = validate(values);

  SetErrors(e);

  if (Object.keys(e).length === 0)
    setSubmitted(true);
}
```

---

# Flow Explained

---

## Step 1

Prevent page refresh:

```js
ev.preventDefault()
```

---

## Step 2

Validate form:

```js
validate(values)
```

---

## Step 3

Store errors:

```js
SetErrors(e)
```

---

## Step 4

If no errors:

```js
setSubmitted(true)
```

---

# Manual Form Characteristics

| Feature              | Manual Form |
| -------------------- | ----------- |
| Full control         | Yes         |
| More code            | Yes         |
| More re-renders      | Yes         |
| Easy to understand   | Yes         |
| Better for beginners | Yes         |

---

# React Hook Form (RHF)

Now let's understand the second approach.

---

# `HookForm.jsx`

```jsx
import { useForm } from "react-hook-form";
```

---

# What is React Hook Form?

React Hook Form is a library for handling forms efficiently.

It reduces:

* boilerplate
* re-renders
* manual validation code

---

# `useForm()`

```jsx
const {
  register,
  handleSubmit,
  formState: {
    errors,
    isSubmitSuccessful,
    isSubmitting
  },
  getValues,
} = useForm({
  defaultValues: {
    name: "hitesh"
  },
  mode: "onTouched"
});
```

---

# What `useForm()` Gives You

| Property             | Purpose                     |
| -------------------- | --------------------------- |
| `register`           | Connect inputs              |
| `handleSubmit`       | Handles validation + submit |
| `errors`             | Validation errors           |
| `isSubmitting`       | Loading state               |
| `isSubmitSuccessful` | Success state               |
| `getValues`          | Access form data            |

---

# What Does `register()` Do?

```jsx
<input {...register("name")} />
```

---

# Behind the Scenes

React Hook Form internally attaches:

* `onChange`
* `onBlur`
* `ref`

automatically.

Equivalent conceptually to:

```jsx
<input
  name="name"
  onChange={...}
  onBlur={...}
  ref={...}
/>
```

---

# Validation in RHF

```jsx
register("name", {
  required: "name is required"
})
```

---

# What Happens Here?

RHF automatically:

* validates input
* creates error object
* tracks field state

---

# Showing Errors

```jsx
{
  errors.name && (
    <span>{errors.name.message}</span>
  );
}
```

---

# Submission in RHF

```jsx
<form onSubmit={handleSubmit(submit)}>
```

---

# What `handleSubmit()` Does

React Hook Form automatically:

* prevents refresh
* validates form
* collects data
* calls submit function

---

# Behind the Scenes

Conceptually:

```js
function handleSubmit(fn) {
  return async function(event) {
    event.preventDefault();

    validate();

    if(valid) {
      fn(formData);
    }
  }
}
```

---

# Your Submit Function

```jsx
function submit(data) {
  return new Promise((res) =>
    console.log("submitted", data)
  );
}
```

---

# Data Automatically Provided

```js
data = {
  name: "...",
  email: "..."
}
```

No manual state management needed.

---

# `isSubmitting`

```jsx
disabled={isSubmitting}
```

---

# What Happens?

While form submits:

```js
isSubmitting = true
```

Button becomes disabled.

---

# Dynamic Button Text

```jsx
{
  isSubmitting
    ? "Submitting...."
    : "Submit"
}
```

---

# `isSubmitSuccessful`

If submit succeeds:

```jsx
if (isSubmitSuccessful)
```

show success screen.

---

# Biggest Difference

---

# Manual Form

You manage:

* state
* validation
* errors
* submission
* field updates

yourself.

---

# React Hook Form

Library manages everything for you.

---

# Performance Difference

---

# Manual Form

Every keystroke:

```js
setValues()
```

causes re-render.

---

# RHF

Uses:

> uncontrolled inputs internally

This reduces re-renders dramatically.

---

# Controlled vs Uncontrolled Inputs

| Type        | Controlled  | Uncontrolled |
| ----------- | ----------- | ------------ |
| Managed by  | React State | DOM          |
| Re-renders  | More        | Less         |
| Performance | Slower      | Faster       |

---

# Behind the Scenes Comparison

---

# Manual Form

```text
User types
    ↓
setState()
    ↓
React re-render
    ↓
UI updates
```

---

# React Hook Form

```text
User types
    ↓
DOM stores value
    ↓
RHF tracks refs internally
    ↓
Minimal re-renders
```

---

# Why React Hook Form is Fast

Because it avoids storing every keystroke in React state.

Instead it uses:

* refs
* native inputs
* uncontrolled behavior

---

# Beginner Recommendation

---

# Learn Manual Forms First

Because you understand:

* state
* validation
* controlled components
* event handling

---

# Then Learn RHF

Because real-world apps need:

* better performance
* less boilerplate
* scalable forms

---

# Final Summary

# Manual Form

* Controlled inputs
* Uses `useState`
* Full React control
* More boilerplate
* More re-renders

---

# React Hook Form

* Library-based form handling
* Less code
* Faster performance
* Better scalability

---

# Controlled Input

```jsx
<input value={state} onChange={...} />
```

React controls input.

---

# RHF Register

```jsx
register("name")
```

Connects input to form system.

---

# Validation

Manual:

```js
validate()
```

RHF:

```jsx
register("field", {
  required: "Error"
})
```

---

# Submission

Manual:

```js
preventDefault()
validate()
```

RHF:

```jsx
handleSubmit(submit)
```

---

# Core Mental Model

## Manual Form

> "React controls everything."

---

## React Hook Form

> "Browser handles inputs, RHF tracks them efficiently."
