function isValidName(){
    var name = document.getElementById("name").value;
    if(name==""){
        document.getElementById("err-name").style.display="block";
        return false;
      }
      else{
        document.getElementById("err-name").style.display="none";
        return true;
      }
      
}

function isValidEmail(){
    var email = document.getElementById("email").value;
    if(email==""){
        document.getElementById("err-email").style.display="block";
        return false;
      }
      else if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        document.getElementById("err-email").style.display="none";
        return (true)
      }
      else{
        document.getElementById("err-email").innerHTML="Enter avalid email address";
        document.getElementById("err-email").style.display="block";
        return false;
      }
}

function isValidPassword(){
    var password = document.getElementById("password").value;
    if(password==""){
        document.getElementById("err-password").style.display="block";
        return false;
    }
    else if(password.length<8){
        document.getElementById("err-password").innerHTML="password should be atleast 8 characters";
        document.getElementById("err-password").style.display="block";
        return false;
    }
    else{
        document.getElementById("err-password").style.display="none";
        return (true)
    }
}

function passMatch(){
    var cpassword = document.getElementById("cpassword").value;
    var password = document.getElementById("password").value;
    if(cpassword==""){
        document.getElementById("err-cpassword").style.display="block";
        return false;
    }
    if(cpassword!=password){
        document.getElementById("err-cpassword").innerHTML="passwords don't match";
        document.getElementById("err-cpassword").style.display="block";
        return false;
    }
    else{
        document.getElementById("err-cpassword").style.display="none";
        return (true)
    }
}
