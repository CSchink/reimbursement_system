console.log("Admin is connected");

let results = [];
let allReimbursements = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

////Check authorization and username before allowing access to reimbursements

window.onload = () => {
  let username = localStorage.getItem("username");
  let admin = localStorage.getItem("admin");
  if (username != null && admin != null) {
    let header = document.getElementById("welcome");
    header.innerText = "Welcome " + username + "!";
  } else {
  localStorage.clear();
    window.location.replace("http://localhost:9001/");
  }
  getAllReimbursements();
};

/*
Event listener to determine whether or not "approve or deny" checkboxes are selected.  If one is,
the reimbursementStatus object with reimbursement id and its status is pushed into the results array.
This array will be sent to the
*/
document.body.addEventListener("click", function (event) {
  if (event.target.id == `${"number" + event.target.name}` || event.target.id == `${"number" + event.target.name + 101}`) {
    let reimbursementStatus = {};
    reimbursementStatus["reimbStatus"] = event.target.name;
    reimbursementStatus["statusId"] = event.target.value;

    results.push(reimbursementStatus);
    console.log(results);

    if (
      document.querySelector(`#${"number" + event.target.name + 101}:checked`) == null && document.querySelector(`#${"number" + event.target.name}:checked`) == null
    ) {
      let pos = results
        .map(function (e) {
          return e.reimbStatus;
        })
        .indexOf(event.target.name);
      results.splice(pos);
    }

    if (
          document.querySelector(`#${"number" + event.target.name}:checked`) != null
        ) {
         let inactive = document.querySelector(`#${"number" + event.target.name + 101}`)
         console.log(inactive.value)
         inactive.disabled= true;
          //
          //      let name = event.target.name;
          //      delete updateReimbursements[name];
        } else {
        let inactive = document.querySelector(`#${"number" + event.target.name + 101}`)
        inactive.disabled = false;
        }

        if (
                  document.querySelector(`#${"number" + event.target.name + 101}:checked`) != null
                ) {

                 let inactive = document.querySelector(`#${"number" + event.target.name}`)

                 inactive.disabled= true;
                  //
                  //      let name = event.target.name;
                  //      delete updateReimbursements[name];
                } else {
                let inactive = document.querySelector(`#${"number" + event.target.name}`)
                inactive.disabled = false;
                }
 }
  //  console.log(updateReimbursements);
});

function addTrailingZero(amount){

    let index = amount.indexOf(".");
    if(amount.length() - index > 1){
    return amount.concat("0");

    }
    return amount;
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

function convertIdToType(id) {
  let result = " ";
  switch (id) {
    case 1:
      result = "Lodging";
      break;
    case 2:
      result = "Travel";
      break;
    case 3:
      result = "Food";
      break;
    case 4:
      result = "Other";
      break;
  }

  return result;
}

function clearBox() {
  document.getElementById("admin").innerHTML = "";
  //  results = [];
}

function refreshTable() {
  clearBox();
  createTable(allReimbursements);
}

function filterReimbursements() {
  clearBox();
  let value = document.getElementById("select").value;

  let body = document.getElementById("admin");
  body.setAttribute("class", "center table table-hover table-striped w-75 p-3");

  let table = document.createElement("table");
  let tdata = document.getElementsByTagName("td");
  table.setAttribute("class", "table table-hover table-striped");
  let header = document.createElement("thead");
  header.setAttribute("class", "table table-hover table-dark");
  let header1 = document.createElement("tr");
  let id = document.createElement("th");
  let userName = document.createElement("th");

  userName.innerText = "Full Name";
  let user = document.createElement("th");

  let date = document.createElement("th");
  let resolution = document.createElement("th");
  let approveBox = document.createElement("th");
  let denyBox = document.createElement("th");
  let resolvedBy = document.createElement("th");
  let type = document.createElement("th");
  let nickname = document.createElement("th");
  nickname.innerText ="Username"
  resolvedBy.innerText = "Date Resolved";
  id.innerText = "Amount";
  user.innerText = "Date Submitted";
  resolution.innerText = "Status";
  approveBox.innerText = "Approve";
  denyBox.innerText = "Deny";
  type.innerText = "Type";
  header.append(header1);
  header.append(userName);
  header.append(nickname);
  header.append(type);
  header.append(id);
  header.append(user);
  header.append(resolution);
  header.append(resolvedBy);
  header.append(approveBox);
  header.append(denyBox);

  table.appendChild(header);

  for (const property of allReimbursements) {
    if (property.statusId == value) {
     console.log(property)
      let row = document.createElement("tr");

      let data = row.appendChild(document.createElement("td"));
      data.innerText = property.author;
      data = row.appendChild(document.createElement("td"));
            data.innerText = property.username;
      data = row.appendChild(document.createElement("td"));
          data.innerText = convertIdToType(property.typeId);
      data = row.appendChild(document.createElement("td"));
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

      data = row.appendChild(document.createElement("td"));
      let approve = document.createElement("input");
      approve.setAttribute("type", "checkbox");
      approve.setAttribute("name", property.reimbId);
      approve.setAttribute("id", "number" + property.reimbId);
      approve.setAttribute("value", 2);
      if (property.statusId != 1) {
        approve.disabled = true;
      }
      data.appendChild(approve);
      data.setAttribute("class", "table-success");
      data.setAttribute("style", "width: 10px; text-align: center;");
      data = row.appendChild(document.createElement("td"));
      let deny = document.createElement("input");
      deny.setAttribute("type", "checkbox");
      deny.setAttribute("id", "number" + property.reimbId + 101);
      deny.setAttribute("name", property.reimbId);
      deny.setAttribute("value", 3);
      if (property.statusId != 1) {
        deny.disabled = true;
      }
      data.appendChild(deny);
      data.setAttribute("class", "table-danger");
      data.setAttribute("style", "width: 10px; text-align: center;");
      table.appendChild(row);
    }
  }
  body.appendChild(table);
}

async function getAllReimbursements() {
  clearBox();
  const url = new URL("http://localhost:9001/admin/reimbursements");
  const responsePayload = await fetch(url).then(function (response) {
    response.json().then(function (response) {
      allReimbursements = [...response];
      createTable(allReimbursements);
    });
  });
  return responsePayload;
}

async function approveOrDeny() {
  console.log("connected");
  const url = new URL("http://localhost:9001/admin/reimbursements");
  let xhttp = new XMLHttpRequest();
  let username = localStorage.getItem("username");

  xhttp.open("PATCH", url);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.setRequestHeader("user", username);

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      getAllReimbursements();
    }
  };

  xhttp.send(JSON.stringify(results));
}

