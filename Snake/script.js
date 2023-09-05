function getRandInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
}

function exitGame(){
    alert("Game over");
}

function editArray(){
    if(document.getElementById(String(i)+"-"+String(j)).style.background == "red") exitGame();
    if(j == apple[0] && i == apple[1]){ 
        countApple++;
        apple.length = 0;
        apple = [getRandInt(2, (N-2)), getRandInt(2, (N-2))];
        let k = countApple - 1;
        if(pervY == 1){
            snakeY.unshift(String(i));
            if(j - k < 0) snakeX.unshift(String(N-1));
            else snakeX.unshift(String(j-k));
        }
        else if(pervY == 2){
            snakeY.unshift(String(i));
            if(j + k >= N) snakeX.unshift(String("0"));
            else snakeX.unshift(String(j+k));
        }
        if(pervX == 1){
            snakeX.unshift(String(j));
            if(i - k < 0) snakeY.unshift(String(N-1));
            else snakeY.unshift(String(i-k));
        }
        else if(pervX == 2){
            snakeX.unshift(String(j));
            if(i + k >= N) snakeY.unshift(String("0"));
            else snakeY.unshift(String(i+k));
        }
    }
    snakeY.push(String(i));
    snakeX.push(String(j));
    snakeY.shift();
    snakeX.shift();
    for(let y = 0; y < N; y++){
        for(let x = 0; x < N; x++){
            document.getElementById(String(y)+"-"+String(x)).style.background = "black";
        }
    } 
    document.getElementById(String(apple[1])+"-"+String(apple[0])).style.backgroundColor = "orange";
    for(let z = 0; z < snakeX.length; z++){
        document.getElementById(String(snakeY[z])+"-"+String(snakeX[z])).style.background = "red";
    }
    return;
}

function right(){
    pervY = 1;
    pervX = 0;
    j++;
    if(j >= N) j = 0;
    editArray();
}

function left(){
    pervY = 2;
    pervX = 0;
    j--;
    if(j < 0) j = N - 1;
    editArray();
}

function up(){
    pervX = 2;
    pervY = 0;
    i--;
    if(i < 0) i = N - 1;
    editArray();
}

function down(){
    pervX = 1;
    pervY = 0;
    i++;
    if(i >= N) i = 0;
    editArray();
}

function startMatrix(){
    let table = document.getElementById("matrix");
    for(i = 0; i < N; i++){
        let row = table.insertRow(i);
        for(j = 0; j < N; j++){
            let cell = row.insertCell(j);
            cell.id = String(i)+"-"+String(j);
            cell.style.background = "black";
            cell.style.width = "25px";
            cell.style.height = "25px";
        }
    }
    document.getElementById(String(apple[1])+"-"+String(apple[0])).style.backgroundColor = "orange";
    i = 0, j = 0;
    snakeY.push(String(i));
    snakeX.push(String(j));
    let timerID = setInterval(() => down(i, j), speed);
    window.addEventListener("keydown", function(event){ 
        this.clearInterval(timerID);
        switch(event.keyCode){
            case 68: 
                timerID = setInterval(() => right(i, j), speed);
                break;
            case 65: 
                timerID = setInterval(() => left(i, j), speed);
                break;
            case 87: 
                timerID = setInterval(() => up(i, j), speed);
                break;
            case 83: 
                timerID = setInterval(() => down(i, j), speed);
                break;
        }
    });
}


const N = 15;
const speed = 200;
let pervX = 0, pervY = 0;
let i = 0, j = 0;
let countApple = 1;
let apple = [getRandInt(2, (N-2)), getRandInt(2, (N-2))];
let snakeX = [];
let snakeY = [];

startMatrix(i, j);