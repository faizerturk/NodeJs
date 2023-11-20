const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My first response page</title></head>");
    res.write(
      "<body><h1>Main Page</h1><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Submit</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  //process.exit();
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first response page</title></head>");
  res.write("<body><h1>Response</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
