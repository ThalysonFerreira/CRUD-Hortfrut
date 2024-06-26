document.addEventListener("DOMContentLoaded", function(event) {
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
    list.forEach(function(element, index) {
      text += `       
      <div class="item">
      <div class="contentItem">
        <div class="nameItem">${element.Name}</div>
        <div class="valueItem">Price:$${parseFloat(element.Value).toFixed(
        2
      )}/Kg</div>
        <div class="quantityItem">Quantity:${parseFloat(
        element.Quantity
      ).toFixed(2)}Kg</div>
        <div>
          <button value="${index}" class="editButton" onclick="OpenModal(this.value)" title="Edit item from list"> <i class="fa fa-pencil"></i></button>
          <button value="${index}" onclick="RemoveItem(this.value)" class="removeButton" title="Remove item from list"> <i
              class="fa fa-trash"></i></button>
        </div>
      </div>
    </div>`;
    });
  text += ` <button onclick="SwitchModal()" title="add item from list" class="btnAction buttonAddItem">Add Item <i class="fa fa-plus"></i></button>`;
  return text;
}

function AddItem() {
  let list = GetStorageList();
  if (Validate()) {
    list.push({
      Quantity: document.getElementById("InputQuantity").value,
      Value: document.getElementById("InputValue").value,
      Name: document.getElementById("InputName").value,
    });
    SaveChange(list);
    SwitchModal();
  }
}

function EditItem(itemId) {
  let list = GetStorageList();

  list[itemId].Quantity = document.getElementById("input-quantity-edit").value;
  list[itemId].Value = document.getElementById("input-value-edit").value;
  list[itemId].Name = document.getElementById("input-name-edit").value;

  SaveChange(list);
  let modal = document.querySelector(".editmodal");
  modal.innerHTML = '';
  SwitchModal(modal);
}

function RemoveItem(itemId) {
  let list = GetStorageList();
  list.splice(itemId, 1);
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

function SwitchModal(modal) {
  if (modal) {
    const actualStyle = modal.style.display;
    CleanInput();
    if (actualStyle == "block")
      modal.style.display = "none";
    else
      modal.style.display = "block";
  }
  else {
    modal = document.querySelector(".modal");
    const actualStyle = modal.style.display;
    CleanInput();
    if (actualStyle == "block")
      modal.style.display = "none";
    else
      modal.style.display = "block";
  }

};

window.onclick = function(event) {
  const modal = document.querySelector(".modal");
  const modal2 = document.querySelector(".editmodal");
  if (event.target == modal) {
    SwitchModal(modal);
  }
  if (event.target == modal2) {
    SwitchModal(modal2);
  }
};

function CleanInput() {
  document.getElementById("InputQuantity").value = "";
  document.getElementById("InputValue").value = "";
  document.getElementById("InputName").value = "";
}

function Validate() {
  let accept = true;

  let name = document.getElementById("InputName");
  let value = document.getElementById("InputValue");
  let quantity = document.getElementById("InputQuantity");

  if (name.value == "") {

    accept = false;
  }

  if (value.value == "") {
    accept = false;
  }

  if (quantity.value == "") {
    accept = false;
  }
  return accept;
}

function OpenModal(itemId) {

  let list = GetStorageList();
  let item = list[itemId];

  let modal = document.querySelector(".editmodal");
  modal.innerHTML = `  
    <form>
      <div class="content">

        <label for="input-name-edit">Name</label>
        <input required type="text" id="input-name-edit" value="${item.Name}" placeholder="Product's name" />
        <br>
        <label for="input-value-edit">Price</label>
        <input required type="number" id="input-value-edit" value="${item.Value}" step='0.01' min="0" placeholder="Product's value" />
        <br>
        <label for="input-quantity-edit">Quantity/Kg</label>
        <input required type="number" min="0" value="${item.Quantity}" id="input-quantity-edit" placeholder="Quantity" />
        <button type="submit" value="${itemId}" onclick="EditItem(this.value)" class="btnAction buttonAddItem">Edit</button>
        <br>
      </div>
    </form>`;
  modal.style.display = "block";
}