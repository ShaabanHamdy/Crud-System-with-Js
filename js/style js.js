let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");
let total = document.getElementById("total");
let formInput = document.getElementsByClassName("form-control");
let newUpdate;
let allData = [];
let newgetvalue; // Global Var

// ==============localstorage getItem=================================================================
if (JSON.parse(localStorage.getItem("products")) != null) {
  allData = JSON.parse(localStorage.getItem("products"));
}
// --------------------------------submit.onclick---------------------------------------
submit.onclick = function () {
  allvalidation();
  countval();
};
function countval() {
  if (count.value < 101) {
    contAlert.classList.add("d-none");
  } else {
    contAlert.classList.remove("d-none");
    submitAlert.classList.add("d-none");
  }
}
function allvalidation() {
  if (
    (title.value != "") &
    (category.value != "") &
    (price.value != "") &
    (count.value < 101)
  ) {
    if (submit.innerHTML == "Add Product") {
      getValueInput();
    } else {
      updateProduct();
      total.style.setProperty("background-color", "#09c", "important");
    }

    localStorage.setItem("products", JSON.stringify(allData));
    clearForm();
    displayData();
    submitAlert.classList.add("d-none");
  } else {
    submitAlert.classList.remove("d-none");
  }
}
// ----------------------getTotal()--------------------
function getTotal() {
  if (price.value > 0) {
    let results = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = ` ${results}`;
    total.style.backgroundColor = "#d2a51f";
    total.style.color = "#000 ";
  } else if (
    price.value > 0 ||
    taxes.value > 1 ||
    ads.value > 1 ||
    discount.value > 1
  ) {
    total.style.setProperty("background-color", "red");
  } else {
    total.innerHTML = ``;

    total.style.setProperty("background-color", "#09c", "important");
  }
}

// -----------------------------displayData---------------------------------
function displayData() {
  showtHead();
}

// -------------------------------getValueInput()----------------------------------------
function getValueInput() {
  let getVlaue = {
    title: title.value,
    taxes: taxes.value,
    price: price.value,
    ads: ads.value,
    discount: discount.value,
    category: category.value,
    count: count.value,
    total: total.innerHTML,
  };
  if (getVlaue.count > 1) {
    for (let i = 0; i < getVlaue.count; i++) {
      allData.push(getVlaue);
    }
  } else {
    allData.push(getVlaue);
  }
}

// =======================clearForm=============================================================================
function clearForm() {
  for (let i = 0; i < formInput.length; i++) {
    formInput[i].value = "";
  }
  total.style.backgroundColor = "#c12e2e ";
  total.innerHTML = ` `;
  getTotal();
  category.classList.add("is-invalid");
  title.classList.add("is-invalid");
}

// ==============================================showtHead=============================================
function showtHead() {
  tHead = document.getElementById("tHead");
  deletAll = document.getElementById("deletAll");
  outputSearch = document.getElementById("outputSearch");

  if (allData.length > 0) {
    outputSearch.style.setProperty("display", "block", "important");
    deletAll.innerHTML = `
      <button onclick='deletAllDatat()' class=" w-100 btn btn-danger">Delet All   (${allData.length})</button>
      `;
    tHead.innerHTML = `
      <th>Id</th><th>title</th><th>Price</th><th>Taxes</th><th>Ads</th><th>Discount</th><th>Category</th><th>Total</th><th>Delete</th><th>Update</th>
      `;
  } else {
    tHead.innerHTML = "";
    deletAll.innerHTML = "";
    outputSearch.style.display = "none";
  }
  showTbody();
}
// ================================showTbody=========================
function showTbody() {
  let dataBody = "";
  for (let i = 0; i < allData.length; i++) {
    dataBody += `
          <tr>
      <td>${[i + 1]}</td>
      <td>${allData[i].title}</td>
      <td>${allData[i].price}</td>
      <td>${allData[i].taxes}</td>
      <td>${allData[i].ads}</td>
      <td>${allData[i].discount}</td>
      <td>${allData[i].category}</td>
      <td>${allData[i].total}</td> 
      <td> <button onclick='deletDatat(${i})' class="btn btn-danger delet">Delete</button> </td>
      <td> <button onclick='getProductInfo(${i})'  class="btn btn-warning text-dark ">Update</button> </td>
                </tr>
          `;
  }
  tBody = document.getElementById("tBody").innerHTML = dataBody;
}

