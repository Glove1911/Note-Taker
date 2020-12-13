// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3000;

const savedNotes = JSON.parse(fs.readFileSync(path.join(__dirname,'./db/db.json'),(err,data)=> {
    if (err) throw err;
}));

const updatedNotes = savedNotes => {
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(savedNotes), err => {
        if (err) throw err;
    })
}

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// html routes

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
  });

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

//   api routes

app.get('/api/notes', function(req,res){
    return res.JSON(savedNotes);
});
  
app.post('api/notes', function (req,res){
    let newNote = req.body;
    updatedNotes(newNote);
    return res.JSON(newNote);
});
  