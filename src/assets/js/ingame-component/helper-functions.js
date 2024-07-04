"use strict";

function getTileInfoFromListBasedOnName(list, name) {
    let result = null;

        list.forEach(tile => {
            if (tile.name === name) {
                result = tile;
            }
        });
    return result;
}

function clearBoard() {
    document.querySelector("main.overview div#tiles").innerHTML = "";
}
