"use strict";

const _beginningTilesPosition = [0, 1, 2, 3, 4];
const _finalTilesPosition = [35, 36, 37, 38, 39];

function displayCurrentTiles(playerName) {
        _token = loadFromStorage("token");

        fetchFromServer(`/games/${loadFromStorage("gameId")}`, "GET")
            .then(info => {
                info.players.forEach(player => {
                    if (player.name === playerName) {
                        fetchFromServer("/tiles","GET")
                            .then(tiles => {
                                const tileInfo = getTileInfoFromListBasedOnName(tiles, player['currentTile']);

                                getAllTiles()[tileInfo.position].classList.add("current", "display");
                                getAllTiles()[tileInfo.position].classList.remove("hide");
                                if (tileInfo.position > 1 && tileInfo.position < 38) {
                                    getAllTiles()[tileInfo.position - 1].classList.add("display");
                                    getAllTiles()[tileInfo.position - 1].classList.remove("hide");
                                    getAllTiles()[tileInfo.position - 2].classList.add("display");
                                    getAllTiles()[tileInfo.position - 2].classList.remove("hide");
                                    getAllTiles()[tileInfo.position + 1].classList.add("display");
                                    getAllTiles()[tileInfo.position + 1].classList.remove("hide");
                                    getAllTiles()[tileInfo.position + 2].classList.add("display");
                                    getAllTiles()[tileInfo.position + 2].classList.remove("hide");
                                }
                                displayPawn(playerName);
                            })
                            .catch(errorHandler);
                    }
                });
            })
            .catch(errorHandler);
}

function carouselNext() {
    const tiles = getAllTiles();
    const positionsOfDisplayed = getPositionOfDisplayed();

    if (positionsOfDisplayed.length < 5) {
        ifCurrentTileIsAtBeginningOrEnd();
    } else if (positionsOfDisplayed[positionsOfDisplayed.length-1] === 39) {
        positionsOfDisplayed.forEach(position => {
            tiles[position].classList.add("hide");
            tiles[position].classList.remove("display");
        });
       displayBeginningTiles();
    } else {
        tiles[positionsOfDisplayed[0]].classList.add("hide");
        tiles[positionsOfDisplayed[0]].classList.remove("display");
        tiles[positionsOfDisplayed[4]+1].classList.add("display");
        tiles[positionsOfDisplayed[4]+1].classList.remove("hide");
    }
}

function carouselPrevious() {
    const tiles = getAllTiles();
    const positionsOfDisplayed = getPositionOfDisplayed();

    if (positionsOfDisplayed.length < 5) {
        ifCurrentTileIsAtBeginningOrEnd();
    } else if (positionsOfDisplayed[0] === 0) {
        positionsOfDisplayed.forEach(position => {
            tiles[position].classList.add("hide");
            tiles[position].classList.remove("display");
        });
        displayFinalTiles();
    } else {
        tiles[positionsOfDisplayed[4]].classList.add("hide");
        tiles[positionsOfDisplayed[4]].classList.remove("display");
        tiles[positionsOfDisplayed[0]-1].classList.add("display");
        tiles[positionsOfDisplayed[0]-1].classList.remove("hide");
    }
}

function ifCurrentTileIsAtBeginningOrEnd() {
    const positionsOfDisplayed = getPositionOfDisplayed();

    if (positionsOfDisplayed[0] > 20) {
        displayFinalTiles();
    } else if (positionsOfDisplayed[0] < 20) {
        displayBeginningTiles();
    }
}

function displayBeginningTiles() {
    const tiles = getAllTiles();

    _beginningTilesPosition.forEach(position => {
        tiles[position].classList.add("display");
        tiles[position].classList.remove("hide");
    });
}

function displayFinalTiles() {
    const tiles = getAllTiles();

    _finalTilesPosition.forEach(position => {
        tiles[position].classList.add("display");
        tiles[position].classList.remove("hide");
    });
}

function getPositionOfDisplayed() {
    const tiles = getAllTiles();
    const positionsOfDisplayed = [];

    tiles.forEach(function(tile,index) {
        if (tile.classList.contains("display")) {
            positionsOfDisplayed.push(index);
        }
    });
    return positionsOfDisplayed;
}

function getAllTiles() {
    return document.querySelectorAll("div#tiles div.tile");
}
