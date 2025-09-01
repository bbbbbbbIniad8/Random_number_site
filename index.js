const DELETE_MARKER = "D"
const date = new Date();
const seconds = date.getSeconds() % 10;
const slot = document.getElementById("slot");
const slotState = {
  intervalId: null,
  isFirstSpin: true,
  rotationCnt: 0,
  rollLst: [],
};
document.getElementById("date").textContent = `SL ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;


function pushLst(){
    const input = document.getElementById('inputed').value;
    if(input === ""){
        return;
    }
    const newlstElement = document.createElement('div');
    newlstElement.id = `text${slotState.rollLst.length}`;
    newlstElement.className = `roll`;
    newlstElement.textContent = `${input}`;
    document.getElementById('columns').appendChild(newlstElement);
    document.getElementById('inputed').value = "";
    slotState.rollLst.push(input);
}

function elementDelete(index){
    slotState.rollLst[index] = DELETE_MARKER;
}

function extractElement(lst, cnt, DELETE_MARKER){
    const len = lst.length;
    let target = 0;
    while(lst[(cnt+target)%len] === DELETE_MARKER){
        target++;
    }
    return lst[(cnt+target)%len]
}

function update() {
    slotState.rotationCnt++;
    slot.textContent = extractElement(slotState.rollLst, slotState.rotationCnt, DELETE_MARKER)
}

function btnTextChange(){
    let btn = document.getElementById("controlBtnText");
    const btnText = btn.textContent;
    btn.textContent = (btnText === "stop") ? "start" : "stop";
}

function toggle() {
    if (slotState.intervalId === null) {
        if(slotState.rollLst.length <= 0){
            alert('要素を入力してください!!');
            return;
        }
        btnTextChange();
        slotState.intervalId = setInterval(update, 50);
    } else {
        clearInterval(slotState.intervalId);
        if (slotState.isFirstSpin === true){
            slot.textContent = extractElement(slotState.rollLst, seconds, DELETE_MARKER);
            slotState.isFirstSpin = false;
        }
        btnTextChange();
        slotState.intervalId = null;
    }
}
