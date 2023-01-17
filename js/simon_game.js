const simonGame = {
    status: "ordi",
    nbRow: 3,
    nbCell: 3,
    launcherButton: null,
    userChoice: 0,
    cellElements: [],
    cell_in_memory: [],
    game: function() {
        console.log("Game launched");
        let randomElement = simonGame.randomCell();
        simonGame.cell_in_memory.push(randomElement);
        
        let index = 0;
        let id = setInterval(function() {
            if (index === simonGame.cell_in_memory.length) {
                clearInterval(id);
                simonGame.status = "";
            } else {
                let element = simonGame.cell_in_memory[index];
                simonGame.cellActive(element, 400);
                index++;
            }
        }, 500)
        // simonGame.cellActive(randomElement, 300);
        
        
    },
    randomCell: function() {
        let randomValue = Math.floor(Math.random() * simonGame.cellElements.length);
        return simonGame.cellElements[randomValue];
    },
    playerListener: function(event) {
        if (simonGame.status === "ordi") {
            return;
        }

        
        let element = simonGame.cell_in_memory[simonGame.userChoice];
        
        if (event.currentTarget !== element) {
            alert("Désolé c'est perdu");
            return;
        }
        simonGame.cellActive(event.currentTarget, 200);
        simonGame.userChoice += 1;

        if (simonGame.userChoice === simonGame.cell_in_memory.length) {
            simonGame.status = "ordi";
            simonGame.userChoice = 0;
            setTimeout(function() {
                simonGame.game();
            }, 200);
            
        } 
    },
    cellActive: function(element, duration) {
        element.classList.add("active");
        setTimeout(function() {
            element.classList.remove("active");
        }, duration);
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
        let divRowElements = []
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
                cellElement.addEventListener("click", simonGame.playerListener);
                simonGame.cellElements.push(cellElement);
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