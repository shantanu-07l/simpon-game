let gameSeq=[];
let userSeq=[];

let btns=["yellow","red","purple","green"];

let started=false;
let level=0;

let highScore=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("Game  is started");
        started=true;
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function (){
        btn.classList.remove("flash");
    },250);

}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function (){
        btn.classList.remove("userflash");
    },250);

}

function levelUp(){
    userSeq=[];//becuse user guess from first order this is game rule

    level++;
    h2.innerText=`Level ${level}`;
    //Random btn choose
    let randIdx=Math.floor(Math.random() *3);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    //console.log(randIdx);
    //console.log(randColor);
    //console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);

    gameFlash(randBtn);

}

function checkAns(idx){
    //console.log("curr level ",level);

    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            //levelUp();for dealy we write next line
            setTimeout(levelUp,1000);
        }
        //console.log("same value");
    }else{
        level--;//becuse to print score score is less than level
        let h3=document.querySelector("h3");
        let curlevel=level;
        if(curlevel>highScore){
            highScore=curlevel;
        }
        h3.innerHTML=`Highest Score is ${highScore}`;
        h2.innerHTML=`Game Over!Your Score was <B>${level}</b> <br>Press any Key to Start.`;//innerHTML because we use Tag
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";

        },150);
        reset();
    }
}

function btnPress(){
    //console.log(this);
    let btn=this;
    userFlash(btn);
    //id is onlly for to take color identify beacase in class btn also present not for styling 
    userColor=btn.getAttribute("id");
    //console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);//userSeq are 1step behind as copare to gameSeq

}
//.btn is class of ALL 4 Div when we click on div it trigger and callback is btnPress
let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}




