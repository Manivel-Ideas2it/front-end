let input = document.getElementById("text-list");
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        add();
    }
});

function add(){
    let list = document.createElement("li");
    let listText = document.createElement("input");
    let remove = document.createElement("button");
    let check = document.createElement("input");
    let text = document.createElement("button");
    list.appendChild(check);
    list.appendChild(listText);
    list.appendChild(text);
    list.appendChild(remove);
    listText.value = document.getElementById("text-list").value;
    if(listText.value == ""){
        alert("you need to write something...");
        return false;
    }
    listText.setAttribute("id","listText");
    listText.disabled = true;
    check.type ="checkbox";
    check.setAttribute("id","check-box");
    check.setAttribute("onchange","checkList(this)");
    remove.setAttribute("id","button");
    remove.innerText = "remove";
    remove.setAttribute("onclick","removelist(this)");
    text.setAttribute("class","text");
    text.innerText = "edit";
    text.setAttribute("onclick","changeContent(this)");
    document.getElementById("task-info").appendChild(list);
    document.getElementById("text-list").value ='';
}

function removelist(element) {
    let message = document.createElement("p");
    message.innerHTML = "Do you want to remove the task...";
    let remove = document.createElement("div");
    remove.appendChild(message);
    remove.setAttribute("id","alert-box");
    document.body.appendChild(remove);
    let removeList = document.createElement("button");
    removeList.id = "remove";
    remove.appendChild(removeList);
    removeList.innerText = "ok";
    // if (confirm(message) == true) {
    //      element.parentElement.remove() 
    // }
}

function checkList( element ){
    let countValue = document.getElementById("task-status").childElementCount -1;
    let listTwo = document.getElementById("task-status");
    if( element.checked ){  
        listTwo.appendChild(element.parentNode);
        countValue++;
        element.parentNode.childNodes[1].disabled = true;
        element.parentNode.childNodes[2].style.display = "none";
    } else{
        document.getElementById("task-info").appendChild(element.parentNode);
        element.parentNode.childNodes[2].style.display = "block";
        countValue--;
    }
    if( countValue == 0 ){
         document.getElementById("name").style.display = "none";
    } else {
        document.getElementById("name").style.display = "block";
        listTwo.style.display = "block";
    }
}

function changeContent(element){
    let editContent = element.parentNode;
    let saveContent = editContent.childNodes[1];
    if(saveContent.disabled == true) {
        saveContent.disabled = false;
        saveContent.focus();
        editContent.childNodes[2].innerText = "save";
    } else {
        saveContent.disabled = true;
        editContent.childNodes[2].innerText = "edit";
    }
}

