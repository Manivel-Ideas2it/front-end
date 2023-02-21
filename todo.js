
window.addEventListener("load",function(){
    userSignUp();
});
const urlTodo = 'http://localhost:8080/api/v1/todo';

function userSignUp(){
    let container = document.getElementById("main-container");
    let login = document.createElement("div");
    login.id = "signUp-Div";
    container.appendChild(login);

    login.innerText = "welcome ideas2it todo";
    let signIn = document.createElement("button");
    signIn.innerText = "sign-in";
    signIn.className="sign in";

    let signUp = document.createElement("button");
    signUp.innerText = "sign-up";
    signUp.className = "sign up";
    login.appendChild(signUp); 
    login.appendChild(signIn);

    signUp.addEventListener("click",function(){
        signUpPage(login);
    });   
    signIn.addEventListener("click",function(){
        signInPage(login);
    });
}

function signUpPage(element){
    element.remove();
    let signUpPageDiv = document.createElement("div");
    signUpPageDiv.className = "sign-page";
    let container = document.getElementById("main-container");
    container.appendChild(signUpPageDiv);
    let signUpform = document.createElement("form");
  
    let usernameLabel = document.createElement("label");
    usernameLabel.innerText = "name";
    usernameLabel.className = "username label";
    let userName = document.createElement("input");
    userName.className = "usernameInput";
    userName.focus();
    userName.required = true;

    let userMailLabel = document.createElement("label");
    userMailLabel.innerText = "mail-Id";
    userMailLabel.className = "usermail label";
    let userMailId = document.createElement("input");
    userMailId.className = "usermailId";
    userMailId.required = true;

    let userpasswordLabel = document.createElement("label");
    userpasswordLabel.innerText = "password";
    userpasswordLabel.className = "userpassword label";
    let userPassword = document.createElement("input");
    userPassword.className = "userpasswordInput";
    userPassword.required = true;

    let submit = document.createElement("button");
    submit.type = "submit";
    submit.id = "user-submit";
    submit.innerText = "submit";

    signUpPageDiv.appendChild(signUpform);
    signUpform.appendChild(usernameLabel);
    signUpform.appendChild(userName);
    signUpform.appendChild(userMailLabel);
    signUpform.appendChild(userMailId);
    signUpform.appendChild(userpasswordLabel);
    signUpform.appendChild(userPassword);
    signUpform.appendChild(submit);
   
    submit.addEventListener('click',function(){
        user = {
            name : userName.value,
            mailId : userMailId.value,
            password : userPassword.value
        };
        createUser(user,signUpPageDiv);
    });
}

function signInPage(element){
    element.remove();
    let container = document.getElementById("main-container");
    let sigIn = document.createElement("div");
    sigIn.className = "sign-page signIn";
    container.appendChild(sigIn);

    let usernameLabel = document.createElement("label");
    usernameLabel.innerText = "username";
    usernameLabel.className = "username label";
    let userName = document.createElement("input");
    userName.className = "usernameInput";
    // userName.focus();
    // userName.required = true;

    let userpasswordLabel = document.createElement("label");
    userpasswordLabel.innerText = "password";
    userpasswordLabel.className = "userpassword label signinpasslabel";
    let userPassword = document.createElement("input");
    userPassword.className = "userpasswordInput signinpass";
    // userPassword.required = true;

    let forget = document.createElement("button");
    forget.innerText = "forget";
    forget.className="sign in forget";
    let submit = document.createElement("button");
    submit.innerText = "submit";
    submit.className = "sign up account-submit";

    sigIn.appendChild(usernameLabel);
    sigIn.appendChild(userName);
    sigIn.appendChild(userpasswordLabel);
    sigIn.appendChild(userPassword);
    sigIn.appendChild(forget);
    sigIn.appendChild(submit);

    submit.addEventListener('click',function(){
        userCheck(userName.value,userPassword.value);
    });
};

