var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");
var updateBtn = document.getElementById("updateBtn");
var tBody = document.getElementById("tBody");
var searchInput = document.getElementById("searchField");
var globalIndex = null;
var siteList = [];

//to control dialog
document.getElementById("closeDialog").addEventListener("click", () => {
  document.getElementById("urlRulesDialog").close();
});

//check local storage empty or not
if (localStorage.getItem("siteList") !== null) {
  siteList = JSON.parse(localStorage.getItem("siteList"));
  displaysiteList();
}

function addSite() {
  if (updateBtn.innerHTML.includes("Add")) {
    if (siteNameInput.value == "") {
      alert("Enter name");
    } else if (siteURLInput.value == "") {
      alert("Enter url");
    } else if (validInputs() === true) {
      var website = { name: siteNameInput.value, url: siteURLInput.value };
      if (checkName(website) === true) {
        siteList.push(website);
        localStorage.setItem("siteList", JSON.stringify(siteList));
        clearInputs();
        displaysiteList();
      }
    } else {
      document.getElementById("urlRulesDialog").showModal();
    }


  } else {
    if (validInputs() === true) {
      updateSite(globalIndex);
      displaysiteList();
      clearInputs();
    } else {
      document.getElementById("urlRulesDialog").showModal();
    }
  }
}

function validInputs() {
  var paternName = /[a-zA-Z0-9]{2,}/;
  var paternURL = /^(https:\/\/|www\.)[a-z0-9\.]{2,}(\.[a-z]{2,}$)/;
  if (
    paternURL.test(siteURLInput.value) === true &&
    paternName.test(siteNameInput.value) === true
  ) {
    return true;
  } else {
    return false;
  }
}

//check if wbsite name is exist or not
function checkName(website) {
  if (localStorage.getItem("siteList") === null) {
    return true;
  } else {
    var temp = JSON.parse(localStorage.getItem("siteList"));
    if (temp.some((b) => b.url === website.url || b.name === website.name)) {
      alert("This bookmark already exists");
      return false;
    }
    return true;
  }
}

function clearInputs() {
  siteNameInput.value = "";
  siteURLInput.value = "";
}

function setItemInlocalStorage() {
  localStorage.setItem("siteList", JSON.stringify(siteList));
}

function displaysiteList() {
  var table = ``;

  for (var i = 0; i < siteList.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${siteList[i].name}</td>
   <td>
   <button onclick="fillInputs(${i});" class="btn btn-warning"><i class="fa-solid fa-pen text-white"></i></button>
   </td>
    <td><a href="${
      siteList[i].url
    }" target="blank"><button class="btn btn-success"><i class="fa-solid fa-up-right-from-square text-white"></i></button></a></td>
    <td><button class="btn btn-danger" onclick="deleteSite(${i});"><i class="fa-solid fa-trash-can text-white"></i></button></td>
    </tr>
    `;
  }
  tBody.innerHTML = table;
}

function fillInputs(index) {
  globalIndex = index;
  siteNameInput.value = siteList[index].name;
  siteURLInput.value = siteList[index].url;
  updateBtn.innerHTML = "Update Website";
}

function updateSite(globalIndex) {
  siteList[globalIndex].name = siteNameInput.value;
  siteList[globalIndex].url = siteURLInput.value;
  setItemInlocalStorage();
  updateBtn.innerHTML = "Add Website";
}

function deleteSite(index) {
  siteList.splice(index, 1);
  setItemInlocalStorage();
  displaysiteList();
}

function seachSite() {
  var key = searchInput.value;
  var table = ``;
  for (let i = 0; i < siteList.length; i++) {
    if (siteList[i].name.toLowerCase().includes(key.toLowerCase())) {
      table += `
    <tr>
    <td>${i + 1}</td>
    <td>${siteList[i].name}</td>
   <td>
   <button onclick="fillInputs(${i});" class="btn btn-warning"><i class="fa-solid fa-pen text-white"></i></button>
   </td>
    <td><a href="${
      siteList[i].url
    }" target="blank"><button class="btn btn-success"><i class="fa-solid fa-up-right-from-square text-white"></i></button></a></td>
    <td><button class="btn btn-danger" onclick="deleteSite(${i});"><i class="fa-solid fa-trash-can text-white"></i></button></td>
    </tr>
    `;
    }
    tBody.innerHTML = table;
  }
}
