// Global csrfToken
let csrfToken;

// Handle Domo Creation
const handleDomo = (e) => {
  e.preventDefault();
  
  $("#domoMessage").animate({width:'hide'},350);
  
  if($("#domoName").val() == '' || $("#domoAge").val() == '' || $("#domoCredit").val() == ''){
    handleError("RAWR! All fields are required");
    return false;
  }
  
  sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function() {
    loadDomosFromServer();
  });

  return false;
};

// Handle Domo Update
const handleDomoUpdate = (e) => {
  e.preventDefault();
  
  $("#domoMessage").animate({width:'hide'},350);
  
  if($("#domoNameUpdate").val() == '' || $("#domoAgeUpdate").val() == '' || $("#domoCreditUpdate").val() == ''){
    handleError("RAWR! All fields are required");
    return false;
  }
  
  sendAjax('POST', $("#domoUpdateForm").attr("action"), $("#domoUpdateForm").serialize(), function() {
    loadDomosFromServer();
  });
  
  return false;
};

// Main Domo Forms
const DomoForm = (props) => {
  return(
    <div id="forms">
    <h2 className="formHead">Create Domo</h2>
    <form id="domoForm"
          onSubmit={handleDomo}
          name="domoForm"
          action="/maker"
          method="POST"
          className="domoForm"
      >
        <label htmlFor="name">Name: </label>
        <input id="domoName" type="text" name="name" placeholder="Domo Name" />
        <label htmlFor="age">Age: </label>
        <input id="domoAge" type="text" name="age" placeholder="Domo Age" />
        <label htmlFor="credit">Credit: </label>
        <input id="domoCredit" type="text" name="credit" placeholder="Domo Credit"/>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="makeDomoSubmit" type="submit" value="Make Domo" />
    </form>
    
    <h2 className="formHead">Update Domo</h2>
    <form id="domoUpdateForm"
          onSubmit={handleDomoUpdate}
          name="domoUpdateForm"
          action="/updateDomo"
          method="POST"
          className="domoForm"
      >
        <label htmlFor="name">Name: </label>
        <input id="domoNameUpdate" type="text" name="name" placeholder="Domo Name" />
        <label htmlFor="credit">Credit: </label>
        <input id="domoCreditUpdate" type="text" name="credit" placeholder="Credit to Add"/>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="makeDomoSubmit" type="submit" value="Add Funds" />
    </form>
    </div>
  );
};


const DomoList = function(props) {
  if(props.domos.length === 0){
    return(
      <div className="domoList">
        <h3 className="emptyDomo">No Domos yet</h3>
      </div>
    );
  }
  
  const domoNodes = props.domos.map(function(domo) {
    return(
      <div key={domo._id} className="domo">
        <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
        <h3 className="domoName"> Name: {domo.name}</h3>
        <h3 className="domoAge"> Age: {domo.age}</h3>
        <h3 className="domoCredit"> Credit: ${domo.credit}</h3>
      </div>
    );
  });
  
  return(
    <div className="domoList">
      {domoNodes}
    </div>
  );
};

const loadDomosFromServer = () => {
  sendAjax('GET', '/getDomos', null, (data) => {
    ReactDOM.render(
      <DomoList domos={data.domos} />,
      document.querySelector("#domos")
    );
  });
};

const setup = function(csrf) {
  // set global csrf Token
  csrfToken = csrf;
  
  ReactDOM.render(
    <DomoForm csrf={csrf} />,
    document.querySelector("#makeDomo")
  );
  
  ReactDOM.render(
    <DomoList domos={[]} />,
    document.querySelector("#domos")
  );
  
  loadDomosFromServer();
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
};

$(document).ready(function() {
  getToken();
});