function createTodo(data){
    let todoPage = document.createElement("div");
    todoPage.id = "todo-page";
    document.body.appendChild(todoPage);

    let todoBar = document.createElement("div");
    todoBar.id = "todoBar";

    let appIconDiv = document.createElement("div");
    appIconDiv.className = "appIconDiv";

    let appIcon = document.createElement("span");
    appIcon.innerText = "apps"
    appIcon.className = "material-symbols-outlined";

    let todo = document.createElement("button");
    todo.className = "todoButton";
    todo.innerText = "TO DO";

    let searchBar = document.createElement("div");
    searchBar.id = "search-bar";
    
    let searchIcon = document.createElement("span");
    searchIcon.className = "material-symbols-outlined search-icon";
    searchIcon.innerText = "search";

    let userAccountDiv = document.createElement("div");
    userAccountDiv.className = "userAccountDiv";

    let userAccountIcon = document.createElement("span");
    userAccountIcon.className = "material-symbols-outlined";
    userAccountIcon.innerText = "account_circle";

    let leftMenuBar = document.createElement("div");
    leftMenuBar.id = "left-menu-bar";

    let leftMenuBarList = document.createElement("div");
    leftMenuBarList.className = "leftMenuBarList";
 
    let taskaddDiv = document.createElement("div");
    taskaddDiv.className = "task-add";

    let taskAdd = document.createElement("div");
    taskAdd.className = "task"; 

    let taskAddInput = document.createElement("input");
    taskAddInput.type = "text";
    taskAddInput.id = "text-list";
    taskAddInput.placeholder = "Add a task";

    let addButton = document.createElement("button");
    addButton.innerText = "add";
    addButton.id = "add";
    addButton.type = "button";

    let addedDetailDiv = document.createElement("div");
    addedDetailDiv.id = "task-details";

    let addedTaks= document.createElement("div");
    addedTaks.id ="task-info";

    let completedCountDiv = document.createElement("div");
    completedCountDiv.id="task-completion";

    let completedTaskStatus = document.createElement("div");
    completedTaskStatus.id="task-status";

    let userNameDiv = document.createElement("div");
    userNameDiv.id = "userNameDiv";
    userNameDiv.innerText = data.name;

    todoPage.appendChild(todoBar);
    todoBar.appendChild(appIconDiv);
    appIconDiv.appendChild(appIcon);
    todoBar.appendChild(todo);
    todoBar.appendChild(searchBar);
    searchBar.appendChild(searchIcon);
    todoBar.appendChild(userAccountDiv);
    todoBar.appendChild(userNameDiv);
    userAccountDiv.appendChild(userAccountIcon);
    todoPage.appendChild(leftMenuBar);
    leftMenuBar.appendChild(leftMenuBarList);
    todoPage.appendChild(taskaddDiv);
    taskaddDiv.appendChild(taskAdd);
    taskAdd.appendChild(taskAddInput); 
    taskAdd.appendChild(addButton);
    taskaddDiv.appendChild(addedDetailDiv);
    addedDetailDiv.appendChild(addedTaks);
    addedDetailDiv.appendChild(completedCountDiv);
    addedDetailDiv.appendChild(completedTaskStatus);

    readList(data.id);
    searchBar.addEventListener("click",function(){
        searchDivision();
    });
    addButton.addEventListener("click",function(){
        add(data.id,taskAddInput);
    });
    userAccountIcon.addEventListener("click",function(){
        logOut();
    })    
}
function logOut(){
    let logOutDiv = document.createElement("div");
    logOutDiv.id = "logOutDiv";
    logOutDiv.innerText = "signOut"; 
    document.getElementById("todoBar").appendChild(logOutDiv);
    logOutDiv.addEventListener("click",function(){
        alert(pageExit);
        pageExit =0;
    });
   
}

