"use strict";

// Global csrfToken
var csrfToken = void 0;

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

  if ($("#domoNameUpdate").val() == '' || $("#domoAgeUpdate").val() == '' || $("#domoCreditUpdate").val() == '') {
    handleError("RAWR! All fields are required");
    return false;
  }

  sendAjax('POST', $("#domoUpdateForm").attr("action"), $("#domoUpdateForm").serialize(), function () {
    loadDomosFromServer();
  });

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
      "Create Domo"
    ),
    React.createElement(
      "form",
      { id: "domoForm",
        onSubmit: handleDomo,
        name: "domoForm",
        action: "/maker",
        method: "POST",
        className: "domoForm"
      },
      React.createElement(
        "label",
        { htmlFor: "name" },
        "Name: "
      ),
      React.createElement("input", { id: "domoName", type: "text", name: "name", placeholder: "Domo Name" }),
      React.createElement(
        "label",
        { htmlFor: "age" },
        "Age: "
      ),
      React.createElement("input", { id: "domoAge", type: "text", name: "age", placeholder: "Domo Age" }),
      React.createElement(
        "label",
        { htmlFor: "credit" },
        "Credit: "
      ),
      React.createElement("input", { id: "domoCredit", type: "text", name: "credit", placeholder: "Domo Credit" }),
      React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
      React.createElement("input", { className: "makeDomoSubmit", type: "submit", value: "Make Domo" })
    ),
    React.createElement(
      "h2",
      { className: "formHead" },
      "Update Domo"
    ),
    React.createElement(
      "form",
      { id: "domoUpdateForm",
        onSubmit: handleDomoUpdate,
        name: "domoUpdateForm",
        action: "/updateDomo",
        method: "POST",
        className: "domoForm"
      },
      React.createElement(
        "label",
        { htmlFor: "name" },
        "Name: "
      ),
      React.createElement("input", { id: "domoNameUpdate", type: "text", name: "name", placeholder: "Domo Name" }),
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

var loadDomosFromServer = function loadDomosFromServer() {
  sendAjax('GET', '/getDomos', null, function (data) {
    ReactDOM.render(React.createElement(DomoList, { domos: data.domos }), document.querySelector("#domos"));
  });
};

var setup = function setup(csrf) {
  // set global csrf Token
  csrfToken = csrf;

  ReactDOM.render(React.createElement(DomoForm, { csrf: csrf }), document.querySelector("#makeDomo"));

  ReactDOM.render(React.createElement(DomoList, { domos: [] }), document.querySelector("#domos"));

  loadDomosFromServer();
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
