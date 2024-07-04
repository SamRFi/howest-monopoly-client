"use strict";

function saveName() {
    const inputName = document.querySelector("input#playername").value;

    saveToStorage('name', inputName);
}

function saveAmountOfPlayers() {
    const inputAmountOfPlayers = document.getElementById("amountOfPlayers").value;

    saveToStorage('amountOfPlayers', inputAmountOfPlayers);
}

function goToNextPage() {
    location.href = "join-create-room.html";
}
function submitButtonClick(){
    goToNextPage();
}
function formSubmit(e) {
    e.preventDefault();
    saveName();
    saveAmountOfPlayers();
}
