function checkIfGameHasWinner() {
    fetchFromServer(`/games/${loadFromStorage("gameId")}`)
        .then(game =>{
            let count = 0;

            game["players"].forEach(player => {
                if(player["bankrupt"] === false){
                    count += 1;
                }

            });

            if(count === 1 && !document.querySelector(".popup.won.modal")){
                insertGameWon();
            }
        })
        .catch(errorHandler);
}

function redirectToIndex() {
    location.href = "index.html";
}

function confirmBankrupt() {
    document.querySelector('main.overview').insertAdjacentHTML("afterend", `
        <div class="popup confirm modal">
            <div class="modal-content">
                <p>Do you wish to declare yourself bankrupt and leave the game?</p>
                <nav>
                <p class="leave">Yes</p>
                <p class="stay">No</p>
                </nav>
            </div>
        </div>`);
    modalPopup();
    document.querySelector(".leave").addEventListener("click", declareBankrupt);
    document.querySelector(".stay").addEventListener("click", closeConfirmPopUp);
}

function declareBankrupt(){
    const name = loadFromStorage("name");
    const gameId = loadFromStorage("gameId");
    fetchFromServer(`/games/${gameId}/players/${name}/bankruptcy`, "POST")
        .then(() =>{
            redirectToIndex();
        })
        .catch(errorHandler);
}

function insertGameWon() {
    document.querySelector('main.overview').insertAdjacentHTML("afterend", `
                    <div class="popup won modal">
                        <div class="modal-content">
                            <p class="pTagMid">CONGRATULATIONS!!! </p>
                            <p class="pTagMid">You have won the game</p>
                            <nav>
                            <p class="leave">leave the game</p>
                            </nav>
                        </div>
                    </div>`);
    modalPopup();
    document.querySelector(".leave").addEventListener("click", redirectToIndex);
}
