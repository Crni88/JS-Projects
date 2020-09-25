const main = document.getElementById("main");
const adduserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showmillionaresBtn = document.getElementById("show-millionares");
const showbillionaresBtn = document.getElementById("show-billionares");
const sortBtn = document.getElementById("sort");

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();

//Fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

//Update DOM
function updateDOM(providedData = data) {
  //Clear the main DIV
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong>˘${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}
//Double money 
function doubleMoney() {
  data = data.map(user => {
    return {
      ...user,
      money: user.money * 2
    };
  });
  updateDOM();
}

//Add new object to arr
function addData(obj) {
  data.push(obj);
  updateDOM();
}

//Sort by richest
function sortbyRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

//Formats number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//Filters by millionares 
function showMillionares() {
  data = data.filter(item => item.money > 1000000);
  updateDOM();
}

//Filter billionaer
function showBillionares() {
  data = data.filter(item => item.money > 10000000);
  updateDOM();
}

//Event listeners
adduserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortbyRichest);
showmillionaresBtn.addEventListener("click", showMillionares);
showbillionaresBtn.addEventListener("click", showBillionares);