function searchDivision(){
    let searchInput = document.createElement("input");
    searchInput.id = "search";
    let menubar = document.getElementById("todoBar");
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
        });
    });
    document.body.appendChild(creatDiv);  
};

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
    check.addEventListener("click",function(){
        checkList(check,data);
    });
    remove.addEventListener('click',function(){
        removelist(remove,data);
    })
    text.addEventListener('click',function(){
        changeContent(text,data);
    });
    if(data.complete){
        data.complete = !(data.complete);
        list.childNodes[0].checked = true;
        checkList(list.childNodes[0],data);
    }
    return list;
}

function checkList(element,data){
    let completedTaskStatus = document.getElementById("task-status");
    if(element.checked && data.complete == false){
        completedTaskStatus.appendChild(element.parentNode);
        element.parentNode.childNodes[2].style.display = "none";
        element.parentNode.childNodes[3].style.left =  "101%";
        updateList(data);
    } else {
        document.getElementById("task-info").appendChild(element.parentNode);
        element.parentNode.childNodes[2].style.display = "block";
        element.parentNode.childNodes[3].style.left =  "109%";
        updateList(data);
    } 
    completedTaskCount();
}

function completedTaskCount(){
    let countValue = document.getElementById("task-status").childElementCount;
    alert(countValue);
    if(countValue == 0){
        document.getElementById("task-completion").style.display="none";
    } else {
        document.getElementById("task-completion").innerText = "completed - " + countValue;
        document.getElementById("task-completion").style.display="block";
    }
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
        dropList(data.id);
    });
    removeListCancel.addEventListener('click', function() {
        remove.remove();
        dropList(data.id);
    });
}

function removeConform(element) {
    if (element.childNodes[2].innerHTML == "edit") {
        element.remove();
    } else{
        alert("save the text after that remove the task...");
    }
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

// let input = document.getElementById("text-list");
// input.addEventListener("keydown", function(event) {
//     if (event.key === "Enter") {
//         add();
//     }
// });

// division = document.getElementById("task-completion");
// division.addEventListener("click",function(){
// if(document.getElementById("task-status").style.display == "none"){
//     document.getElementById("task-status").style.display = "block";
// } else{
//     document.getElementById("task-status").style.display ="none";
// }
// });

function createUser(object,element){
    let url ='http://localhost:8080/api/v1/user';
    let request =  {
    method: 'POST',
    body: JSON.stringify(object),
    headers: {
        'Content-Type': 'application/json'
        }
    };
    fetch(url,request).then(()=> 
    signInPage((element)));
};

async function userCheck(userName,password){
    let url ='http://localhost:8080/api/v1/user?userName='+userName+'&password=' +password;
    let data = await fetch(url).then(response => response.json());
    createTodo(data);
}

function add(id,data){
    let newTask = { task :data.value};
    
    if( newTask.task == ""){
        alert("you need to write something...");
        return false;
    }
    let request =  {
    method: 'PATCH',
    body: JSON.stringify(newTask),
    headers: {
        'Content-Type': 'application/json'
        }
    };
    fetch('http://localhost:8080/api/v1/user?id='+id,request).then(response => response.json().then(result => loadedList(result.taskDto)));
}

function loadedList(data){
    document.getElementById("task-info").innerText ="";
    document.getElementById("task-status").innerText="";

    // readList().then((result) => {
    //     for(let task of result){
    //         read(task);
    //     }
    // });   
    for(let task of data){
        read(task);
    }
}

function read(data){
    let list = createListDivision(data);
    document.getElementById("task-info").appendChild(list);
    document.getElementById("text-list").value = "";
}

async function readList(id){
    const url = 'http://localhost:8080/api/v1/user/?id='+id;
    let data = await fetch(url);
    data.json().then(value => loadedList(value.taskDto));
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

function updateList(element){
    let request =  {
    method: 'PUT',
    body: JSON.stringify(element),
    headers: {
        'Content-Type': 'application/json'
        }
    };
    fetch(urlTodo,request);
}

// async function searchList(element){
//     const url = 'http://localhost:8080/api/v1/todo?name=' + element;
//     let data = await fetch(url);
//     return data.json();
// }