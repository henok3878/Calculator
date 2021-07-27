class Calculator{
    constructor(prevOperandTextElement,currentOperandTextElement){
        this.prevOperandTextElement = prevOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear(){
        this.operation = undefined;
        this.currentOperand = '';
        this.prevOperand = '';
        this.updateDisplay();
    }

    delete(){
        
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
        this.updateDisplay();
    }
    updateDisplay(){
        if(this.operation != undefined){
            this.prevOperandTextElement.innerText = this.prevOperand + this.operation;   
        }
        else{
            this.prevOperandTextElement.innerText = this.prevOperand;
        }
        this.currentOperandTextElement.innerText = this.currentOperand;
    }
    appendNumber(number){
        if(number === "." && this.currentOperand.includes("."))return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
        this.updateDisplay();
    }

    chooseOperation(operation){
        this.operation = operation;
        if(this.prevOperand != ""){
            this.compute();
        }else{
            this.prevOperand = this.currentOperand;
            this.currentOperand = '';
            this.updateDisplay();
        }

    }

    compute(){
        let number1 = parseFloat(this.prevOperand);
        let number2 = parseFloat(this.currentOperand);
        console.log("num1: " + number1 +" , num2: " + number2);
        let result = null;
        switch(this.operation){
            case '+':
                result = number1 + number2;
                break;
            case '-':
                result = number1 - number2;
                break;
            case '*':
                result = number1 * number2;
                break;
            case '/':
                if(number2 !== 0){
                    result = number1 / number2;
                }
                else{
                    alert("You can't divide a number by zero.");
                }
                break;
            default:
                console.log("Default case, which means no appropriate operation.");
    
        }
        this.currentOperand = result;
        this.prevOperand = "";
        this.operation = undefined;
        this.updateDisplay();
    }
}


let numberButtons = document.getElementsByClassName("data-number");
let operationButtons = document.getElementsByClassName('data-operation');
let equalsButton = document.querySelector('.data-equals');
let clearButton = document.querySelector('.data-clear');
let deleteButton = document.querySelector('.data-delete');
let prevOperandText = document.querySelector('.data-prev-operand');
let currentOperandText = document.querySelector('.data-current-operand');

let calculator = new Calculator(prevOperandText,currentOperandText);

Array.from(numberButtons).forEach((button) => {
    button.addEventListener("click",function(){calculator.appendNumber(button.innerText)});

})


Array.from(operationButtons).forEach((operation)=>{
    operation.addEventListener("click",()=>{calculator.chooseOperation(operation.innerText)});
});


equalsButton.addEventListener('click',function(){calculator.compute()});
clearButton.addEventListener('click',function(){calculator.clear()});
deleteButton.addEventListener('click',function(){calculator.delete()})