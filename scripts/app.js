

// Select All Elements
const start = document.getElementById ("start");
const quiz = document.getElementById ("quiz");
const question = document.getElementById ("question");
const choiceA = document.getElementById ("A");
const choiceB = document.getElementById ("B");
const choiceC = document.getElementById ("C");
const choiceD = document.getElementById ("D");
const counter = document.getElementById ("counter");
const timeGauge = document.getElementById ("timeGauge");
const progress = document.getElementById ("progress");
const scoreDiv = document.getElementById ("scoreContainer");


//Create Quastions
let questions =[
    {
        question : " 1- Which is the first step in the program development cycle ?",
        choiceA : "A- Design a program",
        choiceB : "B- Analyze the problem",
        choiceC : "C- Code the program and review the results",
        choiceD : "D- Test the program",
        correct : "B"
    },
    {
        question : " 2- Which of the following is not a control structure ?",	
        choiceA : "A- Sequence",
        choiceB : "B- Selection",
        choiceC : "C- Syntax",
        choiceD : "D- Repetition",
        correct : "C"
    },
    {
        question : " 3- Which of the following is NOT one of the primary JavaScript data types ?",	
        choiceA : "A- Float",
        choiceB : "B- Numeric",
        choiceC : "C- Boolean",
        choiceD : "D- String",
        correct : "A"
    },
    {
        question : " 4- Which type of data type can have only one of two possible values ?",	
        choiceA : "A- Float",
        choiceB : "B- Numeric",
        choiceC : "C- Boolean",
        choiceD : "D- String",
        correct : "C"
    },
    {
        question : " 5- Which of the following is not an acceptable variable name ?",	
        choiceA : "A- one_name",
        choiceB : "B- name_One",
        choiceC : "C- 1_Name",
        choiceD : "D- theFirstName",
        correct : "C"
    },
    {
        question : " 6- Which of the following is not an acceptable variable name ?",	
        choiceA : "A- my Friend",
        choiceB : "B- your_Friend",
        choiceC : "C- We_Are_All_Friends",
        choiceD : "D- all of the above are acceptable variable names",
        correct : "A"
    },
    {
        question : " 7- If the variable hours = 10, what is the value of the variable salary after the following instruction has been executed:  salary = hours * 8 ?",	
        choiceA : "A- 10",
        choiceB : "B- 8",
        choiceC : "C- 80",
        choiceD : "D- cannot tell from the information given",
        correct : "C"
    },
    {
        question : " 8- Evaluate 8 % 7 ?",	
        choiceA : "A- 8",
        choiceB : "B- 7",
        choiceC : "C- 1",
        choiceD : "D- 56",
        correct : "C"
    },
    {
        question : " 9- Which is equivalent to (X > 5) given that X is a numeric variable. ? ",	
        choiceA : "A- (X < 5)",
        choiceB : "B- !(X >= 5)",
        choiceC : "C- !(X <= 5)",
        choiceD : "D- !(X < 5)",
        correct : "C"
    },
    {
        question : " 10- Which of the following describes a JavaScript object ?",	
        choiceA : "A- anything you can click on",
        choiceB : "B- anything that describes something you can click on",
        choiceC : "C- anything something you can click on can do",
        choiceD : "D- any HTML tag pair",
        correct : "D"
    },
];

// create some variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render
function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer
function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "assets/img/5.png" :
              (scorePerCent >= 60) ? "assets/img/4.png" :
              (scorePerCent >= 40) ? "assets/img/3.png" :
              (scorePerCent >= 20) ? "assets/img/2.png" :
              "assets/img/1.png";

    scoreDiv.innerHTML = "<img src="+ img +">";         
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}

