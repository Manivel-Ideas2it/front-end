function userData(){

    let userName = document.getElementById("userName").value;
    let password = document.getElementById("password").value;
    checkUser(userName,password);
}

async function checkUser(userName,password){
    let url ='http://localhost:8080/api/v1/user?userName='+userName +'&password=' +password;
    let response = await fetch(url);
    if(response.ok){
       location.href= "todo.html";
    }
};

