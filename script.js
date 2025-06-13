const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.signs, .basic-signs, .top-signs');
buttons.forEach((button) => {
    button.addEventListener('click', handleButtonClick);
});

//Keyboard event listener
document.addEventListener('keydown', handleKeyboardInput);

// Variables to store calculator state
let currentInput = '0';
let previousInput = '0';
let currentOperator = '';

// Clearing all numbers and operators
function clear() {
    currentInput = '0';
    previousInput = "0";
    currentOperator = '';
}

//Checking if value is a number
function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

function appendInput(value) {
    // If the current input is '0', replace it with the new value, otherwise append to it.
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }
}

//Function for the DEL button
function deleteLast() {
    // Check if the current input is not empty
    if (currentInput.length > 0) {
      // Remove the last character from the current input
    currentInput = currentInput.slice(0, -1);
    
      // If the current input becomes empty, set it to '0'
    if (currentInput === '') {
        currentInput = '0';
    }
    }
}

    //Operator function
function isOperator(value) {
    return value === '+' || value === '-' || value === '*' || value === '/';
}

function toggleSign() {
    if (currentInput !== '0') {
        currentInput = (-parseFloat(currentInput)).toString();
    }
}

  //Function for modal operator
function percentage() {
    if (currentInput !== '0') {
        currentInput = (parseFloat(currentInput) / 100).toString();
    }
}

// Power function for exponentiation
function power() {
    if (currentOperator === '^' && previousInput !== '') {
        const base = parseFloat(previousInput);
        const exponent = parseFloat(currentInput);
        currentInput = Math.pow(base, exponent).toString();
        previousInput = '';
        currentOperator = '';
    }
}

  //Calculating the whole expression
function calculate() {
    // Handle power operation
    if (currentOperator === '^') {
        power();
        return;
    }

    // Convert input values to numbers
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    // Perform the calculation based on the current operator
    switch (currentOperator) {
        case '+':
            currentInput = (num1 + num2).toString();
        break;
        case '-':
            currentInput = (num1 - num2).toString();
        break;
        case '*':
            currentInput = (num1 * num2).toString();
        break;
        case '/':
        if (num2 !== 0) {
        currentInput = (num1 / num2).toString();
        } else {
            currentInput = 'Error';
        }
        break;
    }

    // Reset the previous input and operator
    previousInput = '';
    currentOperator = '';
}

function setOperator(operator) {
    // If a previous operator exists, perform the previous calculation
    if (currentOperator && previousInput !== '') {
        calculate();
    }

    // Update the current operator
    currentOperator = operator;

    // Store the current input as the previous input
    previousInput = currentInput;

    // Reset the current input to '0'
    currentInput = '0';
}

// Handle keyboard input
function handleKeyboardInput(event) {
    const key = event.key;
    
    // Prevent default behavior for calculator keys
    const calculatorKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
                           '+', '-', '*', '/', '=', 'Enter', '.', 'Backspace', 
                           'Delete', 'Escape', 'c', 'C', '%'];
    
    if (calculatorKeys.includes(key)) {
        event.preventDefault();
    }

    switch (key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            appendInput(key);
            break;
        case '.':
            if (!currentInput.includes('.')) {
                appendInput(key);
            }
            break;
        case '+':
            setOperator('+');
            break;
        case '-':
            setOperator('-');
            break;
        case '*':
            setOperator('*');
            break;
        case '/':
            setOperator('/');
            break;
        case '^':
            setOperator('^');
            break;
        case '=':
        case 'Enter':
            calculate();
            break;
        case 'Backspace':
        case 'Delete':
            deleteLast();
            break;
        case 'Escape':
        case 'c':
        case 'C':
            clear();
            break;
        case '%':
            percentage();
            break;
        default:
            return; // Don't update display for unhandled keys
    }

    updateDisplay();
}

function handleButtonClick(event) {
    const buttonValue = event.target.innerText || event.target.alt;

    switch (buttonValue) {
        case 'C':
            clear();
            break;
        case '+/-':
            toggleSign();
            break;
        case '%':
            percentage();
            break;
        case '=':
            calculate();
            break;
        case 'delete':
            deleteLast();
            break;
        case 'multiply':
            setOperator('*');
            break;
        case 'divide':
            setOperator('/');
            break;
        case '^':
            setOperator('^');
            break;
        default:
            if (isNumeric(buttonValue) || buttonValue === '.') {
                appendInput(buttonValue);
            } else if (isOperator(buttonValue)) {
                setOperator(buttonValue);
            }
            break;
    }

    updateDisplay();
}

//Display function
function updateDisplay() {
    display.innerText = currentInput;
}

//Clear display on page reload
window.onload = () => {
    clear();
    updateDisplay();
};