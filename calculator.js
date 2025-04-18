
const Display = document.querySelector("#display")
const calculator= document.querySelector(".calculator")

const nonFunctionalButtons = ['0','1','2','3','4','5','6','7','8','9']


calculator.addEventListener("click", (event) => {
    if(event.target.tagName == 'BUTTON') {
        id = event.target.id
        if(id in nonFunctionalButtons) {
            Display.value = Display.value + id
        }
        console.log(id)
    }
})