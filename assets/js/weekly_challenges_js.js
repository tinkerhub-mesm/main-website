// all the retrived Data are saved into weeklyChallenegs_data_saver for temporary
var weeklyChallenegs_data_saver = null;
var winnerPersonId = null;

function tableDataFetcher(parameters) {
  // you can give loading screen function here
  loading_animations_active();
  const future = readData({
    collection: parameters.collection,
  }).then((promisedData) =>{
    //all the data are get to this promisedData
    // notificatiion editDataFunctions
    notificatiions({
      messages: 'Tables updated',
    });
      console.log(promisedData);
    // you can add modification of table in the function

    var table = document.getElementById(parameters.tableName);
  //  document.getElementById("myTable").deleteRow(0);
//  console.log(document.getElementById(parameters.tableName).rows.length);

// inserting elemets into the tables
weeklyChallenegs_data_saver = promisedData;
    promisedData.forEach((data,i) => {
      // this where all data insert into the table
    //  console.log(data);
      var row = table.insertRow(i+1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4);
          var cell6 = row.insertCell(5);
          var cell7 = row.insertCell(6);
          var cell8 = row.insertCell(7);
          var cell9 = row.insertCell(8);
          cell1.innerHTML = i+1;
          cell2.innerHTML = promisedData[i].data.inputsDatas.name;
          cell3.innerHTML = promisedData[i].data.inputsDatas.desc;
          cell4.innerHTML = promisedData[i].data.inputsDatas.status;
          // demo to view id of the datas
          cell5.innerHTML = promisedData[i].id;
          cell6.innerHTML = promisedData[i].data.inputsDatas.winnersMail;
          cell7.innerHTML = promisedData[i].data.inputsDatas.rules;
          cell9.innerHTML = promisedData[i].data.inputsDatas.date;
          // assign class as the id of this documnet therefore we could get the documnet id by this.className in onclick
          cell8.innerHTML = '<button type="button" name="button" id="'+promisedData[i].id+'" class="btn btn-primary"  data-toggle="modal" data-target="#myModal" onclick="winnerModels(this.id)">Select Winner</button> <button type="button" name="button" id="'+promisedData[i].id+'" class="btn btn-primary" onclick="statusChangers(this.id)" style=" margin: 10px;">Finish Status</button>';
    });
    loading_animations_disable();
    });
}

tableDataFetcher({
  collection: 'WeeklyChallenges',
  tableName:'weeklyTable',
});

function winnerModels(id) {
winnerPersonId = id;
}
// this is where editing fuction take place
function winnerAdding() {

var docid = winnerPersonId;
var winnerMailId = document.getElementById('winneremailsid').value;
//console.log(winnerMailId);
//console.log(docid);
  notificatiions({
    messages: 'Updating Database',
  });
//  console.log(className);
// note that this whole object is push to the database as a map and replace existing data by this map
  // this is where editted data take in just like the writeData object
  console.log(weeklyChallenegs_data_saver);
  for (var i = 0; i < weeklyChallenegs_data_saver.length; i++) {
    if (weeklyChallenegs_data_saver[i].id == docid) {
    //  console.log(weeklyChallenegs_data_saver[i].data.inputsDatas.name);
      var inputsDatas= {
        name: weeklyChallenegs_data_saver[i].data.inputsDatas.name,
        desc: weeklyChallenegs_data_saver[i].data.inputsDatas.desc,
        winnerStatus: '1',
        status: '0',
        winnersMail: winnerMailId,
        rules: weeklyChallenegs_data_saver[i].data.inputsDatas.rules,
        date: weeklyChallenegs_data_saver[i].data.inputsDatas.date,
      };
    }
  }

  // this function also have future functions
  console.log(inputsDatas);
  editDatas({
    inputsDatas : inputsDatas,
    documents : docid,
    collection : 'WeeklyChallenges',
  }).then((promisedData) =>{
    // Reloading page when update function is done
  window.location.href = "index.html";
  })
}

// Change status of challenges
function statusChangers(ids) {

//console.log(winnerMailId);
//console.log(docid);
  notificatiions({
    messages: 'Updating Database',
  });
//  console.log(className);
// note that this whole object is push to the database as a map and replace existing data by this map
  // this is where editted data take in just like the writeData object
  console.log(weeklyChallenegs_data_saver);
  for (var i = 0; i < weeklyChallenegs_data_saver.length; i++) {
    if (weeklyChallenegs_data_saver[i].id == ids) {
      console.log(weeklyChallenegs_data_saver[i].data.inputsDatas.name);
      var inputsDatas= {
        name: weeklyChallenegs_data_saver[i].data.inputsDatas.name,
        desc: weeklyChallenegs_data_saver[i].data.inputsDatas.desc,
        winnerStatus: weeklyChallenegs_data_saver[i].data.inputsDatas.winnerStatus,
        status: '0',
        winnersMail: weeklyChallenegs_data_saver[i].data.inputsDatas.winnersMail,
        rules: weeklyChallenegs_data_saver[i].data.inputsDatas.rules,
        date: weeklyChallenegs_data_saver[i].data.inputsDatas.date,
      };
    }
  }

  // this function also have future functions
  console.log(inputsDatas);
  editDatas({
    inputsDatas : inputsDatas,
    documents : ids,
    collection : 'WeeklyChallenges',
  }).then((promisedData) =>{
    // Reloading page when update function is done
  window.location.href = "index.html";
  })
}

function addNewWeeklyChallanges() {
  // you can give loading screen function here
  loading_animations_active();

  notificatiions({
    messages: 'Updating Database',
  });

  var inputsDatas = {
    name: document.getElementById('WeeklyChallenges_name').value,
    desc: document.getElementById('WeeklyChallenges_desc').value,
    winnerStatus: '1',
    status: '1',
    winnersMail: '',
    rules: document.getElementById('WeeklyChallenges_rules').value,
    date: document.getElementById('workshopsDate').value,
  };
  writeData({
    collection: 'WeeklyChallenges',
    inputsDatas: inputsDatas,
  }).then((promisedData) =>{
    loading_animations_disable();
    // Reloading page when update function is done
  window.location.href = "index.html";
  });
}
