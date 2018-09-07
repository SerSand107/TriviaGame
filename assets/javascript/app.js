$(document).ready(function() {

    // Global Variables 
    var gameQuestions = [{
        q: "Which song is playing as Marty enters the Cafe 80's in Part 2?",
        choices: ["Madonna - Like a Virgin", "Tears For Fears - Everybody Wants to Rule the World", "Michael Jackson - Beat It", "Van Halen - Jump"],
        answer: 2
    },{
        q: "Doc shows us the Time Machine for the first time at?",
        choices: ["Lyons Estates Mall", "Twin Pines Mall", "Hill Valley Mall", "Riverside Mall"],
        answer: 1
    },{
        q: "What does Marty's mom think his name is in Back to the Future?",
        choices: ["Clint Eastwood", "Ralph Lauren", "Ralph Macchio", "Calvin Klein"],
        answer: 3
    },{
        q: "What song was being played when George and Lorraine first kiss?",
        choices: ["Why Do Fools Fall in Love", "Be My Baby", "Earth Angel", "Unforgettable"],
        answer: 2
    },{
        q: "What was the name of Docs dog?",
        choices: ["Spike", "Einstein", "Tesla", "Benjamin"],
        answer: 1
    },{
        q: "Who was originally cast to play Marty McFly?",
        choices: ["Eric Stoltz", "Robert Downey Jr", "James Spader", "Anthony Michael Hall"], 
        answer: 0
    },{
        q: "Who was the world's first time traveler?",
        choices: ["Doc Brown", "Marty McFly", "Benjamin", "Einstein"],
        answer: 3
    },{
        q: "At what time did the lightning strike the clock?",
        choices: ["10:04 pm", "10:34 pm", "11:04 pm", "11:34 pm"],
        answer: 0
    },{
        q: "What did the license plate on the DeLorean in Back to the Furure spell out?",
        choices: ["BACKINTIME", "B4CK TTF", "2DAFUTURE", "OUTATTIME"],
        answer: 3
    },{
        q: "Which of these quotes is from the end of the first movie/beginning of second?",
        choices: ["Doc, Doc wake up", "Roads? Where we're going, we don't need roads", "Rock and Roll", "Nope, already been there!"],
        answer: 1
    }];

    var currentQuestion;
    var rightAnswer;
    var wrongAnswer;
    var unanswered;
    var answered;
    var userSelect;
    var time;
    var seconds;
    var gameResponse = {
    right: "GREAT SCOTT!",
    wrong: "Slacker!",
    noTime: "Out of time!",
    final: "Times Up!"
    }

    $("#startBtn").on("click", function() {
        $(this).hide();
        startGame();
    });

    $("#restartBtn").on("click", function() {
            $(this).hide();
            startGame();
    });

    function startGame() {
        $("#correctAnswers").empty();
        $("#wrongAnswers").empty();
        $("#unanswered").empty();
        $("#lastResponse").empty();
        currentQuestion = 0;
        rightAnswer = 0;
        wrongAnswer = 0;
        unanswered = 0;
        nextQuestion();
    }

    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "assets/Back To The Future (From Back To The Future Original ScoreEnd Credits).mp3");
    // Starts theme song
    $(".theme-button").on("click", function() {
        audioElement.play();
    });
    // Pauses theme song
    $(".pause-button").on("click", function() {
        audioElement.pause();
    });    
    
    function nextQuestion() {
        $("#response").empty();
        $("#rightAnswer").empty();
        answered = true;
        //  Starts next question and option-answers
        $("#currentQuestion").html("Question " + (currentQuestion + 1) + " out of " + gameQuestions.length);
        $("#question").html("<h1>" + gameQuestions[currentQuestion].q + "</h1>");
        
        for (var i = 0; i < 4; i++) {
            var choice = $("<div>");
            choice.text(gameQuestions[currentQuestion].choices[i]);
            choice.attr({"data-index": i});
            choice.addClass("thisChoice");
            $("#options").append(choice);
        }

        runTime();
        $(".thisChoice").on("click", function() {
            userSelect = $(this).data("index");
            clearInterval(time);
            answerPage();
        });
    }
    // Starts time
    function runTime()  {
        seconds = 15;
        $("#remainingTime").html("<h2>Time: " + seconds + "</h2>");
        answered = true;
        time = setInterval(seeRunTime, 1000);
    }
    // Timet countdown
    function seeRunTime() {
        seconds--;
        $("#remainingTime").html("<h2>Time: " + seconds + "</h2>");
        if (seconds < 1) {
            clearInterval(time);
            answered = false;
            answerPage();
        }
    }

    function answerPage() {
        $("#currentQuestion").empty();
        $(".thisChoice").empty();
        $("#question").empty();

        var correctAnswerText = gameQuestions[currentQuestion].choices[gameQuestions[currentQuestion].answer];
        var correctAnswerIndex = gameQuestions[currentQuestion].answer;

        // Examines right, wrong and unanswered 
        if ((userSelect == correctAnswerIndex) && (answered == true)) {
            rightAnswer++;
            $("#response").html(gameResponse.right);
        } else if ((userSelect != correctAnswerIndex) && (answered = true)) {
            wrongAnswer++;
            $("#response").html(gameResponse.wrong);
            $("#rightAnswer").html("The right answer is: " + correctAnswerText);
        } else {
            unanswered++;
            $("#response").html(gameResponse.noTime);
            $("#rightAnswer").html("The right answer is: " + correctAnswerText);
            answered = true;
        }

        if (currentQuestion == (gameQuestions.length-1)) {
            setTimeout(tally, 5000) 
        } else {
            currentQuestion++;
            setTimeout(nextQuestion, 5000);
        }	
    }
    // End of game-score
    function tally() {
        $("#remainingTime").empty();
        $("#response").empty();
        $("#rightAnswer").empty();
        $("#lastResponse").html(gameResponse.final);
        $("#correctAnswers").html("Right Answers: " + rightAnswer);
        $("#wrongAnswers").html("Wrong Answers: " + wrongAnswer);
        $("#unanswered").html("Unanswered: " + unanswered);
        $("#restartBtn").addClass("reset");
        $("#restartBtn").show();
        $("#restartBtn").html("Let's go back in time or are you chicken?");
    }
});