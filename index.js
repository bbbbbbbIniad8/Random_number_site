let intervalId = null;
let first = true;
let rotateCnt = 0;
let elementCnt = 0;
let rollLst = [];
const delateWord = "D"
const date = new Date();
const seconds = date.getSeconds() % 10;
document.getElementById("date").textContent = `SL ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
const slot = document.getElementById("slot");

function lstCreate(){
    if(document.getElementById('inputed').value === ""){
        return;
    }
    const newlstElement = document.createElement('div');
    newlstElement.id = `text${elementCnt}`;
    newlstElement.className = `roll`;
    newlstElement.textContent = `${document.getElementById('inputed').value}`;
    document.getElementById('columns').appendChild(newlstElement);
    document.getElementById('inputed').value = "";
    elementCnt++;
}

function elementDelete(index){
    rollLst[index] = delateWord;
}

function extractElment(lst, cnt, delateWord){
    let target = 0;
    const len = lst.length;
    while(lst[(cnt+target)%len] == delateWord){
        target++;
    }
    return lst[(cnt+target)%len]
}

function update() {
    rotateCnt++;
    slot.textContent = extractElment(rollLst, rotateCnt, delateWord)
}

function readInput(){
    rollLst = [];
    for(let i = 0;i < elementCnt;i++){
        const target = document.getElementById(`text${i}`).textContent;
        rollLst.push(target);
    }
}

function toggle() {
    let btntext = document.getElementById("controlBtnText");
    if (intervalId === null) {
        readInput()
        if(rollLst.length <= 0){
            alert('要素を入力してください!!');
            return;
        }
        btntext.textContent = "stop";
        intervalId = setInterval(update, 50);
    } else {
        clearInterval(intervalId);
        if (first === true){
            slot.textContent = extractElment(rollLst, seconds, delateWord);
            first = false;
        }
        btntext.textContent= "start";
        intervalId = null;
    }
}
