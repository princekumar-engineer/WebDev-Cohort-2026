# ⚛️ Chapter 08 — Understanding SSG (Static Site Generation) Behind The Scenes

---

# 🚀 Moving Beyond Client-Side React

In previous chapters:

* React rendered UI in the browser
* APIs fetched data dynamically
* Vite handled development tooling
* HMR updated components instantly

Now we move into something deeper:

```txt id="h7w2mj"
Static Site Generation (SSG)
```

This chapter explains:

* how static websites are generated
* how React can create HTML before browser load
* why frameworks like Gatsby and Next.js exist
* what happens behind the scenes

---

# 🌍 What is SSG?

> SSG (Static Site Generation) means generating HTML files at build time before users visit the website.

Instead of:

```txt id="z2m8qp"
Browser builds UI
```

the server/build process already creates ready-made HTML files.

---

# ⚡ Traditional React Rendering

Earlier React flow:

```txt id="s0y8pt"
Browser Loads JS
       ↓
React Executes
       ↓
UI Generated In Browser
```

This is called:

```txt id="m7p6kc"
CSR (Client Side Rendering)
```

---

# 🚀 SSG Rendering Flow

Static Site Generation works differently:

```txt id="d4v9nf"
Build Process Starts
        ↓
React Generates HTML
        ↓
Static HTML Files Created
        ↓
Files Saved Inside dist/
        ↓
Browser Receives Ready HTML
```

---

# 🧠 Why SSG Became Important

Modern websites need:

* fast loading
* better SEO
* low hosting cost
* better performance

CSR alone was not enough for:

* blogs
* documentation
* marketing pages
* ecommerce product pages

---

# ⚛️ Gatsby Idea — “Create Your Gatsby”

This project is basically teaching:

```txt id="p5m0ka"
How Gatsby Works Internally
```

before using real frameworks.

---

# 🧠 What Gatsby Does Internally

Frameworks like Gatsby:

* fetch data
* render React on server/build step
* generate static HTML
* place files inside `dist/`
* deploy static files to CDN/server

This chapter recreates that process manually.

---

# 📁 Project Structure

```txt id="x1w6ro"
project/
│
├── dist/
│
├── src/
│   ├── App.js
│   ├── data.js
│   └── template.html
│
├── scripts/
│   └── build.js
│
└── package.json
```

---

# 📦 Required Dependencies

# 📄 package.json

```json
{
  "type": "module",

  "scripts": {
    "build": "node scripts/build.js",
    "serve": "npx serve dist"
  },

  "dependencies": {
    "fs-extra": "^11.3.5",
    "react": "^19.2.6",
    "react-dom": "^19.2.6"
  }
}
```

---

# 📌 Understanding Dependencies

| Dependency  | Purpose                    |
| ----------- | -------------------------- |
| `react`     | create React UI            |
| `react-dom` | render React components    |
| `fs-extra`  | file system utilities      |
| `serve`     | serve static files locally |

---

# ⚡ Why We Need fs-extra

Node.js has a built-in `fs` module.

But:

```txt id="f6o4qx"
fs-extra
```

provides easier utilities like:

* creating folders
* copying files
* ensuring directories exist

---

# 📄 data.js

```js
export const teas = [
  {
    id: 1,
    name: "Masala Chai",
    description: "Strong spiced Indian tea.",
  },

  {
    id: 2,
    name: "Elaichi Chai",
    description: "Cardamom flavored chai.",
  },

  {
    id: 3,
    name: "Ginger Chai",
    description: "Infused with fresh ginger.",
  },
];
```

---

# 🧠 Why Separate Data?

Separating data helps:

```txt id="t9s7kr"
Reusable Architecture
```

Real frameworks also separate:

* content
* APIs
* markdown
* CMS data

from UI rendering.

---

# 📄 App.js

```js
import React from "react";
import { teas } from "./data.js";

export default function App() {
  return React.createElement(
    "div",
    { style: { color: "red" } },
    [
      React.createElement(
        "h1",
        { key: "h1" },
        "Hello World",
      ),

      React.createElement(
        "p",
        { key: "p" },
        "This is a paragraph",
      ),

      React.createElement(
        "ul",
        { key: "ul" },

        teas.map((tea) =>
          React.createElement(
            "li",
            { key: tea.id },
            `${tea.name}: ${tea.description}`,
          ),
        ),
      ),
    ],
  );
}
```

---

# ⚛️ Why React.createElement Again?

This chapter intentionally uses:

```txt id="a2m8jd"
React.createElement()
```

instead of JSX to understand:

```txt id="s8v3pw"
What React Actually Generates Internally
```

Remember:

```txt id="m1x6ko"
JSX
   ↓
Babel
   ↓
React.createElement()
```

---

# 📌 Dynamic Rendering

```js
teas.map((tea) => ...)
```

React dynamically creates UI from data.

---

# 📄 template.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />

    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />

    <title>My template</title>
  </head>

  <body>
    <div id="root"><!--app--></div>
  </body>
</html>
```

---

# 🧠 Why Template File Exists

The template acts like:

```txt id="u8q7dw"
HTML Skeleton
```

React-generated HTML gets injected into:

```html
<!--app-->
```

---

# ⚡ Build Script

# 📄 build.js

```js
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

import React from "react";
import ReactDOMServer from "react-dom/server";

