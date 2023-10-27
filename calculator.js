let num1;
let num2;
let op;
let display = document.querySelector('.display');
let displayValue = '';
let displayArray;

function add(num1,num2) {
    return num1 + num2;
};

function subtract(num1, num2) {
    return num1-num2;
};

function multiply(num1,num2) {
    return num1*num2;
}

function divide(num1,num2) {
    let decimalPlaces = 2;
    return Math.round(num1*(10**decimalPlaces)/num2)/(10**decimalPlaces);
}

function operate(num1,num2,op) {
    switch (op) {
        case '+':
            return add(num1,num2);
        case '-':
            return subtract(num1,num2);
        case '/':
            return divide(num1,num2);
        case 'x':
            return multiply(num1,num2);
    }
}

function getOperationVars(array) {
    let i=0;
    let num1 = '';
    let num2 = '';
    let op = '';
    const numRegex = /\d/
    while (numRegex.test(array[i])) {
        num1= num1.concat(array[i]);
        ++i;
    };
    num1 = parseInt(num1);
    op = array[i];
    num2 = array.slice(i+1);
    num2 = parseInt(num2);
    return [num1,num2,op];

}


function updateDisplay(displayValue) {
    display.textContent = displayValue;
};



let opArray = ['+', '-', 'x', '/'];
const opRegex = /\D+/;
let clear = document.querySelector('#clear');
clear.addEventListener('click', function() {
    displayValue = '';
    updateDisplay(displayValue);
});

let equal = document.querySelector('#equal');
equal.addEventListener('click', function() {
    displayArray = displayValue.split('');
    let evalArray = getOperationVars(displayArray);
    let result = operate(evalArray[0], evalArray[1], evalArray[2]);
    let resultString = result.toString();
    displayValue = resultString;
    updateDisplay(displayValue);
    return;

});


let btns = document.querySelectorAll(".input");
btns.forEach(btn => {
    btn.addEventListener('click', function() {
        displayValue = display.textContent;
        displayArray = displayValue.split('');
        if (displayArray.length>=12) {
            return;
        };
        if (opArray.includes(btn.textContent)) {
            if (opArray.includes(displayArray.slice(-1)[0])) {
                console.log('immediately after not allowed')
                return;
            } else if (!opRegex.test(displayValue)) {
                displayValue += btn.textContent;
                updateDisplay(displayValue);
                displayArray = displayValue.split('');
                return;
            } else {
                let evalArray = getOperationVars(displayArray);
                let result = operate(evalArray[0], evalArray[1], evalArray[2]);
                let resultString = result.toString();
                let displayValue = resultString;
                displayValue += btn.textContent;
                updateDisplay(displayValue);
                console.log(`display value in double op call is ${displayValue}`)
                displayArray = displayValue.split('');
                return;
            };
        } else {
            console.log('is this where my issue is')
            console.log(`display value is before ${displayValue}`)
            displayValue += btn.textContent;
            updateDisplay(displayValue);
            displayArray = displayValue.split('');
            console.log(`display value is after ${displayValue}`)
            return;
        };
        
    });
});

