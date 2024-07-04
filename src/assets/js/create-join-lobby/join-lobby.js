"use strict";
function joinLobbyButtonClick(e) {
    if(e.target.nodeName.toLowerCase() === "button"){
        fetchFromServer(`/games?started=false&numberOfPlayers=${loadFromStorage("amountOfPlayers")}&prefix=group`, "GET")
            .then(game => {
                joinNewGame(game[e.target.value].id, loadFromStorage("name"));

            })
            .catch(errorHandler);
    }
}
function joinNewGame(gameId, playerName) {
    const requestBody = {
        "playerName": playerName
    };

    fetchFromServer(`/games/${gameId}/players`, "POST", requestBody)
        .then(token => {
            saveToStorage("token", token);
            saveToStorage("gameId", gameId);
            location.href = "owner-lobby.html";
        })
        .catch(errorHandler);
}


function checkGameStarted(gameId) {
    fetchFromServer(`/games/${gameId}`, "GET")
        .then(gameState => {
            if(gameState.started) {
                location.href = "monopoly-board.html";
            } else {
                setTimeout(() => checkGameStarted(gameId), 1500);
            }
        })
        .catch(errorHandler);
}
