const simonGame = {
    status: "ordi",
    nbRow: 3,
    nbCell: 3,
    launcherButton: null,
    rowElements: [],
    cellElements: [],
    game: function() {
        console.log("Game launched");
        simonGame.status = "";
        
    },
    playerListener: function(event) {
        if (simonGame.status === "ordi") {
            return;
        }
    },
    
    waitingLauncher: function() {
        let i = 0;
        
        let id = setInterval(function() {
            if (i === 3) {
                simonGame.game();
                clearInterval(id); 
            } else {
                i++
                console.log(i);
            }
            
        }, 1000)
    },
    drawBoard: function() {
        let boardElement = document.querySelector(".game__board");

        for (let i=0; i<simonGame.nbRow; i++) {
            let rowElement = document.createElement("div");
            rowElement.classList.add("game__board_row");
            boardElement.append(rowElement);
            simonGame.rowElements.push(rowElement);
        }

        simonGame.rowElements.forEach(function(element) {
            for (let i=0; i<simonGame.nbCell; i++) {
                let cellElement = document.createElement("div");
                cellElement.classList.add("game__board_cell");
                cellElement.addEventListener("click", simonGame.playerListener);
                simonGame.cellElements.push(element);
                element.append(cellElement);
            }
        });

        simonGame.launcherButton.classList.add("hidden");  
        
        simonGame.waitingLauncher();
    },
    init: function() {
        simonGame.launcherButton = document.querySelector("#game__launcher");
        simonGame.launcherButton.addEventListener("click", simonGame.drawBoard);
    }
}