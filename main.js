//declaring element
const username = document.getElementById("username");
const registerForm = document.getElementById("registerform");
const btnLogout = document.getElementById("btnLogout");
const notif = document.getElementById("notif");
const app = document.getElementById("app");
const usernameMatch = document.getElementById("usernameMatch");
const footer = document.getElementById("footer");
const textFooter = document.getElementById("textFooter");
const copyright = document.getElementById("copyright");
const expUser = document.getElementById("expUser")


let rounds = 0      //jumlah ronde
let userScore = 0   
let botScore = 0
let exp = 0
let level = 0

onload = function () {
    const name = sessionStorage.getItem('nama')

    if( name && name != ""){  //ada value
        textFooter.style.display ="none"
        copyright.style.display ="none"
        footer.style.display  = "flex"
        registerForm.style.display = "none"
    }else {                   //value kosong
        registerForm.style.display = "block"
        btnLogout.style.display = "none"
        footer.style.display  = "none"
    }
}

function register(){
    usernameMatch.innerHTML=username.value;
    if(username.value == ""){       //value register kosong
        alert("failed register");
        location.reload();
    }else{
        console.log(username.value)
        sessionStorage.setItem('nama', username.value)
        registerForm.style.display = "none"
        btnLogout.style.display = "block"
        app.style.display = "block";
        footer.style.display = "flex";
        alert("successfully register")
        notif.innerHTML = `hello ${username.value} Let's play!!`
        profilName.innerHTML = username.value
    }
}
function logout(){
    sessionStorage.removeItem('nama')
    registerForm.style.display = "block"
    location.reload();
}

function profile(){
    profileUser.style.display = "flex"
}

class Strat{
    constructor(){
        this.playerName = username.value
        this.botName = "MaulBot"
        this.playerOption;
        this.botOption;
        this.winner = ""
    }

    get getBotOption()  {
        return this.botOption;
    }

    set setBotOption(option) {
        this.botOption = option; 
    }

    get getPlayerOption() {
        return this.playerOption;
    }

    set setPlayerOption(option) {
        this.playerOption = option;
    }

    botBrain() {
        const option = ["🖐", "✌", "✊"];
        const bot = option[Math.floor(Math.random() * option.length)];
        console.log(`bot memilih: ${bot}`);
        return bot;
    }

    winCalcualtion() {
        if (this.botOption == "🖐" && this.playerOption == "✌") {
            exp += 5
            userScore++
            return this.winner = this.playerName
        } else if (this.botOption == "🖐" && this.playerOption == "✊") {
            botScore++
            return this.winner = this.botName;
        } else if (this.botOption == "✌" && this.playerOption == "🖐") {
            botScore++
            return this.winner = this.botName;
        } else if (this.botOption == "✌" && this.playerOption == "✊") {
            exp += 5
            userScore++
            return this.winner = this.playerName
        } else if (this.botOption == "✊" && this.playerOption == "🖐") {
            exp += 5
            userScore++
            return this.winner = this.playerName
        } else if (this.botOption == "✊" && this.playerOption == "✌") {
            botScore++
            return this.winner = this.botName;
        } else {
            return this.winner = "Draw 😓"
        }
    }
    

    matchResult() {
        if(this.winner != "Draw 😓"){
            return `${this.winner} Win!!`
        }else{
            return `${this.winner}`
        }
    }
    
    
}

const result = document.getElementById("result");
const desc = document.getElementById("desc");
const botResult = document.getElementById("botResult");
const round = document.getElementById("round");
const pointUser = document.getElementById("pointUser");
const pointBot = document.getElementById("pointBot");



function restart(){
    result.textContent = "...."
    desc.textContent = "...."
    botResult.textContent = "...."
    round.innerHTML = rounds = 0;
    pointUser.innerHTML = userScore = 0;
    pointBot.innerHTML = botScore = 0;
}

function pickOption(params) {
    const strat = new Strat();
    strat.setPlayerOption = params;
    strat.setBotOption = strat.botBrain();
    strat.winCalcualtion();
    rounds++


    result.textContent = "...."
    desc.textContent = "...."
    botResult.textContent = "...."
    round.innerHTML = rounds;
    expUser.innerHTML = `exp : ${exp}`
    
    
    setTimeout (() => {
        desc.textContent = strat.playerOption;
        botResult.textContent = strat.botOption;
        pointUser.innerHTML = userScore;
        pointBot.innerHTML = botScore;
        expUser.innerHTML = `exp : ${exp}`
        result.textContent = strat.matchResult();
    }, 1500);
}