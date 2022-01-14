const balanceElement = document.getElementById('balance');
const loanElement = document.getElementById('loan')
const loanSectionElement = document.getElementById('loansection');
const loanButtonElement = document.getElementById('loanbutton');
const computersElement = document.getElementById('computers');
const bankButtonElement = document.getElementById('bankbutton');
const workButtonElement = document.getElementById('workbutton');
const repayButtonElement = document.getElementById('repay');
const payElement = document.getElementById('pay');
const computerNameElement = document.getElementById('computername');
const computerDescriptionElement = document.getElementById('computerdescription');
const computerPriceElement = document.getElementById('computerprice');
const buyButtonElement = document.getElementById('buybutton');
const imageElement = document.getElementById('computerimage');


let balance = 200;
let computers = [];
let haveLoen = 0;
let currentLoan = 0
let pay = 0;
let computerprice = 0;


fetch('https://noroff-komputer-store-api.herokuapp.com/computers')
.then(response => response.json())
.then(data => computers = data)
.then(computers => addComputers(computers))

const addComputers = (computers) => {
    computers.forEach(computer => addComputerToMenu(computer));
}

const addComputerToMenu = (computer) => {
    const computerElement = document.createElement('option');
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.title));
    computersElement.appendChild(computerElement);
}

const handleComputerChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];
    computerNameElement.innerText = selectedComputer.title;
    computerDescriptionElement.innerText = selectedComputer.description;
    computerPriceElement.innerText = selectedComputer.price;
    computerprice = selectedComputer.price
    imageElement.src =  'https://noroff-komputer-store-api.herokuapp.com/' + selectedComputer.image;
}


// Handle new loan, if not loan from before -> can get a loan opp to the
// current balance.
const handleGetLoan = () => {
    let selectedValue = prompt('How much to loan? Must be a number', '')
    
    if(haveLoen != 1 && selectedValue != null && parseInt(selectedValue) <= balance * 2) {        
        balance += parseInt(selectedValue);
        balanceElement.innerText = balance;
        haveLoen = 1;
        currentLoan = parseInt(selectedValue)
        loanElement.innerText = currentLoan;
        loanSectionElement.style.visibility = 'visible';
        repayButtonElement.style.visibility = 'visible';
    }
}

const handleWork = () => {
    pay += 100;
    payElement.innerText = pay;
}

const handleBank = () => {
    if(haveLoen === 0) {
        balance += pay;
        pay = 0;

        balanceElement.innerText = balance;
        payElement.innerText = pay;
    }
}

const handleRepay = () => {
    if(pay >= currentLoan) {
        pay -= currentLoan;
        currentLoan = 0;
        balance += pay;
        pay = 0;
        haveLoen = 0;
        balanceElement.innerText = balance;
        payElement.innerText = pay;
        loanSectionElement.style.visibility = 'hidden';
        repayButtonElement.style.visibility = 'hidden';

    }
}

const handleBy = () => {
    if(balance > computerprice) {
        alert('You are now a proud owner of this computer!');
        balance -= computerprice;
        balanceElement.innerText = balance;

    }
    else {
        alert('You dont have enough');
    }

}

balanceElement.innerText = balance;
payElement.innerText = pay;


loanButtonElement.addEventListener('click', handleGetLoan);
workButtonElement.addEventListener('click', handleWork);
bankButtonElement.addEventListener('click', handleBank);
repayButtonElement.addEventListener('click', handleRepay);
buyButtonElement.addEventListener('click', handleBy)
computersElement.addEventListener('change', handleComputerChange)