import { teas } from "../src/data.js";
import App from "../src/App.js";
```

---

# 🧠 What This Imports

| Import           | Purpose                     |
| ---------------- | --------------------------- |
| `fs-extra`       | file operations             |
| `path`           | path handling               |
| `fileURLToPath`  | ES module directory support |
| `ReactDOMServer` | server-side rendering       |
| `App`            | React component             |
| `teas`           | application data            |

---

# ⚡ Why ReactDOMServer Matters

Normally React uses:

```txt id="v9f3nm"
ReactDOM
```

for browser rendering.

But SSG/SSR uses:

```txt id="m8g2xt"
ReactDOMServer
```

to generate HTML strings on the server/build process.

---

# 📌 Getting __dirname

```js
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
```

---

# 🧠 Why This Is Needed

Because ES Modules do NOT provide:

```txt id="d8r1ka"
__dirname
```

automatically like CommonJS.

So we recreate it manually.

---

# 📌 Output Paths

```js
const outputPath = path.join(__dirname, "../dist");
```

Defines where generated files will be stored.

---

# ⚡ Why dist Folder Exists

```txt id="f4w9lh"
dist = distribution folder
```

It contains:

* final production files
* generated HTML
* optimized assets
* deployable output

---

# 🌍 Why dist Folder Is Important

Frameworks like:

* Gatsby
* Next.js
* Vite

all generate production output into folders like:

```txt id="x0s6pq"
dist/
build/
.out/
```

because browsers only need:

```txt id="w8z1nt"
Final Optimized Files
```

NOT source code.

---

# 📌 Reading Template

```js
const template = fs.readFileSync(
  htmlTemplatePath,
  "utf-8",
);
```

Reads the HTML template file.

---

# ⚛️ Rendering React To HTML

```js
const appHtml =
  ReactDOMServer.renderToStaticMarkup(
    React.createElement(App, { teas }),
  );
```

---

# 🧠 What renderToStaticMarkup Does

It converts React components into:

```txt id="m0x3vh"
Pure Static HTML
```

without hydration or React runtime.

---

# ⚡ Internal Flow

```txt id="y4r8mv"
React Component
        ↓
ReactDOMServer
        ↓
HTML String Generated
```

---

# 📌 Injecting HTML Into Template

```js
const finalHTML = template.replace(
  "<!--app-->",
  appHtml,
);
```

This inserts generated React HTML into the template.

---

# 📌 Creating dist Folder

```js
fs.ensureDirSync(outputPath);
```

Creates the `dist/` folder if it does not exist.

---

# 📌 Writing Final HTML File

```js
fs.writeFileSync(
  outputHtmlPath,
  finalHTML,
  "utf-8",
);
```

Writes the generated HTML into:

```txt id="r7x5tm"
dist/index.html
```

---

# 📌 Final Console Message

```js
console.log(
  "Build completed. Output written to dist/index.html"
);
```

Confirms build success.

---

# 🌳 Complete SSG Flow

```txt id="n3v2pk"
React Components
        ↓
Node.js Build Script
        ↓
ReactDOMServer
        ↓
Generate HTML String
        ↓
Inject Into Template
        ↓
Create dist/index.html
        ↓
Static Website Ready
```

---

# ⚡ Running the Build

```bash
npm run build
```

This executes:

```txt id="k6p1wd"
node scripts/build.js
```

---

# 🚀 Serving Static Files

```bash
npm run serve
```

This serves:

```txt id="w0s9qr"
dist/
```

as a static website.

---

# 🧠 Why SSG Is Fast

Because users receive:

```txt id="z7v4lt"
Ready HTML
```

instead of waiting for React to generate UI in browser.

---

# ⚡ CSR vs SSG

| CSR                  | SSG                        |
| -------------------- | -------------------------- |
| Browser generates UI | Build process generates UI |
| Slower first load    | Faster first load          |
| Weaker SEO           | Better SEO                 |
| Requires more JS     | Less JS required           |
| Dynamic rendering    | Pre-generated HTML         |

---

# ⚛️ How Gatsby Works Internally

Gatsby internally performs:

```txt id="h9x4vn"
Fetch Data
      ↓
Render React
      ↓
Generate Static HTML
      ↓
Generate Static Assets
      ↓
Create dist/build Folder
      ↓
Deploy Static Site
```

This project recreates the core concept manually.

---

# 🧠 Behind The Scenes Goal

This chapter is NOT just about building a static page.

It teaches:

```txt id="e3v1ro"
How Modern React Frameworks Work Internally
```

---

# 📌 Final Generated HTML

The final generated HTML inside:

```txt id="f0n5qb"
dist/index.html
```

will already contain:

```html
<h1>Hello World</h1>
<p>This is a paragraph</p>
<ul>
  <li>Masala Chai: Strong spiced Indian tea.</li>
  <li>Elaichi Chai: Cardamom flavored chai.</li>
  <li>Ginger Chai: Infused with fresh ginger.</li>
</ul>
```

before browser JavaScript even runs.

---

# 🧠 What You Learned

✅ What is SSG

✅ Why SSG exists

✅ How Gatsby works internally

✅ ReactDOMServer basics

✅ renderToStaticMarkup()

✅ dist folder purpose

✅ build pipeline

✅ template injection

✅ static HTML generation

✅ Node.js build scripts

✅ server-side React rendering

✅ behind-the-scenes React architecture

---
