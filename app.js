const balanceElement = document.getElementById('balance');
const loanElement = document.getElementById('loan')
const loanSectionElement = document.getElementById('loansection');
const loanButtonElement = document.getElementById('loanbutton');
const computersElement = document.getElementById('computers');
const bankButtonElement = document.getElementById('bankbutton');
const workButtonElement = document.getElementById('workbutton');
const repayButtonElement = document.getElementById('repay');

const payElement = document.getElementById('pay');



let balance = 200;
let computers = [];
let haveLoen = 0;
let currentLoan = 0
let pay = 0;


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

balanceElement.innerText = balance;
loanButtonElement.addEventListener('click', handleGetLoan);

payElement.innerText = pay;
workButtonElement.addEventListener('click', handleWork);

bankButtonElement.addEventListener('click', handleBank);
repayButtonElement.addEventListener('click', handleRepay);
