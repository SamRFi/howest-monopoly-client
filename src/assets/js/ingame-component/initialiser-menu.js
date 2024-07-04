"use strict";

let _rolled = true;

document.addEventListener("DOMContentLoaded", init);

function init() {
    document.querySelector('#buttons button.properties').addEventListener("click", goToPropertiesPage);

    checkIfDiceRolled();

    document.querySelector("div#next").addEventListener("click", carouselNext);
    document.querySelector("div#previous").addEventListener("click", carouselPrevious);

    document.querySelectorAll("aside#players a").forEach($a => {
        $a.addEventListener("click", redirectToOtherPlayerBoard);
    });

    document.querySelector("main.overview div aside#buttons button:first-of-type").addEventListener("click", collectRent);
    document.querySelector("main.overview div aside#buttons button#bankrupt").addEventListener("click", confirmBankrupt);
    document.querySelector("main.overview div aside#buttons button:last-of-type").addEventListener("click", redirectToBuyPropertyPage);
}

function redirectToBuyPropertyPage(){
    location.href = "buy-property.html";
}

function goToPropertiesPage() {
    const playerName = document.querySelector("main.overview h1").innerHTML;
    saveToStorage("viewPlayer", playerName);
    location.href = "cards-Page.html";
}

function redirectToOtherPlayerBoard(e) {
    e.preventDefault();
    const otherPlayer = e.target;
    initOtherPlayer(otherPlayer.textContent);
}

function initOtherPlayer(name) {
    boardDisplay(name);
}

function boardDisplay(name) {
    clearBoard();
    loadFullBoard(name);
    displayCurrentTiles(name);
    displayPlayerNames(name);
    displayPlayerMoney(name);
    colorName();
}

function checkIfDiceRolled() {
    const name = loadFromStorage("name");
    const gameId = loadFromStorage("gameId");

        if (_rolled) {
            boardDisplay(name);
            _rolled = false;
            checkIfDiceRolled();
        } else {
            setTimeout(() => checkIfDiceRolled(), 1500);
            playerActions();
            checkGetOutOfJail(gameId);
            checkIfGameHasWinner();
        }
}

function displayPawn(playerName) {
    document.querySelector(".current div").insertAdjacentHTML("afterend", `<p id="pawn">${playerName}</p>`);
}
