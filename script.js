document.addEventListener("DOMContentLoaded", function (event) {
  LoadList();
});

function LoadList() { 
  let localStorageList = localStorage.getItem("list");
  let listHTML = document.querySelector(".list");
  listHTML.innerHTML = GenerateListHtml(JSON.parse(localStorageList));
}

function GenerateListHtml(list) {
  let text = "";
  list.forEach(function (element, index) {
    text += `       
        <div class="item">
        <div class="contentItem">
          <p>${element.Name}
          </p>
          <p>Stored : ${element.Quantity}<p/>
          <button class="editButton" title="Edit  item from list"> <i class="fa fa-pencil"></i></button>
          <button value="${index}" onclick="RemoveItem(this)" class="removeButton" title="Remove item from list"> <i class="fa fa-trash"></i></button>
        </div>
        </div>`;
  });
  text += ` <button onclick="AddItem()" title="add item from list" class="btnAction buttonAddItem">Add Item <i class="fa fa-plus"></i></button>`;
  return text;
}

function AddItem(){
    let list = GetStorageList();
    list.push({Name:"Teste Add",Quantity:1});
    SaveChange(list);
}

function RemoveItem(element){
    let list = GetStorageList();
    list.splice(element.value,1);
    SaveChange(list);
}
 
function GetStorageList(){
    let localStorageList = localStorage.getItem("list");
    return JSON.parse(localStorageList);
}

function SaveChange(list){
    localStorage.setItem("list",JSON.stringify(list));
    LoadList();
}