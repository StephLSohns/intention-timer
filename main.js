/* Here we have created several variables and given them names
 appropriate to the intention-timer comp and iteration. Here
 we are using a dom query to select individual elements to
 return matching elements. The DOM querySelector() uses a
 CSS selector and returns the first matching element. These
 variables are helping us to run our script linking parts
 between html structure, css styling and javascript functionality. */

var studyBox = document.querySelector('.study-box');
var meditateBox = document.querySelector('.meditate-box');
var exerciseBox = document.querySelector('.exercise-box');
var activityBoxes = document.querySelector('.activity-box-container');
var minutesInput = document.querySelector('.minutes-input');
var secondsInput = document.querySelector('.seconds-input');
var startBtn = document.querySelector('.start-button')
var taskAnswer = document.querySelector('.task-answer')
var mainLeft = document.querySelector('.main-left')
var timerStart = document.querySelector('.timer-start-button')
var page1 = document.querySelector('.activity-background-1')
var page2 = document.querySelector('.activity-background-2')
var page3 = document.querySelector('.activity-background-3')
var timerHeader = document.querySelector('.chosen-task-header')
var activityHeader = document.querySelector('.activity-header')
var timerCount = document.querySelector('.timer-countdown')
var logActivityBtn = document.querySelector('.log-activity-btn')
var newActivityBtn = document.querySelector('.create-new-activity')
var cardHead = document.querySelector('.activity-card-header')
var cardTime = document.querySelector('.activity-card-time')
var cardTask = document.querySelector('.activity-card-task')
var pastActivities = document.querySelector('.past-activities')
var activityMessage = document.querySelector('.activity-message-container')
var boxArray = [studyBox, meditateBox, exerciseBox];
var inputsArray = [taskAnswer, minutesInput, secondsInput];
/*Here we are using event listeners to bind different
events to different elements and to indicate which function
should execute when that event fires. For example when the
'click' event happens the changeBoxes function on line 47
 is invoked. */
activityBoxes.addEventListener('click', changeBoxes);
minutesInput.addEventListener('input', checkTime);
secondsInput.addEventListener('input', checkTime);
startBtn.addEventListener('click', checkBoxes);
timerStart.addEventListener('click', startTimer)
logActivityBtn.addEventListener('click', populateCard)
newActivityBtn.addEventListener('click', createNewActivityPage)

function changeBoxes() {  /*function declaration and inside
  curly braces are the variables, logic, code needed to perform
  a specific task by calling the function*/
  var classList = event.target.classList;
/*Here the 3 listed variables each return the name of an element
from the html page then using event.target to reference this object,
or function that they sit inside of, the following events happen
by using the contains/add/remove css classes. Inside of the section
that contains the button and img elements are classes and data-ids*/
  var currentDataId = event.target.dataset.id;
  var btnImg = event.target.firstElementChild;
  /* this function is telling the comp to change boxes when it hears
  a click eventlistener but in order for the boxes to be clicked and
  clicked off of when another one is clicked we did an if/else statement*/
  if(classList.contains('active')) {
    classList.remove('active');
    /*Here the classList refers to one of the three study/meditate/exercise
    buttons and the btnImg is included to reference the image of
    each button, if it is active and the click of another button is clicked
    remove the active otherwise(else) add it.*/
    btnImg.src = `assets/${currentDataId}.svg`/*inactive img*/
  } else {
    classList.add('active')
    btnImg.src = `assets/${currentDataId}-active.svg`/*active img*/
  }
  removeActive(currentDataId);
}
/* the above is a method set inside of the above changeBoxes function
with a given parameter of currentDataId which will become an argument
when it gets passed in the declared function below of the same name,
this links the two functions so that when they are run and the
click on click off of the 3 buttons can be looped again and again,
this is why we used a for loop below targeting the variable boxArray
from above.*/
function removeActive(currentDataId) {
  for (var i = 0; i < boxArray.length; i++) {
    if(boxArray[i].dataset.id !== currentDataId) {
      boxArray[i].classList.remove('active');
      boxArray[i].firstElementChild.src = `assets/${boxArray[i].dataset.id}.svg`
      }
    }
  }
