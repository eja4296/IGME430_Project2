// Global variables
let csrfToken;
let userCredit;
let userName;

// Handle adding user credit
const handleAddCredit = (e) => {
  e.preventDefault();
  
  $("#errorBubble").animate({opacity: 0},400);
  
  if($("#domoCreditUpdate").val() == ''){
    handleError("All fields are required");
    return false;
  }
  
  sendAjax('POST', $("#userCreditForm").attr("action"), $("#userCreditForm").serialize(), function() {
    loadUserData();
  });
  
  return false;
};

// Handle Flip Coin
const flipCoin = (e) => {
  e.preventDefault();
  
  //$("#errorBubble").animate({opacity: 0},400);
  
  
  if(userCredit <= 0){
    handleError("Out of Credits");
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
  
  document.querySelector("#flipCoinUpdate").value = addCredit;
  
  console.dir($("#flipCoinUpdate"))
  document.querySelector("#flipCoinResult").innerHTML = "Result: " + result;
  
  sendAjax('POST', $("#flipCoinForm").attr("action"), $("#flipCoinForm").serialize(), function() {
    loadUserData();
  });
  
  return false;
};

// Handle Changing Password
const handleChangePass= (e) => {
  e.preventDefault();
  
  $("#errorBubble").animate({opacity: 0},400);
  
  if($("#user").val() == '' || $("#pass").val() == '' || $("#newpass").val() == '' || $("#newpass2").val() == ''){
    handleError("All Fields Necessary");
    return false;
  }
  
  console.log($("input[name=_csrf]").val());
  
  sendAjax('POST', $("#changePassForm").attr("action"), $("#changePassForm").serialize(), redirect);
  
  return false;
};

const handleMessageUpdate = (e) => {
  e.preventDefault();
  
  $("#errorBubble").animate({opacity: 0},400);
  
  if($("#messageUsername").val() == '' || $("#messageGame").val() == '' || $("#messageMoney").val() == ''){
    handleError("All Fields Necessary");
    return false;
  }
  
  console.log($("input[name=_csrf]").val());
  
  sendAjax('POST', $("#createMessageForm").attr("action"), $("#createMessageForm").serialize(), function() {
    loadMessagesFromServer();
  });
  
  return false;
  
};


// Main Domo Forms
const CreditForm = (props) => {
  return(
    <div id="forms">

    <h2 className="formHead">Add Funds</h2>
    <form id="userCreditForm"
          onSubmit={handleAddCredit}
          name="userCreditForm"
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
    <CreditForm csrf={csrf} />,
    document.querySelector("#makeDomo")
  );
};

const Games = (props) => {
  return(
    <div id="games">

    <h2 className="formHead">Play Games</h2>
    
    <section className="game">
      <h2>Coin Flip</h2>
      <p>Flip a coin! If it lands on heads, win $1. If it lands on tails, lose $1.</p>
        
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



const Messages = (props) => {
  return(
    <div>

    <h2 className="formHead">Post Messages</h2>
     
    <form id="createMessageForm"
          onSubmit={handleMessageUpdate}
          name="createMessageForm"
          action="/createMessage"
          method="POST"
          className="messageForm"
      >
        
        <input type="hidden" name="name" value={userName} />
    
        <label htmlFor="game">Game Played: </label>
        <select id="messageGame" name="game">
          <option value="Coin Flip">Coin Flip</option>
          <option value="Roulette">Roulette</option>
          <option value="Blackjack 21">Blackjack 21</option>
          <option value="Texas hold 'em">Texas Hold 'em</option>
        </select>
        
        <label htmlFor="money">Money Won: </label>
        <input id="messageMoney" type="text" name="money" placeholder="Money Won"/>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="makeDomoSubmit" type="submit" value="Post Message" />
    </form>
    <section id="messages">
    </section>
    </div>
    
  );
};
// <input id="messageGame" type="text" name="game" placeholder="Game Played"/>

const showMessage = (csrf) => {
  ReactDOM.render(
    <Messages  csrf={csrf}/>,
    document.querySelector("#makeDomo")
  );
};

const AccountInfo = (props) => {
  return(
    
    <div id="account">

    <h2 className="formHead">Account Information</h2>
    <div id="accountInfo">
      <h3 >Your Name: <p className="userInformation">{props.user.username}</p></h3>
      <h3 >Your Credits: <p className="userInformation">${props.user.credit}</p></h3>
    </div>
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


const showAccountInfo = (csrf) => {

  
   sendAjax('GET', '/getUser', null, (data) => {
    ReactDOM.render(
      <AccountInfo csrf={csrf} user={data.user} />,
      document.querySelector("#makeDomo")
    );
  });
};


const MessageList = function(props) {
  if(props.messages.length === 0){
    return(
      <div className="messageList">
        <h3 className="emptyMessage">No Messages yet</h3>
      </div>
    );
  }
  
  const messageNodes = props.messages.map(function(message) {
    let trimmedDate = message.createdDate.substring(0, 10);
    return(
      <div key={message._id} className="newMessage">
        <img src="/assets/img/777.png" alt="777" className="messageImage" />
        <h3 className="messageUsername">{message.name} won ${message.money} from {message.game}!</h3>
        <p className="createdDate">{trimmedDate}</p>
      </div>
    );
  });
  
  return(
    <div className="messageList">
      {messageNodes}
    </div>
  );
};

const UserInfo = function(props){
  userCredit = props.user.credit;
  userName = props.user.username;
  return(
    <div className="userStuff">
      <h1 id="welcome">Welcome: <p className="userInformation">{props.user.username}</p></h1>
      <h1 id="credits">Credits: <p className="userInformation">${props.user.credit}</p></h1>
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

const loadMessagesFromServer = () => {
  sendAjax('GET', '/getMessages', null, (data) => {
    ReactDOM.render(
      <MessageList messages={data.messages} />,
      document.querySelector("#messages")
    );
  });
};

const HomeWindow = (props) => {
  return(
    <div>
    <h1 className="pageTitle">Home</h1>
    </div>
  );
};

const GameWindow = (props) => {
  return(
    <div>
    <h1 className="pageTitle">Games</h1>
    </div>
  );
};

const MessageWindow = (props) => {
  return(
    <div>
    <h1 className="pageTitle">Messages</h1>
    </div>
  );
};

const AccountWindow = (props) => {
  return(
    <div>
    <h1 className="pageTitle">Account</h1>
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

const createMessageWindow = (csrf) =>{
  ReactDOM.render(
    <MessageWindow csrf={csrf} />,
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
  const messageNav = document.querySelector("#messageNav");
  
  
  homeNav.addEventListener("click", (e) =>{
    e.preventDefault();
    createHomeWindow(csrf);
    
    showAddCredit(csrf);
    document.querySelector("#errorBubble").style.opacity = 0;
    return false;
  });
  
  gameNav.addEventListener("click", (e) =>{
    e.preventDefault();
    createGameWindow(csrf);
    showGames(csrf);
    document.querySelector("#errorBubble").style.opacity = 0;
    return false;
  });
  
  accountNav.addEventListener("click", (e) =>{
    e.preventDefault();
    createAccountWindow(csrf);
    showAccountInfo(csrf);
    document.querySelector("#errorBubble").style.opacity = 0;
    return false;
  });
  
  messageNav.addEventListener("click", (e) =>{
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

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {

    setup(result.csrfToken);
    
  });
};

$(document).ready(function() {
  getToken();
});