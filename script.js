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

// sign change event
let sign = document.querySelector('.sign');
sign.addEventListener('click', () => {
    if (stack[0] === +display.textContent){
        stack[0] *= -1;
    }
    display.textContent *= -1;
});

// percentage event
let percentage = document.querySelector('.percentage');
percentage.addEventListener('click', () =>{
        percent = operate('%', +display.textContent);
        equalsFlag = false;
    if (stack[0] === +display.textContent)
        stack[0] = percent;
    else{
        display.textContent = percent;      
    } 
});

// decimal event
let decimal = document.querySelector('.decimal');
decimal.addEventListener('click', () => {
    equalsFlag = false;
    if (display.textContent.includes('.'))
        return;
    else display.textContent += '.';
});

// clear event listener
clear.addEventListener('click', () => {
    // clear stack and saveOp
    stack = [];
    saveOp = undefined;
    equalsFlag = false;
    display.textContent = null;
});

// equal sign button logic
let equalsFlag = false;
let equals = document.getElementById('=');
equals.addEventListener('click', () => {
    checkEqualsValidity();
});

// use saveOp to hold operator when entering second number in display
// see digits event handler
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
        equalsFlag = true;
    } else if (stack.length == 2 && operatorsArr.includes(stack[stack.length -1])){
        let op = stack.pop();
        let num = stack.pop()
        display.textContent = operate(op, num, num);
        stack.push(+display.textContent);
        equalsFlag = true;
    } else return;
}

// operator event listener
operators.forEach( operator => {
    operator.addEventListener('click', event => {
        checkOperatorValidity(event);
    });
});


function checkOperatorValidity(event){
    // check if equalsFlag is true, we continue operation on result
    if (equalsFlag === true){
        equalsFlag = false;
    }
    // override operator 
    // if saveOp is storing operator, push to stack and make saveOp null
    if (typeof saveOp === 'string'){
        stack.push(saveOp);
        saveOp = undefined;
    }

    // if operator is not valid, push the clicked operator and return
    if (stack.length === 1 && typeof saveOp === "undefined"){
        stack.push(event.target.id)
        return;
    }
    
    // if stack is empty, push display number and operator
    // else we pop operator from stack and operate on prev number and display number
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
    // push event clicked to stack to keep stack length at 2 after operate() call
    if(stack.length === 1){
        stack.push(event.target.id);
    }
}

// digits event listener
digits.forEach( digit => {
    digit.addEventListener('click', event => {
        // clear display and save operator in saveOp
        if (stack.length == 2){
            saveOp = stack.pop();
            display.textContent = '';
        }
        // if equals was last button pressed, clear the display, clear the stack
        if (equalsFlag === true){
            display.textContent = '';
            equalsFlag = false;
            stack = [];
        }
        // check if display length is greater than 1 billion and add digit to display
        display.textContent.length <= 9 ? display.textContent += event.target.textContent : console.warn('max number reached');
    });
});

let addFunc = (n1, n2) => {
    let num = n1 + n2;
    return num.toString().length > 9 ? num.toPrecision(9) : num;
}
let subtractFunc = (n1, n2) => {
    let num = n1 - n2;
    return num.toString().length > 9 ? num.toPrecision(9) : num;
}
let multiplyFunc = (n1, n2) => {
    let num = n1 * n2;
    return num.toString().length > 9 ? num.toPrecision(9) : num;
}
let divideFunc = (n1,n2) => {
    let num = n1 / n2;
    return num.toString().length > 9 ? num.toPrecision(9) : num;
}

let percentageFunc = n1 =>{
    let num = n1 / 100;
    return num.toString().length > 9 ? num.toPrecision(9) : num;
}


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
        case '%':
            answer = percentageFunc(+n1);
            break;
        default:
            console.error(`${operator} Invalid Operator`);
            break; 
    }
    return answer;
}