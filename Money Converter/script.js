const currencyElement_one = document.getElementById("currency-one");
const currencyElement_two = document.getElementById("currency-two");
const amountElement_one = document.getElementById("amount-one");
const amountElement_two = document.getElementById("amount-two");

const rateElement = document.getElementById("rate");
const swap = document.getElementById("swap");

//Updates the date
function updateDate(d) {
  const dateHtml = document.getElementById("date");
  dateHtml.innerHTML = d;
}

function updateTime(t) {
  console.log(typeof t);
  var digits = t.toString().split("");
  var realDigits = digits.map(Number);
  //console.log("Stack overflow", realDigits);
  //Gets hours
  var hours = realDigits.splice(0, 2);
  hours = hours.toString().replace(",", "");
  //Gets minutes
  var minutes = realDigits.splice(0, 2);
  minutes = minutes.toString().replace(",", "");
  //Gets seconds
  var seconds = realDigits.splice(0, 2);
  seconds = seconds.toString().replace(",", "");
  //Updates the time
  const timeHtml = document.getElementById("time");
  timeHtml.innerHTML = hours + ":" + minutes + ":" + seconds;
}
//Fetch exchange rate and update the DOM
function calculate() {
  //Get the selected currency
  var currency_one = currencyElement_one.value;
  var currency_two = currencyElement_two.value;
  //Gets back JSON array of objects
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then((res) => res.json()) //Promise from the server
    .then((data) => {
      //List of atributes
      //console.log(data);
      updateDate(data.date);
      updateTime(data.time_last_updated);
      const rate = data.rates[currency_two];
      //console.log(rate);
      rateElement.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountElement_two.value = (amountElement_one.value * rate).toFixed(2);
    });
}

//Event listener
currencyElement_one.addEventListener("change", calculate);
amountElement_one.addEventListener("input", calculate);
currencyElement_two.addEventListener("change", calculate);
amountElement_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyElement_one.value;
  currencyElement_one.value = currencyElement_two.value;
  currencyElement_two.value = temp;
  calculate();
});
//updateDate();
calculate();
