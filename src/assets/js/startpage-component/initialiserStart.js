"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    window.localStorage.clear();
    document.querySelector('main form').addEventListener('submit', formSubmit);
    document.querySelector('main form input#submitStartForm').addEventListener('click', submitButtonClick);
}
