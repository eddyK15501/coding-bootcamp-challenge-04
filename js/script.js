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

// start timer
const startTimeCount = () => {

    let timer = setInterval(() => {
        // if the game is not over
        if (!gameOver) {
            totalTime--
            finalScore = totalTime
            timerLeft.innerText = `Time: ${totalTime}`
        }
        // if the game is over
        if (gameOver) {
            clearInterval(timer)
            showScore()
        }
        // if the timer goes to zero
        if (totalTime < 0) {
            clearInterval(timer)
            showScore()
            timerLeft.innerText = `Time: 0`
        }

    }, 1000)
}

// start the quiz
const startQuiz = () => {
    startPage.classList.add('hide')
    questionsPage.classList.remove('hide')
    showQuestion(questionIndex)
    timer.innerText = `Time: ${totalTime}`
    startTimeCount()
}

// show the questions page
const showQuestion = (index) => {
    const question = document.getElementById('question')
    const answers = document.getElementById('answers')
    
    // if there are still questions left that are able to be displayed
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

// check if answer is correct or wrong
const checkAnswer = (event) => {
    
    const answerClicked = event.target.innerText

    // if the answer is correct
    if (answerClicked === triviaQuestions[questionIndex].answer) {
        correctOrWrong.innerText = 'Correct!'
        answerBar.classList.remove('hide')
    // if the answer is wrong
    } else if (answerClicked !== triviaQuestions[questionIndex].answer) {
        totalTime -= 10
        correctOrWrong.innerText = 'Wrong!'
        answerBar.classList.remove('hide')
    } else {
        gameOver = true
        showScore()
    }
    
    // display correct or wrong for 500 milliseconds after answering
    setTimeout(() => {
        answerBar.classList.add('hide')
        questionIndex++
        showQuestion(questionIndex)
    }, 500)
}

// show scores page
const showScore = () => {
    gameOver = true
    questionsPage.classList.add('hide')
    resultsPage.classList.remove('hide')
    fScore.innerText = `${finalScore}.`
}



// ADD EVENT LISTENERS
startButton.addEventListener('click', startQuiz)

