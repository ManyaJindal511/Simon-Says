let gameseq=[];
let userseq=[];
let btns=["yellow","red","purple","green"]
let maxscore=0;

let started=false;
let level=0;
let h2=document.querySelector("h2");
document.addEventListener("keypress",function(){
    if(started==false){
        console.log("Game Started");
    }
    started=true;
    levelUp();
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash")
    },250);
}

function levelUp(){
    userseq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let randidx=Math.floor(Math.random()*3);
    let randcolor=btns[randidx];
    let randbtn=document.querySelector(`.${randcolor}`);
    gameseq.push(randcolor);
    console.log(gameseq);
    gameFlash(randbtn);
}

function checkAns(idx){
    if(userseq[idx]===gameseq[idx]){
        if(userseq.length==gameseq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        maxscore=Math.max(maxscore,level);
        h2.innerHTML=`Game Over! Your score was <b>${level}</b> <br> Press any key to start.<br>Your max score was <b>${maxscore}</b>`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}

function btnpress(){
    let btn=this;
    userFlash(btn);
    usercolor=btn.getAttribute("id");
    console.log(usercolor);
    userseq.push(usercolor);
    checkAns(userseq.length-1);
}

let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnpress);
}

function reset(){
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
}