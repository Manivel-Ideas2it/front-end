let input = document.getElementById("text-list");
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        add();
    }
});

function add(){
    let list = document.createElement("li");
    let remove = document.createElement("button");
    let check =document.createElement("input");
    let text = document.createElement("button");
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
    list.appendChild(text);
    text.setAttribute("class","text");
    text.innerText = "edit";
    text.setAttribute("onclick",'changeContent(this)');
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
    let countValue = document.getElementById("task-status").childElementCount -1;
    let listTwo = document.getElementById("task-status");
    if(element.checked){  
        listTwo.appendChild(element.parentNode);
        countValue++;
    } else{
        document.getElementById("task-info").appendChild(element.parentNode);
        countValue--;
    }
    if(countValue == 0){
         document.getElementById("name").style.display = "none";
    } else {
        document.getElementById("name").style.display = "block";
        listTwo.style.display = "block"
    }
}

function changeContent(element){
    console.log(element.nextElementSibling);
}

