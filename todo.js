window.addEventListener("load",() => readList());
let input = document.getElementById("text-list");
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        add();
    }
});
function read(data){
    let list = document.createElement("li");
    let listText = document.createElement("input");
    let remove = document.createElement("button");
    let check = document.createElement("input");
    let text = document.createElement("button");
    list.appendChild(check);
    list.appendChild(listText);
    list.appendChild(text);
    list.appendChild(remove);
    const dataValue = data.task;
    const dataId = data;
    listText.value = dataValue;
    listText.setAttribute("id","list-Text");
    listText.disabled = true;
    check.type ="checkbox";
    check.setAttribute("id","check-box");
    check.addEventListener("change",function(){
        alert(dataId.id);
        checkList(check,dataId);
    });
    remove.setAttribute("id","button");
    remove.innerText = "remove";
    remove.addEventListener('click',function(){
        removelist(remove,dataId);
    })
    text.setAttribute("class","text");
    text.innerText = "edit";
    text.addEventListener('click',function(){
        changeContent(text,dataId);
    });
    document.getElementById("task-info").appendChild(list);
}

function removelist(element,dataId) {
    const dropListelemnt = element.parentElement;
    let message = document.createElement("p");
    message.innerHTML = "Do you want to remove the task...";
    let remove = document.createElement("div");
    remove.appendChild(message);
    remove.setAttribute("id","alert-box");
    document.body.appendChild(remove);
    let removeList = document.createElement("button");
    removeList.className = "remove conform";
    remove.appendChild(removeList);
    removeList.innerText = "ok";
    let removeListCancel = document.createElement("button");
    removeListCancel.className = "remove cancel";
    remove.appendChild(removeListCancel);
    removeListCancel.innerText = "cancel";
    removeList.addEventListener('click', function() {
        remove.remove();
        removeConform(dropListelemnt);
        dropList(dataId);
    });
    removeListCancel.addEventListener('click', function() {
        remove.remove();
        dropList(dataId);
    });
} 

function checkList(element,dataId){
    let countValue = document.getElementById("task-status").childElementCount -1;
    let listTwo = document.getElementById("task-status");

    if(element.checked ){  
            listTwo.appendChild(element.parentNode);
            countValue++;
            element.parentNode.childNodes[1].disabled = true;
            element.parentNode.childNodes[2].style.display = "none";
            // const value = "true";
            dataId.isComplete = !(dataId.isComplete);
            alert(dataId.isComplete);
            completeList(dataId);
    } else {
        document.getElementById("task-info").appendChild(element.parentNode);
        element.parentNode.childNodes[2].style.display = "block";
        countValue--;
        const value = "false";
        dataId.isComplete = value;
        completeList(dataId);
    } 

    if( countValue == 0 ){
         document.getElementById("name").style.display = "none";
    } else {
        document.getElementById("name").style.display = "block";
        listTwo.style.display = "block";
    }
}

function changeContent(element,elementId){
    let editContent = element.parentNode;
    let saveContent = editContent.childNodes[1];
    if(saveContent.disabled == true) {
        saveContent.disabled = false;
        saveContent.focus();
        editContent.childNodes[2].innerText = "save";
    } else {
        saveContent.disabled = true;
        editContent.childNodes[2].innerText = "edit";
        let content = saveContent.value;
        elementId.task = content;
        updateList(elementId);
    }
}

function removeConform(element) {
     if (element.childNodes[2].innerHTML == "edit") {
        element.remove();
     } else{
         alert("save the text after that remove the task...");
     }
}

function add(){
    const url = 'http://localhost:8080/api/v1/todo';
    let data = { task : document.getElementById("text-list").value};
    if( data.task == ""){
        alert("you need to write something...");
        return false;
    }
    let request =  {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
        }
    };
    fetch(url,request).then(readList());
}
function readList(){
    const url = 'http://localhost:8080/api/v1/todo';
    let request = {
        method : 'GET'
    };
    fetch(url,request).then(response => {
     response.json()
    .then((data) =>  {
        for (let task of data) {
            read(task);
        }
    })});
}
function dropList(element){
    const url = 'http://localhost:8080/api/v1/todo';
    let request =  {
    method: 'DELETE',
    body: JSON.stringify(element),
    headers: {
        'Content-Type': 'application/json'
        }
    };
    fetch(url,request);
}
function updateList(element){
    const url = 'http://localhost:8080/api/v1/todo';
    let request =  {
    method: 'PUT',
    body: JSON.stringify(element),
    headers: {
        'Content-Type': 'application/json'
        }
    };
    fetch(url,request);
}
function completeList(element){
    const url = 'http://localhost:8080/api/v1/todo';
    let request =  {
    method: 'PATCH',
    body: JSON.stringify(element),
    headers: {
        'Content-Type': 'application/json'
        }
    };
    fetch(url,request);
}