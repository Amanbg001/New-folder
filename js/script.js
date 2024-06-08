const quoteContainer = document.getElementById('quote-container');
const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const getNewQuoteButton = document.getElementById('get-new-quote');

getNewQuoteButton.addEventListener('click', async () => {
    try {
        const response = await fetch('quotes.json');
        const data = await response.json();
        const randomQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)];
        quoteElement.textContent = randomQuote.text;
        authorElement.textContent = randomQuote.author;
    } catch (error) {
        console.error(error);
    }
});