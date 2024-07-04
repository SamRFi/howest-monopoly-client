"use strict";

function createLobbyButtonClick(){
    createGame(parseInt(loadFromStorage("amountOfPlayers")), loadFromStorage("name"));
}

function createGame(amountOfPlayers, playerName) {
    const bodyParams = {
        "prefix": _config.gamePrefix,
        "numberOfPlayers": amountOfPlayers
    };
    fetchFromServer("/games","POST", bodyParams)
        .then(game =>{
            joinNewGame(game.id, playerName);
        })
        .catch(errorHandler);
}
