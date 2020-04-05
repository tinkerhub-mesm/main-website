// this is where firestore function is inislise as db
  const db = firebase.firestore();

  // this is where whole data is fetch from the firestore
function readData(parameters) {
  var datas = [];
  var count = 0;
  const promiseToken = new Promise((resolve, reject) => {
      db.collection(parameters.collection).get().then(
        (snapshot) => {
          snapshot.docs.forEach( doc => {
        //    resolve(doc.data());
      //  console.log(doc.id);
       var outputDatas = {
        id: doc.id,
        data: doc.data(),
      };
        datas[count] = outputDatas;
        count++;
          });
          resolve(datas);
        }
      );
  });
  return promiseToken;
}
// this is where the data is inserted in to the database this functions also have future block
// return true if no error occur in the javascript as future
  function writeData(parameters) {
  var inputsDatas = parameters.inputsDatas;
  const promiseToken = new Promise((resolve, reject) => {
    db.collection(parameters.collection).add({
        inputsDatas
      }).then(()=> {
          resolve(true);
      })
  });
  return promiseToken;
}
// this is edit data main functions
async function editDatas(parameters) {
  var inputsDatas = parameters.inputsDatas;
  promiseToken = new Promise((resolve, reject) => {
   db.collection(parameters.collection).doc(parameters.documents).update({
        inputsDatas
     }).then((promisedData)=> {
resolve(true);
});

  });
  return promiseToken;
}

function uploadFiles(parameters) {
  const promiseToken = new Promise((resolve, reject) => {
    var storage = firebase.storage();
      //get your select image
      var image=parameters.fileName;
      //now get your image name
      var imageName=image.name;
      //firebase  storage reference
      //it is the path where yyour image will store
      var storageRef=firebase.storage().ref('images/'+imageName);
      //upload image to selected storage reference

      var uploadTask=storageRef.put(image);

      uploadTask.on('state_changed',function (snapshot) {
          //observe state change events such as progress , pause ,resume
          //get task progress by including the number of bytes uploaded and total
          //number of bytes

          var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
            notificatiions({
              messages: progress+'% is uploaded',
            });
          console.log("upload is " + progress +" done");
      },function (error) {
          //handle error here

            notificatiions({
              messages: 'Error occured',
            });
          console.log(error.message);
      },function () {
         //handle successful uploads on complete

          uploadTask.snapshot.ref.getDownloadURL().then(function (downlaodURL) {
              //get your upload image url here...
              //console.log(downlaodURL);
              resolve(downlaodURL);

          });
      });
  });
  return promiseToken;
}
