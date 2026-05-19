const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {
  // HOME PAGE
  if (req.url === "/" && req.method === "GET") {
    const homePath = path.join(__dirname, "pages", "home.html");

    fs.readFile(homePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Internal Server Error");
        return;
      }

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  }

  // CONTACT PAGE
  else if (req.url === "/contact" && req.method === "GET") {
    const contactPath = path.join(__dirname, "pages", "contact.html");

    fs.readFile(contactPath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Internal Server Error");
        return;
      }

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  }

  // THANK YOU PAGE
  else if (req.url === "/thank-you" && req.method === "GET") {
    const thankyouPath = path.join(__dirname, "pages", "thankyou.html");

    fs.readFile(thankyouPath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Internal Server Error");
        return;
      }

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  }

  // CSS FILE
  else if (req.url === "/css/style.css" && req.method === "GET") {
    const cssPath = path.join(__dirname, "public", "css", "style.css");

    fs.readFile(cssPath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("CSS Error");
        return;
      }

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/css");
      res.end(data);
    });
  }

  // IMAGE
  else if (req.url === "/images/profile.jpg" && req.method === "GET") {
    const imagePath = path.join(__dirname, "public", "images", "profile.jpg");

    fs.readFile(imagePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Image Error");
        return;
      }

      res.statusCode = 200;
      res.setHeader("Content-Type", "image/jpeg");
      res.end(data);
    });
  }

  // FORM SUBMIT
  else if (req.url === "/submit" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const formData = new URLSearchParams(body);

      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");

      if (!name || !email || !message) {
        res.statusCode = 302;
        res.setHeader("Location", "/404");
        res.end();
        return;
      }

      const newMessage = {
        name,
        email,
        message,
      };

      const filePath = path.join(__dirname, "data", "messages.json");

      fs.readFile(filePath, "utf8", (err, data) => {
        let messages = [];

        if (!err && data.trim() !== "") {
          messages = JSON.parse(data);
        }

        messages.push(newMessage);

        fs.writeFile(filePath, JSON.stringify(messages, null, 2), (err) => {
          if (err) {
            res.statusCode = 500;
            res.end("Internal Server Error");
            return;
          }

          res.statusCode = 302;
          res.setHeader("Location", "/thank-you");
          res.end();
        });
      });
    });
  }

  // 404 PAGE ROUTE
  else if (req.url === "/404" && req.method === "GET") {
    const errorPath = path.join(__dirname, "pages", "404.html");

    fs.readFile(errorPath, (err, data) => {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  }
  // 404 PAGE
  else {
    const errorPath = path.join(__dirname, "pages", "404.html");

    fs.readFile(errorPath, (err, data) => {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
