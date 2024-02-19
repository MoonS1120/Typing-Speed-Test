const typingText = document.querySelector(".typing-text p"),
inputField = document.querySelector(".content-box .input-field");
timeTag = document.querySelector(".time span b");
wpmTag = document.querySelector(".wpm span b");
accTag = document.querySelector(".acc span b");
resetButton = document.querySelector("button");

let timer,
maxTime = 30,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;

function randomParagraph() {
    let randIndex = Math.floor(Math.random()*paragraphs.length)
    typingText.innerHTML = "";
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`
        typingText.innerHTML += spanTag
    })
    typingText.querySelectorAll("span")[0].classList.add("active");

    document.addEventListener("keydown", () => inputField.focus());
    typingText.addEventListener("click", () => inputField.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inputField.value.split("")[charIndex];
    
    if (charIndex < characters.length - 1 && timeLeft>0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
    
        if (typedChar == null) {
            charIndex--;
            if (characters[charIndex].classList.contains("incorrect")) {
                mistakes--;
            }
            characters[charIndex].classList.remove("correct", "incorrect");
        } else {
            if(characters[charIndex].innerText===typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"))
        characters[charIndex].classList.add("active");
        
        let wpm = Math.round((((charIndex - mistakes)/5)/(maxTime-timeLeft))*60)
        let acc = Math.round(((charIndex-mistakes)/charIndex)*100, 1)
        wpm=wpm<0 || !wpm || wpm===Infinity ? 0:wpm;
        acc=acc<0 || !acc || acc===NaN ? 0:acc;
        wpmTag.innerText = wpm;
        accTag.innerText = acc;
    } else {
        inputField.value = "";
        clearInterval(timer);
        characters[charIndex].classList.remove("active");
    }

}

function initTimer() {
    if (timeLeft>0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

function reset() {
    randomParagraph();
    inputField.value = "";
    clearInterval(timer);
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;

    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    accTag.innerText = 0;
}

randomParagraph();
inputField.addEventListener("input", initTyping);
resetButton.addEventListener("click", reset);