// -----------------------------------deletDatat--one item-----------------------------
function deletDatat(i) {
  allData.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(allData));
  displayData();
}

// ---------------------------------deletAllDatat  all item------------------------------------------
function deletAllDatat() {
  allData.splice(0);
  localStorage.clear();
  displayData();
  submit.style.setProperty("background-color", "#09c");
  submit.innerHTML = "Add Product";
  getTotal();
  category.classList.add("is-invalid");
  title.classList.add("is-invalid");
}

// ====== =============================== getProductInfo click==========================
function getProductInfo(index) {
  newgetvalue = index;
  let allvalue = allData[index];
  title.value = allvalue.title;
  price.value = allvalue.price;
  taxes.value = allvalue.taxes;
  ads.value = allvalue.ads;
  discount.value = allvalue.discount;
  category.value = allvalue.category;
  getTotal();
  submit.innerHTML = "Update";
  submit.style.setProperty("background-color", "#d2a51f", "important");
  count.style.setProperty("display", "none");
}

// ===================================updateProduct===============================================
function updateProduct() {
  let getVlaue = {
    title: title.value,
    taxes: taxes.value,
    price: price.value,
    ads: ads.value,
    discount: discount.value,
    category: category.value,
    count: count.value,
    total: total.innerHTML,
  };
  allData[newgetvalue] = getVlaue;
  submit.innerHTML = "Add Product";
  submit.style.setProperty("background-color", "#09c");
  count.style.setProperty("display", "block");
}

// ===================================================================
let searchMoode = "title";
function getSearchMoode(id) {
  if (id == "searchTitle") {
    searchMoode = "title";
  } else {
    searchMoode = "category";
  }
  search.placeholder = "Search By " + searchMoode;
  search.focus();
  search.value = "";
  search.onkeyup();

  
}

// ==============================  Search=========================
search.onkeyup = function () {
  value = search.value;

  let dataBody = "";
  for (let i = 0; i < allData.length; i++) {
    if (searchMoode == "title") {
      if (allData[i].title.includes(value)) {
        dataBody += `
          <tr>
      <td>${[i + 1]}</td>
      <td>${allData[i].title}</td>
      <td>${allData[i].price}</td>
      <td>${allData[i].taxes}</td>
      <td>${allData[i].ads}</td>
      <td>${allData[i].discount}</td>
      <td>${allData[i].category}</td>
      <td>${allData[i].total}</td> 
      <td> <button onclick='deletDatat(${i})' class="btn btn-danger delet">Delete</button> </td>
      <td> <button onclick='getProductInfo(${i})'  class="btn btn-warning text-dark ">Update</button> </td>
                </tr>
          `;
      }
    } else {
      if (allData[i].category.includes(value)) {
        dataBody += `
          <tr>
      <td>${[i + 1]}</td>
      <td>${allData[i].title}</td>
      <td>${allData[i].price}</td>
      <td>${allData[i].taxes}</td>
      <td>${allData[i].ads}</td>
      <td>${allData[i].discount}</td>
      <td>${allData[i].category}</td>
      <td>${allData[i].total}</td> 
      <td> <button onclick='deletDatat(${i})' class="btn btn-danger delet">Delete</button> </td>
      <td> <button onclick='getProductInfo(${i})'  class="btn btn-warning text-dark ">Update</button> </td>
                </tr>
          `;
      }
    }
  }
  tBody = document.getElementById("tBody").innerHTML = dataBody;
};

// =============Validation====================================================
title.onkeyup = function () {
  let titleRejex = /^[a-zA-Z]{3,15}$/;
  if (titleRejex.test(title.value)) {
    title.classList.add("is-valid");
    title.classList.remove("is-invalid");
    titleAlert.classList.add("d-none");
  } else {
    title.classList.add("is-invalid");
    title.classList.remove("is-valid");
    titleAlert.classList.remove("d-none");
  }
};
// --------------------------------------------------------------------
category.onkeyup = function () {
  let categoryRejex = /^[a-zA-Z]{3,15}$/;
  if (categoryRejex.test(category.value)) {
    submit.removeAttribute("disabled");
    category.classList.add("is-valid");
    category.classList.remove("is-invalid");
    categoryAlert.classList.add("d-none");
  } else {
    category.classList.add("is-invalid");
    category.classList.remove("is-valid");
    categoryAlert.classList.remove("d-none");
    submit.disabled = "true";
  }
};