/* Below the function checkTime is referring to page one of
the intention-timer using an if statement to check and see
if the minutes and seconds entry are empty which is why both
the minutes and seconds input value have been set to empty
strings. */
function checkTime() {
  if(minutesInput.value === '') {
    minutesInput.value = '';
  }
  if(secondsInput.value === '') {
    secondsInput.value = '';
  }
}
/* Here enters the timer of page two with a declared function
of displayTimer invoking the hidden for page1 and removing hidden
for page2 if the timerStart is not disabled*/
function displayTimer() {
  page1.classList.add('hidden');
  page2.classList.remove('hidden');
  if(timerStart.disabled) {
    timerStart.disabled = false;
  }
  /*also changing the page1 header of New Activity to Current Activity
  and running a for loop to make sure that one of the buttons has indeed
  been clicked and is set to active via the contains function looking
  for its active parameter/argument.*/
  activityHeader.innerText = 'Current Activity'
  for (var i = 0; i < boxArray.length; i++){
    if(boxArray[i].classList.contains('active')){
      timerStart.classList.add(`${boxArray[i].dataset.id}`)
    }
  }
  /*Continuing with the timerHeader and what is written as an answer
  to the question on page1 equaling words entered into the line provided.
  If that has been completed then check secondsInput to see what has
  been entered then all inputs are entered and page2 can actually appear
  with the set inputs and timer timerCount. We used interpolation to get
  the numbers and a colen just right.*/
  timerHeader.innerText = taskAnswer.value;
  if(secondsInput.value < 10) {
    secondsInput.value = `0${secondsInput.value}`
  }
  timerCount.innerText = `${minutesInput.value}:${secondsInput.value}`
}
/*Here we begin probably the most challenging function of the whole
project, so we declared a function startTimer and within the curly
braces immediately put a variable linked to a function thru dot
notation which updates the value with two new parameters, one is the
event itself 'disabled' and the other refers to its value of true.*/]
function startTimer() {
  timerStart.setAttribute('disabled', true)
  var minutes = Number(minutesInput.value);
  var seconds = Number(secondsInput.value)
  /*the variables of minutes and seconds are given the value of Number
  and updating the input values from an empty string to actual numbers,
  even if 0 or 00 or 00:00. Below are introduced several new variables
  specific to the timer numbers. We used different calculations so that
  seconds would always be a number between 00 and 59 and interpolated
  a zero when total seconds reached less than 10 making it 09, 08, etc.*/
  var totalSeconds = (minutes * 60) + seconds;
  var remainingMinutes = Math.floor(totalSeconds / 60);
  var remainingSeconds = totalSeconds % 60;
  /*The below setInterval allows us to run a function repeatedly, starting
   after the set interval of time, then repeating continuoulsy
   at that interval. Then providing several if statement for different
   outcomes, the final outcome being a clearInterval and display completer
   button if the timer reaches 00.00*/
  var countdown = setInterval(function() {
    if(totalSeconds % 60 < 10) {
      remainingSeconds = Number(remainingSeconds);
      remainingSeconds = `0${remainingSeconds}`
    }
    timerCount.innerText = `${remainingMinutes}:${remainingSeconds}`
    totalSeconds--
    remainingMinutes = Math.floor(totalSeconds / 60);
    remainingSeconds = totalSeconds % 60;
    if(remainingSeconds < 10) {
      remainingSeconds = `0${remainingSeconds}`
    }
    if(totalSeconds < 0) {
      clearInterval(countdown);
      displayComplete();
    }
  }, 1000)/*This 1000 equals milliseconds, each 1000 = 1 second*/
}

function displayComplete() {
  timerStart.innerText = 'COMPLETE!'
  logActivityBtn.classList.remove('hidden')
} /* this function is specific to the change of text from
 the start button to a COMPLETE button and removing the
 hidden event from the log activity button, in turn making it
 appear on the page2.*/

 /*In the startBtn eventlistener, the two parameters are the
 'click' event and the checkBoxes function which is put in below
 in reference to the start button with the first line of code
 telling the timer start button to have the innerText of 'START'
 Provided certain conditions are met, the for loop accessing the
 boxArray if it is true that the button is not selected then go
 to else and if it is false then the button is selected you break
 go to page2. Also at the bottom of this function putting in the
 method of checkInputs with a parameter of isNotSelected.*/
function checkBoxes(){
  timerStart.innerText = 'START'
  var isNotSelected;
  for (var i = 0; i < boxArray.length; i++) {
    if(!boxArray[i].classList.contains("active")) {
      isNotSelected = true;
    } else {
      isNotSelected = false;
      break
    }
  }
  checkInputs(isNotSelected)
}
/*This function below was needed to insure that all of the necessary
inputs on page1 were actually checked off and if even one
was not filled out it would show error and if all were filled
out it would diplay timer. We did this by declaring another
variable of isFilledOut and writing a for loop accessing the
inputsArray with an if/else statement to identify if things
really are filled out or not. And a final if statement saying
if things are not not selected and they are filled out then
displayTimer().*/

