const express = require('express')
const app =express()
const mysql= require('mysql')
const bodyparser=require('body-parser')
const cors =require('cors')

app.use(cors())
app.use(express.json())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
  }));

const db =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"jenidurga",
    database:"employeesystem"
})

app.post('/create',(req,res)=>{
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;
    
    console.log(name,age);
    db.query('INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?) '
    ,[name, age, country, position, wage]
    ,(err,result)=>{
        if (err) {
            console.log(err);
        }
        else{
            res.send("Values Inserted")
        }
    }
    )
})

app.get('/employees',(req,res)=>{
    db.query('select * from employees',(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    })
})

app.put('/update',(req,res) =>{
    const id= req.body.id;
    const wage =req.body.wage;
    db.query("update employees set wage =? WHERE id =?"
    ,[wage,id],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})


app.delete('/delete/:id',(req,res)=>{
    const id = req.params.id
    db.query("DELETE FROM employees WHERE id =?",id,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.listen(3003,()=>{
    console.log("Server is Running")
    
})