// Global csrfToken
let csrfToken;
let userCredit;

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
  
  if($("#domoCreditUpdate").val() == ''){
    handleError("RAWR! All fields are required");
    return false;
  }
  
  sendAjax('POST', $("#domoUpdateForm").attr("action"), $("#domoUpdateForm").serialize(), function() {
    //loadDomosFromServer();
    loadUserData();
  });
  
  return false;
};

// Handle Domo Update
const flipCoin = (e) => {
  e.preventDefault();
  
  $("#domoMessage").animate({width:'hide'},350);
  
  
  if(userCredit <= 0){
    handleError("RAWR! Out of Credit");
    return false;
  }
  
  
  const randNum = Math.floor(Math.random() * 100);
  let addCredit;
  let result;
  if(randNum % 2 == 0){
    addCredit = 1;
    result = "Heads";
  }
  else{
    addCredit = -1;
    result = "Tails";
  }
  console.dir($("#flipCoinUpdate"))
  document.querySelector("#flipCoinResult").innerHTML = "Result: " + result;
  
  sendAjax('POST', $("#flipCoinForm").attr("action"), $("#flipCoinForm").serialize(), function() {
    //loadDomosFromServer();
    loadUserData();
  });
  
  return false;
};

const handleChangePass= (e) => {
  e.preventDefault();
  
  $("#domoMessage").animate({width:'hide'},350);
  
  if($("#user").val() == '' || $("#pass").val() == '' || $("#newpass").val() == '' || $("#newpass2").val() == ''){
    handleError("RAWR! All Fields Necessary");
    return false;
  }
  
  console.log($("input[name=_csrf]").val());
  
  sendAjax('POST', $("#changePassForm").attr("action"), $("#changePassForm").serialize(), redirect);
  
  return false;
};

// Main Domo Forms
const DomoForm = (props) => {
  return(
    <div id="forms">

    <h2 className="formHead">Add Funds</h2>
    <form id="domoUpdateForm"
          onSubmit={handleDomoUpdate}
          name="domoUpdateForm"
          action="/updateCredit"
          method="POST"
          className="domoForm"
      >
        <label htmlFor="credit">Credit: </label>
        <input id="domoCreditUpdate" type="text" name="credit" placeholder="Credit to Add"/>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="makeDomoSubmit" type="submit" value="Add Funds" />
    </form>
    </div>
  );
};

const showAddCredit = (csrf) => {
  ReactDOM.render(
    <DomoForm csrf={csrf} />,
    document.querySelector("#makeDomo")
  );
};

const Games = (props) => {
  return(
    <div id="games">

    <h2 className="formHead">Play Games</h2>
    
    <section className="game">
      <p>Flip a coin! If it lands on heads, lose $1. If it lands on tails...lose $1.</p>
        
      <form id="flipCoinForm"
            onSubmit={flipCoin}
            name="flipCoinForm"
            action="/updateCredit"
            method="POST"
            className="domoForm"
        >
          
          <input id="flipCoinUpdate" type="hidden" name="credit" value="-1"/>
          <input type="hidden" name="_csrf" value={props.csrf} />
          <input className="makeDomoSubmit" type="submit" value="Flip Coin" />
      </form>
      <h2 id="flipCoinResult">Result: </h2>
  
    </section>
    </div>
    
  );
};

const showGames = (csrf) => {
  ReactDOM.render(
    <Games  csrf={csrf}/>,
    document.querySelector("#makeDomo")
  );
};

