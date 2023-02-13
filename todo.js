window.addEventListener("load",() => loadedList());
const url = 'http://localhost:8080/api/v1/todo';
let input = document.getElementById("text-list");
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        add();
    }
});
division = document.getElementById("task-completion");
division.addEventListener("click",function(){
if(document.getElementById("task-status").style.display == "none"){
    document.getElementById("task-status").style.display = "block";
} else{
    document.getElementById("task-status").style.display ="none";
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
    listText.value = data.task;
    listText.id = "list-Text";
    listText.disabled = true;
    check.type = "checkbox";
    check.id = "check-box";
    remove.id = "button";
    remove.innerText = "remove";
    text.className = "text";
    text.innerText = "edit";
    check.addEventListener("change",function(){
        checkList(check,data);
    });
    remove.addEventListener('click',function(){
        removelist(remove,data);
    })
    text.addEventListener('click',function(){
        changeContent(text,data);
    });
    document.getElementById("task-info").appendChild(list);
    if(data.complete){
        data.complete = !(data.complete);
        check.checked = true;
        checkList(check,data);
    }
    document.getElementById("text-list").value = "";
}

function removelist(element,data) {
    const dropListelemnt = element.parentElement;
    let message = document.createElement("p");
    message.innerHTML = "Do you want to remove the task...";
    let remove = document.createElement("div");
    remove.appendChild(message);
    remove.id = "alert-box";
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
        dropList(data);
    });
    removeListCancel.addEventListener('click', function() {
        remove.remove();
        dropList(data);
    });
} 

function checkList(element,data){
    let countValue = document.getElementById("task-status").childElementCount;
    let listTwo = document.getElementById("task-status");

    if(element.checked && data.complete == false){
        countValue++;
        listTwo.appendChild(element.parentNode);
        element.parentNode.childNodes[2].style.display = "none";
        element.parentNode.childNodes[3].style.left =  "101%";
        completedTask(data);
    } else {
        countValue--;
        document.getElementById("task-info").appendChild(element.parentNode);
        element.parentNode.childNodes[2].style.display = "block";
        element.parentNode.childNodes[3].style.left =  "109%";
        completedTask(data);
    } 
    if(countValue == 0){
        document.getElementById("task-completion").style.display="none";
    } else {
        document.getElementById("task-completion").innerText = "completed - " + countValue;
        document.getElementById("task-completion").style.display="block";
    }
}

function completedTask(data){
    data.complete = !(data.complete);
    completeList(data);
}

function loadedList(){
    // let duplicate = (document.getElementById("task-info").childElementCount  + 1)  
    //                 + (document.getElementById("task-status").childElementCount );
                    let child1 =document.getElementById("task-info").childNodes;
                    child1.remove();
                    let child2 = document.getElementById("task-status").childNodes;
                    child2.remove();
    readList().then((result) => {
        console.log(result);
        // if( duplicate != result.length) {
            for(let task of result){
                read(task);
            }
        // } else {
        //     read(result[result.length-1]);
        // }
    });    
}

function changeContent(element,elementData){
    let editContent = element.parentNode;
    let saveContent = editContent.childNodes[1];
    if(saveContent.disabled) {
        saveContent.disabled = false;
        saveContent.focus();
        editContent.childNodes[2].innerText = "save";
    } else {
        saveContent.disabled = true;
        editContent.childNodes[2].innerText = "edit";
        elementData.task = saveContent.value;
        updateList(elementData);
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
    fetch(url,request).then(() => loadedList());
}
async function readList(){
    let request = {
        method : 'GET'
    };
    let data = fetch(url,request);
    const response = await data;
    return await response.json();
}
function dropList(element){
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
    let request =  {
    method: 'PATCH',
    body: JSON.stringify(element),
    headers: {
        'Content-Type': 'application/json'
        }
    };
    fetch(url,request);
}