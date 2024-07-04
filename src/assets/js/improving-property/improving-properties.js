"use strict";

function injectFullSet(tile, property, tileNameAsId) {
    document.querySelector("div#scrolls div:first-of-type").insertAdjacentHTML("beforeend", `
          <div>
            <h4 class="${tile.color}">${property.property}</h4>
            <label for="${tileNameAsId}" id="${tileNameAsId}">Number of current <br> houses: ${property["houseCount"]}</label>
                  <input type="number" id="${tileNameAsId}" name="${tile.name}" min="0" max="5"> <br>
                  <button id="buy${tileNameAsId}">buy for 0$</button>
                  <button id="sell${tileNameAsId}">sell for 0$</button>
          </div>`);
}


function injectFullSetWithHotel(tile, property, tileNameAsId) {
    document.querySelector("div#scrolls div:first-of-type").insertAdjacentHTML("beforeend", `
          <div>
            <h4 class="${tile.color}">${property.property}</h4>
            <label for="${tileNameAsId}" id="${tileNameAsId}">You have a hotel <br> on this place!</label>
              <button id="sellHotel${tileNameAsId}">sell Hotel</button>
          </div>`);
}

function injectNoneFullSet(tile, property) {
    document.querySelector("div#scrolls div.scrollbar:last-of-type").insertAdjacentHTML("beforeend", `
          <div>
            <h4 class="${tile.color}">${property.property}</h4>
            <p>Get the full set to start building houses</p>
          </div>`);
}

function injectProperties(tiles, property, colorCount) {
    tiles.forEach(tile => {
        if (tile["name"] === property.property && Object.keys(tile).length === 16) {
                const tileNameAsId = tile.name.replace(/\s+/g, "-");

            if (colorCount[tile.color] === tile["groupSize"] && property["hotelCount"] === 0) {
                injectFullSet(tile, property, tileNameAsId);
            } else if(property["hotelCount"] === 1) {
                injectFullSetWithHotel(tile, property, tileNameAsId);

            }else{
                injectNoneFullSet(tile, property);
            }
        }
    });
}

function colorCounter(tiles, property, colorCount) {
    tiles.forEach(tile => {
        if (tile["name"] === property.property) {
            colorCount[tile.color] += 1;
        }
    });
}

function displayData(player, name, tiles, colorCount) {
    if (player["name"] === name) {
        document.querySelector("header#buy-houses h2:last-of-type").innerHTML = player["money"] + "$";
        player.properties.forEach(property => {
            colorCounter(tiles, property, colorCount);
        });
        player.properties.forEach(property => {
            injectProperties(tiles, property, colorCount);
        });
    }
}

function showOwnedProperties() {
    _token = loadFromStorage("token");
    const name = loadFromStorage("name");
    const gameId = loadFromStorage("gameId");

    displayName(name);
    fetchFromServer(`/games/${gameId}`, "GET")
        .then(game => {
            fetchFromServer("/tiles")
                .then(tiles => {
                    game["players"].forEach(player => {
                        const colorCount = {"PURPLE": 0, "BLACK": 0, "LIGHTBLUE": 0, "VIOLET": 0,
                                            "ORANGE": 0, "RED": 0, "YELLOW": 0, "DARKGREEN": 0, "DARKBLUE": 0};
                        displayData(player, name, tiles, colorCount);
                    });
                })
                .catch(errorHandler);
        })
        .catch(errorHandler);
}

function displayName(mainName) {
    document.querySelector("main.houses h1").innerHTML = mainName;
}

function injectTotalPrice(amountOfHouses, housePrice, id) {
    const total = amountOfHouses * housePrice;
    document.querySelector(`div div button#buy${id.replace(" ", "-")}`).innerHTML = `buy for ${total}$`;
    document.querySelector(`div div button#sell${id.replace(" ", "-")}`).innerHTML = `sell for ${total/2}$`;
}


function clearInnerHtml() {
    document.querySelectorAll("div.scrollbar").forEach(bar =>{
        bar.innerHTML = "";
    });
}

