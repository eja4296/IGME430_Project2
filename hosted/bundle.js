"use strict";

// Global csrfToken
var csrfToken = void 0;
var userCredit = void 0;

// Handle Domo Creation
var handleDomo = function handleDomo(e) {
  e.preventDefault();

  $("#domoMessage").animate({ width: 'hide' }, 350);

  if ($("#domoName").val() == '' || $("#domoAge").val() == '' || $("#domoCredit").val() == '') {
    handleError("RAWR! All fields are required");
    return false;
  }

  sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {
    loadDomosFromServer();
  });

  return false;
};

// Handle Domo Update
var handleDomoUpdate = function handleDomoUpdate(e) {
  e.preventDefault();

  $("#domoMessage").animate({ width: 'hide' }, 350);

  if ($("#domoCreditUpdate").val() == '') {
    handleError("RAWR! All fields are required");
    return false;
  }

  sendAjax('POST', $("#domoUpdateForm").attr("action"), $("#domoUpdateForm").serialize(), function () {
    //loadDomosFromServer();
    loadUserData();
  });

  return false;
};

// Handle Domo Update
var flipCoin = function flipCoin(e) {
  e.preventDefault();

  $("#domoMessage").animate({ width: 'hide' }, 350);

  if (userCredit <= 0) {
    handleError("RAWR! Out of Credit");
    return false;
  }

  var randNum = Math.floor(Math.random() * 100);
  var addCredit = void 0;
  var result = void 0;
  if (randNum % 2 == 0) {
    addCredit = 1;
    result = "Heads";
  } else {
    addCredit = -1;
    result = "Tails";
  }
  console.dir($("#flipCoinUpdate"));
  document.querySelector("#flipCoinResult").innerHTML = "Result: " + result;

  sendAjax('POST', $("#flipCoinForm").attr("action"), $("#flipCoinForm").serialize(), function () {
    //loadDomosFromServer();
    loadUserData();
  });

  return false;
};

var handleChangePass = function handleChangePass(e) {
  e.preventDefault();

  $("#domoMessage").animate({ width: 'hide' }, 350);

  if ($("#user").val() == '' || $("#pass").val() == '' || $("#newpass").val() == '' || $("#newpass2").val() == '') {
    handleError("RAWR! All Fields Necessary");
    return false;
  }

  console.log($("input[name=_csrf]").val());

  sendAjax('POST', $("#changePassForm").attr("action"), $("#changePassForm").serialize(), redirect);

  return false;
};

// Main Domo Forms
var DomoForm = function DomoForm(props) {
  return React.createElement(
    "div",
    { id: "forms" },
    React.createElement(
      "h2",
      { className: "formHead" },
      "Add Funds"
    ),
    React.createElement(
      "form",
      { id: "domoUpdateForm",
        onSubmit: handleDomoUpdate,
        name: "domoUpdateForm",
        action: "/updateCredit",
        method: "POST",
        className: "domoForm"
      },
      React.createElement(
        "label",
        { htmlFor: "credit" },
        "Credit: "
      ),
      React.createElement("input", { id: "domoCreditUpdate", type: "text", name: "credit", placeholder: "Credit to Add" }),
      React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
      React.createElement("input", { className: "makeDomoSubmit", type: "submit", value: "Add Funds" })
    )
  );
};

var showAddCredit = function showAddCredit(csrf) {
  ReactDOM.render(React.createElement(DomoForm, { csrf: csrf }), document.querySelector("#makeDomo"));
};

var Games = function Games(props) {
  return React.createElement(
    "div",
    { id: "games" },
    React.createElement(
      "h2",
      { className: "formHead" },
      "Play Games"
    ),
    React.createElement(
      "section",
      { className: "game" },
      React.createElement(
        "p",
        null,
        "Flip a coin! If it lands on heads, lose $1. If it lands on tails...lose $1."
      ),
      React.createElement(
        "form",
        { id: "flipCoinForm",
          onSubmit: flipCoin,
          name: "flipCoinForm",
          action: "/updateCredit",
          method: "POST",
          className: "domoForm"
        },
        React.createElement("input", { id: "flipCoinUpdate", type: "hidden", name: "credit", value: "-1" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "makeDomoSubmit", type: "submit", value: "Flip Coin" })
      ),
      React.createElement(
        "h2",
        { id: "flipCoinResult" },
        "Result: "
      )
    )
  );
};

var showGames = function showGames(csrf) {
  ReactDOM.render(React.createElement(Games, { csrf: csrf }), document.querySelector("#makeDomo"));
};

