let intervalId = null;
let first = true;
let rotatecnt = 0;
let elementcnt = 0;
let rolllst = [];
const d = new Date();
const date = d;
const seconds = d.getSeconds() % 10;
document.getElementById("date").textContent = `SL ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
const slot = document.getElementById("slot");

function lst_criate(){
    if(document.getElementById('inputed').value === ""){
        return;
    }

    const newlstElement = document.createElement('div');
    newlstElement.id = `text${elementcnt}`;
    newlstElement.className = `roll`;
    newlstElement.textContent = `${document.getElementById('inputed').value}`;
    document.getElementById('columns').appendChild(newlstElement);
    document.getElementById('inputed').value = "";
    elementcnt++;
}

function update() {
    rotatecnt++;
    slot.textContent = (rolllst[rotatecnt % rolllst.length]);
}

function read_input(){
    rolllst = [];
    for(let i = 0;i < elementcnt;i++){
        const target = document.getElementById(`text${i}`).textContent;
        rolllst.push(target);
    }
}

function toggle() {
    let btntext = document.getElementById("controlBtnText");
    if (intervalId === null) {
        read_input()
        if(rolllst.length <= 0){
            alert('要素を入力してください!!');
            return;
        }
        btntext.textContent = "stop";
        intervalId = setInterval(update, 50);
    } else {
        clearInterval(intervalId);
        if (first === true){
            slot.textContent = (rolllst[seconds % rolllst.length]);
            first = false;
        }
        btntext.textContent= "start";
        intervalId = null;
    }
}