console.log("employee is connected");
console.log(localStorage.getItem("username"));
let filterValue;

window.onload = () => {
  let username = localStorage.getItem("username");
  let auth = localStorage.getItem("employee");
  if (username != null && auth != null) {
    let header = document.getElementById("welcome");
    header.innerText = "Welcome " + username + "!";
  } else {
  localStorage.clear();
    window.location.replace("http://localhost:9001/");
  }
  getAllReimbursements();
};

let allReimbursements = [];

document.body.addEventListener("click", function (event) {
  if (event.target.id == "list-settings-list") {
    let s = document.getElementById("addNewReimbursement");
    s.addEventListener("click", addNewReimbursement);
  }
});

function createRequestForm(event) {
  clearBox();
  let heading = document.getElementById("heading");

  const options = {
    1: "Lodging",
    2: "Travel",
    3: "Food",
    4: "Other",
  };

  document.getElementById("javascript-id").style.visibility = "visible";

  let body = document.getElementById("main4");
  body.setAttribute("style", "text-align: center");

  let form = document.createElement("form");
  form.setAttribute("id", "newRequestForm");
  form.setAttribute("type", "submit");
  let select = document.createElement("select");
  select.setAttribute("class", "form-select input-group mb-3 ");
  select.setAttribute("id", "select");

  for (let i = 0; i <= 4; i++) {
    let option = document.createElement("option");
    if (i == 0) {
      option.innerText = "Please select a reimbursement type";
      option.value = null;
      select.appendChild(option);
    } else {
      option.value = i;
      option.innerText = options[i];
      select.appendChild(option);
      console.log(option.value)
    }
  }

  let header = document.createElement("h2");
  header.innerText = "Reimbursement Request";
  header.setAttribute("class", "mb-3");

  //  form.setAttribute("method", "post");
  //  form.setAttribute("action", "http://localhost:9001/login");

  let s = document.createElement("input");
  s.setAttribute("type", "submit");
  s.setAttribute("id", "addNewReimbursement");
  s.setAttribute("class", "btn btn-outline-primary");

  let dollarSign = document.createElement("span");
  dollarSign.setAttribute("class", "input-group-text");

  dollarSign.innerText = "Amount : $";
  let amount = document.createElement("input");
  amount.setAttribute("type", "text");
  amount.setAttribute("class", "form-control");
  amount.setAttribute("id", "amount");
  let div = document.createElement("div");
  div.setAttribute("class", "mb-3 mr-3");
  form.append(header);
  dollarSign.append(amount);
  div.append(dollarSign);
  form.append(div);

  form.appendChild(select);
  form.appendChild(s);
  body.appendChild(form);
}

async function getRecentReimbursements() {
  const url = new URL("http://localhost:9001/json-getter");
  const responsePayload = await fetch(url).then(function (response) {
    response.json().then(function (response) {
      let body = document.getElementById("employee");
      let tdata = document.getElementsByTagName("td");

      if (tdata.length <= 0) {
        for (const property of response) {
          let row = body.appendChild(document.createElement("tr"));
          let data = row.appendChild(document.createElement("td"));
          data.innerText = property.id;
          data = row.appendChild(document.createElement("td"));
          data.innerText = property.username;
          body.appendChild(row);
        }
      }
    });
  });
  return responsePayload;
}

function clearBox() {
  document.getElementById("main4").innerHTML = "";
  document.getElementById("main").innerHTML = "";
}

function getAllReimbursementsByStatus() {
  let select = document.getElementById("select").value;
  let username = localStorage.getItem("username");
  const url = new URL(
    "http://localhost:9001/employee/reimbursements/" + select
  );
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", url);
  xhttp.setRequestHeader("user", username);
  xhttp.setRequestHeader("status", 2);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Response
      let response = this.responseText;
      if (response != null) {
        console.log(response);
      }
    }
  };

  xhttp.send();
}

async function addNewReimbursement(event) {
  event.preventDefault();
  let select = document.getElementById("select").value;
  let username = localStorage.getItem("username");
  let amount = document.getElementById("amount").value;

  const url = new URL("http://localhost:9001/employee/reimbursements/");
  let xhttp = new XMLHttpRequest();
  xhttp.open("POST", url, true);

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Response
      let response = this.responseText;
      if (response != null) {
        createRequestForm();
      }
    }
  };

  let data = [4, username, select, amount, 1, 1];
  xhttp.send(data);
}
function convertStatusToString(status) {
  let result = " ";
  switch (status) {
    case 1:
      result = "Pending";
      break;
    case 2:
      result = "Approved";
      break;
    case 3:
      result = "Denied";
      break;
  }

  return result;
}

