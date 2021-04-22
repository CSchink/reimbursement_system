console.log("index is connected");

document.getElementById("login").addEventListener("click", function(event){
        let username = document.getElementById("floatingInput").value;
        window.localStorage.setItem("username", username);
        if(username == "admin"){
        window.localStorage.setItem("admin", "admin");
        } else {
        window.localStorage.setItem("employee", "employee");
        }
      });

async function login() {


  const url = new URL("http://localhost:9001/login");
  let xhttp = new XMLHttpRequest();
  xhttp.open("POST", url);
 let username = document.getElementById("floatingInput").value;
  let credentials = document.getElementById("floatingPassword").value;
  xhttp.setRequestHeader("Content-Type", "application/json");

  xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
       // Response
//       let response = this.responseText;
//       console.log(response);

     }

  };

//  let data = new FormData();
//  data.append('user': username)
//  data.append('password', credentials}
let data = [username, credentials]
         xhttp.send(data);
}

async function logout(){
const url = new URL("http://localhost:9001/login");
  let xhttp = new XMLHttpRequest();
  xhttp.open("PATCH", url);

  localStorage.clear();
  xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
       // Response
//       let response = this.responseText;
//       console.log(response);

     }

  };

    xhttp.send();
window.location.replace("http://localhost:9001/");
}
