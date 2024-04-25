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
  if (list)
    list.forEach(function (element, index) {
      text += `       
      <div class="item">
      <div class="contentItem">
        <div class="nameItem">${element.Name}</div>
        <div class="valueItem">Price:$${parseFloat(element.Value).toFixed(
          2
        )}</div>
        <div class="quantityItem">Quantity:${element.Quantity}</div>
        <div>
          <button class="editButton" title="Edit  item from list"> <i class="fa fa-pencil"></i></button>
          <button value="${index}" onclick="RemoveItem(this)" class="removeButton" title="Remove item from list"> <i
              class="fa fa-trash"></i></button>
        </div>
      </div>
    </div>`;
    });
  text += ` <button onclick="switchModal()" title="add item from list" class="btnAction buttonAddItem">Add Item <i class="fa fa-plus"></i></button>`;
  return text;
}

function AddItem() {
  let list = GetStorageList();
  list.push({
    Quantity: document.getElementById("InputQuantity").value,
    Value: document.getElementById("InputValue").value,
    Name: document.getElementById("InputName").value,
  });
  SaveChange(list);
  switchModal();
}

function RemoveItem(element) {
  let list = GetStorageList();
  list.splice(element.value, 1);
  SaveChange(list);
}

function GetStorageList() {
  let localStorageList = localStorage.getItem("list");
  return JSON.parse(localStorageList) || [];
}

function SaveChange(list) {
  localStorage.setItem("list", JSON.stringify(list));
  LoadList();
}

const switchModal = () => {
  const modal = document.querySelector(".modal");
  const actualStyle = modal.style.display;
  CleanInput();
  if (actualStyle == "block") {
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
  }
};

window.onclick = function (event) {
  const modal = document.querySelector(".modal");
  if (event.target == modal) {
    switchModal();
  }
};

function CleanInput() {
  document.getElementById("InputQuantity").value = "";
  document.getElementById("InputValue").value = "";
  document.getElementById("InputName").value = "";
}

function SwitchAction(action) {
  switch (action.value) {
    case "Edit":
      EditProduct();
      break;
    case "Add":
      AddItem();
      break;
  }
}
