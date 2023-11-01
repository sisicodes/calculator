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
    if (num2==0) {
        return 'silly'
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
    const numRegex = /[0-9]+/
    const perRegex = /\./
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
    console.log(`num2 is ${num2}`);
    num2 = Number(num2);
    return [num1,num2,op];

}


function updateDisplay(displayValue) {
    display.textContent = displayValue;
};



let opArray = ['+', '-', 'x', '/'];
const opRegex = /\++\/+\x+/;
let clear = document.querySelector('#clear');
clear.addEventListener('click', function() {
    displayValue = '';
    updateDisplay(displayValue);
});
let equal = document.querySelector('#equal');
equal.addEventListener('click', function() {
    const numRegex = /[0-9]+/
    displayArray = displayValue.split('');
    console.log(`displayValue at equals is ${displayValue}`)
    if (displayArray.length==0) {
        return;
    } else if (opArray.includes(displayArray.slice(-1)[0])) {
        console.log('in here?')
        return;
    } else if (!isNaN(Number(displayValue))) {
        console.log(`display value is ${Number(displayValue)}`)
        console.log('in here 2?')
        return;
    };
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
            } else if (displayArray.length==0){
                return;

            } else if (!opRegex.test(displayValue)) {
                console.log('entered opRegex')
                console.log(`display value is ${displayValue}`)
                displayValue += btn.textContent;
                updateDisplay(displayValue);
                displayArray = displayValue.split('');
                return;
            } else {
                if (displayArray[0] == '-') {
                    let displayValue =display.textContent;
                    displayValue+=btn.textContent;
                    updateDisplay(displayValue);
                    displayArray = displayValue.split('');
                    return;
                };
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

