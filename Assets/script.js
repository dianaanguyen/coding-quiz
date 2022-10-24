var startButton = $("#styled-button");
var mainPage = $("#main-page");
var answerChoices = $("#answer-choices");
var footer = $("#footer");
var timeLeft = $("#time-left");
var totalTime = 0;
var timePenalized = 5;
var secondsLeft = 60; //start timer at 60 seconds
var questionNumber = 1; 
var correctAnswer; //stores correct answer
var userChoice; 
var points = 0; //starts with zero pts
var initials; //will save user's initals

//questions that will be asked
var questions = {
1 : {
    "Question": "Where is the correct place to insert JavaScript?",
    "Answers": ["The <body> section", "The <head> section", "Both the <head> section and the <body> section are correct", "None of the above"],
    "Correct": "Both the <head> section and the <body> section are correct"
},
2: {
    "Question": "Inside which element do we put the JavaScript src?",
    "Answers": ["<javascript", "<js>", "<script>", "<scripting>"],
    "Correct": "<script>"
},
3: {
    "Question": "How do you call a function?",
    "Answers": ["call myFunction()", "myFunction()", "call function myFunction()", "Call.myFunction()"],
    "Correct": "myFunction()"
},
4: {
    "Question": "How do you write 'Hello World' in an alert box?",
    "Answers": ["alert('Hello World')", "msgBox('Hello World')", "alertBox='Hello World'", "alertbox('Hello World')"],
    "Correct": "alert('Hello World')"
},
5: {
    "Question": "How you write comments out in JavaScript?",
    "Answers": ["//", "<!-- -->", "comment[]", "..."],
    "Correct": "//"
},
6: {
    "Question": "How do you write an IF statement in JavaScript?",
    "Answers": ["if (i != 5);", "if i =! 5 then", "if i <> 5", "if (i<> 5);"],
    "Correct": "if (i != 5);"
},
7: {
    "Question": "Alert(message), close() abd reset () are JavaScript:",
    "Answers": ["Objects", "Methods", "Properties", "Commands"],
    "Correct": "Methods"
}
};

function startTimer() { //start the timer
    if (totalTime === 0) {
        totalTime= setInterval(function() {
            secondsLeft--;
            timeLeft.text(secondsLeft);
            if (secondsLeft === 0) {
                clearInterval(totalTime);
                finishedGame(); //displays finished screen
            }
        }, 1000) //1000ms=1 second
    }
    showQuestions();
};

function showQuestions () { //show questions
    if (questionNumber <= 7){
        mainPage.html("");
        answerChoices.html("") //clear answer choices
        let writeQuestion = questions[questionNumber].Q;
        let h1 = $("<h1>");
        h1.addClass("question")
        h1.text (writeQuestion);
        correctAnswer = questions[questionNumber].Correct; //stores correct answer

        questions[questionNumber].Answers.forEach(function(each) {
            let answerButton = $("<button>");
            answerButton.text(each);
            answerChoices.append(answerButton); //adds button after question
        });
        mainPage.append(h1); //adds questions to html
        answerChoices.on("click", function(e) {
            $(this).off("click");
            let target = e.target;
            userChoice = target.textContent; 
            compareAnswers(userChoice, correctAnswer);
        });
    } else {
        clearInterval(totalTime); //stops timer
        timeLeft.text("0"); //sets timer back to 0
        finishedGame(points);
    }
};

function compareAnswers(userChoice, correctAnswer) {
    questionNumber++;
    if (userChoice === correctAnswer) {
        let p = $("<p>");
        p.text("Correct!");
        answerChoices.append(p);
        secondsLeft -= timePenalized;
    }
    setTimeout(function () {
    
    showQuestions();
    }, 1000);
};

function finishedGame(points) {
    mainPage.html("");
    answerChoices.html("");
    let resultsTitle = mainPage.html("<h1>RESULTS</h1>");
    resultsTitle.attr("class", "results-title"); //to style
    let p = $("<p>");
    p.text('You scored: ${points} points out of 7.');
    let p2 = $("<p>");
    p2.text("Enter you intitals here if you would like to save your score:");
    let input = $("<input>");
    input.attr("id", "input-text");
    let submitButton = $("<button>");
    submitButton.attr("id", "submitInitialsButton");
    submitButton.text("Submit");
    resultsTitle.append(p);
    resultsTitle.append(p2);
    resultsTitle.append(input);
    resultsTitle.append(submitButton);
    footer.html(""); //clears footer
    footer.html("<a href = 'index.html'>PLAY GAME AGAIN</a>"); //gives option to play again

    submitButton.on("click", function() {
        initials = $("#input-text").val();
        if (initials === null) {
            console.log ("Nothing was typed in.");
        } else {
            var scoreObject = {
                "initials": initialsl,
                "score": points
            }
        }
        let allScores = localStorage.getItem("allScores"); //retrieves scores from local storage
        if (allScores === null) {
            allScores = [];

        } else {
            allScores = JSON.parse(allScores);
        }
        allScores.push(scoreObject);
        let newScore = JSON.stringify(allScores);
        localStorage.setItem("allScores", newScore);
        window.location.replace("highScores.html"); 
    })
};

startButton.on("click", startTimer); //starts timer when button is clicked