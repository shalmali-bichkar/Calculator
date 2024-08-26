
document.addEventListener('keypress', (e) => {
    var processedValue = ""
    if (e.keyCode < 58 && e.keyCode > 47) {
        processedValue = processKeyPress(e,  processInt)
    }
})
processInt()

const processKeyPress = (e, func) => {
    func(e.key)
}

const processInt =  (d) => {
    return parseInt(s)
}
