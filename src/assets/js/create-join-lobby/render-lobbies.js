"use strict";

function displayLobbies() {
    fetchFromServer(`/games?numberOfPlayers=${loadFromStorage("amountOfPlayers")}&started=false&prefix=group`,"GET")
        .then(games => {
            let counter = 0;

            document.querySelector("section").innerHTML = "";
            document.querySelector("section").innerHTML = "<h2>Available rooms:</h2>";
            games.forEach( function(game, index) {
                if (game["players"].length !== 0) {
                    const creatorIndex = game["players"].length - 1;
                    const creatorName = game["players"][creatorIndex].name;

                    document.querySelector("section").insertAdjacentHTML("beforeend",
                        `<div>
                                <h3>${creatorName}'s Room</h3>
                                <span>ping: 10ms</span>
                                <p>Players in lobby: ${game["players"].length}/${games[index]["numberOfPlayers"]}</p>
                                <button value="${counter}">join lobby</button>
                              </div>`);
                    counter += 1;
                }
            });
        })
        .catch(errorHandler);

    setTimeout(() => displayLobbies(), 1500);
}
