const firebaseConfig = {
    apiKey: "AIzaSyAoYjS2b5DMfCYLxcQ1IxEpeaFCuoEMBuM",
    authDomain: "project-to-do-app-list.firebaseapp.com",
    databaseURL: "https://project-to-do-app-list-default-rtdb.firebaseio.com",
    projectId: "project-to-do-app-list",
    storageBucket: "project-to-do-app-list.appspot.com",
    messagingSenderId: "636033824211",
    appId: "1:636033824211:web:26f110bc9f4d1791b8eb26"
};
const app = firebase.initializeApp(firebaseConfig);
console.log(app)
var table = document.getElementById('table');
firebase.database().ref("DATABASE").on("child_added",function(data){
    var items=document.getElementById("item")
    var userids=data.val().userid
    var datas=data.val().value
  var txtTd = document.createElement('td');
  var editBtnTd = document.createElement('td');
  var delBtnTd = document.createElement('td');
  
  var editBtn = document.createElement("button");
  var delBtn = document.createElement("button");
  
  var taskText = document.createTextNode(datas);
  txtTd.appendChild(taskText);
  
  var editBtnTxt = document.createTextNode("Edit");
  var delBtnTxt = document.createTextNode("Delete");
  
  editBtn.appendChild(editBtnTxt);
  delBtn.appendChild(delBtnTxt);
  editBtn.setAttribute('class',"editBtn");
  delBtn.setAttribute('class',"delBtn");
  
  editBtn.setAttribute('onclick',"editItem(this)");
  delBtn.setAttribute('onclick',"delItem(this)");
  delBtn.setAttribute("id",userids)
  editBtn.setAttribute("id",userids)
  console.log(delBtn)
  
  editBtnTd.appendChild(editBtn);
  delBtnTd.appendChild(delBtn);
  
  txtTd.setAttribute('class',"firstTd");
  editBtnTd.setAttribute('class',"secondTd");
  delBtnTd.setAttribute('class',"thirdTd");
  
  var tr = document.createElement("tr");
  tr.appendChild(txtTd);
  tr.appendChild(editBtnTd);
  tr.appendChild(delBtnTd);
  
  
  table.appendChild(tr);
  
  
  items.value = ""
  })
  
  function add_item(){
  var items=document.getElementById("item")
  if(items.value=="")
  {
  alert("Please enter todo items. <br> Can not add empty list.")
  }
  else{
  var key=firebase.database().ref("DATABASE").push().key;
  app.database().ref("DATABASE/"+ key ).set({
  userid: key,
  value: items.value  })
  }
  }
  



function editItem(key){
// console.log(key);

var  val  = key.parentNode.parentNode.firstChild.innerHTML;
console.log(val)
var uptval = prompt('Enter new Task',val)
if(!uptval.trim()){
    alert("Empty Input, Changes not saved")
}
else{
app.database().ref("DATABASE/"+ key.id).set({
  userids: key.id,
  value: uptval
})
key.parentNode.parentNode.firstChild.innerHTML = uptval
}


}

function delItem(key){
    
        app.database().ref("DATABASE/"+ key.id).remove()
        key.parentNode.parentNode.remove()
        
       
}

function deleteAll(){
    var table = document.getElementById('table');
    app.database().ref("DATABASE").remove()
    table.innerHTML = ""
}