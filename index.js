var form = document.querySelector("form");

//here any data is avail in LS append that data else append blank array
var todoArr = JSON.parse(localStorage.getItem("todoData")) || [];

displayData(todoArr);

function displayData(data) {
  var tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  // console.log(data);

  data.map(function (elem, index) {
    var row = document.createElement("tr");

    var td1 = document.createElement("td");
    td1.append(elem.task);

    var td2 = document.createElement("td");
    td2.append(elem.priority);

    if (elem.priority == "High") {
      td2.setAttribute("class", "bgRed");
    } else {
      td2.setAttribute("class", "bgGreen");
    }

    var td3 = document.createElement("td");
    td3.append("Delete");
    td3.setAttribute("class", "delStyle");
    td3.addEventListener("click", (e) => {
      console.log(e);
      //deleting from ui
      e.target.parentNode.remove();

      // delete from LS
      var index = e.target.parentNode.rowIndex - 1;
      todoArr.splice(index, 1);

      localStorage.setItem("todoData", JSON.stringify(todoArr));
      displayData(todoArr);
    });

    row.append(td1, td2, td3);
    tbody.append(row);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  //store input values
  var task = document.querySelector("#task").value;
  var priority = document.querySelector("#priority").value;

  // check all fields are filled
  if (!task || !priority) {
    alert("Fill all inputs");
  } else {
    //  create object and push to array of object
    
    var todoDataObj = {
      task: task,
      priority: priority,
    };

    todoArr.push(todoDataObj);
    localStorage.setItem("todoData", JSON.stringify(todoArr));

    displayData(todoArr);
  }
});
