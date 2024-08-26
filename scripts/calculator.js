//const btns= document.getElementsByClassName("calc-btn") //returns Html element collection
window.addEventListener('load',(e) => {
    localStorage.getItem('theme')
    const body = document.querySelector('body')
    body.classList.add(localStorage.getItem('theme'))
    console.log(localStorage.getItem('theme'));
})

const btns = document.querySelectorAll(".calc-btn[btn-calc-val]") 
const display_box = document.getElementById("display-box")


var calc_text = "";
var calc_ans = 0.0;


btns.forEach((b) => { 
    b.addEventListener('click', (e) => {
        display_box.innerHTML += b.innerText;
        typeof(display_box.innerHTML)
        calc_text += b.getAttribute("btn-calc-val") // to be calculated
        if (!(isNaN(b.getAttribute("btn-calc-val"))) === true) 
            displayDynamicAns()

        if ((b.getAttribute("btn-calc-val")) === ")") 
            displayDynamicAns()
    })
})

const dynamic_display_box = document.getElementById("dynamic-display-box")
const displayDynamicAns = () => { 
    try{
        calc_ans = eval(calc_text);
        dynamic_display_box.innerHTML = calc_ans;
    }catch(error){
        //console.log()
    }
}

const displayAns = () => { 
    try{
        calc_ans = eval(calc_text)
        display_box.innerHTML = calc_ans;
        calc_text = calc_ans
    }catch(error){
        window.alert("kya karra be")
    }
    
}


var equalBtn = document.getElementById("equal-btn")
equalBtn.addEventListener("click", displayAns)

var allClearBtn = document.getElementById("all-clear-btn")
allClearBtn.addEventListener('click', (e) => {
    calc_text = ""
    display_box.innerHTML = ""
    dynamic_display_box.innerHTML = ""
})



const removeCharacter = () => {
    var display_text = ""
    var eq_length  = ""
    display_text = display_box.innerHTML
    eq_length = display_text.length
    
    calc_text = calc_text.slice(0,(eq_length-1))
    display_box.innerHTML = display_text.slice(0,(eq_length-1))
    dynamic_display_box.innerHTML = calc_text

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
    } else if (e.keyCode === 8) { // Backspace 
        removeCharacter()
    } else if(e.keyCode === 57 ||e.keyCode === 190){ // (  .
        display_box.innerHTML += e.key
        calc_text += e.key
    }else if(e.keyCode === 48){ // )
        display_box.innerHTML += e.key
        calc_text += e.key
        displayDynamicAns()
    }else {
        console.log("invalid char")
    }
    
})


const theme_btn = document.querySelector(".theme-switch-icon-container")
theme_btn.addEventListener('click', (e) => {
    const body = document.querySelector("body");
    let class_to_remove = "", class_to_add = "" 
    if (body.classList.contains("dark-theme")){
        class_to_remove = "dark-theme";
        class_to_add = "light-theme";
    }
    else {
        class_to_remove = "light-theme";
        class_to_add = "dark-theme";
    }
    body.classList.remove(class_to_remove);
    body.classList.add(class_to_add);
    window.localStorage.setItem('theme', class_to_add)
})
