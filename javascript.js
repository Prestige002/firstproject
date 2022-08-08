const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('quote-container');
const getloader = document.getElementById('loader');

let apiQuotes = [];
// show Loading
function loading() {
 getloader.hidden = false;
 quoteContainer.hidden = true;
}
// complete Loading
function compLoading() {
 getloader.hidden = true;
 quoteContainer.hidden = false;
}
//  Show new Quote
function randQuotes() {
 loading();
 //  pick a random quote from ApiQuote array
 let getRandQuotes = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
 // let getRandQuotes = localQuotes[Math.floor(Math.random() * localQuotes.length)];
 
 // check if author filed is blank and replace it with 'UNKNOWN'
 if (getRandQuotes.author === null) {
  authorText.textContent = 'UNKNOWN';
 } else {
  authorText.textContent = getRandQuotes.author;
 }
 //Check Quote length to determine stlying
 if (getRandQuotes.text.length > 50) {
  quoteText.classList.add('long-quote');
 } else {
  quoteText.classList.remove('long-quote');
 }
 quoteText.textContent = getRandQuotes.text;
 compLoading();
}

// url fetch quote
// Get Quote from API
async function fetchQuotes() {
 loading();
 const urlQuotes = 'https://type.fit/api/quotes';
 try {
  const response = await fetch(urlQuotes);
  apiQuotes = await response.json();
  randQuotes();
 } catch (error) {
  // catch your error here
  console.log(error)
 }
}

// Tweet Quote
function tweetQuote() {
 const tweeterUrl = `http://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
 window.open(tweeterUrl, '_blank');
}

// Event listener
newQuoteBtn.addEventListener('click', randQuotes);
twitterBtn.addEventListener('click', tweetQuote)
// On-load
fetchQuotes();

