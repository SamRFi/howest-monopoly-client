"use strict";

document.addEventListener("DOMContentLoaded",init);

function init() {
    displayLobbies();
    document.querySelector('body aside button').addEventListener("click", createLobbyButtonClick);
    document.querySelector('main.joinOrCreateRoom section').addEventListener("click", joinLobbyButtonClick);
}
