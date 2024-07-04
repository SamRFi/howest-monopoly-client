"use strict";

function checkGetOutOfJail(gameId) {
    const $main = document.querySelector('main.overview');

    fetchFromServer(`/games/${gameId}`, "GET")
        .then(response => {
            response["players"].forEach(player => {
                if (response["currentPlayer"] === player.name && response["currentPlayer"] === loadFromStorage("name")) {
                    if (player["jailed"] && !document.querySelector(".popup") && player["getOutOfJailFreeCards"] > 0){
                        insertHasGetOutJail($main);
                    }
                    else if (player["jailed"] && !document.querySelector(".popup")) {
                        insertHasNoGetOutJail($main);
                    } else {
                        document.querySelector("div#dice p").addEventListener("click", diceRoll);
                    }
                }
            });
        })
        .catch(errorHandler);
}

function payFine() {
    const gameId = loadFromStorage("gameId");
    const playerName = loadFromStorage("name");

    closeJailActionPopUp();
    fetchFromServer(`/games/${gameId}/prison/${playerName}/fine`, "POST")
        .then(() => {
            displayPlayerMoney(playerName);
            document.querySelector("div#dice p").addEventListener("click", diceRoll);
        })
        .catch(errorHandler);
}


function useJailCard() {
    const gameId = loadFromStorage("gameId");
    const playerName = loadFromStorage("name");

    closeJailActionPopUp();
    fetchFromServer(`/games/${gameId}/prison/${playerName}/free`, "POST")
        .then(() => {
            document.querySelector("div#dice p").addEventListener("click", diceRoll);
        })
        .catch(errorHandler);
}

function diceRoll(){
    _rolled = true;
    _token = loadFromStorage("token");
    const playerName = loadFromStorage("name");
    const $main = document.querySelector('main.overview');
    const gameId = loadFromStorage("gameId");

        fetchFromServer(`/games/${gameId}`, "GET")
            .then(response => {
                if (response["canRoll"] && response["currentPlayer"] === playerName) {
                    fetchFromServer(`/games/${gameId}/players/${playerName}/dice`, "POST")
                        .then(() =>{
                            colorName();
                            showDiceThrew(gameId, response, $main);
                        })
                        .catch(errorHandler);
                } else {
                    insertItsNotYourTurn($main);
                    document.querySelector(".no").addEventListener("click", closeTurnPopUp);
                }
            })
            .catch(errorHandler);
}

function showDiceThrew(gameId, response, $main) {
    fetchFromServer(`/games/${gameId}`, "GET")
        .then(gameState => {
            if (response["currentPlayer"] === loadFromStorage("name")) {
                if (gameState["lastDiceRoll"][0] === gameState["lastDiceRoll"][1]) {
                    insertDoubleThrow($main, gameState);
                } else {
                    insertNormalThrow(gameState, $main);
                }
                if (document.querySelector(".popup.threw")) {
                    setTimeout(() => closeThrewPopUp(), 2500);
                }
                modalPopup();
                } else {
                    setTimeout(() => checkBuy(), 1500);
                }
        })
        .catch(errorHandler);
}

function checkBuy() {
    const $main = document.querySelector('main.overview');
    const gameId = loadFromStorage("gameId");

        fetchFromServer(`/games/${gameId}`, "GET")
            .then(response => {
                if (response["turns"].length !== 0) {
                    const lastTurn = response["turns"].length - 1;
                    const lastMove = response["turns"][lastTurn]["moves"].length - 1;

                    if (response["directSale"] !== null && response["currentPlayer"] === loadFromStorage("name")) {
                        displayTile(response["turns"][lastTurn]["moves"][lastMove]["tile"], response, $main);
                    } else if (response["turns"][lastTurn]["player"] === loadFromStorage("name")){
                        inJail(response, $main);
                        onOtherTile(response, "Community Chest",lastTurn, lastMove, $main);
                        onOtherTile(response, "Chance", lastTurn, lastMove, $main);
                    }
                }
            })
            .catch(errorHandler);
}

function inJail(response, $main) {
    const lastTurn = response["turns"].length - 1;

    if (response["turns"][lastTurn]["type"] === "GO_TO_JAIL") {
        $main.insertAdjacentHTML("afterend", `
            <div class="popup modal">
                <div class="modal-content-jail">
                    <p>YOU ARE IN JAIL! <br> WAIT YOUR TURN!</p>
                </div>
            </div>`);
        modalPopup();
        noClickModal();
    }
}

function onOtherTile(response, tileName, lastTurn, lastMove, $main) {
    response["players"].forEach(player => {
        if (loadFromStorage("name") === player.name) {
            if (player["currentTile"] === tileName + " I" ||
                player["currentTile"] === tileName + " II" ||
                player["currentTile"] === tileName + " III") {
                    $main.insertAdjacentHTML("afterend", `
                        <div class="popup modal">
                            <div class="modal-content-otherTile">
                                <p>You landed on ${tileName}!</p>
                                <p>${response["turns"][lastTurn]["moves"][lastMove]["description"]}</p>
                            </div>
                        </div>`);
                    modalPopup();
                    noClickModal();
            }
        }
    });
}

