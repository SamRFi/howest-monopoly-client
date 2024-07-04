"use strict";

// When the user clicks on the button, open the modal

function modalPopup() {
    const modal = document.querySelector(".popup");
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function closeBuyPopUp() {
    const buyPopUp = document.querySelector(".popup.buy");
    buyPopUp.remove();
}

function closeThrewPopUp() {
    const threwPopUp = document.querySelector(".popup.threw");
    threwPopUp.remove();
}

function closeTurnPopUp() {
    const turnPopUp = document.querySelector(".popup.turn");
    turnPopUp.remove();
}

function closeJailActionPopUp() {
    const jailActionPopUp = document.querySelector(".popup.jailAction");
    jailActionPopUp.remove();
}

function closeConfirmPopUp() {
    const confirmPopUp = document.querySelector(".popup.confirm");
    confirmPopUp.remove();
}

// When the user clicks anywhere outside of the modal, close it
function noClickModal() {
    window.onclick = function (e) {
        const modal = document.querySelector(".popup");
        if (e.target === modal) {
            modal.remove();
        }
    };
}
