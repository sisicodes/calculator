let num1
let num2
let op

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


