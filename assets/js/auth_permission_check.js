function authPermissionChecker(parametrs) {
db.collection('users').where("name", "==", "mohammed fayez").get().then(
  (snapshot) => {
    snapshot.docs.forEach( doc => {
      if (doc.data().email == parametrs.username) {
        //console.log("in");
        if(doc.data().adminStatus == "1"){
          console.log('admin');
          // this is where admin are redirected
          window.location.href = "../../admin/index.html";
        }else {
          // this is where non-admin are redirected
          window.location.href = '../../index.html';
        }
      }
    });
  }
);
}
