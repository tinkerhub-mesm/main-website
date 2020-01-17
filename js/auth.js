/* Handles the sign up button press. */
function handleSignUpWithEmail() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var cpassword = document.getElementById("cpassword").value;

    //form validation
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
    firebase.auth().createUserWithEmailAndPassword(email, password)
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
        if (errorCode == "auth/weak-password") {
          alert("The password is too weak.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
}
function handleSignUpWithGoogle(){
  var provider = new firebase.auth.GoogleAuthProvider();
    //set google as provider
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}
function handleLoginWithEmail(){
  var email = document.getElementById("login-email").value;
  var password = document.getElementById("login-password").value;
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });
}
  
  // window.onload = function() {
  //     document.getElementById('signup').addEventListener('click', this.handleSignUpWithEmail, false);
  //     document.getElementById('google').addEventListener('click', this.handleSignUpWithGoogle, false);
  //     document.getElementById('login').addEventListener('click', this.handleLoginWithEmail, false);
  //     firebase.auth().onAuthStateChanged(function(user) {
  //       if (user) {
  //         console.log(user);
  //       }
  //     });
  //   }
  
  
  