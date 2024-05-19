// const express = require('express');
// const bodyParser = require('body-parser');
// const date = require(__dirname + '/date.js');

import express from 'express';
import bodyParser from 'body-parser';
import {getDate, getDay} from './date.js';

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const items = ['Buy Food', 'Cook Food', 'Eat Food'];
const workItems = [];

app.get('/', (req, res) => {

    const day = getDay();
    res.render('list.ejs', {
        listTitle: day,
        newListItems: items
    });
});

app.post('/', (req, res) => {
    const item = req.body.newItem;

    if (item) {
        if (req.body.list == "Work") {
            workItems.push(item);
            res.redirect('/work');
        } else {
            items.push(item);
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }

});


app.get('/work', (req, res) => {
    res.render('list.ejs', { listTitle: "Work", newListItems: workItems })
});


app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});

