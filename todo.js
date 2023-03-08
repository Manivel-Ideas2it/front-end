window.addEventListener("load",function(){
    date();
    read();
});
let userId;
function date() {
    const date = new Date().toLocaleDateString('en-us', { weekday : "long",  month : "long", day:"numeric" });
    document.getElementById("yearAndDate").innerText = date;
}

let input = document.getElementById("taskInputField");
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

let addTaskInput = document.getElementById("addIcon");
addTaskInput.addEventListener("click",function(){
    addTask();
})

function addTask(){
    let inputValue = input.value;
    if(inputValue != ""){
        input.value = "";
        add(inputValue);
        return true;
    }
    alert("write something before add the task");
}
let signOutDiv = document.getElementById("usericonDiv");
signOutDiv.addEventListener("click",function(){
    let signOut = document.getElementById("signOutDiv");
    signOut.style.display = "block";
});

let signOut = document.getElementById("signOut");
signOut.addEventListener("click",function(){
    existUser(userId);
});


function createTaskDiv(e){
const createdTask = document.getElementById("addedTask");
createdTask.innerHTML = "";
document.getElementById("completedTasks").innerHTML = "";
let addedTask = document.getElementById("taskAddingDiv");
    for (let i of e){
        let cloneTask = addedTask.cloneNode(true);
        cloneTask.childNodes[1].childNodes[1].id = "checkTask";
        cloneTask.childNodes[3].childNodes[1].value = i.task;
        cloneTask.childNodes[3].childNodes[1].disabled = true;
        cloneTask.childNodes[5].childNodes[1].style.display = "block";
        cloneTask.childNodes[5].childNodes[1].childNodes[1].id = "editButton";
        cloneTask.childNodes[5].childNodes[3].childNodes[1].style.fontSize = "20px";
        cloneTask.childNodes[5].childNodes[3].childNodes[1].innerText = "delete";
        createdTask.appendChild(cloneTask);
        if(i.complete == true){
            i.complete = false;
            completedTask(cloneTask,i);
        }
        cloneTask.childNodes[1].childNodes[1].addEventListener("click",function(){
            completedTask(cloneTask ,i);
        });
        cloneTask.childNodes[5].childNodes[1].childNodes[1].addEventListener("click",function(){
            editTask(cloneTask,i);
        });
        cloneTask.childNodes[5].childNodes[3].childNodes[1].addEventListener("click",function(){
            removetask(cloneTask,i);
        });
    }
}

function completedTask(element,data){
    let check =  element.childNodes[1].childNodes[1];
    let taskComplete = document.getElementById("completedTasks");
    let unCheck = document.getElementById("addedTask");

    if( check.innerText == "circle" && data.complete == false){
        check.innerText ="check_circle";
        element.childNodes[5].childNodes[1].childNodes[1].style.display = "none";
        taskComplete.appendChild(element);
        completedTaskUpdate(data);
    } else {
        check.innerText = "circle";
        element.childNodes[5].childNodes[1].childNodes[1].style.display = "block";
        unCheck.appendChild(element);
        completedTaskUpdate(data)
    }
    completedTaskCount();
}

function completedTaskUpdate(data){
    data.complete = !(data.complete);
    updateList(data);
}

function completedTaskCount(){
    let checkStatus = document.getElementById("completedTaskCount");
    let count = document.getElementById("completedTasks").childElementCount;
    if(count == 0){
        checkStatus.style.display = "none";
    } else{
        checkStatus.style.display ="block";
        checkStatus.childNodes[3].innerText = "completed"+"-"+count;
    }
}

let checkStatus = document.getElementById("completedTaskCount");
let hideTask = document.getElementById("arrowSet");
let completedTaskDiv = document.getElementById("completedTasks");
checkStatus.addEventListener("click",function(){
    if(hideTask.innerText == "expand_more"){
        completedTaskDiv.style.display ="none";
        hideTask.innerText = "chevron_right";
    } else{
        hideTask.innerText = "expand_more";
        completedTaskDiv.style.display = "block";
    }
});

