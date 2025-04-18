// BACKEND LOGIC
const application = {
    display : '',
    currentValue: '',
    previousValue : '',
    operand : '',

    isCalculated: false,
    
    updateDisplay() {
        application.display = application.currentValue
        if(application.operand)
            application.display =` \(${application.previousValue} ${application.operand} \) ` + application.display
    },
    calculate() {
        const right = Number(application.currentValue)
        const left = Number(application.previousValue)
        let result = 0
        switch(application.operand){
            case '+':
                result = left + right
                break
            case '-':
                result = left - right
                break
            case '*':
                result = left * right
                break
            case '/':
                if(right === 0){
                    application.functions['clear']()
                    alert('Don\'t divide by 0!')
                    return
                }
                result = left / right
                break
        }
        result = Number(result.toFixed(4))
        application.currentValue = String(result)
        application.operand = ''
        application.previousValue = ''
    },
    operate(operand){
        if(application.operand)
            application.calculate()
        application.operand = operand
        application.previousValue = application.currentValue
        application.currentValue = ''
        application.updateDisplay()
    },
    functions : {
        'addNumber' : (number) => {
            if(application.isCalculated)
                application.currentValue = ''
                application.isCalculated = false
            application.currentValue = application.currentValue + String(number)
            application.updateDisplay()
        },
        'clear' : () => {
            application.previousValue = ''
            application.currentValue = ''
            application.operand = ''
            application.updateDisplay()
        },
        '+' : () => {
            application.operate('+')
        },
        '-' : () => {
            application.operate('-')
        },
        '/' : () => {
            application.operate('/')
        },
        '*' : () => {
            application.operate('*')
        },
        '=' : () => {
            application.calculate()
            application.updateDisplay()
            application.isCalculated = true
        },
        '.' : () => {
            if(!application.currentValue.includes('.')){
                application.currentValue = application.currentValue + '.'
            }
            application.updateDisplay()
        }
    }   
}

// FRONTED LOGIC
const Display = document.querySelector("#display")
const calculator= document.querySelector(".calculator")
const nonFunctionalButtons = ['0','1','2','3','4','5','6','7','8','9']
calculator.addEventListener("click", (event) => {
    if(event.target.tagName == 'BUTTON') {
        id = event.target.id
        if(id in nonFunctionalButtons) {
            application.functions['addNumber'](id)
        } else {
            try{
                application.functions[id]()
            } catch {
                console.log(`Function ${id} isn't implemented yet`)
            }
        }
        display.value = application.display
    }
})