let addFunc = (n1, n2) => n1 + n2;
console.log(addFunc(1,2));

let subtractFunc = (n1, n2) => n1 - n2;
console.log(subtractFunc(1,2));

let multiplyFunc = (n1, n2) => n1 * n2;
console.log(multiplyFunc(2,60));

let divideFunc = (n1,n2) => n1 / n2;
console.log(divideFunc(2,60));

console.log(operate('+', 40, 15));
console.log(operate('-', 40, 15));
console.log(operate('*', 40, 15));
console.log(operate('/', 40, 15));

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
            console.error('Invalid Operator');
            break; 
    }
    return answer;
}