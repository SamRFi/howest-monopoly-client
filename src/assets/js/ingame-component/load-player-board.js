"use strict";

function loadFullBoard() {
        fetchFromServer("/tiles", "GET")
            .then(tiles => {
                tiles.forEach(tile => {
                    document.querySelector("div#tiles").insertAdjacentHTML("beforeend",
                        `<div id="${tile.name.replace(/\s/g, "")}" class="tile hide">
                            <div>
                            </div>
                            <h2>GO</h2>
                            <p></p>
                          </div>`);
                            const tileInfo = getTileInfoFromListBasedOnName(tiles, tile.name);
                            switch (tileInfo.type) {
                                case "street":
                                    document.querySelector(`div#tiles div#${tile.name.replace(/\s/g, "")}`).classList.add("road");
                                    document.querySelector(`div#tiles div#${tile.name.replace(/\s/g, "")}`).classList.add(`${tileInfo.color.toLowerCase()}`);
                                    document.querySelector(`div#tiles div#${tile.name.replace(/\s/g, "")}` + " p").innerHTML = `${tileInfo.cost}$`;
                                    break;
                                case "Go":
                                    document.querySelector(`div#tiles div#${tile.name.replace(/\s/g, "")}`).classList.add("go");
                                    document.querySelector(`div#tiles div#${tile.name.replace(/\s/g, "")}` + " p").innerHTML = "Collect 200$ salary as you pass";
                                    break;
                                case "community chest":
                                    document.querySelector(`div#tiles div#${tile.name.replace(/\s/g, "")}`).classList.add("community");
                                    break;
                                case "Tax Income":
                                    document.querySelector(`div#tiles div#${tile.name.replace(/\s/g, "")}`).classList.add("income-tax");
                                    break;
                                case "Luxury Tax":
                                    document.querySelector(`div#tiles div#${tile.name.replace(/\s/g, "")}`).classList.add("super-tax");
                                    break;
                                case "railroad":
                                    document.querySelector(`div#tiles div#${tile.name.replace(/\s/g, "")}`).classList.add("station");
                                    break;
                                case "chance":
                                    document.querySelector(`div#tiles div#${tile.name.replace(/\s/g, "")}`).classList.add("chance");
                                    break;
                                case "Jail":
                                    document.querySelector(`div#tiles div#${tile.name.replace(/\s/g, "")}`).classList.add("prison");
                                    break;
                                case "Go to Jail":
                                    document.querySelector(`div#tiles div#${tile.name.replace(/\s/g, "")}`).classList.add("go-to-prison");
                                    break;
                                case "Electric Company":
                                    document.querySelector(`div#tiles div#${tile.name.replace(/\s/g, "")}`).classList.add("electric-company");
                                    break;
                                case "Water Works":
                                    document.querySelector(`div#tiles div#${tile.name.replace(/\s/g, "")}`).classList.add("water-works");
                                    break;
                                case "Free Parking":
                                    document.querySelector(`div#tiles div#${tile.name.replace(/\s/g, "")}`).classList.add("parking");
                                    break;
                                default:
                            }
                            document.querySelector(`div#tiles div#${tile.name.replace(/\s/g, "")}` + " h2").innerHTML = tile.name;
                        });
            })
            .catch(errorHandler);
        displayPlayerMoney(loadFromStorage('name'));
        checkBuy(loadFromStorage('gameId'));
}
