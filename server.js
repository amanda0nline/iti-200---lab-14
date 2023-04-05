const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const Pool = require('pg').Pool

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));

const pool = new Pool({
    host: 'localhost',
    database: 'postgres',
    user: 'postgres',
    password: 'unclepickle',
    port: 5432,
})


// Add here your routes
app.get("/api/users", (req, res) => {

    pool.query('SELECT * FROM users', (error, results) => {
       
        if (error) throw error
 
        res.status(200).json(results.rows)
    })
 });
 
 app.post("/api/users/create", (req, res) => {

    console.log(req.body);
    
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
 
    const sql = "INSERT INTO users (id, name, email) VALUES (" + id + ", '" + name + "', '" + email + "')";
 
    pool.query(sql, (error, results) => {
 
        if (error) throw error
 
        res.status(200).json(results.rows)
    });
 })
 

app.listen(3000, function(){
    console.log("The app is running at port 3000")
})