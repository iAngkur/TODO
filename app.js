import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Use IPv4 loopback address to avoid potential IPv6 issues
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB")
    .then(() => console.log('Database Connected!'))
    .catch((err) => console.error('Database Connection Error:', err));

const itemSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model('Item', itemSchema);

const item1 = new Item({ name: 'Buy Food' });
const item2 = new Item({ name: 'Cook Food' });
const item3 = new Item({ name: 'Eat Food' });

const defaultItems = [item1, item2, item3];

const listSchema = new mongoose.Schema({
    name: String,
    items: [itemSchema]
});

const List = mongoose.model('List', listSchema);


// Item.insertMany(defaultItems)
//      .then(() => console.log('Data inserted successfully!'))
//      .catch((err) => console.error('Data Insertion Error:', err));




app.get('/', (req, res) => {

    Item.find({})
        .then((data) => {
            res.render('list.ejs', {
                listTitle: 'Today',
                newListItems: data
            });
        })
        .catch((err) => {
            console.error(err);
            res.send('An error occurred while retrieving items.');
        });

});

app.get('/:customListName', async (req, res) => {
    const customListName = req.params.customListName;


    const data = await List.findOne({ name: customListName });

    if (data) {
        console.log('Already exists!');
        res.render('list.ejs', {
            listTitle: data.name,
            newListItems: data.items
        });
    } else {

        const list = new List({
            name: customListName,
            items: defaultItems
        });

        list.save();
        res.render('list.ejs', {
            listTitle: customListName,
            newListItems: defaultItems
        });
    }
});

app.post('/', (req, res) => {
    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
        name: itemName
    })

    if (listName === 'Today') {
        item.save();
        res.redirect('/');
    } else {
        List.findOne({ name: itemName }, (err, foundList) => {
            foundList.items.push(item);
            foundList.save();
            res.redirect('/' + listName);
        });
    }
});

app.post('/delete/:itemId', (req, res) => {

    const id = req.params['itemId'];
    console.log(id);

    Item.findOneAndDelete({ _id: id })
        .then(() => {
            console.log('Data deleted!');
        })
        .catch((err) => {
            console.error(err);
        });
    res.redirect('/');
});



app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});
