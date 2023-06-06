
const signInBtn = document.getElementById('signin-btn');
const popupCard = document.getElementById('popup-card');
signInBtn.addEventListener('click', () => {
        popupCard.style.display = 'flex';
});
window.addEventListener('scroll', () => {
        popupCard.style.display = 'none';
});

const loginBtn = document.getElementById('login-btn');
const loginCard = document.getElementById('login-card');
loginBtn.addEventListener('click', () => {
        loginCard.style.display = 'flex';
});
window.addEventListener('scroll', () => {
        loginCard.style.display = 'none';
});

const passwordInput = document.querySelector("#password")
    const eye = document.querySelector("#eye")
    eye.addEventListener("click", function () {
        this.classList.toggle("fa-eye-slash")
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
        passwordInput.setAttribute("type", type)
})


if (result == 1) {
        alert("Form Submitted Succesfully");
}
else if (result == 3) {
        alert("Cannot Submit Form");
}

