"use strict";

function playerActions(){
    const gameId = loadFromStorage("gameId");

    fetchFromServer(`/games/${gameId}`)
        .then(response => {
                if (response["turns"].length !== 0) {
                    showPlayerActions(response);
                }
        })
        .catch(errorHandler);
}

function showPlayerActions(response){
    const lastTurn = response["turns"].length - 1;
    const lastMove = response["turns"][lastTurn]["moves"].length - 1;
    const currentPlayer = response["turns"][lastTurn]["player"];

    if (response["lastDiceRoll"][0] !== response["lastDiceRoll"][1]) {
        singleThrow(response, currentPlayer, lastTurn, lastMove);
    } else {
        doubleThrow(response, currentPlayer, lastTurn, lastMove);
    }
    if (response["turns"][lastTurn]["type"] === "JAIL_STAY") {
        document.querySelector(`li.second`).innerHTML = `${response["turns"][lastTurn]["moves"][0]["description"]}`;
    } else if ((response["turns"][lastTurn]["moves"].length === 2 && response["turns"][lastTurn]["moves"][0]["tile"] === "Go to Jail")
        || (response["turns"][lastTurn]["type"] === "GO_TO_JAIL")
        || (response["turns"][lastTurn]["moves"][0]["description"].includes("Go to Jail"))) {
        document.querySelector(`li.second`).innerHTML = `${currentPlayer} has to go to jail`;
    } else {
        document.querySelector(`li.second`).innerHTML =
            `${currentPlayer} ${response["turns"][lastTurn]["moves"][lastMove]["description"]}`;
    }
}

function singleThrow(response, currentPlayer, lastTurn, lastMove) {
    if (response["turns"][lastTurn]["type"] === "JAIL_PAY_FINE") {
        displayJailPayFine(response, currentPlayer, lastTurn, lastMove);
    } else if (response["turns"][lastTurn]["type"] === "JAIL_STAY") {
        displayStillInJail(response, currentPlayer);
    } else {
        document.querySelector(`li.first`).innerHTML =
            `${currentPlayer} threw ${response["lastDiceRoll"][0]} & ${response["lastDiceRoll"][1]}
                       and landed on ${response["turns"][lastTurn]["moves"][lastMove]["tile"]}`;
    }
}

function doubleThrow(response, currentPlayer, lastTurn, lastMove) {
    if ((response["turns"][lastTurn]["type"] === "JAIL_STAY") || response["turns"][lastTurn]["type"] === "GO_TO_JAIL") {
        displayStillInJail(response, currentPlayer);
    } else if (response["turns"][lastTurn]["type"] === "JAIL_DOUBLE_FREE") {
        displayJailDoubleThrow(response, currentPlayer, lastTurn, lastMove);
    } else {
        document.querySelector(`li.first`).innerHTML =
            `${currentPlayer} threw ${response["lastDiceRoll"][0]} & ${response["lastDiceRoll"][1]}
                       and landed on ${response["turns"][lastTurn]["moves"][lastMove]["tile"]}, ${currentPlayer} can roll an extra time`;
    }
}

function displayJailPayFine(response, currentPlayer, lastTurn, lastMove) {
        document.querySelector(`li.first`).innerHTML =
            `${currentPlayer} paid a fine to get out of jail and threw ${response["lastDiceRoll"][0]} & ${response["lastDiceRoll"][1]}
                       they landed on ${response["turns"][lastTurn]["moves"][lastMove]["tile"]}`;
}

function displayJailDoubleThrow(response, currentPlayer, lastTurn, lastMove) {
    document.querySelector(`li.first`).innerHTML =
        `${currentPlayer} threw ${response["lastDiceRoll"][0]} & ${response["lastDiceRoll"][1]}
                       so they get out of jail and landed on ${response["turns"][lastTurn]["moves"][lastMove]["tile"]}`;
}

function displayStillInJail(response, currentPlayer) {
        document.querySelector(`li.first`).innerHTML =
            `${currentPlayer} threw ${response["lastDiceRoll"][0]} & ${response["lastDiceRoll"][1]}
                       and has to stay in jail`;
}
