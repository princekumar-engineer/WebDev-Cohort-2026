import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./src/App.js";


const app = express();

app.get("/", (req, res) => {
    res.send("hello world");
});

app.get("/chaicode", (req, res) => {
    const appHtml = ReactDOMServer.renderToString(React.createElement(App));

    res.setHeader("Content-Type", "text/html");
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
        </head>
        <body>
            <div id="root">${appHtml}</div>
        </body>
        </html>
    `);
});



app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
