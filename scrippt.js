const express = require('express');
const Joi = require('joi');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const quotesPath = path.join(__dirname, 'db.json');
let quotes = JSON.parse(fs.readFileSync(quotesPath, 'utf-8')).quotes;

app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

app.get('/api/quotes', (req, res) => {
    res.send(quotes);
});

app.get('/api/quotes/:id', (req, res) => {
    const quote = quotes.find(c => c.id === parseInt(req.params.id));
    if (!quote) {
        res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooooops...quote not found</h2>');
        return;
    }
    res.send(quote);
});

app.post('/api/quotes', (req, res) => {
    const { error } = validateQuote(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const quote = {
        id: quotes.length + 1,
        title: req.body.title,
        author: req.body.author
    };

    quotes.push(quote);
    updateQuotesFile();
    res.send(quote);
});

app.put('/api/quotes/:id', (req, res) => {
    const quote = quotes.find(c => c.id === parseInt(req.params.id));
    if (!quote) {
        res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooooops...quote not found</h2>');
        return;
    }

    const { error } = validateQuote(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    quote.title = req.body.title;
    quote.author = req.body.author;
    updateQuotesFile();
    res.send(quote);
});

app.delete('/api/quotes/:id', (req, res) => {
    const quote = quotes.find(c => c.id === parseInt(req.params.id));
    if (!quote) {
        res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooooops...quote not found</h2>');
        return;
    }

    const index = quotes.indexOf(quote);
    quotes.splice(index, 1);
    updateQuotesFile();
    res.send(quote);
});

function validateQuote(quote) {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        author: Joi.string().min(3).required()
    });
    return schema.validate(quote);
}

function updateQuotesFile() {
    const data = JSON.stringify({ quotes });
    fs.writeFileSync(quotesPath, data, 'utf-8');
}

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port ${port}...`));
