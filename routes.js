const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My first response page</title></head>");
    res.write(
      "<body><h1>Main Page</h1><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Submit</button></form></body>"
    );
    res.write("</html>");
    return res.end(); // to not move other lines
  }
  if (url === "/message" && method == "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      //writeFileSync, the synchronous mode and we block execution of the next line of code until this file is done
      //fs.writeFileSync("message.tsx", message);
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader = ("Location", "/");
        return res.end();
      });
    });
  }
  //process.exit();
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first response page</title></head>");
  res.write("<body><h1>Response</h1></body>");
  res.write("</html>");
  res.end();
};

//All the below codes are equal perspective of usage export
module.exports = requestHandler;

// module.exports = {
//   handler: requestHandler,
//   someText: "hard coded text",
// };

// module.exports.handler = requestHandler;
// module.exports.someText = "hard coded text"

// exports.handler = requestHandler;
// exports.someText = "hard coded text"
