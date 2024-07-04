function addInfo() {
    if (document.querySelectorAll("main.ownerLobby > div:not(.lobbyEmpty)").length
        < loadFromStorage("amountOfPlayers")) {
        const gameId = loadFromStorage("gameId");
        const amountOfPlayers = loadFromStorage("amountOfPlayers");
        _token = loadFromStorage("token");

        fetchFromServer(`/games/${gameId}`, "GET")
            .then(response => {
                document.querySelector("main.ownerLobby").innerHTML = "";
                const playersToJoin = amountOfPlayers - response["players"].length;

                response["players"].forEach(player => {
                    const creatorIndex = 0;

                        if (player.name === response["players"][creatorIndex].name) {
                            addOwner(player);
                        } else {
                            addJoined(player);
                        }
                });
                addEmpty(playersToJoin);
            })
            .catch(errorHandler);
        setTimeout(() => addInfo(), 1500);
    }
}


function addOwner(player) {
    document.querySelector("main.ownerLobby").insertAdjacentHTML("afterbegin",
        `<h3>${player.name}'s room</h3>
                <div class="lobbyCreator">
                <p>${player.name} (Creator)</p>
                </div>`);
}

function addJoined(player) {
    document.querySelector("main.ownerLobby").insertAdjacentHTML("beforeend",
            `<div class="lobbyJoined">
                    <p>${player.name} joined the lobby</p>
                  </div>`);
}

function addEmpty(playersToJoin) {
    while (playersToJoin !==0) {
        document.querySelector("main.ownerLobby").insertAdjacentHTML("beforeend",
            `<div class="lobbyEmpty">
                    <p>Empty slot</p>
                  </div>`);
        playersToJoin--;
    }
}
