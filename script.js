// get all digit buttons
let digits = document.querySelectorAll('.digit');
// get calculator display
let display = document.querySelector('.display');
// get clear button
let clear = document.querySelector('.clear');
// get operator buttons
let operators = document.querySelectorAll('.operator');


// stacks to store numbers and operators
let stack = [];
display.textContent = null;
// clear event listener
clear.addEventListener('click', () => {
    stack = [];
    display.textContent = '';
});
let saveOp = undefined;
// operator event listener
operators.forEach( operator => {
    operator.addEventListener('click', event => {
        if (typeof saveOp === 'string'){
            if (event.target.id !== '='){
                let prevOperator = saveOp;
                let prevNum = stack.pop();
                let currNum = display.textContent;
                display.textContent = operate(prevOperator, prevNum, currNum);
            } else {
                stack.push(saveOp);
                saveOp = undefined;
            }
        }

        if ((stack.length < 2 && event.target.id === '=') || 
        (event.target.id === '=' && stack[stack.length-1] === '=')){
            return;
        }

        if (event.target.id === '='){
            console.trace();
            let prevOperator = stack.pop();

           let prevNum = stack.pop();
           let currNum = display.textContent;
           display.textContent = operate(prevOperator, prevNum, currNum);
        }
        if (stack.length === 2 && stack[stack.length-1] === '='){
            stack.pop();
            stack.push(event.target.id);
            return;
        }
        if (stack.length === 2 && event.target.id !== '='){
            stack.pop();
            stack.push(event.target.id);
            return;
        } else if (stack.length == 2 && display.textContent !== ''){
            let prevOperator = stack.pop();
            let prevNum = stack.pop();
            let currNum = display.textContent;
            display.textContent = operate(prevOperator, prevNum, currNum);
        } else if (stack.length == 2 && event.target.id === '='){
            let prevOperator = stack.pop();
            let prevNum = stack.pop();
            display.textContent = operate(prevOperator, prevNum, prevNum);
            stack.push(+display.textContent);
            return;
        }

        if (display.textContent !== ''){
            stack.push(+display.textContent);
            stack.push(event.target.id);
        }
        console.log(stack.length);
    });
});
// digits event listener
digits.forEach( digit => {
    digit.addEventListener('click', event => {
        if (stack.length === 2){
            saveOp = stack.pop();
            display.textContent = '';
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