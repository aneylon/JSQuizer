var currentQuestion = 0;
var questionsAnswered = 0;
var isFinished = false;
var questions = "";
var loadedQuestions = "";
var userAnswers = [];
/*
var userAnswers = new Array(questions.length);
for ( var i = 0; i < questions.length; i++)
	userAnswers[i] = null;
*/
window.onload = function (){
	
	document.getElementById("Next").onclick = function() {
		ShowNextQuestion();
	}

	document.getElementById("Prev").onclick = function() {
		ShowPreviousQuestion();
	}
    document.getElementById("answerOne").onclick = function(){
		CheckAnswer(1,"answerOne");
	}

	document.getElementById("answerTwo").onclick = function(){
		CheckAnswer(2,"answerTwo");
	}

	document.getElementById("answerThree").onclick = function(){
		CheckAnswer(3,"answerThree");
	}

	document.getElementById("answerFour").onclick = function(){
		CheckAnswer(4,"answerFour");
	}

	document.getElementById("answerOne").onmouseenter = function(){
		if(!IsAnswered(currentQuestion))
			UpdateBGColorAndTextColor("answerOne","darkgrey","white");
	}

	document.getElementById("answerOne").onmouseleave = function(){
		if(!IsAnswered(currentQuestion))
			UpdateBGColorAndTextColor("answerOne","lightgrey","black");
	}
	
	document.getElementById("startButton").onclick = function() {
		document.getElementById("startPage").style.display = "none";
		document.getElementById("finishPage").style.display = "none";
		document.getElementById("quizPage").style.display = "inherit";
		
		StartNewQuiz();
	}

	document.getElementById("backToStartButton").onclick = function() {
		document.getElementById("quizPage").style.display = "none";
		document.getElementById("finishPage").style.display = "none";
		document.getElementById("startPage").style.display = "inherit";
		
		StartNewQuiz();
	}

	document.getElementById("finishedButton").onclick = function() {
		document.getElementById("startPage").style.display = "none";
		document.getElementById("quizPage").style.display = "none";
		document.getElementById("finishPage").style.display = "inherit";
		
		ShowFinishedPage();
	}
}

function StartNewQuiz(){
    // clear / reset all vars.
    questions = "";
    currentQuestion = 0;
    questionsAnswered = 0;
    isFinished = false;
    $("#finishedData").empty();
    var quizToLoad = document.getElementById("QuizPicker").value;
	GetJSON(quizToLoad);
}

function ShowFinishedPage(){
    if(!isFinished){
        isFinished = true;

		for (var i = 0; i < questions.length; i++ ){
	        var str = "<div id='questionWrapper'><p class='answers'>Question " + ( i + 1 ) + " : " + questions[i].question + "</p>\n";
	        var userAnswer = userAnswers[i];
	        console.log("users answer is : " + userAnswer);
	        var rightAnswer = questions[i].correctAnswer;
	        console.log("correct answer is : " + rightAnswer);
	        var userAnswerText = "Not Answered";
	        if ( userAnswer != undefined || userAnswer != null || userAnswer == -1 ) {
	        	userAnswerText = questions[i].answers[userAnswers[i]-1];
	        }
	        
	        if ( userAnswer == rightAnswer ) {
	        	str += "<p class='answers correct'>User Answer : " + userAnswerText +"</p>\n";
	        } else {
	        	str += "<p class='answers wrong'>User Answer : " + userAnswerText +"</p>\n";
		        str += "<p class='answers correct'>Correct Answer : " + questions[i].answers[questions[i].correctAnswer] + "</p>";	
	        }
	        str += "</div>";
	        $("#finishedData").append(str);
		}
    }
}

function CheckAnswer(answerNumber,elementID) {
	if (!IsAnswered(currentQuestion)){
		if ( ( answerNumber - 1 ) == questions[currentQuestion].correctAnswer ) {
			UpdateBGColorAndTextColor(elementID,"limegreen","white");
		} else {
			UpdateBGColorAndTextColor(elementID,"orangered","white");
		}
		SetAnswer(currentQuestion,answerNumber);
		questionsAnswered++;
	}
	DisplayQuestionsAnswered();
}

