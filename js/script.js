const startButton = document.getElementById('start-button')
const startPage = document.querySelector('.start-page')
const questionsPage = document.querySelector('.questions-page')
const resultsPage = document.querySelector('.main-results-page')
const timerLeft = document.getElementById('timer')
const answerBar = document.querySelector('.answer-bar')
const correctOrWrong = document.getElementById('correct-or-wrong')

// let finalScore
let gameOver
let questionIndex = 0
let totalTime = 75

// START TIMER
const startTimeCount = () => {

    let timer = setInterval(() => {
        totalTime--
        timerLeft.innerText = `Time: ${totalTime}`

        if (gameOver) {
            clearInterval(timer)
        } 

        if (totalTime < 0) {
            showScore()
            timerLeft.innerText = `Time: 0`
            clearInterval(timer)
        }

    }, 1000)
}

// START THE QUIZ
const startQuiz = () => {
    startPage.classList.add('hide')
    questionsPage.classList.remove('hide')
    showQuestion(questionIndex)
    timer.innerText = `Time: ${totalTime}`
    startTimeCount()
}

// SHOW THE QUESTIONS PAGE
const showQuestion = (index) => {
    const question = document.getElementById('question')
    const answers = document.getElementById('answers')
    
    question.innerHTML = `<h1>${triviaQuestions[index].question}</h1>`

    answers.innerHTML = 
    `<button class="btn">
    ${triviaQuestions[index].options[0]}
    </button>
    <button class="btn">
    ${triviaQuestions[index].options[1]}
    </button>
    <button class="btn">
    ${triviaQuestions[index].options[2]}
    </button>
    <button class="btn">
    ${triviaQuestions[index].options[3]}
    </button>`

    const buttons = document.querySelectorAll('.btn')

    buttons.forEach(button => {
        button.addEventListener('click', checkAnswer)
    })

}

// CHECK IF ANSWER IS CORRECT OR NOT
const checkAnswer = (event) => {
    // console.log(event.target.innerText)

    const answerClicked = event.target.innerText

    if (answerClicked === triviaQuestions[questionIndex].answer) {
        answerBar.classList.remove('hide')
    } else {
        totalTime = totalTime - 10
        correctOrWrong.innerText = 'Wrong!'
        answerBar.classList.remove('hide')
    }
    


    setTimeout(() => {
        answerBar.classList.add('hide')
        questionIndex++
        showQuestion(questionIndex)
    }, 2000)
}




// ADD EVENT LISTENERS
startButton.addEventListener('click', startQuiz)