function editTask(element,data){
    if((element.childNodes[3].childNodes[1].disabled)){
        element.childNodes[3].childNodes[1].disabled = false;
        element.childNodes[3].childNodes[1].focus();
        element.childNodes[5].childNodes[1].childNodes[1].innerText = "save";
    } else {
        element.childNodes[3].childNodes[1].disabled = true;
        element.childNodes[5].childNodes[1].childNodes[1].innerText = "edit";
        data.task = element.childNodes[3].childNodes[1].value; 
        updateList(data);
    }

}

function removetask(element,data){
    element.remove();
    dropList(data.id);
}

// let searchDiv = document.getElementById("taskSearchDiv");
// let search = document.getElementById("searchField");
// let close = document.getElementById("searchCloserDiv");
// let searchResult = document.getElementById("searchResult");
// searchDiv.addEventListener('click',function(){
//     searchResult.innerText ="";
//     search.style.display = "block";
//     close.style.display = "block";
//     searchResult.style.display ="block"
//     search.addEventListener("input",function(){
//         searchResult.innerText ="";
//         filter = search.value;
//         createSearchDiv(searchList(filter));
//     });

// });
// close.addEventListener("click",function(){
//     search.value = "";
//     search.style.display = "none";
//     close.style.display = "none";
//     searchResult.style.display ="none";
// });

// function createSearchDiv(element){
//     element.then(result => {
//         console.log(result);
//         result.forEach(e => {
//             let list = readTask(e);
//             searchResult.appendChild(list); 
//         });
//     });
// };

let menuBar = document.getElementById("sideMenuBarDiv");
let leftBox = document.getElementById("todoBodyLeft");
let rightBox = document.getElementById("todoBodyRight");
menuBar.addEventListener("click",function(){

    if(leftBox.style.width == "0%"){
        leftBox.style.width = "20%";
        rightBox.style.width = "80%"
    } else {
        leftBox.style.width = "0%";
        rightBox.style.width = "100%"
    }
})
let createList = document.getElementById("leftMenuTaskList");
createList.addEventListener("keydown",function(event){

    if (event.key === "Enter") {
        let oldList = document.getElementById("oldList");
        let newList = oldList.cloneNode(true);
        newList.childNodes[1].childNodes[1].innerText = "list";
        if(createList.value != ""){
            newList.childNodes[3].childNodes[1].innerText = createList.value;
        } else{
            newList.childNodes[3].childNodes[1].innerText ="Untitled List";
        }
            newList.id ="createdLists";
        document.getElementById("createdNewList").appendChild(newList);
        createList.value ="";
    }
});

function add(data){
    let newTask = {task :data,userDto:{id:userId}};
    console.log(newTask);
    let request =  {
    method: 'POST',
    body: JSON.stringify(newTask),
    headers: {
        'Content-Type': 'application/json'
        }
    };
    fetch('http://localhost:8080/api/v1/todo',request).then(response => {
        if(response.ok){
            readTask(userId);
        }
    });
}
async function readTask(userId){
    const url = "http://localhost:8080/api/v1/todo?id="+userId;
    let data = await fetch(url);
    data.json().then(value => createTaskDiv(value));
}

async function read(){
    const url = "http://localhost:8080/api/v1/user";
    let data = await fetch(url);
    data.json().then(value => userDetail(value));
}

function userDetail(object){
    userId = object.id;
    let username = object.name;
    let userIcon = document.getElementById("userIcon");
    userIcon.innerText = username.charAt(0);
    readTask(userId); 
}

function updateList(data){
    console.log(data);
    data.userDto={id:userId};
    let request =  {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
        }
    };
    fetch('http://localhost:8080/api/v1/todo',request);
}

function dropList(id){
    let request =  {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
        }
    };
    fetch( 'http://localhost:8080/api/v1/todo?id='+id,request);
}

async function searchList(element){
    const url = 'http://localhost:8080/api/v1/todo/?name=' + element;
    let data = await fetch(url);
    return data.json();
}

function existUser(userId){
    let requestOptions = {
        method: 'PUT',
        redirect: 'follow'
    };
      
    fetch("http://localhost:8080/api/v1/user?id="+userId, requestOptions).then(response =>
    {
        if(response.status == 200){
             location.replace("index.html");
        }
    }
    );
}