function buildHotel(tileName, name, gameId) {
    fetchFromServer(`/games/${gameId}/players/${name}/properties/${tileName}/hotel`, "POST")
        .then(() => {
            clearInnerHtml();
            showOwnedProperties();
        })
        .catch(errorHandler);
}

function buyHouses(amountOfHouses, gameId, name, tileName) {
    for (let i = 0; i < amountOfHouses; i++) {

        fetchFromServer(`/games/${gameId}/players/${name}/properties/${tileName}/houses`, "POST")
            .then(() => {
                clearInnerHtml();
                showOwnedProperties();
            })
            .catch(errorHandler);
    }
}

function checkBuyHouseOrHotel(player, tileName, amountOfHouses, name, gameId) {
    player["properties"].forEach(property => {
        if (property.property === tileName && property["hotelCount"] === 0) {
            if ((parseInt(amountOfHouses) + property["houseCount"]) <= 5) {
                if ((parseInt(amountOfHouses) + property["houseCount"]) === 5) {
                    buildHotel(tileName.replace("-", " "), name, gameId);
                } else {
                    buyHouses(amountOfHouses, gameId, name, tileName);
                }
            }
        }
    });
}

function buyProperty(amountOfHouses, tileName) {
    const name = loadFromStorage("name");
    const gameId = loadFromStorage("gameId");

    if(0 < amountOfHouses && amountOfHouses <= 5){
        fetchFromServer(`/games/${gameId}`)
            .then(game => {
                game["players"].forEach(player =>{
                    if(player.name === name){
                        checkBuyHouseOrHotel(player, tileName, amountOfHouses, name, gameId);
                    }

                });
            })
            .catch(errorHandler);
    }
}

function sellHotel(tileName) {
    const name = loadFromStorage("name");
    const gameId = loadFromStorage("gameId");

    fetchFromServer(`/games/${gameId}/players/${name}/properties/${tileName}/hotel`, "DELETE")
        .then(() =>{
            clearInnerHtml();
            showOwnedProperties();
        })
        .catch(errorHandler);
}

function sellHouses(amountOfHouses, tileName) {
    const name = loadFromStorage("name");
    const gameId = loadFromStorage("gameId");

    for(let i = amountOfHouses; i > 0; i--){

        fetchFromServer(`/games/${gameId}/players/${name}/properties/${tileName}/houses`, "DELETE")
            .then(() => {
                clearInnerHtml();
                showOwnedProperties();
            })
            .catch(errorHandler);
    }
}


function displayTotalPrice(e) {
    fetchFromServer("/tiles")
        .then(tiles => {
            tiles.forEach(tile => {
                if (tile["name"] === e.target.id.replace("-", " ")) {
                    injectTotalPrice(e.target.value, tile["housePrice"], e.target.id.replace("-", " "));
                }
            });
        })
        .catch(errorHandler);
}



function buyOrSellHouses(e) {
    fetchFromServer("/tiles")
        .then(tiles => {
            tiles.forEach(tile => {
                let val = 1;

                if (tile["name"] === e.target.id.replace("-", " ").replace("buy", "").replace("sell", "")
                    .replace("Hotel", "")) {
                    if (e.target.id.replace(e.target.id.replace("buy", ""), "") === "buy") {
                         val = document.querySelector(`div div input#${e.target.id.replace("buy", "")
                                 .replace("sell", "")}`).value;
                        buyProperty(val, e.target.id.replace("-", " ").replace("buy", ""));
                    } else if(e.target.id.replace("sell", "") === tile["name"]){
                        if (document.querySelector(`div div input`)){
                             val = document.querySelector(`div div input#${e.target.id.replace("buy", "")
                                     .replace("sell", "")}`).value;
                            sellHouses(val, e.target.id.replace("-", " ").replace("sell", ""));
                        }
                    } else{
                        sellHotel(tile["name"]);
                    }
                }
            });
        })
        .catch(errorHandler);
}

function eventDelegation(e){
    switch(e.target.nodeName.toLowerCase()){
        case "input":
            e.preventDefault();
            displayTotalPrice(e);
            break;
        case "button":
            buyOrSellHouses(e);
            break;
        default:
    }
}


