// get all digit buttons
const digits = document.querySelectorAll('.digit');
// get calculator display
const display = document.querySelector('.display');
// get clear button
const clear = document.querySelector('.clear');
// get operator buttons
const operators = document.querySelectorAll('.operator');
// let operatorsArr = ['+','-','/','*'];
let operatorsArr = [];
operators.forEach((operator) => operatorsArr.push(operator.id));
// stacks to store numbers and operators
let stack = [];
display.textContent = null;


// clear event listener
clear.addEventListener('click', () => {
    stack = [];
    saveOp = undefined;
    display.textContent = null;
});

// equal sign button logic
let equals = document.getElementById('=');
equals.addEventListener('click', () => {
    checkEqualsValidity();
});

saveOp = undefined;
function checkEqualsValidity(){
    // stack must have a number and operator in there and display text must not be empty
    // if stack length is 2, perform operation on number itself
    if (stack.length == 1 && operatorsArr.includes(saveOp) && 
    display.textContent !== ''){
        let op = saveOp;
        saveOp = undefined;
        let num1 = stack.pop();
        let num2 = display.textContent;
        display.textContent = operate(op, num1, num2);
        stack.push(+display.textContent);
    } else if (stack.length == 2 && operatorsArr.includes(stack[stack.length -1])){
        let op = stack.pop();
        let num = stack.pop()
        display.textContent = operate(op, num, num);
        stack.push(display.textContent);
    } else return;
}

// operator event listener
operators.forEach( operator => {
    operator.addEventListener('click', event => {
        checkOperatorValidity(event);
    });
});


function checkOperatorValidity(event){
    // if stack length is less than 2 add operator and display text, 
    // if stack.length == 2, and display.text === stack[0] change operator else
    // perform operation
    if (typeof saveOp === 'string'){
        stack.push(saveOp);
        saveOp = undefined;
    }

    if (stack.length === 1 && typeof saveOp === "undefined"){
        stack.push(event.target.id)
        return;
    }
    if (stack.length === 0){
        stack.push(+display.textContent);
        stack.push(event.target.id);
    } else {
        let op = stack.pop();
        let num1 = stack.pop();
        let num2 = display.textContent;
        display.textContent = operate(op, num1, num2);
        stack.push(+display.textContent);
    }
    if(stack.length === 1){
        stack.push(event.target.id);
    }
    
}

// digits event listener
digits.forEach( digit => {
    digit.addEventListener('click', event => {
        if (stack.length == 2){
            saveOp = stack.pop();
            display.textContent = '';
        }
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
            answer = addFunc(+n1, +n2);
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