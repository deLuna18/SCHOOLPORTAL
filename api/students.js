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
// router to display all students
router.get("/", (req, res) => {
    let sql = "SELECT * FROM `students`";
    db.query(sql, (err, results, fields) => {
        if (err) {
            console.log({ message: 'query error' });
            res.status(500).json({ message: err });
        }
        res.status(200).json(results);
    });
});


//router to display one student
router.get("/:idno",(req,res)=>{
	let idno = req.params.idno;
	let sql = "SELECT * FROM `students` WHERE `idno`=?"; //using placeholder
	db.query(sql,idno,(err,results,fields)=>{
		if(err){
			console.log({message:'query error'});
			res.status(500).json({message:err});
		}
		res.status(200).json(results);
	});
});

//router to delete one student
router.delete("/:idno",(req,res)=>{
	let idno = req.params.idno;
	let sql = "DELETE FROM `students` WHERE `idno`=?"; //using placeholder
	db.query(sql,idno,(err,results,fields)=>{
		if(err){
			console.log({message:'query error'});
			res.status(500).json({message:err});
		}
		res.status(200).json(results);
	});
});

//router to add one student
router.post("/",(req,res)=>{
	let idno = req.body.idno;
	let lastname = req.body.lastname;
	let firstname = req.body.firstname;
	let course = req.body.course;
	let level = req.body.level;
	
	let sql = "INSERT INTO `students`(`idno`,`lastname`,`firstname`,`course`,`level`) VALUES('"+idno+"','"+lastname+"','"+firstname+"','"+course+"','"+level+"')";
	db.query(sql,(err,results,fields)=>{
		if(err){
			console.log({message:'query error'});
			res.status(500).json({message:err});
		}
		res.status(200).json(results);
	});
});

//router to update one student
router.put("/",(req,res)=>{
	let idno = req.body.idno;
	let lastname = req.body.lastname;
	let firstname = req.body.firstname;
	let course = req.body.course;
	let level = req.body.level;
	
	let sql = "UPDATE `students` SET `idno`='"+idno+"' WHERE `lastname`='"+lastname+"' `firstname`='"+firstname+"' WHERE `email`='"+email+"' `password`='"+password+"' WHERE `email`='"+email+"'"
	db.query(sql,(err,results,fields)=>{
		if(err){
			console.log({message:'query error'});
			res.status(500).json({message:err});
		}
		res.status(200).json(results);
	});
});

module.exports = router