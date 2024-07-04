"use strict";

document.addEventListener('DOMContentLoaded', init);

function init(){
    showProperties();
    document.querySelector("button.goBack").addEventListener("click", goToGamePage);
}

function goToGamePage() {
    location.href = "monopoly-board.html";
}

function showProperties() {
    _token = loadFromStorage("token");
    const gameId = loadFromStorage("gameId");

    fetchFromServer(`/games/${gameId}`, "GET")
        .then(response => {
            response["players"].forEach(player => {
                if (loadFromStorage("viewPlayer") === player.name) {
                    if (player["properties"].length === 0) {
                        document.querySelector(".menu").insertAdjacentHTML("afterend",`  
                            <p>There are no owned properties yet!</p>`);
                    } else {
                        fetchFromServer("/tiles","GET")
                            .then(tiles => {
                                tiles.forEach(tile => {
                                    player["properties"].forEach(property => {
                                        if (tile.name === property["property"]) {
                                            ownedProperties(tile, property);
                                        }
                                    });
                                });
                            })
                            .catch(errorHandler);
                    }
                }
            });
        })
        .catch(errorHandler);
}

function ownedProperties(tile, property) {
    if (tile.color !== "BLACK" && tile.color !== "WHITE") {
        injectStreetCard(tile, property);
    } else if (tile.color === "BLACK") {
        injectRailroadCard(tile, property);
    } else if (tile.color === "WHITE"){
        injectUtilityCard(tile, property);
    }
}

function injectStreetCard(tile, property) {
    document.querySelector("nav.properties").insertAdjacentHTML("beforeend",`
        <nav class="propCard">
            <nav class="${tile.color.toLowerCase()}">
                <h2>${property["property"]}</h2>
            </nav>
            <div class="card-properties">
                <div class="rent">
                    <p>Rent</p>
                    <p>Rent with</p>
                    <p>Rent with</p>
                    <p>Rent with</p>
                    <p>Rent with</p>
                    <p>Rent with</p>
                </div>
                <div class="amount_house">
                    <p class="The-Fall">0 House</p>
                    <p>1 House</p>
                    <p>2 House</p>
                    <p>3 House</p>
                    <p>4 House</p>
                    <p>Hotel</p>
                </div>
                <div class="price">
                    <p>${tile["cost"]}$</p>
                    <p>${tile["rentWithOneHouse"]}$</p>
                    <p>${tile["rentWithTwoHouses"]}$</p>
                    <p>${tile["rentWithThreeHouses"]}$</p>
                    <p>${tile["rentWithFourHouses"]}$</p>
                    <p>${tile["rentWithHotel"]}$</p>
                </div>
            </div>
            <div class="costs">
                <div class="cost">
                    <p>House price</p>
                </div>
                <div class="price_each">
                    <p>${tile["housePrice"]}$</p>
                </div>
            </div>
        </nav>`);
}

function injectRailroadCard(tile, property) {
    document.querySelector("nav.properties").insertAdjacentHTML("beforeend",`
        <nav class="propCard">
            <nav class="${tile.color.toLowerCase()}">
                <h2>${property["property"]}</h2>
            </nav>
            <nav class="utility">
            <img src="../src/images/station.png" alt="Station">
                <nav class="station-info">
                    <div class="desc">
                        <p>Rent</p>
                        <p>If 2 stations are owned</p>
                        <p>If 3 stations are owned</p>
                        <p>If 4 stations are owned</p>
                    </div>
                    <div class="desc-price">
                        <p>25$</p>
                        <p>50$</p>
                        <p>100$</p>
                        <p>200$</p>
                    </div>
                </nav>
                </nav>
        </nav>`);
}

function injectUtilityCard(tile, property) {
    document.querySelector("nav.properties").insertAdjacentHTML("beforeend",`
       <nav class="propCard">
           <nav class="${tile.color.toLowerCase()}">
               <h2>${property["property"]}</h2>
           </nav>
           <div class="utility-card">
               <img src="../src/images/${property["property"].replace(/\s/g, '-')}.png" alt="utility">
               <p>If utility is owned, <br/> rent is 4 times amount <br/> shown on dice. </p>
               <p>If both utilities are owned, <br/> rent is 10 times amount <br/> shown on dice. </p>
           </div>
       </nav>`);
}
