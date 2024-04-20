const express = require("express");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// VERIFICATION 
const users = [
    { username: 'user@uc.com', password: '12345' },
    { username: 'alexa', password: 'thegreat' },
    { username: 'cedy', password: 'marie' }
];

const port = process.env.PORT || 4321;

// LOGIN
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.status(200).send("Login successful!");
    } else {
        res.status(400).send("Invalid Credentials. Please try again!");
    }
});

// ROUTES
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


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/login.html"));
});

//LISTENING AT PORT
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});