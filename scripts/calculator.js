//const btns= document.getElementsByClassName("calc-btn") //returns Html element collection
window.addEventListener('load',(e) => { //to get the theme selected and stored on loading
    localStorage.getItem('theme')
    const body = document.querySelector('body')
    body.classList.add(localStorage.getItem('theme'))
    console.log(localStorage.getItem('theme'));
})

const btns = document.querySelectorAll(".calc-btn[btn-calc-val]") //making an array of elements having class as calc-btn and attribute as  btn-calc-val
const display_box = document.getElementById("display-box") //fetching element having id as display-box and storing it in display_box


var calc_text = ""; //defining variables
var calc_ans = 0.0;


btns.forEach((b) => {  //everytime button clicked, content inside is executed
    b.addEventListener('click', (e) => {
        display_box.innerHTML += b.innerText; 
        typeof(display_box.innerHTML)
        calc_text += b.getAttribute("btn-calc-val") // to be calculated
        if (!(isNaN(b.getAttribute("btn-calc-val"))) === true) //checks if the attribute ('btn-calc-val') is a number 
            displayDynamicAns()

        if ((b.getAttribute("btn-calc-val")) === ")") //checks if attribute 9'btn-calc-val) = ( 
            displayDynamicAns()
    })
})

const dynamic_display_box = document.getElementById("dynamic-display-box") //

const displayDynamicAns = () => { //creating function to check for errors in dynamic ans and calculating answer dynamically
    try{
        calc_ans = eval(calc_text);
        dynamic_display_box.innerHTML = calc_ans;
    }catch(error){
        
    }
}

const displayAns = () => { //creating function to check for any errors in the calculation expression and calculating answer
    try{
        calc_ans = eval(calc_text)
        display_box.innerHTML = calc_ans;
        calc_text = "" + calc_ans //needs to be converted to string
    }catch(error){
        showToast()
    }
}


var equalBtn = document.getElementById("equal-btn") //get element having id equal-btn (=)
equalBtn.addEventListener("click", (e) => {
    var display_text = ""
    var eq_length  = ""
    display_text = display_box.innerHTML
    eq_length = display_text.length

    if (eq_length != 0){
        displayAns()
    }
}) //displaying answer on clicking equal to btn

var allClearBtn = document.getElementById("all-clear-btn") //get element having id all-clear btn(AC)
allClearBtn.addEventListener('click', (e) => { //clearing everything on clicking all clear (AC) btn
    calc_text = ""
    display_box.innerHTML = ""
    dynamic_display_box.innerHTML = ""
})



const removeCharacter = () => { //making function for removing a character from the equation ofr calculation
    var display_text = ""
    var eq_length  = ""
    display_text = display_box.innerHTML
    eq_length = display_text.length
    
    calc_text = calc_text.slice(0,(eq_length-1)) 
    display_box.innerHTML = display_text.slice(0,(eq_length-1))
    dynamic_display_box.innerHTML = calc_text
    if ((eq_length != 0)&&(eq_length != 1))
        displayDynamicAns()
}

var btn_remove_character = document.getElementById("remove-digit-btn")
btn_remove_character.addEventListener( 'click', removeCharacter)

document.addEventListener('keydown', (e) => {
    console.log(e)
    if (e.keyCode>= 48 && e.keyCode<= 57 ) { // Digits
        display_box.innerHTML += e.key
        calc_text += e.key
        displayDynamicAns()
    } else if ((e.keyCode === 187 && e.key == "+") || e.keyCode === 189 || e.keyCode === 56 || e.keyCode === 191) { // Operators
        display_box.innerHTML += e.key
        calc_text += e.key
    } else if (e.keyCode === 187 || e.keyCode === 13) { // Equal to and Enter
        displayAns()   
    } else if (e.keyCode === 8) { // [Backspace] 
        removeCharacter()
    } else if(e.keyCode === 57 ||e.keyCode === 190){ // '('  '.' respectively
        display_box.innerHTML += e.key
        calc_text += e.key
    }else if(e.keyCode === 48){ // ')' 
        display_box.innerHTML += e.key
        calc_text += e.key
        displayDynamicAns()
    }else { //if clicked char is invalid 
        console.log("invalid char")
    }
    
})


const theme_btn = document.querySelector(".theme-switch-icon-container")//selecting all elements having class theme-icon-switch-container
theme_btn.addEventListener('click', (e) => { //switching theme on clicking 
    const body = document.querySelector("body");
    let class_to_remove = "", class_to_add = "" 
    if (body.classList.contains("dark-theme")){ // if theme is light, remove class light-theme, add class dark-theme
        class_to_remove = "dark-theme";
        class_to_add = "light-theme";
    }
    else {//if theme is dark, remove class light-theme, add class dark-theme
        class_to_remove = "light-theme"; 
        class_to_add = "dark-theme";
    }
    body.classList.remove(class_to_remove);
    body.classList.add(class_to_add);
    window.localStorage.setItem('theme', class_to_add)//store selected theme in local storage
})

const toast_box = document.getElementById('toast-box') //getting element having id as toast-box
function showToast() { //showing toast
    const toast = document.createElement('div')
    toast.classList.add('toast')
    toast.innerHTML = "Incorrect equation, Please recheck"
    toast_box.appendChild(toast)

    setTimeout(() =>{ //removing toast message
        toast.remove()
    },5000)
}