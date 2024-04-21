const express = require("express");
const path = require("path");
const users = require("./api/users");
const students = require("./api/students")
const subjects = require("./api/subjects")
const app = express();

app.use(express.urlencoded({"extended":true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
//middleware
app.use("/api/users",users);
app.use("/api/students",students);
app.use("/api/subjects",subjects)

require("dotenv").config()
const port = process.env.PORT || 4321;

// CONTENT ROUTES
app.get("/main", (req, res) => {
    res.sendFile(path.join(__dirname, "public/main.html"));
});

app.get("/student", (req, res) => {
    res.sendFile(path.join(__dirname, "public/student.html"));
});

app.get("/subject", (req, res) => {
    res.sendFile(path.join(__dirname, "public/subject.html"));
});

app.get("/enrollment", (req, res) => {
    res.sendFile(path.join(__dirname, "public/enrollment.html"));
});

app.get("/report", (req, res) => {
    res.sendFile(path.join(__dirname, "public/report.html"));
});

//default route
app.get("/",(req,res)=>{
	res.redirect("/login.html");
});

app.listen(port,()=>{
	console.log(`listening at port ${port}`);
});