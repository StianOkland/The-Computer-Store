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
const featuresElement = document.getElementById('features');



let balance = 200;
let computers = [];
let haveLoen = 0;
let currentLoan = 0
let pay = 0;
let computerprice = 0;

balanceElement.innerText = balance;
payElement.innerText = pay;

// Fetch data about computers from api. Then add each computer to a list used for a dropdown menu.
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

// Function to handle change in dorpdown menu. When selected computer is changed features-list and window
// for displaying image, a description and price for the selected computer.
const handleComputerChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];
    computerNameElement.innerText = selectedComputer.title;
    computerDescriptionElement.innerText = selectedComputer.description;
    computerPriceElement.innerText = selectedComputer.price;
    computerprice = selectedComputer.price
    imageElement.src = selectedComputer.image;

    featuresElement.innerText = '';
    selectedComputer.specs.forEach( function (spec) {
        let li = document.createElement('li');
        featuresElement.appendChild(li);
        li.innerText += spec;
    })
}

// Handle buy function by alert the user that the comuter is bought or if there are not enough money
// Will change balance according to the current balance and price of the computer.
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


// Handle new loan. If there is no loan from before the user can loan upto the double of the current balance.
// Set repay button to visible and makes the loan visible for the user.
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

// When hitting the work button add 100 to pay.
const handleWork = () => {
    pay += 100;
    payElement.innerText = pay;
}

// If the user does not have a loan bank all of pay to the balance.
// If have loan, 10% of pay goes to pay back the loan, rest is added to the balance.
const handleBank = () => {
    if(haveLoen === 0) {
        balance += pay;
        pay = 0;

        balanceElement.innerText = balance;
        payElement.innerText = pay;
    }
    else {
        if((pay*(0.10)) < currentLoan) {
            currentLoan -= (pay*(0.10)); 
        }
        else {
            balance += (pay*(0.10)) - currentLoan;
            currentLoan = 0;
            loanSectionElement.style.visibility = 'hidden';
        }
        
        balance += (pay*(0.90));
        pay = 0;
        balanceElement.innerText = balance;
        payElement.innerText = pay;
        loanElement.innerText = currentLoan;
    }
}

// If loan is bigger then the pay, subtract pay from loan.
// If pay is bigger than the loan, delete the loan and add rest to balance.
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
    else {
        currentLoan -= pay;
        pay = 0;
        loanElement.innerText = currentLoan;
        payElement.innerText = pay;
    }
}

loanButtonElement.addEventListener('click', handleGetLoan);
workButtonElement.addEventListener('click', handleWork);
bankButtonElement.addEventListener('click', handleBank);
repayButtonElement.addEventListener('click', handleRepay);
buyButtonElement.addEventListener('click', handleBy)
computersElement.addEventListener('change', handleComputerChange)
