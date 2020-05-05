let boxes = [];

let ranChoice = [0,1,2,3,4,5,6,7,8];

function resetAllSettings() {
    ranChoice = [0,1,2,3,4,5,6,7,8];
    boxes = [];
}


function getRandomPosition() {
    return (Math.ceil(Math.random() * ranChoice.length)) - 1;
}

function generateBoxes() {
    resetAllSettings();
    while(ranChoice.length) {
        let index = getRandomPosition();
        boxes.unshift({
            val: ranChoice[index],
            isEmpty: ranChoice[index] == 0 ? true : false
        });
        ranChoice.splice(index, 1);
    }
    for(i = 0; i < boxes.length; i++) boxes[i].index = i;
}


function buildBoxUi() {
    let ground = document.getElementById("ground");
    ground.innerHTML = "";
    generateBoxes();
    old = true;
    index = 0;
    for(i = 0; i < 3; i++) {
        for(j = 0; j < 3; j++) {
            it = boxes[index++];
            let el = document.createElement("div");
            el.classList.add(it.isEmpty ? "empty_box" : "box");
            el.innerText = it.val;
            el.style.top = (i * 100) + "px";
            el.style.left = (j * 100) + "px";
            el.isEmpty = it.isEmpty;
            el.i = i;
            el.j = j;
            el.index = it.index;
            el.addEventListener("click", updateGameState);
            ground.appendChild(el);
        }
    }
}

buildBoxUi();

function updateGameState(e) {
    el = e.target;
    emptyEl = document.querySelector(".empty_box");
    
    if(el === emptyEl) {
        
    } else {
        if(el.i == emptyEl.i) {
            if(mod(el.j - emptyEl.j) == 1) move(el, emptyEl);
        }else if(el.j == emptyEl.j) {
            if(mod(el.i - emptyEl.i) == 1) move(el, emptyEl);
        }
    }
    if(checkForWin()) playerWins();
    
}

function checkForWin() {
    let is = true;
    for(let i = 1; i <= 8; i++) {
        if((i) != boxes[i - 1].val) {
            is = false;
            break;
        }
    }
    return is;
}

function move(el, emptyEl) {
    // Change in boxes Array and elements
    [boxes[el.index], boxes[emptyEl.index]] = [boxes[emptyEl.index], boxes[el.index]];
    for(i = 0; i < boxes.length; i++) boxes[i].index = i;
    el.index = el.index + emptyEl.index;
    emptyEl.index = el.index - emptyEl.index;
    el.index = el.index - emptyEl.index;
    
    let tmp1 = {
        i: el.i,
        j: el.j
    };
    
    let tmp2 = {
        i: emptyEl.i,
        j: emptyEl.j
    };
    
    emptyEl.i = tmp1.i;
    emptyEl.j = tmp1.j;
    
    el.i = tmp2.i;
    el.j = tmp2.j;
    
    el.style.top = (el.i * 100) + "px";
    el.style.left = (el.j * 100) + "px";
    
    emptyEl.style.top = (emptyEl.i * 100) + "px";
    emptyEl.style.left = (emptyEl.j * 100) + "px";
}

function mod(num) {
    return num < 0 ? -num : num;
}

function playerWins() {
    let messageBox = document.getElementById("winMessage");
    let restartBtn = document.getElementById("restart");
    let closeBtn = document.getElementById("close");
    messageBox.classList.add("open");
    
    
    restartBtn.addEventListener("click", function() {
        buildBoxUi();
        messageBox.classList.remove("open");
    })
    
    closeBtn.addEventListener("click", function() {
        messageBox.classList.remove("open");
    })
}