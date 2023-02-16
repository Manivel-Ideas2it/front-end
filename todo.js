window.addEventListener("load",() =>{
    createUser();
    loadedList();
    searchEvent();
});

const url = 'http://localhost:8080/api/v1/todo';

function createUser(){
    let loginDiv = document.createElement("div");
    loginDiv.id = "login-Div";
    document.body.appendChild(loginDiv);
    let text = document.createElement("p");
    text.innerText = "enter the login id";
    text.id = "login-id-text";
    loginDiv.appendChild(text);
    let inputText = document.createElement("input");
    inputText.id = "input-text";
    // inputText.
    let submit = document.createElement("button");
    submit.id = "login-submit";
    submit.innerText="send";
    loginDiv.appendChild(inputText);
    loginDiv.appendChild(submit);
}

function searchEvent(){
    let menuBar = document.getElementById("menu-container");
    let searchBar = document.createElement("div");
    searchBar.id = "search-bar";
    menuBar.appendChild(searchBar);
    let searchIcon = document.createElement("span");
    searchIcon.className = "material-symbols-outlined search-icon";
    searchIcon.innerText = "search";
    searchBar.appendChild(searchIcon);
    searchBar.addEventListener("click",function(){
        searchDivision();
    });
}
function searchDivision(){
    let searchInput = document.createElement("input");
    searchInput.id = "search";
    let menubar = document.getElementById("menu-container");
    menubar.appendChild(searchInput);
    searchInput.focus();
    let closer = document.createElement("span");
    closer.className = "material-symbols-outlined closer";
    closer.innerText = "close";
    menubar.appendChild(closer);
    closer.addEventListener("click",function(){
        searchInput.remove();
        closer.remove();
        document.getElementById("search-box").remove();
    });
    searchInput.addEventListener("input",function(){
        filter = searchInput.value;
        createSerachDiv(searchList(filter));
    });
}

function createSerachDiv(element){
    let creatDiv = document.createElement("div");
    creatDiv.id = "search-box";
    element.then(result => {
        result.forEach(e => {
            let list = createListDivision(e);
            creatDiv.appendChild(list);
            console.log(e);
            console.log(list.childNodes[1].value);   
        });
    });
    document.body.appendChild(creatDiv);  
};

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
    let list = createListDivision(data);
    document.getElementById("task-info").appendChild(list);
    if(data.complete){
        data.complete = !(data.complete);
        list.childNodes[0].checked = true;
        checkList(list.childNodes[0],data);
    }
    document.getElementById("text-list").value = "";
}

function createListDivision(data){
    let list = document.createElement("li");
    let listText = document.createElement("input");
    let remove = document.createElement("button");
    let check = document.createElement("input");
    let text = document.createElement("button"); 
    list.appendChild(check);
    list.appendChild(listText);
    list.appendChild(text);
    list.appendChild(remove);
    list.id = "added-list";
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
    return list;
}

function removelist(element,data) {
    const dropListelemnt = element.parentElement;
    let message = document.createElement("p");
    message.className = "alert-box-message";
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
        completedTaskCount();
        dropList(data);
    });
    removeListCancel.addEventListener('click', function() {
        remove.remove();
        dropList(data);
    });
} 

function checkList(element,data){
    let listTwo = document.getElementById("task-status");

    if(element.checked && data.complete == false){
        listTwo.appendChild(element.parentNode);
        element.parentNode.childNodes[2].style.display = "none";
        element.parentNode.childNodes[3].style.left =  "101%";
        completedTask(data);
    } else {

        document.getElementById("task-info").appendChild(element.parentNode);
        element.parentNode.childNodes[2].style.display = "block";
        element.parentNode.childNodes[3].style.left =  "109%";
        completedTask(data);
    } 
    completedTaskCount();
}

function completedTaskCount(count){
    let countValue = document.getElementById("task-status").childElementCount;
    if(countValue == 0){
        document.getElementById("task-completion").style.display="none";
    } else {
        document.getElementById("task-completion").innerText = "completed - " + countValue;
        document.getElementById("task-completion").style.display="block";
    }
}

function completedTask(data){
    data.complete = !(data.complete);
    updateList(data);
}

function loadedList(){
    // document.getElementById("task-info").innerHTML = " ";
    // document.getElementById("task-status").innerHTML = " ";
    readList().then((result) => {
            for(let task of result){
                read(task);
            }
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
    const url = 'http://localhost:8080/api/v1/todo/';
    let request = {
        method : 'GET'
    };
    let data = await fetch(url,request);
    return data.json();
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

async function searchList(element){
    const url = 'http://localhost:8080/api/v1/todo?name=' + element;
    let data = await fetch(url);
    return data.json();
}