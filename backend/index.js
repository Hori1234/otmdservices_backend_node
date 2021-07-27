const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
var cors = require("cors");
// Init Express Server
const app = express();

app.use(express.static("public"));
//Init Middledware
app.use(logger);
app.use(cors()); // Use this after the variable declaration
//Set static folder
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/members", require("./routes/api/MembersModel/members"));
app.use("/api/pdfs", require("./routes/api/PDFModel/pdfs"));

const PORT = process.env.PORT || 5171;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