function IsAnswered(questionNumber) {
	return userAnswers[questionNumber];
}

function SetAnswer(questionNumber,answer) {
	userAnswers[questionNumber] = answer;
}

function RandomizeQuestions() {
	for ( var i = 0 ; i < questions.length ; i++ ) {
		var rand = Math.floor(Math.random() * questions.length);
		var temp = questions[rand];
		questions[rand] = questions[i];
		questions[i] = temp;
	}	
}

function DisplayQuestion(questionNumber) {
	if(IsAnswered(currentQuestion)){
		ShowSelectedAnswer();
	}
	SetTextByID("currentQuestionNumber",("question # " + (currentQuestion + 1)));
	SetTextByID("currentQuestion",questions[questionNumber].question);
	SetTextByID("answerOne",questions[questionNumber].answers[0]);
	SetTextByID("answerTwo",questions[questionNumber].answers[1]);
	SetTextByID("answerThree",questions[questionNumber].answers[2]);
	SetTextByID("answerFour",questions[questionNumber].answers[3]);
	
	DisplayQuestionsAnswered();
}

function ShowSelectedAnswer(){
	var answerID;
	if ( userAnswers[currentQuestion] == 1) {
		answerID = "answerOne";
	} else if ( userAnswers[currentQuestion] == 2) {
		answerID = "answerTwo";
	} else if ( userAnswers[currentQuestion] == 3) {
		answerID = "answerThree";
	} else if ( userAnswers[currentQuestion] == 4) {
		answerID = "answerFour";
	}

	if ( ( userAnswers[currentQuestion] - 1 ) == questions[currentQuestion].correctAnswer)
		UpdateBGColorAndTextColor(answerID,"limegreen","white");
	else
		UpdateBGColorAndTextColor(answerID,"orangered","white");
}

function SetTextByID(tagID,text){
	document.getElementById(tagID).innerHTML = text;
}

function ShowNextQuestion() {
	if (currentQuestion < questions.length -1){
		currentQuestion++;		
	} else {
		currentQuestion = 0;
	}
	ResetBackgrounds();
	DisplayQuestion(currentQuestion);
}

function ShowPreviousQuestion() {
	if ( currentQuestion > 0 ) {
		currentQuestion--;
	} else {
		currentQuestion = questions.length -1;
	}
	ResetBackgrounds();
	DisplayQuestion(currentQuestion);
}

function ResetBackgrounds(){
	UpdateBGColorAndTextColor("answerOne","lightgrey","black");
	UpdateBGColorAndTextColor("answerTwo","lightgrey","black");
	UpdateBGColorAndTextColor("answerThree","lightgrey","black");
	UpdateBGColorAndTextColor("answerFour","lightgrey","black");
}

function UpdateBGColorAndTextColor(ElementID,BGColor,TextColor){
	document.getElementById(ElementID).style.backgroundColor = BGColor;
	document.getElementById(ElementID).style.color = TextColor;
}

function DisplayQuestionsAnswered(){
    var bla = questionsAnswered + " of " + questions.length + " answered.";
    SetTextByID("numberFinished",bla);
    SetTextByID("numberFinishedFinished",bla);
}

function GetJSON(fileName){
	fileName = "./json/"+fileName;
	$.getJSON ( fileName, function ( data ) {
		loadedQuestions = data.questions;
		
		questions = loadedQuestions;
		RandomizeQuestions();
		DisplayQuestion(0);
	    userAnswers = new Array(questions.length);
	    
	    for ( var i = 0; i < questions.length; i++)
	    	userAnswers[i] = null;
	    	
	    DisplayQuestionsAnswered();
	    ResetBackgrounds();
	});	
}

// disable start and finish buttons when appropriate.
// only allow single submission.

// animate transitions between questions
// option to change questions but not see if correct
// store username and answers
// cookies to remember and greet
// timer

// extra credit - lessons
// extra credit - study mode
// backbone
// meteor
// node
// handlebars