const AccountInfo = (props) => {
  return(
    
    <div id="account">

    <h2 className="formHead">Account Information</h2>

      <form id="changePassForm"
      name="changePassForm"
      onSubmit={handleChangePass}
      action="/changePass"
      method="POST"
      className="mainForm"
      >
    <h2>Change Password</h2>

    <label htmlFor="username">Username: </label>
    <input id="user" type="text" name="username" placeholder="username"/>
    <label htmlFor="pass">Current Password: </label>
    <input id="pass" type="password" name="pass" placeholder="current password"/>
    <label htmlFor="newpass">New Password: </label>
    <input id="newpass" type="password" name="newpass" placeholder="new password"/>
    <label htmlFor="newpass2">New Password: </label>
    <input id="newpass2" type="password" name="newpass2" placeholder="retype new password"/>
    <input type="hidden" name="_csrf" value={props.csrf}/>
    <input className="formSubmit" type="submit" value="Change Password"/>
    </form>
    </div>
  );
};

/*
const flipCoin = (csrf) => {
  const randNum = Math.floor(Math.random() * 100);
  let addCredit;
  console.dir(randNum % 2);
  if(randNum % 2 == 0){
    addCredit = 1;
  }
  else{
    addCredit = -1;
  }
  

 
  
};
*/
const showAccountInfo = (csrf) => {
  ReactDOM.render(
    <AccountInfo  csrf={csrf}/>,
    document.querySelector("#makeDomo")
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

const UserInfo = function(props){
  userCredit = props.user.credit;
  return(
    <div className="userStuff">
      <h1 id="welcome">Welcome: <p className="userInformation">{props.user.username}</p></h1>
      <h1 id="credits">Current Credit: <p className="userInformation">${props.user.credit}</p></h1>
    </div>
  );
};

const loadUserData = function(props){
  sendAjax('GET', '/getUser', null, (data) => {
    ReactDOM.render(
      <UserInfo user={data.user} />,
      document.querySelector("#userInfo")
    );
  });
};

const loadDomosFromServer = () => {
  sendAjax('GET', '/getDomos', null, (data) => {
    ReactDOM.render(
      <DomoList domos={data.domos} />,
      document.querySelector("#domos")
    );
  });
};

const HomeWindow = (props) => {
  return(
    <div>
    <h1>Home Page</h1>
    </div>
  );
};

const GameWindow = (props) => {
  return(
    <div>
    <h1>Games Page</h1>
    </div>
  );
};

const AccountWindow = (props) => {
  return(
    <div>
    <h1>Account Page</h1>
    </div>
  );
};

const createHomeWindow = (csrf) => {
  ReactDOM.render(
    <HomeWindow csrf={csrf} />,
    document.querySelector("#pageInfo")
  );
};

const createGameWindow = (csrf) => {
  ReactDOM.render(
    <GameWindow csrf={csrf} />,
    document.querySelector("#pageInfo")
  );
};

const createAccountWindow = (csrf) => {
  ReactDOM.render(
    <AccountWindow csrf={csrf} />,
    document.querySelector("#pageInfo")
  );
};

const setup = function(csrf) {
  // set global csrf Token
  csrfToken = csrf;
  
  const homeNav = document.querySelector("#homeNav");
  const gameNav = document.querySelector("#gameNav");
  const accountNav = document.querySelector("#accountNav");
  
  
  homeNav.addEventListener("click", (e) =>{
    e.preventDefault();
    createHomeWindow(csrf);
    showAddCredit(csrf);
    return false;
  });
  
  gameNav.addEventListener("click", (e) =>{
    e.preventDefault();
    createGameWindow(csrf);
    showGames(csrf);
    return false;
  });
  
  accountNav.addEventListener("click", (e) =>{
    e.preventDefault();
    createAccountWindow(csrf);
    showAccountInfo(csrf);
    return false;
  });
  
  
  
  /*
  ReactDOM.render(
    <UserInfo user={[]} />,
    document.querySelector("#userInfo")
  );
  */
  
  showAddCredit(csrf);
  /*
  ReactDOM.render(
    <DomoList domos={[]} />,
    document.querySelector("#domos")
  );
  */
  //loadUserData();
  createHomeWindow(csrf);
  //loadDomosFromServer();
  loadUserData();
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {

    setup(result.csrfToken);
    
  });
};

$(document).ready(function() {
  getToken();
});