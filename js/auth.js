/* Handles the sign up button press. */
function handleSignUpWithEmail() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var cpassword = document.getElementById("cpassword").value;

  //form validation
  if (isValidName()) {
    if (isValidEmail()) {
      if (isValidPassword()) {
        if (passMatch()) {
        // Create user with email and pass.
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(function(result) {
            //add displayName to the user
            result.user.updateProfile({
              displayName: name
            });
            var db = firebase.firestore();
            db.collection("users").doc(result.user.uid).set({ name: name })
            .then(function(){
            //alert user signup successfull
            alert("user created successfully!!");
          });
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == "auth/weak-password") {
              document.getElementById("error-alert").innerHTML = "The password is weak" ;
              document.getElementById("error-alert").style.display="block";
            } 
            else if(errorCode == "auth/email-already-in-use") {
              document.getElementById("error-alert").innerHTML = "Email already in use" ;
              document.getElementById("error-alert").style.display="block";
            }
            else if(errorCode == "auth/invalid-email") {
              document.getElementById("error-alert").innerHTML="Email is invalid";
              document.getElementById("error-alert").style.display="block";
            }
            else if(errorCode != ""){
              document.getElementById("error-alert").innerHTML="Unexpected error occured try again later";
              document.getElementById("error-alert").style.display="block";
            }
            console.log(error);
          });
        }
      }
    }
  }
}
function handleSignUpWithGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  //set google as provider
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      var db = firebase.firestore();
      db.collection("users").doc(result.user.uid).set({ name: result.user.displayName })
      .then(function(){
      //alert user signup successfull
      alert("user created successfully!!");
    });
    })
    .catch(function(error) {
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
function handleLoginWithEmail() {
  var email = document.getElementById("login-email").value;
  var password = document.getElementById("login-password").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function(){
      alert("login successfull");
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode == "auth/user-not-found") {
        document.getElementById("error-alert").innerHTML = "User not found" ;
        document.getElementById("error-alert").style.display="block";
      } 
      else if(errorCode == "auth/user-disabled") {
        document.getElementById("error-alert").innerHTML = "User is disabled" ;
        document.getElementById("error-alert").style.display="block";
      }
      else if(errorCode == "auth/wrong-password") {
        document.getElementById("error-alert").innerHTML = "Wrong password" ;
        document.getElementById("error-alert").style.display="block";
      }
      else if(errorCode != ""){
        document.getElementById("error-alert").innerHTML="Unexpected error occured try again later";
        document.getElementById("error-alert").style.display="block";
      }
      else{
        document.getElementById("error-alert").style.display="none";
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
