function createAccount(){
    let user = {
        name : document.getElementById("userName").value,
        mailId : document.getElementById("userMail").value,
        password : document.getElementById("password").value,
    }
    createUser(user)
}
function createUser(object){
    console.log(object);
    let url ='http://localhost:8080/api/v1/user';
    let request =  {
    method: 'POST',
    body: JSON.stringify(object),
    headers: {
        'Content-Type': 'application/json'
        }
    };
    let response = fetch(url,request);

    if(response.status == 200){
        alert("account created");
        location.href="userLogin.html";
    } else{
        alert("have some issues to create an account");
    }
};
