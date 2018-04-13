const handleError = (message) => {
  
  $("#errorBubble").animate({opacity: 1},400);
  document.querySelector("#errorBubble").style.display = "inline";
  $("#errorMessage").text(message);
};

const redirect = (response) => {
 $("#errorBubble").animate({opacity: 0},400);
  window.location = response.redirect;
};

const sendAjax = (type, action, data, success) => {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function(xhr, status, error){
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};