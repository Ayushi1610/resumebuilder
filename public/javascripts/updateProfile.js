const signInBtn = document.getElementById('view-profile');
const popupCard = document.getElementById('update-profile');
const closeBtn =document.getElementById('popup-close');
signInBtn.addEventListener('click', () => {
        popupCard.style.display = 'flex';
});
// window.addEventListener('scroll', () => {
//         popupCard.style.display = 'none';
// });
closeBtn.addEventListener('click',()=>{
    popupCard.style.display = 'none';
});

const feedbackBtn = document.getElementById('feedback');
const popupfeedback = document.getElementById('fill-feedback');
const closefeedback =document.getElementById('feedback-close');
feedbackBtn.addEventListener('click', () => {
        popupfeedback.style.display = 'flex';
});
closefeedback.addEventListener('click',()=>{
    popupfeedback.style.display = 'none';
});

const passwordInput = document.querySelector("#password")
const eye = document.querySelector("#eye")
eye.addEventListener("click", function () {
    this.classList.toggle("fa-eye-slash")
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
    passwordInput.setAttribute("type", type)
})

function login_again(){
    alert("Are you sure, You want to update?")
}