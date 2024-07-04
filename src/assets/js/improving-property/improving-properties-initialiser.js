"use strict";

document.addEventListener("DOMContentLoaded", init);


function returnToBoard() {
    location.href = "monopoly-board.html";
}

function init() {
    document.querySelector("header#buy-houses div h3").addEventListener("click", returnToBoard);
    showOwnedProperties();
    document.querySelector("div.scrollbar:first-of-type").addEventListener("click", eventDelegation);
}