function displayTile(nameOfTile, response, $main) {
    fetchFromServer("/tiles", "GET").then(tiles => {
        tiles.forEach(tile => {
            if (tile.name === nameOfTile) {
                insertChoiceToBuy(response, tile, $main);
            }
        });
        modalPopup();
        document.querySelector(".yes").addEventListener("click", doBuy);
        document.querySelector(".no").addEventListener("click", doNotBuy);
    });
}

function doBuy() {
    const gameId = loadFromStorage("gameId");

    colorName();
    closeBuyPopUp();
    fetchFromServer(`/games/${gameId}`, "GET")
        .then(response => {
            if (response["directSale"] !== null && response["currentPlayer"] === loadFromStorage("name")){
                fetchFromServer(`/games/${gameId}`, "GET")
                    .then(response => {
                        const playerName = loadFromStorage("name");
                        const propertyName = response["directSale"];

                        insertPropertyBought(propertyName);
                        modalPopup();
                        noClickModal();
                        fetchFromServer(`/games/${gameId}/players/${playerName}/properties/${propertyName}`,"POST")
                            .then(() => {
                                displayPlayerMoney(loadFromStorage("name"));
                            })
                            .catch(errorHandler);
                    });
            }
        })
        .catch(errorHandler);
}

function doNotBuy() {
    const gameId = loadFromStorage("gameId");

    colorName();
    closeBuyPopUp();
    fetchFromServer(`/games/${gameId}`, "GET")
        .then(response => {
            if (response["directSale"] !== null && response["currentPlayer"] === loadFromStorage("name")) {
                fetchFromServer(`/games/${gameId}`, "GET")
                    .then(response => {
                        const playerName = loadFromStorage("name");
                        const propertyName = response["directSale"];

                        fetchFromServer(`/games/${gameId}/players/${playerName}/properties/${propertyName}`, "DELETE")
                            .catch(errorHandler);
                    })
                    .catch(errorHandler);
            }
        })
        .catch(errorHandler);
}

function insertItsNotYourTurn($main) {
    $main.insertAdjacentHTML("afterend",`  
        <div class="popup turn modal">
            <div class="modal-content">
                <p class="pTagMid">It is not your turn</p>
                <nav><p class="no">OK</p></nav>
            </div>
        </div>`);
    modalPopup();
}

function insertNormalThrow(gameState, $main) {
    $main.insertAdjacentHTML("afterend", `
        <div class="popup threw modalthrew">
            <div class="modal-content-threw">
                <p>You threw ${gameState["lastDiceRoll"][0]} & ${gameState["lastDiceRoll"][1]}</p>
            </div>
        </div>`);
}

function insertDoubleThrow($main, gameState) {
    $main.insertAdjacentHTML("afterend", `
        <div class="popup threw modalthrew">
            <div class="modal-content-threw-double">
                <p>You threw ${gameState["lastDiceRoll"][0]}  &  
                   ${gameState["lastDiceRoll"][1]} <br>You recieve an extra throw!</p>
            </div>
        </div>`);
}

function insertChoiceToBuy(response, tile, $main) {
    $main.insertAdjacentHTML("afterend", `  
        <div class="popup buy modal">
            <div class="modal-content">
                <p>Do you wish to buy <br>${response["directSale"]}
                   for ${tile.cost}$ </p>
                <nav>
                <p class="yes">Yes</p>
                <p class="no">No</p>
                </nav>
            </div>
        </div>`);
}

function insertPropertyBought(propertyName) {
    document.querySelector("main.overview").insertAdjacentHTML("afterend",`  
            <div class="popup modal">
                <div class="modal-content">
                    <p class="pTagMid">You bought ${propertyName}</p>
                </div>
            </div>`);
}

function insertHasGetOutJail($main) {
    $main.insertAdjacentHTML("afterend", `  
        <div class="popup jailAction modal">
            <div class="modal-content-jail-action">
                <p>Do you wish to get out of jail early?</p>
                <nav>
                <p class="payFine">Pay fine</p>
                <p class="useJailCard">Use get out of jail free card</p>
                <p class="try">Try to escape with dice</p>
                </nav>
            </div>
        </div>`);
    modalPopup();
    document.querySelector(".try").addEventListener("click",  closeJailActionPopUp);
    document.querySelector(".try").addEventListener("click", diceRoll);
    document.querySelector(".payFine").addEventListener("click", payFine);
    document.querySelector(".useJailCard").addEventListener("click", useJailCard);
}

function insertHasNoGetOutJail($main) {
    $main.insertAdjacentHTML("afterend", `  
        <div class="popup jailAction modal">
            <div class="modal-content-jail-action">
                <p>Do you wish to get out of jail early?</p>
                <nav>
                <p class="payFine">Pay fine</p>
                <p class="try">Try to escape with dice</p>
                </nav>
            </div>
        </div>`);
    modalPopup();
    document.querySelector(".payFine").addEventListener("click", payFine);
    document.querySelector(".try").addEventListener("click", closeJailActionPopUp);
    document.querySelector(".try").addEventListener("click", diceRoll);
}