var AccountInfo = function AccountInfo(props) {
  return React.createElement(
    "div",
    { id: "account" },
    React.createElement(
      "h2",
      { className: "formHead" },
      "Account Information"
    ),
    React.createElement(
      "form",
      { id: "changePassForm",
        name: "changePassForm",
        onSubmit: handleChangePass,
        action: "/changePass",
        method: "POST",
        className: "mainForm"
      },
      React.createElement(
        "h2",
        null,
        "Change Password"
      ),
      React.createElement(
        "label",
        { htmlFor: "username" },
        "Username: "
      ),
      React.createElement("input", { id: "user", type: "text", name: "username", placeholder: "username" }),
      React.createElement(
        "label",
        { htmlFor: "pass" },
        "Current Password: "
      ),
      React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "current password" }),
      React.createElement(
        "label",
        { htmlFor: "newpass" },
        "New Password: "
      ),
      React.createElement("input", { id: "newpass", type: "password", name: "newpass", placeholder: "new password" }),
      React.createElement(
        "label",
        { htmlFor: "newpass2" },
        "New Password: "
      ),
      React.createElement("input", { id: "newpass2", type: "password", name: "newpass2", placeholder: "retype new password" }),
      React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
      React.createElement("input", { className: "formSubmit", type: "submit", value: "Change Password" })
    )
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
var showAccountInfo = function showAccountInfo(csrf) {
  ReactDOM.render(React.createElement(AccountInfo, { csrf: csrf }), document.querySelector("#makeDomo"));
};

var DomoList = function DomoList(props) {
  if (props.domos.length === 0) {
    return React.createElement(
      "div",
      { className: "domoList" },
      React.createElement(
        "h3",
        { className: "emptyDomo" },
        "No Domos yet"
      )
    );
  }

  var domoNodes = props.domos.map(function (domo) {
    return React.createElement(
      "div",
      { key: domo._id, className: "domo" },
      React.createElement("img", { src: "/assets/img/domoface.jpeg", alt: "domo face", className: "domoFace" }),
      React.createElement(
        "h3",
        { className: "domoName" },
        " Name: ",
        domo.name
      ),
      React.createElement(
        "h3",
        { className: "domoAge" },
        " Age: ",
        domo.age
      ),
      React.createElement(
        "h3",
        { className: "domoCredit" },
        " Credit: $",
        domo.credit
      )
    );
  });

  return React.createElement(
    "div",
    { className: "domoList" },
    domoNodes
  );
};

var UserInfo = function UserInfo(props) {
  userCredit = props.user.credit;
  return React.createElement(
    "div",
    { className: "userStuff" },
    React.createElement(
      "h1",
      { id: "welcome" },
      "Welcome: ",
      React.createElement(
        "p",
        { className: "userInformation" },
        props.user.username
      )
    ),
    React.createElement(
      "h1",
      { id: "credits" },
      "Current Credit: ",
      React.createElement(
        "p",
        { className: "userInformation" },
        "$",
        props.user.credit
      )
    )
  );
};

var loadUserData = function loadUserData(props) {
  sendAjax('GET', '/getUser', null, function (data) {
    ReactDOM.render(React.createElement(UserInfo, { user: data.user }), document.querySelector("#userInfo"));
  });
};

var loadDomosFromServer = function loadDomosFromServer() {
  sendAjax('GET', '/getDomos', null, function (data) {
    ReactDOM.render(React.createElement(DomoList, { domos: data.domos }), document.querySelector("#domos"));
  });
};

var HomeWindow = function HomeWindow(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      null,
      "Home Page"
    )
  );
};

var GameWindow = function GameWindow(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      null,
      "Games Page"
    )
  );
};

var AccountWindow = function AccountWindow(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      null,
      "Account Page"
    )
  );
};

var createHomeWindow = function createHomeWindow(csrf) {
  ReactDOM.render(React.createElement(HomeWindow, { csrf: csrf }), document.querySelector("#pageInfo"));
};

var createGameWindow = function createGameWindow(csrf) {
  ReactDOM.render(React.createElement(GameWindow, { csrf: csrf }), document.querySelector("#pageInfo"));
};

var createAccountWindow = function createAccountWindow(csrf) {
  ReactDOM.render(React.createElement(AccountWindow, { csrf: csrf }), document.querySelector("#pageInfo"));
};

var setup = function setup(csrf) {
  // set global csrf Token
  csrfToken = csrf;

  var homeNav = document.querySelector("#homeNav");
  var gameNav = document.querySelector("#gameNav");
  var accountNav = document.querySelector("#accountNav");

  homeNav.addEventListener("click", function (e) {
    e.preventDefault();
    createHomeWindow(csrf);
    showAddCredit(csrf);
    return false;
  });

  gameNav.addEventListener("click", function (e) {
    e.preventDefault();
    createGameWindow(csrf);
    showGames(csrf);
    return false;
  });

  accountNav.addEventListener("click", function (e) {
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

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {

    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#domoMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
  $("#domoMessage").animate({ width: 'hide' }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
