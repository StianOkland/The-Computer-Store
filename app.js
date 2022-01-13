const balanceElement = document.getElementById('balance');
const loanElement = document.getElementById('loan')
const loanSectionElement = document.getElementById('loansection');
const loanButtonElement = document.getElementById('loanbutton');
const computersElement = document.getElementById('computers');

let balance = 200;
let computers = [];
let haveLoen = 0;
let currentLoan = 0


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
        loanSectionElement.style.visibility = "visible";
    }
}


balanceElement.innerText = balance;
loanButtonElement.addEventListener('click', handleGetLoan);
