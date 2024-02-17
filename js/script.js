const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".content-box .input-field");

function randomParagraph() {
    let randomIndex = Math.floor(Math.random()*paragraphs.length)
    typingText.innerHTML = "";
    paragraphs[randomIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`
        typingText.innerHTML += spanTag
    })
    typingText.querySelectorAll("span")[0].classList.add("active");

    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

randomParagraph();