"use strict";

// Global variables
var csrfToken = void 0;
var userCredit = void 0;
var userName = void 0;

// Handle adding user credit
var handleAddCredit = function handleAddCredit(e) {
  e.preventDefault();

  $("#errorBubble").animate({ opacity: 0 }, 400);

  if ($("#domoCreditUpdate").val() == '') {
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST', $("#userCreditForm").attr("action"), $("#userCreditForm").serialize(), function () {
    loadUserData();
  });

  return false;
};

// Handle Flip Coin
var flipCoin = function flipCoin(e) {
  e.preventDefault();

  //$("#errorBubble").animate({opacity: 0},400);


  if (userCredit <= 0) {
    handleError("Out of Credits");
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

  document.querySelector("#flipCoinUpdate").value = addCredit;

  console.dir($("#flipCoinUpdate"));
  document.querySelector("#flipCoinResult").innerHTML = "Result: " + result;

  sendAjax('POST', $("#flipCoinForm").attr("action"), $("#flipCoinForm").serialize(), function () {
    loadUserData();
  });

  return false;
};

// Handle Changing Password
var handleChangePass = function handleChangePass(e) {
  e.preventDefault();

  $("#errorBubble").animate({ opacity: 0 }, 400);

  if ($("#user").val() == '' || $("#pass").val() == '' || $("#newpass").val() == '' || $("#newpass2").val() == '') {
    handleError("All Fields Necessary");
    return false;
  }

  console.log($("input[name=_csrf]").val());

  sendAjax('POST', $("#changePassForm").attr("action"), $("#changePassForm").serialize(), redirect);

  return false;
};

var handleMessageUpdate = function handleMessageUpdate(e) {
  e.preventDefault();

  $("#errorBubble").animate({ opacity: 0 }, 400);

  if ($("#messageUsername").val() == '' || $("#messageGame").val() == '' || $("#messageMoney").val() == '') {
    handleError("All Fields Necessary");
    return false;
  }

  console.log($("input[name=_csrf]").val());

  sendAjax('POST', $("#createMessageForm").attr("action"), $("#createMessageForm").serialize(), function () {
    loadMessagesFromServer();
  });

  return false;
};

// Main Domo Forms
var CreditForm = function CreditForm(props) {
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
      { id: "userCreditForm",
        onSubmit: handleAddCredit,
        name: "userCreditForm",
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
  ReactDOM.render(React.createElement(CreditForm, { csrf: csrf }), document.querySelector("#makeDomo"));
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
        "h2",
        null,
        "Coin Flip"
      ),
      React.createElement(
        "p",
        null,
        "Flip a coin! If it lands on heads, win $1. If it lands on tails, lose $1."
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

var Messages = function Messages(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h2",
      { className: "formHead" },
      "Post Messages"
    ),
    React.createElement(
      "form",
      { id: "createMessageForm",
        onSubmit: handleMessageUpdate,
        name: "createMessageForm",
        action: "/createMessage",
        method: "POST",
        className: "messageForm"
      },
      React.createElement("input", { type: "hidden", name: "name", value: userName }),
      React.createElement(
        "label",
        { htmlFor: "game" },
        "Game Played: "
      ),
      React.createElement(
        "select",
        { id: "messageGame", name: "game" },
        React.createElement(
          "option",
          { value: "Coin Flip" },
          "Coin Flip"
        ),
        React.createElement(
          "option",
          { value: "Roulette" },
          "Roulette"
        ),
        React.createElement(
          "option",
          { value: "Blackjack 21" },
          "Blackjack 21"
        ),
        React.createElement(
          "option",
          { value: "Texas hold 'em" },
          "Texas Hold 'em"
        )
      ),
      React.createElement(
        "label",
        { htmlFor: "money" },
        "Money Won: "
      ),
      React.createElement("input", { id: "messageMoney", type: "text", name: "money", placeholder: "Money Won" }),
      React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
      React.createElement("input", { className: "makeDomoSubmit", type: "submit", value: "Post Message" })
    ),
    React.createElement("section", { id: "messages" })
  );
};
// <input id="messageGame" type="text" name="game" placeholder="Game Played"/>

var showMessage = function showMessage(csrf) {
  ReactDOM.render(React.createElement(Messages, { csrf: csrf }), document.querySelector("#makeDomo"));
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
      "div",
      { id: "accountInfo" },
      React.createElement(
        "h3",
        null,
        "Your Name: ",
        React.createElement(
          "p",
          { className: "userInformation" },
          props.user.username
        )
      ),
      React.createElement(
        "h3",
        null,
        "Your Credits: ",
        React.createElement(
          "p",
          { className: "userInformation" },
          "$",
          props.user.credit
        )
      )
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

var showAccountInfo = function showAccountInfo(csrf) {

  sendAjax('GET', '/getUser', null, function (data) {
    ReactDOM.render(React.createElement(AccountInfo, { csrf: csrf, user: data.user }), document.querySelector("#makeDomo"));
  });
};

var MessageList = function MessageList(props) {
  if (props.messages.length === 0) {
    return React.createElement(
      "div",
      { className: "messageList" },
      React.createElement(
        "h3",
        { className: "emptyMessage" },
        "No Messages yet"
      )
    );
  }

  var messageNodes = props.messages.map(function (message) {
    var trimmedDate = message.createdDate.substring(0, 10);
    return React.createElement(
      "div",
      { key: message._id, className: "newMessage" },
      React.createElement("img", { src: "/assets/img/777.png", alt: "777", className: "messageImage" }),
      React.createElement(
        "h3",
        { className: "messageUsername" },
        message.name,
        " won $",
        message.money,
        " from ",
        message.game,
        "!"
      ),
      React.createElement(
        "p",
        { className: "createdDate" },
        trimmedDate
      )
    );
  });

  return React.createElement(
    "div",
    { className: "messageList" },
    messageNodes
  );
};

var UserInfo = function UserInfo(props) {
  userCredit = props.user.credit;
  userName = props.user.username;
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
      "Credits: ",
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

var loadMessagesFromServer = function loadMessagesFromServer() {
  sendAjax('GET', '/getMessages', null, function (data) {
    ReactDOM.render(React.createElement(MessageList, { messages: data.messages }), document.querySelector("#messages"));
  });
};

var HomeWindow = function HomeWindow(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      { className: "pageTitle" },
      "Home"
    )
  );
};

var GameWindow = function GameWindow(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      { className: "pageTitle" },
      "Games"
    )
  );
};

