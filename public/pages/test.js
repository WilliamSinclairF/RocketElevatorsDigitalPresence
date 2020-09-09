const numFloors = 45;
const numBasements = 4;
const numApartments = 500;
const shaftDollarCostToMultiply = 7565;
const percentValue = 10;

const URL = `/api/quote/residential/${numFloors}/${numBasements}/${numApartments}/${shaftDollarCostToMultiply}/${percentValue}`;

async function getQuote(url = URL) {
  const quote = await fetch(url, {
    method: 'GET',
  });
  return Object.assign(this.quoteData, quote.json());
}

// async function test(url = URL) {
//   const response = await fetch(url, {
//     method: 'GET',
//   });
//   return response.json();
// }

// test().then();

async function test(url = URL) {
  fetch(url, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}
