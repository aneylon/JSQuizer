var currentQuestion = 0;
var questionsAnswered = 0;
var isFinished = false;
var questions = [
	{"question":"what color is a banana?","answers":["yellow","orange","red","purple"],"correctAnswer":0},
	{"question":"one of these things doesn't belong.","answers":["pear","grapes","apple","banana"],"correctAnswer":1},
	{"question":"five plus six is.","answers":["nine","ten","eleven","twelve"],"correctAnswer":2},
	{"question":"_____ are dangerous.","answers":["friends","earth worms","kittens","bears"],"correctAnswer":3}
];

var userAnswers = new Array(questions.length);
for ( var i = 0; i < questions.length; i++)
	userAnswers[i] = null;

window.onload = function (){
	RandomizeQuestions();
	DisplayQuestion(0);
	
	document.getElementById("Next").onclick = function() {
		ShowNextQuestion();
	}

	document.getElementById("Prev").onclick = function() {
		ShowPreviousQuestion();
	}
/*
	document.getElementById("Finish").onclick = function(){
		console.log("Done with this");
	}
*/
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
    var currentQuestion = 0;
    var questionsAnswered = 0;
    var isFinished = false;
    
    var userAnswers = new Array(questions.length);
    for ( var i = 0; i < questions.length; i++)
    	userAnswers[i] = null;
}

function ShowFinishedPage(){
    if(!isFinished){
        isFinished = true;
        // Show # of questions answered
        var numberAnswered = questionsAnswered + " of " + questions.length + " answered.";
    	var para = document.createElement("p");
    	var node = document.createTextNode(numberAnswered);
    	para.appendChild(node);
    	var element = document.getElementById("finishedData");
    	element.appendChild(para);
    	
    	for (var i = 0; i < questions.length; i++ ){
            // Show each question with selected answer and correct answer.
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
}

// get questions from json files
// save answers
// submit all answers with button
//  only allow single submission.
// disable quiz button after finish.
// clear data when new quiz starts

// check answers
// display all questions and answers

// animate transitions between questions
// option to change questions but not see if correct
// must answer question before continuing
// must answer all questions before submiting
// store username and answers
// cookies to remember and greet
// timer

// extra credit - lessons
// extra credit - study mode

// backbone
// meteor
// node
// handlebars