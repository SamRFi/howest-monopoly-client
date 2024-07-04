"use strict";

function displayPlayerMoney(name) {
    _token = loadFromStorage("token");
    const gameId = loadFromStorage("gameId");

    fetchFromServer(`/games/${gameId}`)
        .then(response => {
            response["players"].forEach(player => {
                if (player.name === name) {
                    document.querySelector("aside h2").innerHTML = `${player["money"]}$`;
                }
            });
        })
        .catch(errorHandler);
    displayOtherPlayersMoney();
}

function displayOtherPlayersMoney() {
    const $spans = document.querySelectorAll("aside#players span");
    let counter = 0;

    document.querySelectorAll("aside#players a")
        .forEach(el => {
            fetchFromServer(`/games/${loadFromStorage("gameId")}`)
                .then(response => {
                    response["players"].forEach(player => {
                        if (el.innerHTML === player.name) {
                            $spans[counter].innerHTML = `${player["money"]}$`;
                            counter ++;
                        }
                    });
                })
                .catch(errorHandler);
        });
}
