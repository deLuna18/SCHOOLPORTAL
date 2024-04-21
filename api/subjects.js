const express = require("express");
const mysql = require("mysql");
const router = express.Router();
require("dotenv").config()
const db_config= {
	host:process.env.DB_HOST,
	user:process.env.DB_USER,
	password:process.env.DB_PASSWORD,
	database:process.env.DB_NAME,
	multipleStatements:true
}
const db = mysql.createPool(db_config);
//
//router to display all subjects
router.get("/",(req,res)=>{
	let sql = "SELECT * FROM `subjects`";
	db.query(sql,(err,results,fields)=>{
		if(err){
			console.log({message:'query error'});
			res.status(500).json({message:err});
		}
		res.status(200).json(results);
	});
});

//router to display one subject
router.get("/:edpcode",(req,res)=>{
	let email = req.params.email;
	let sql = "SELECT * FROM `subjects` WHERE `edpcode`=?"; //using placeholder
	db.query(sql,email,(err,results,fields)=>{
		if(err){
			console.log({message:'query error'});
			res.status(500).json({message:err});
		}
		res.status(200).json(results);
	});
});

//router to delete one subject
router.delete("/:edpcode", (req, res) => {
    let edpcode = req.params.edpcode;
    let sql = "DELETE FROM `subjects` WHERE `edpcode`=?";
    db.query(sql, edpcode, (err, results, fields) => {
        if (err) {
            console.log({ message: 'query error' });
            res.status(500).json({ message: err });
        }
        res.status(200).json(results);
    });
});

//router to add one subject
router.post("/", (req, res) => {
    let edpcode = req.body.edpcode;
    let subjectcode = req.body.subjectcode;

    let sql = "INSERT INTO `subjects`(`edpcode`, `subjectcode`) VALUES (?, ?)";
    let values = [edpcode, subjectcode];

    db.query(sql, values, (err, results, fields) => {
        if (err) {
            console.log({ message: 'query error' });
            res.status(500).json({ message: err });
        }
        res.status(200).json(results);
    });
});

//router to update one student
router.put("/", (req, res) => {
    let idno = req.body.idno;
    let lastname = req.body.lastname;
    let firstname = req.body.firstname;
    let course = req.body.course;
    let level = req.body.level;

    let sql = "UPDATE `students` SET `idno`=?, `lastname`=?, `firstname`=?, `course`=?, `level`=? WHERE `idno`=?";
    let values = [idno, lastname, firstname, course, level, idno]; // Array of values to replace placeholders

    db.query(sql, values, (err, results, fields) => {
        if (err) {
            console.log({ message: 'query error' });
            res.status(500).json({ message: err });
        }
        res.status(200).json(results);
    });
});

module.exports = router