function convertStatusToStringCSS(status) {
  let result = " ";
  switch (status) {
    case 1:
      result = "table-warning table-hover table-striped";
      break;
    case 2:
      result = "table-success table-hover table-striped";
      break;
    case 3:
      result = "table-danger table-hover table-striped";
      break;
  }

  return result;
}

function addTrailingZero(amount){

    let index = amount.indexOf(".");
    if(amount.length() - index > 1){
    return  "$" + amount.concat("0");
    }
    return amount;
}

function filterReimbursements() {

  clearBox();

  let main = document.getElementById("main");
  main.setAttribute("class", "table table-striped table-light");
  let body = document.createElement("table");
  body.setAttribute("class", "table table-hover table-striped table-light ");
  let header = document.createElement("thead");
  let header1 = document.createElement("tr");
  let id = document.createElement("th");
  let user = document.createElement("th");
  let date = document.createElement("th");

  id.innerText = "Amount";
  user.innerText = "Date Submitted";
  date.innerText = "Resolution";

  header.append(header1);
  header.append(id);
  header.append(user);
  header.append(date);
  body.appendChild(header);
  main.appendChild(body);

  let tdata = document.getElementsByTagName("td");

  for (const property of allReimbursements) {
    console.log("id " + property.statusId);
    console.log("value " + filterValue);
    if (property.statusId == filterValue) {
      let row = body.appendChild(document.createElement("tr"));
      let data = row.appendChild(document.createElement("td"));
      data.innerText = "$" + property.reimbAmount;
      data = row.appendChild(document.createElement("td"));
      data.innerText = property.submitted;
      data = row.appendChild(document.createElement("td"));
      data.innerText = convertStatusToString(property.statusId);

      row.setAttribute("class", convertStatusToStringCSS(property.statusId));
      body.appendChild(row);
    }
  }
  main.appendChild(body);
}

async function getAllReimbursements() {
  clearBox();

  document.getElementById("javascript-post").style.visibility = "visible";
  const url = new URL("http://localhost:9001/employee/reimbursements");
  let username = localStorage.getItem("username");
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", url);
  xhttp.setRequestHeader("user", username);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Response
      let data = this.responseText;
      let response = JSON.parse(data);
      allReimbursements = [...response];
      console.log(allReimbursements);
      if (response != null) {
        let main = document.getElementById("main");
        main.setAttribute("class", "table table-striped table-light");
        let body = document.createElement("table");
        body.setAttribute(
          "class",
          "table table-hover table-striped table-light "
        );
        let header = document.createElement("thead");
        let header1 = document.createElement("tr");
        let id = document.createElement("th");
        //id.setAttribute("class", "d-flex align-items-center");
        let user = document.createElement("th");
        // user.setAttribute("class", "d-flex align-items-center");
        let date = document.createElement("th");
        let resolvedBy = document.createElement("th");
        // date.setAttribute("class", "d-flex align-items-center");
        id.innerText = "Amount";
        user.innerText = "Date Submitted";
        date.innerText = "Resolution";
        resolvedBy.innerText = "Date Resolved";
        header.append(header1);
        header.append(id);
        header.append(user);
        header.append(date);
        header.append(resolvedBy);
        body.appendChild(header);
        main.appendChild(body);

        let tdata = document.getElementsByTagName("td");

        if (tdata.length <= 0) {
          for (const property of response) {
            let row = body.appendChild(document.createElement("tr"));
            let data = row.appendChild(document.createElement("td"));
            data.innerText = "$" + property.reimbAmount;
            data = row.appendChild(document.createElement("td"));
            data.innerText = property.submitted;

            data = row.appendChild(document.createElement("td"));
            data.innerText = convertStatusToString(property.statusId);
            data = row.appendChild(document.createElement("td"));
            data.innerText =
            property.resolved == null
              ? "N/A"
              : property.resolved.substring(0, 10);
            row.setAttribute(
              "class",
              convertStatusToStringCSS(property.statusId)
            );
            body.appendChild(row);
          }
        }
      }
    }
  };
  xhttp.send();
}

