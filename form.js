function myFunction(){
    const obj = {
        FirstName : document.getElementById("fname").value ,
        LastName : document.getElementById("lname").value,
        Gender : genderType(),
        Mobile_No : document.getElementById("mobNo").value,
        DOB : document.getElementById("birthDate").value,
        Language : languageName(),
        MailID : document.getElementById("email").value,
        Qualification : document.getElementById("qualification").value
    }
     function genderType() {
        let  gender = document.getElementsByName('gender');
        for (i = 0; i < gender.length; i++) {
            if (gender[i].checked) {
                return gender[i].value;
            }
        }
    }
    function languageName() {
        let language = document.getElementsByName('language');
        let languageNames = [];
        for (i = 0; i < language.length; i++) {
            if (language[i].checked) {
                languageNames.push(language[i].value);
            }
        }
        return languageNames;
    }
    if (obj.Language == "") {
        alert("select the language");
        return false;
    }
    function reset() {
        document.getElementById("form").reset;
    }
    document.write(obj)
    console.log(obj);
}