const form = document.getElementById("generatePassword")
const result = document.getElementById("result")

const copyButton = document.getElementById("copyButton")
const checkboxes = document.querySelectorAll("input[type=checkbox][name=settings]")
const description = document.getElementById("description")
let copiedText = ""

const sliderValue = document.getElementById("passwordLength")
const visibleValue = document.getElementById("lengthValue")

sliderValue.addEventListener("input", () => {
    
})

form.addEventListener("submit", function(event){
    event.preventDefault();

    const passwordLength = 20
    let password = ""

    const enabledSettings = Array.from(checkboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value)

    const characterPool = enabledSettings.join("")
    const randomvalues = new Uint32Array(1)
    if (enabledSettings.length === 0) {
        console.log("no choices detected")
        description.textContent = "Please check at least one option"
        result.textContent = ""
        copiedText = ""
        return
    }

    for(let x = 0; x < passwordLength; x++) {
        crypto.getRandomValues(randomvalues)

        const randomIndex = randomvalues[0] % characterPool.length
        const randomCharacter= characterPool[randomIndex]

        password += randomCharacter
    }
    copiedText += password
    result.textContent = "Your Generated Password Is: " + password;
    copyButton.textContent = "Copy Text"
    description.textContent = "Feel free to mess around with the option!"
})

copyButton.addEventListener("click", async () => {
    const text = copiedText
    try {
        await navigator.clipboard.writeText(text)
        copyButton.textContent = "Copied"
    } catch (error) {
        console.error("Failed to copy text: ",error)
    }
})