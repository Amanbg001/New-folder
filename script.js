const getNewQuoteButton = document.getElementById('get-new-quote');
const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');

getNewQuoteButton.addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:8000/quotes'); 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); 

        if (!Array.isArray(data) || data.length === 0) {
            throw new Error('No quotes found');
        }

        const randomQuote = data[Math.floor(Math.random() * data.length)];
        quoteElement.textContent = randomQuote.text;
        authorElement.textContent = randomQuote.author;
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
});
