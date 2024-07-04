"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    addInfo();
    checkGameStarted(loadFromStorage("gameId"));
}
