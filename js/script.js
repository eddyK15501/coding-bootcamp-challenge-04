const startButton = document.getElementById('start-button')
const startPage = document.querySelector('.start-page')
const questionsPage = document.querySelector('.questions-page')
const timerLeft = document.getElementById('timer')
const answerBar = document.querySelector('.answer-bar')
const correctOrWrong = document.getElementById('correct-or-wrong')
const resultsPage = document.querySelector('.main-results-page')
const fScore = document.getElementById('final-score')

let finalScore = 0
let gameOver = false
let questionIndex = 0
let totalTime = 75

// START TIMER
const startTimeCount = () => {

    let timer = setInterval(() => {
        if (!gameOver) {
            totalTime--
            finalScore = totalTime
            timerLeft.innerText = `Time: ${totalTime}`
        }

        if (gameOver) {
            clearInterval(timer)
            showScore()
        }
        
        if (totalTime < 0) {
            clearInterval(timer)
            showScore()
            timerLeft.innerText = `Time: 0`
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
    
    if (questionIndex <= triviaQuestions.length - 1) {
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
    } else {
        showScore()
    } 
}

// CHECK IF ANSWER IS CORRECT OR NOT
const checkAnswer = (event) => {
    
    const answerClicked = event.target.innerText

    if (answerClicked === triviaQuestions[questionIndex].answer) {
        correctOrWrong.innerText = 'Correct!'
        answerBar.classList.remove('hide')
    } else if (answerClicked !== triviaQuestions[questionIndex].answer) {
        totalTime -= 10
        correctOrWrong.innerText = 'Wrong!'
        answerBar.classList.remove('hide')
    } else {
        gameOver = true
        showScore()
    }
    
    setTimeout(() => {
        answerBar.classList.add('hide')
        questionIndex++
        showQuestion(questionIndex)
    }, 500)
}

// SHOW SCORES PAGE
const showScore = () => {
    gameOver = true
    questionsPage.classList.add('hide')
    resultsPage.classList.remove('hide')
    fScore.innerText = `${finalScore}.`
    console.log(finalScore)
}



// ADD EVENT LISTENERS
startButton.addEventListener('click', startQuiz)

