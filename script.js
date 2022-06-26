// get all digit buttons
let digits = document.querySelectorAll('.digit');
// get calculator display
let display = document.querySelector('.display');
// get clear button
let clear = document.querySelector('.clear');
// get operator buttons
let operators = document.querySelectorAll('.operator');


// stacks to store numbers and operators
let numStack = [];
let opStack = [];

// clear event listener
clear.addEventListener('click', () => {
    display.textContent = '';
});


// operator event listener
operators.forEach( operator => {
    operator.addEventListener('click', event => {

    });
});

// digits event listener
digits.forEach( digit => {
    digit.addEventListener('click', event => {

            
        // check if display length is greater than 1 billion and add digit to display
        display.textContent.length <= 9 ? display.textContent += event.target.textContent : console.warn('max number reached');
    });
});

let addFunc = (n1, n2) => n1 + n2;

let subtractFunc = (n1, n2) => n1 - n2;

let multiplyFunc = (n1, n2) => n1 * n2;

let divideFunc = (n1,n2) => n1 / n2;

function operate(operator, n1, n2){
    let answer = 0;
    switch(operator){
        case '+':
            answer = addFunc(n1, n2);
            break;
        case '-':
            answer = subtractFunc(n1, n2);
            break;
        case '*':
            answer = multiplyFunc(n1,n2);
            break;
        case '/':
            answer = divideFunc(n1, n2);
            break;
        default:
            console.error(`${operator} Invalid Operator`);
            break; 
    }
    return answer;
}