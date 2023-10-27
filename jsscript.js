//eto yung mga global attributes mo na gagamitin through html and css

const start_btn = document.querySelector(".start_btn button");
let acpr= "j12f08f1998";
const info_box = document.querySelector(".info_box"); //para sa rules mo na wala naman magbabasa
const dis_btn = info_box.querySelector(".buttons .Disagree");// Disagree button to hide the skwer info
const agree_btn = info_box.querySelector(".buttons .Agree"); // agree button mo
const quiz_box = document.querySelector(".quiz_box"); //quiz mo
const result_box = document.querySelector(".result_box"); //after the game eto lalabas dapat in return of the function linti
const option_list = document.querySelector(".option_list");
let output = document.getElementById("output");



// from here at down eto yung mga time variables mo
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");


info_box.classList.add("activeInfo");




dis_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}


agree_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(20); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}





// mga variables mo shunga

let timeValue =  20;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

//pag pinindot mo matic restart ka sa quiz hindi policy
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    //lahat ng variable mo nireset mo lang
    timeValue = 20; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;


    showQuetions(que_count); //pinalalabas ko yung questions
    queCounter(que_numb); //passing que_numb value to queCounter bobo eh di nalang pinag isa hahhaha ayoko masira UI ko
    clearInterval(counter); //taga clear ng counter
    clearInterval(counterLine); //taga clear ng counterLine yung linya mo sa page bugok
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //nakalagay to sa HTML MO BINABAGO NYA YUNG VALUE NG ORAS MO 
    next_btn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload yung page mo pero dapat punta sya sa main page eh
}


const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //nakabase sa script ng question mo na naka array
        que_count++; //nag pluplus sya every next mo
        que_numb++; //iterate muna para mabago question mo nag aadd sya ng 1 kemerut
        showQuetions(que_count); //Dito lalabas yung mga Questions mo
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //para maorasan quiz mo
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //itatago next button mo peace yow
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}
function anticheat(){
document.addEventListener("visibilitychange", () => {

         

    if (document.hidden) {// CHEATER MINIMIZE DETECTOR
  


       quiz_box.classList.remove("activeQuiz"); //hide quiz box
       alert("YOU DISOBEYED MY RULES NO USING OTHER WINDOW! CHEATER! REFRESH THE PAGE AND READ MY POLICY! AND TAKE THE QUIZ AGAIN! BOBO KA BA?!");
        
    
    
    } else {
    }
 });

}

// getting questions and options from array
function showQuetions(index){
    anticheat();


    
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<spand>'+ questions[index].numb + ". " + questions[index].question +'</spand>';
    let option_tag = '<div class="option"><spand>'+ questions[index].options[0] +'</spand></div>'
    + '<div class="option"><spand>'+ questions[index].options[1] +'</spand></div>'
    + '<div class="option"><spand>'+ questions[index].options[2] +'</spand></div>'
    + '<div class="option"><spand>'+ questions[index].options[3] +'</spand></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // taga select ng lahat ng available na option if nag select ka then calling the button for next kwestyun
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// creating the new div tags which for icons may nakalimutan kang script take note!
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//pag pumili si shunga ng option sa answer
function optionSelected(answer){
    //mag rereset mga timer mo para sa next question
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //tama eh syempre plus point
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options nahirapan ako igoogle to
    }
    next_btn.classList.add("show"); //showing the next button if user selected any option
}

function anticpr(){

    info_box.classList.add("activeInfo"); //starting session

}

function showResult(){ // pag tapos na ang quiz dito na yung result ng bobo
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");

    if (userScore > 20){       
        let scoreTag = '<spand>and YOU ARE GENIUS!, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></spand>';
        scoreText.innerHTML = scoreTag;  
    }
    else if(userScore >15){ 
        let scoreTag = '<spand>and nice u can do better, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></spand>';
        scoreText.innerHTML = scoreTag;
    }
    else{ 
        let scoreTag = '<spand>and study harder!, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></spand>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "TIMES UP!"; //change the time text to time off
            const allOptions = option_list.children.length; //getting all option items


            let correcAns = questions[que_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if selected any option
        }
    }
}

function startTimerLine(time){  //BULIGAN NYO KO PLEASE NASISIRA YUNG UI HUHUHU
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time line with px by time value
        if(time > 549){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<spand><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</spand>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}

function isMobile() {
    // Check if the user agent contains the word "Mobi"
    return /Mobi/i.test(navigator.userAgent);
  }


if(isMobile()==true){

    window.location = "mobile.html";




}




      

      