function checkInputs(isNotSelected) {
  var isFilledOut;
  for (var i = 0; i < inputsArray.length; i++) {
    if(inputsArray[i].value !== '') {
      isFilledOut = true;
    } else {
      isFilledOut = false;
      break
    }
  }
  if(!isNotSelected && isFilledOut) {
    displayTimer();
  }
    showError();  /*here a method is put on last line of the script to say running
    this function in conjunction with displayTimer*/
}
/*Here the function below showError is invoked if the task answer is =
to an empty string and it is also calling on the function to
insertAdjacentHTML div class in the dom and specifically giving
the directions of showing a warning icon and a text warning, if
certain conditions are not met such as the seconds or minutes line
isnt filled out, or the chosen task line isnt filled out - if any
one or more of these is empty showError.*/
function showError() {{
  if(taskAnswer.value === "")
    taskAnswer.insertAdjacentHTML('afterend', `
    <div class="warning-container">
      <img class="warning-icon" src="assets/warning.svg">
      <p class="warning">A description is required.</p>
    </div>`)
  }
  if(minutesInput.value === ""){
    minutesInput.insertAdjacentHTML('afterend', `
    <div class="warning-container">
      <img class="warning-icon" src="assets/warning.svg">
      <p class="warning">Define your minutes.</p>
    </div>`)
  }
  if(secondsInput.value === ""){
    secondsInput.insertAdjacentHTML('afterend', `
    <div class="warning-container">
      <img class="warning-icon" src="assets/warning.svg">
      <p class="warning">Define your seconds.</p>
    </div>`)
  }
}

function populateCard() { /* function declared,behaving like a store that
  holds statements inside these curly braces until ready to run when the last line
  of this script is reached and all of its given statements are met: logActivityBtn,
  page2, activityMessage are hidden and page3's hidden is removed and shows text of
  "Completed Activity" then a new variable is created and a for loop with an if
  statement is written to reach into the box array for the active header applied
  to the populateCard which then updates the displayCard in this case. */
  logActivityBtn.classList.add('hidden')
  activityMessage.classList.add('hidden')
  page2.classList.add('hidden')
  page3.classList.remove('hidden')
  activityHeader.innerText = 'Completed Activity'
  var activeHeader;
  for(var i = 0; i < boxArray.length; i++){
    if(boxArray[i].classList.contains('active')){
      activeHeader = boxArray[i].dataset.id;
    }
  }
  displayCard(activeHeader)
}
/*This declared function just below has a parameter of activeHeader,
needed in order to run this function along with the first statement
inside the curly braces of pastActivities referencing a DOM node upon
this object/function, thru dot.notation it is connected to a method of
.insertAdjacentHTML using the DOMstring(represents position relative to element)
'afterbegin' which is just inside the element before its 1st child, then inserted
is the specified html which invokes the function that creates a display card with
the following details of bar-type, header in Caps and time and task.*/
function displayCard(activeHeader) {
  pastActivities.insertAdjacentHTML('afterbegin', `
  <section class="activity-card">
    <section class="type-time-container ${activeHeader}">
      <p class="activity-card-header">${activeHeader.toUpperCase()}</p>
      <p class="activity-card-time">${minutesInput.value} MIN ${secondsInput.value} SEC</p>
      <p class="activity-card-task">${taskAnswer.value}</p>
    </section>
  </section>`)
}
/*The final function below is declared with no parameters but a necessary
function to take us back to the beginning of page1 removing its event of 'hidden'
to page1 and adding the event of hidden to page3, also reapplying the original
activityHeader of 'New Activity' thru innerText. Next writing a for loop to
access the boxArray in order to remove the 'active' from any and all buttons,
including its icons which is referenced in the firstElementChild statement with
the three property values of task, minutes and seconds all equaling empty strings
thus returning the page back to its original starting point.*/
function createNewActivityPage() {
  page3.classList.add('hidden');
  page1.classList.remove('hidden');
  activityHeader.innerText = 'New Activity'
  for (var i = 0; i < boxArray.length; i++) {
    boxArray[i].classList.remove('active')
    boxArray[i].firstElementChild.src = `assets/${boxArray[i].dataset.id}.svg`
  }
  taskAnswer.value = '';
  minutesInput.value = '';
  secondsInput.value = '';
}
