"use strict";

function displayPlayerNames(mainName) {
    document.querySelector("main.overview h1").innerHTML = mainName;
    displayOtherNames(mainName);
}

function displayOtherNames(mainName) {
    fetchFromServer(`/games/${loadFromStorage("gameId")}`, "GET")
        .then(response => {
            let counter = 0;

            response["players"].forEach(player => {
               if (player.name !== mainName) {
                   document.querySelectorAll("aside#players a")[counter].innerHTML = player.name;
                   counter++;
               }
            });
        })
        .catch(errorHandler);
}

function colorName(){
    const $h = document.querySelector("#playerName h1");

    fetchFromServer(`/games/${loadFromStorage("gameId")}`, "GET")
        .then(response => {
            if ($h.innerHTML === response["currentPlayer"] && response["canRoll"]) {
                if ($h.classList.contains("notYourTurn")) {
                    $h.classList.remove("notYourTurn");

                }
                $h.classList.add("yourTurn");
            } else if ($h.innerHTML !== response["currentPlayer"]) {
                if ($h.classList.contains("yourTurn")) {
                    $h.classList.remove("yourTurn");
                }
                $h.classList.add("notYourTurn");
            }
        })
        .catch(errorHandler);
    setTimeout(() => colorName(), 1500);
}