var MessageWindow = function MessageWindow(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      { className: "pageTitle" },
      "Messages"
    )
  );
};

var AccountWindow = function AccountWindow(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      { className: "pageTitle" },
      "Account"
    )
  );
};

var createHomeWindow = function createHomeWindow(csrf) {
  ReactDOM.render(React.createElement(HomeWindow, { csrf: csrf }), document.querySelector("#pageInfo"));
};

var createGameWindow = function createGameWindow(csrf) {
  ReactDOM.render(React.createElement(GameWindow, { csrf: csrf }), document.querySelector("#pageInfo"));
};

var createMessageWindow = function createMessageWindow(csrf) {
  ReactDOM.render(React.createElement(MessageWindow, { csrf: csrf }), document.querySelector("#pageInfo"));
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
  var messageNav = document.querySelector("#messageNav");

  homeNav.addEventListener("click", function (e) {
    e.preventDefault();
    createHomeWindow(csrf);

    showAddCredit(csrf);
    document.querySelector("#errorBubble").style.opacity = 0;
    return false;
  });

  gameNav.addEventListener("click", function (e) {
    e.preventDefault();
    createGameWindow(csrf);
    showGames(csrf);
    document.querySelector("#errorBubble").style.opacity = 0;
    return false;
  });

  accountNav.addEventListener("click", function (e) {
    e.preventDefault();
    createAccountWindow(csrf);
    showAccountInfo(csrf);
    document.querySelector("#errorBubble").style.opacity = 0;
    return false;
  });

  messageNav.addEventListener("click", function (e) {
    e.preventDefault();
    createMessageWindow(csrf);
    showMessage(csrf);
    loadMessagesFromServer();
    document.querySelector("#errorBubble").style.opacity = 0;
    return false;
  });

  showAddCredit(csrf);

  createHomeWindow(csrf);

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

  $("#errorBubble").animate({ opacity: 1 }, 400);
  $("#errorMessage").text(message);
};

var redirect = function redirect(response) {
  $("#errorBubble").animate({ opacity: 0 }, 400);
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