function createTable(response) {
  clearBox();
  //Get user selection from the html
  let value = document.getElementById("select").value;

  //create the table, table headers and header row
  let body = document.getElementById("admin");
  body.setAttribute("class", "center table table-hover table-striped w-75 p-3");
  let table = document.createElement("table");
  let tdata = document.getElementsByTagName("td");
  table.setAttribute("class", "table table-hover table-striped");
  let header = document.createElement("thead");
  header.setAttribute("class", "table table-hover table-dark");
  let header1 = document.createElement("tr");
  let id = document.createElement("th");
  let userName = document.createElement("th");
  userName.innerText = "Employee";
  let user = document.createElement("th");
  let date = document.createElement("th");
  let type = document.createElement("th");

  let resolution = document.createElement("th");
  let approveBox = document.createElement("th");
  let denyBox = document.createElement("th");
  let resolvedBy = document.createElement("th");
  let nickname = document.createElement("th");
    nickname.innerText ="Username"
  resolvedBy.innerText = "Date Resolved";
  id.innerText = "Amount";
  user.innerText = "Date Submitted";
  resolution.innerText = "Status";
  approveBox.innerText = "Approve";
  denyBox.innerText = "Deny";
  type.innerText = "Type";
  header.append(header1);
  header.append(userName);
  header.append(nickname);
  header.append(type);
  header.append(id);
  header.append(user);
  header.append(resolution);
  header.append(resolvedBy);
  header.append(approveBox);
  header.append(denyBox);
  table.appendChild(header);

//populate the cells with data

  for (const property of response) {
    let row = document.createElement("tr");
    let data = row.appendChild(document.createElement("td"));

    data.innerText = property.author;
    data = row.appendChild(document.createElement("td"));
    data.innerText = property.username;
    data = row.appendChild(document.createElement("td"));
    data.innerText = convertIdToType(property.typeId);
    data = row.appendChild(document.createElement("td"));
    data.innerText = "$" + property.reimbAmount;
    data = row.appendChild(document.createElement("td"));
    data.innerText = property.submitted;
    data = row.appendChild(document.createElement("td"));
    data.innerText = convertStatusToString(property.statusId);
    data = row.appendChild(document.createElement("td"));

    //if the "resolved by" date is null write pending, else format date to yyyy-dd-mm

    data.innerText =
      property.resolved == null
        ? "N/A"
        : property.resolved.substring(0, 10);

    data = row.appendChild(document.createElement("td"));
    let approve = document.createElement("input");
    approve.setAttribute("type", "checkbox");
    approve.setAttribute("name", property.reimbId);
    approve.setAttribute("id", "number" + property.reimbId);
    approve.setAttribute("value", 2);
    if (property.statusId != 1) {
      approve.disabled = true;
    }
    data.appendChild(approve);
    data.setAttribute("class", "table-success");
    data.setAttribute("style", "width: 10px; text-align: center;");
    data = row.appendChild(document.createElement("td"));
    let deny = document.createElement("input");
    deny.setAttribute("type", "checkbox");
    deny.setAttribute("id", "number" + property.reimbId + 101);
    deny.setAttribute("name", property.reimbId);
    deny.setAttribute("value", 3);
    if (property.statusId != 1) {
      deny.disabled = true;
    }
    data.appendChild(deny);
    data.setAttribute("class", "table-danger");
    data.setAttribute("style", "width: 10px; text-align: center;");
    table.appendChild(row);
  }
  body.appendChild(table);
}
