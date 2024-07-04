function collectRent(){
    const gameId = loadFromStorage("gameId");
    const playerName = loadFromStorage("name");

    fetchFromServer(`/games/${gameId}`)
        .then(game =>{
            game["players"].forEach(player =>{
                if(game["turns"][game["turns"].length - 1]["player"] === player.name){
                    const propertyName = player['currentTile'];
                    const debtorName = game["turns"][game["turns"].length - 1]["player"];

                    fetchFromServer(`/games/${gameId}/players/${playerName}/properties/${propertyName}/visitors/${debtorName}/rent`, "DELETE")
                        .catch(errorHandler);
                }
            });
        })
        .catch(errorHandler);
}
