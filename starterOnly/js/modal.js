//**** Select a menu element *****//
// Get the container element
var navContainer = document.getElementById("menu");

// Get all buttons with class="btn" inside the container
var btns = navContainer.getElementsByClassName("menu__item");

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

// DOM Elements
const modalbg = document.querySelector(".bkground");
const modalConfirmation = document.querySelector(".bkground-confirmation");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
//****** 1st Issue : close modal form *****/
const btnClose = document.querySelectorAll('.close');
const closeConfirmation = document.querySelector('.close-confirmation');

//****** 2Nd Issue : implement form inputs *****/
// Form Inputs / retrieving form input's IDs
const inputFirstName = document.getElementById('firstName');
const inputLastName = document.getElementById('lastName');
const inputEmail = document.getElementById('email');
const inputDate = document.getElementById('birthDate');
const inputQuantity = document.getElementById('quantity');

let inputLocation = document.reserve.location;
const inputCondition = document.getElementById('checkbox1');

//****** 3rd Issue : implement form input verifications *****/
// regex 
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nameRegex = /^[A-Za-z_-]{2,30}$/;
const birthRegex = /^(19|20)\d\d+[-/.]+[0-9]+[-/.][0-9]/ //^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
const tournoiRegex = /^[+]?\d+([.]\d+)?$/;

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal,))

// Close modal event
btnClose.forEach((btnClose) => btnClose.addEventListener("click", closeModal))


// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//****** 1st Issue : close modal form *****/
function closeModal(){
  modalbg.style.display = "none";
  modalConfirmation.style.display = "none";
}

//****** 3rd Issue : check form inputs *****/
function checkEntry(input, regex, errorId, errorMsg) {
  let errorTag = document.getElementById(errorId);
  // The trim() method removes whitespace from both ends of a string and returns a new string, 
  //without modifying the original string
  let value = input.value.trim();
  if(regex.test(value)){
    errorTag.textContent = "";
    input.style.borderColor = "green";
    input.style.borderWidth = "2px";
    return true;
  } else {
    errorTag.textContent = errorMsg; 
    input.style.borderColor = "#FF4E60";
    input.style.borderWidth = "2px";
    errorTag.style.color = "#FF4E60";
    errorTag.style.fontSize = "12px";
    return false;
  }

}
/** birthRegex to date validation condition - if birthdate is > to current date return error
 * 
 */

let currentDate = new Date();

function checkBirthDateEntry(input,  errorId, errorMsg) {
  let errorTag = document.getElementById(errorId);  
  let value = input.value; 
  if (birthRegex.test(value) && Date.parse(value) > currentDate) {
    errorTag.textContent = errorMsg; 
    input.style.borderColor = "#FF4E60";
    input.style.borderWidth = "2px";
    errorTag.style.color = "#FF4E60";
    errorTag.style.fontSize = "12px";
    return false;
  } else {
    errorTag.textContent = "";
    input.style.borderColor = "green";
    input.style.borderWidth = "2px";
    return true;
  }
  
}

function checkboxLocation(radio, errorId, errorMsg){
  let errorTag = document.getElementById(errorId);
  let valid = false;

    radio.forEach((radioBtn) => {
       if (radioBtn.checked){
         valid = true;
         return
       } 
    })
      if(valid){
       errorTag.textContent = "";
     } else {
       errorTag.textContent = errorMsg;
       errorTag.style.color = "#FF4E60";
       errorTag.style.fontSize = "12px";
     }
     return valid
}

function checkboxCondition(checkbox, errorId, errorMsg){
  let errorTag = document.getElementById(errorId)

  if (checkbox.getAttribute('type') === "checkbox"  && checkbox.checked == false){
    console.log("error")
    errorTag.textContent = errorMsg;
    errorTag.style.color = "#FF4E60";
    errorTag.style.fontSize = "12px";
    return false
  } else {
    errorTag.textContent = "";
    return true
  }
}

function launchConfirmationModal () {
  modalbg.style.display = "none";
  modalConfirmation.style.display = "block";
  modalConfirmation.style.fontSize = "16px";

  closeConfirmation.addEventListener('click', function (){
    modalConfirmation.style.display = "none";
  })
}

function validate (event){
  event.preventDefault();
  const isFirstNameValid = checkEntry(inputFirstName, nameRegex, 'firstName-error', '* Champ obligatoire avec un minimum de 2 caractères');
  const isLastNameValid = checkEntry(inputLastName, nameRegex, 'lastName-error', '* Champ obligatoire avec un minimum de 2 caractères');
  const isEmailValid = checkEntry(inputEmail, emailRegex, 'email-error', ' * Champ obligatoire avec une adresse électronique valide.');
  const isBirthdayValid = checkEntry(inputDate, birthRegex, 'date-error', '* Champ obligatoire avec votre date de naissance.');
  const isNumberTournamentValid = checkEntry(inputQuantity, tournoiRegex, 'quantity-error',  '* Champ obligatoire, vous devez indiquer un nombre entre 0 et 99.');
  const isLocationValid = checkboxLocation(inputLocation,'location-error', '* Champ obligatoire, vous devez selectionner une ville pour le tournoi.');
  const isConditionValid = checkboxCondition(inputCondition,'condition-error', '* Champ obligatoire, Vous devez accepter les conditions.');

  if( isFirstNameValid && 
      isLastNameValid && 
      isEmailValid && 
      isBirthdayValid && 
      isNumberTournamentValid && 
      isLocationValid && 
      isConditionValid){
        launchConfirmationModal();
      }  
}