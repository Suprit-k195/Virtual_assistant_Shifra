let users = JSON.parse(localStorage.getItem("users")) || [];

const loginContainer = document.querySelector("#loginContainer");
const signupContainer = document.querySelector("#signupContainer");
const loginBtn = document.querySelector("#loginBtn");
const signupBtn = document.querySelector("#signupBtn");
const showSignup = document.querySelector("#showSignup");
const showLogin = document.querySelector("#showLogin");

const chatbotBody = document.querySelector("body");

function createAccount(username, password) {
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created successfully!");
}

function loginUser(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        alert(`Welcome ${username}`);
        loginContainer.style.display = "none";
        signupContainer.style.display = "none";
        showChatbotUI();
    } else {
        alert("Invalid credentials");
    }
}

function loginAdmin(username, password) {
    if (username === "admin" && password === "admin123") {
        alert("Welcome Admin");
        loginContainer.style.display = "none";
        signupContainer.style.display = "none";
        showChatbotUI(); // reuse same UI
    } else {
        alert("Access Denied");
    }
}

function showChatbotUI() {
    document.querySelector("#logo").style.display = "block";
    document.querySelector("h1").style.display = "block";
    document.querySelector("#btn").style.display = "flex";
}

let btn=document.querySelector("#btn")
let content=document.querySelector("#content")
let voice=document.querySelector("#voice")

function speak(text){
    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.rate=1
    text_speak.pitch=1
    text_speak.volume=1
    text_speak.lang="en-US"
    window.speechSynthesis.speak(text_speak)
}

function wishMe(){
    let day=new Date()
    let hours=day.getHours()
    if(hours>=0 && hours<12){
        speak("Good Morning Sir")
    }
    else if(hours>=12 && hours <16){
        speak("Good afternoon Sir")
    }else{
        speak("Good Evening Sir")
    }
}
window.addEventListener('load',()=>{
    wishMe()
})
let speechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition 
let recognition =new speechRecognition()
recognition.onresult=(event)=>{
    let currentIndex=event.resultIndex
    let transcript=event.results[currentIndex][0].transcript
    content.innerText=transcript
   takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click",()=>{
    recognition.start()
    voice.style.display="block"
    btn.style.display="none"
})
showSignup.addEventListener("click", () => {
    loginContainer.style.display = "none";
    signupContainer.style.display = "flex";
});

showLogin.addEventListener("click", () => {
    signupContainer.style.display = "none";
    loginContainer.style.display = "flex";
});

signupBtn.addEventListener("click", () => {
    const uname = document.querySelector("#signupUsername").value;
    const pass = document.querySelector("#signupPassword").value;
    if (uname && pass) {
        createAccount(uname, pass);
        signupContainer.style.display = "none";
        loginContainer.style.display = "flex";
    } else {
        alert("Please enter all fields");
    }
});

loginBtn.addEventListener("click", () => {
    const uname = document.querySelector("#loginUsername").value;
    const pass = document.querySelector("#loginPassword").value;
    const role = document.querySelector("#loginRole").value;

    if (role === "user") {
        loginUser(uname, pass);
    } else {
        loginAdmin(uname, pass);
    }
});
function takeCommand(message){
   voice.style.display="none"
    btn.style.display="flex"
    if(message.includes("hello")||message.includes("hey")){
        speak("hello, How can i help you?")
    }
    else if(message.includes("who are you")){
        speak("i am virtual assistant ,created by Naina and Suprit")
    }else if(message.includes("open youtube")){
        speak("opening youtube...")
        window.open("https://youtube.com/","_blank")
    }
    else if(message.includes("open google")){
        speak("opening google...")
        window.open("https://google.com/","_blank")
    }
    else if(message.includes("open facebook")){
        speak("opening facebook...")
        window.open("https://facebook.com/","_blank")
    }
    else if(message.includes("open instagram")){
        speak("opening instagram...")
        window.open("https://instagram.com/","_blank")
    }
    else if(message.includes("open calculator")){
        speak("opening calculator..")
        window.open("calculator://")
    }
    else if(message.includes("open whatsapp")){
        speak("opening whatsapp..")
        window.open("whatsapp://")
    }
    else if(message.includes("time")){
      let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
      speak(time)
    }
    else if(message.includes("date")){
        let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
        speak(date)
      }
    else{
        let finalText="this is what i found on internet regarding" + message.replace("shipra","") || message.replace("shifra","")
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message.replace("shipra","")}`,"_blank")
    }
}
