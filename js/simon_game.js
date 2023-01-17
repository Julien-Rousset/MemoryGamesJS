const simonGame = {
    nbRow: 3,
    nbCell: 3,
    launcherButton: null,
    drawBoard: function() {
        let boardElement = document.querySelector(".game__board");
        let divRowElements = [];

        for (let i=0; i<simonGame.nbRow; i++) {
            let rowElement = document.createElement("div");
            rowElement.classList.add("game__board_row");
            boardElement.append(rowElement);
            divRowElements.push(rowElement);
        }

        divRowElements.forEach(function(element) {
            for (let i=0; i<simonGame.nbCell; i++) {
                let cellElement = document.createElement("div");
                cellElement.classList.add("game__board_cell");
                cellElement.addEventListener("click", simonGame.test);
                element.append(cellElement);
            }
        });

        simonGame.launcherButton.classList.add("hidden");
        
    },
    init: function() {
        simonGame.launcherButton = document.querySelector("#game__launcher");
        simonGame.launcherButton.addEventListener("click", simonGame.drawBoard);
    }
}