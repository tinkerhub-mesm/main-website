/* Handles the sign up button press. */
function handleSignUp() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var cpassword = document.getElementById("cpassword").value;
    if (email.length < 4) {
      alert("Please enter an email address.");
      return;
    }
    if (password.length < 4) {
      alert("Please enter a password.");
      return;
    }
    if(password != cpassword)
    {
      alert("Password missmatch");
      return;
    }
    // Create user with email and pass.
    // [START createwithemail]
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function(result) {
          //add displayName to the user
          result.user.updateProfile({
            displayName: document.getElementById("name").value
          });
          //alert user signup successfull
          alert('user created successfully!!');
        })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == "auth/weak-password") {
          alert("The password is too weak.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
    // [END createwithemail]
  }
  
  window.onload = function() {
      document.getElementById('signup').addEventListener('click', handleSignUp, false);
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log(user);
        }
      });
    };
  
  
  