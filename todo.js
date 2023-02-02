function add(){
    let list = document.createElement("li");
    let remove = document.createElement("button");
    let check =document.createElement("input");
    let task =list.innerText = document.getElementById("text-list").value;
    if(task == ""){
        alert("you need to write something...");
        return false;
    }
    list.appendChild(check);
    check.type ="checkbox";
    check.setAttribute("id","check-box");
    check.setAttribute("onchange",'checkList(this)');
    list.appendChild(remove);
    remove.setAttribute("id","button");
    remove.innerText = "remove";
    remove.setAttribute("onclick",'removelist(this)');
    document.getElementById("task-info").appendChild(list);
    document.getElementById("text-list").value ='';
}

function removelist(element){
    let message = "Did you want to remove the task";
    if (confirm(message) == true) {
         element.parentElement.remove() 
    }
}

function checkList(element){
    if(element.checked){
        console.log(element.parentNode);
        element.style.backgroundColor = "blue";
        completedList(element.parentNode);
    } else{
        document.getElementById("task-info").appendChild(element.parentNode);
    }
}

function completedList(element){
    let listTwo = document.getElementById("task-status");
    listTwo.style.visibility = "visible";
    listTwo.appendChild(element); 
}