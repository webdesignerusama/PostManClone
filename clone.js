console.log("usama");
///no of para meters
let addedParamCount = 0;
//utility function
function getelementfromstring(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

// hide the parameters box
let paraMetersBox = document.getElementById("paraMetersBox");
paraMetersBox.style.display = "none";

// if user click the params hide the json box
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "none";
  document.getElementById("paraMetersBox").style.display = "block";
});

// if user click the json hide the params box
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
  document.getElementById("paraMetersBox").style.display = "none";
  document.getElementById("requestJsonBox").style.display = "block";
});

///if user clicks on + button add more paara meters
let addParams = document.getElementById("addParams");
addParams.addEventListener("click", () => {
  let params = document.getElementById("params");
  let str = `<div class="form-row my-2">
    <label for="url" class="col-sm-2 col-form-label">Parameter${
      addedParamCount + 2
    }</label>

    <div class="col-md-4">
      <input
        type="text"
        class="form-control"
        id="parameterKey${addedParamCount + 2}"
        placeholder="Enter parameter key${addedParamCount + 2}"
      />
    </div>
    <div class="col-md-4">
      <input
        type="text"
        class="form-control"
        id="paraMeterValue${addedParamCount + 2}"
        placeholder="Enter parameter value ${addedParamCount + 2}"
      />
    </div>
    <button  class="btn btn-primary deleteParam">-</button>
  </div>`;
  let paramElement = getelementfromstring(str);
  params.appendChild(paramElement);
  let deleteParam = document.getElementsByClassName("deleteParam");
  for (item of deleteParam) {
    item.addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });
  }

  addedParamCount++;
});

///if user subit button
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  //show please wait in response box
  document.getElementById("responseJsonText").value =
    "please wait ,fetching response......";
  ///fetch all the values user has entered
  let url = document.getElementById("url").value;
  let requestType = document.querySelector(
    "input[name='requestType']:checked"
  ).value;
  // console.log(requestType)
  let contentType = document.querySelector(
    "input[name='contentType']:checked"
  ).value;
  // console.log(contentType)
  console.log(url, requestType, contentType);
  if (contentType == "params") {
    data = {};
    //console.log(data)
    for (let i = 0; i < addedParamCount + 1; i++) {
      if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
        console.log("is condition");
        let key = document.getElementById("parameterKey" + (i + 1)).value;
        console.log(key);
        let value = document.getElementById("paraMeterValue" + (i + 1)).value;
        console.log(value);
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("requestJsonText").value;
    console.log("else");
  }

  console.log(data);
  console.log(contentType);
  console.log(requestType);


  // fetch on get
  if (requestType=='GET'){
    fetch(url,{
      method:'GET',
    }).then(response=>response.text()).then(text=>{
      document.getElementById("responseJsonText").value=text; 
    }); 
  }
  else{
    fetch(url,{
      method:'POST',
      body:data,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }

    }).then(response=>response.text()).then(text=>{
      document.getElementById("responseJsonText").value=text; 
    });
  }









});
