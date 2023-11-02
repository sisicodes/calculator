let display = document.querySelector('.display');
let displayValue = '';
let displayArray;
const opArray = ['+', '-', 'x', '/'];
const opRegex = /\++\/+\x+/;
const numRegex = /[0-9]+/;
const perRegex = /\./;
const errRegex = /err+/;


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
    if (num2==0) {
        return 'error'
    }
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

    if (array[0]=='-') {
        i = 1;
        num1 = '-';
    }
    while (numRegex.test(array[i]) || perRegex.test(array[i])) {
        num1= num1.concat(array[i]);
        ++i;
    };
    num1 = Number(num1);
    op = array[i];
    num2 = array.slice(i+1);
    num2 = num2.join('');
    num2 = Number(num2);
    return [num1,num2,op];

}


function updateDisplay(displayValue) {
    display.textContent = displayValue;
};


function calculationHelper(array) {
    let evalArray = getOperationVars(array);
    let result = operate(evalArray[0], evalArray[1], evalArray[2]);
    let resultString = result.toString();
    return resultString; 
}



let clear = document.querySelector('#clear');
clear.addEventListener('click', function() {
    displayValue = '';
    updateDisplay(displayValue);
});


let equal = document.querySelector('#equal');
equal.addEventListener('click', function() {
    displayArray = displayValue.split('');
    if (displayArray.length==0) {
        return;
    } else if (errRegex.test(displayValue)) {
        return;
    } else if (opArray.includes(displayArray.slice(-1)[0])) {
        return;
    } else if (!isNaN(Number(displayValue))) {
        return;
    };
    displayValue = calculationHelper(displayArray);
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
        } else if (errRegex.test(displayValue)) {
            return;
        };
        if (opArray.includes(btn.textContent)) { 
            if (opArray.includes(displayArray.slice(-1)[0])) {
                return;
            } else if (displayArray.length==0 && btn.textContent!= '-'){
                return;

            } else if (!isNaN(Number(displayValue))) {

                displayValue += btn.textContent;
                updateDisplay(displayValue);
                return;
            }; 
            displayValue = calculationHelper(displayArray);
            displayValue += btn.textContent;
            updateDisplay(displayValue);
            return;

            } else {
            displayValue += btn.textContent;
            updateDisplay(displayValue);
            return;
        };
        
    });
});

