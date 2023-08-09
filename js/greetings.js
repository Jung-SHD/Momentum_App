const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";//일반적으로 string만 포함된 변수는 대문자로 표기.
const USERNAME_KEY = "username";

function onLoginSubmit(event){
    //console.dir(loginInput);//dir : 내부를 보여줌.
    event.preventDefault(); //어떤 event의 기본 행동이든지 발생되지 않도록 막는 것
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    paintGreetings(username);
    
}

function paintGreetings(username) {
    greeting.innerText = `Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

//loginForm.addEventListener("submit", onLoginSubmit);
//모든 EventListener function의 첫번째 argument는 항상 방금 일어난 일의 정보를 갖고있다.

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  paintGreetings(savedUsername);
}
