// getElementById and querySelectors
const startButton = document.getElementById('start-button')
const startPage = document.querySelector('.start-page')
const questionsPage = document.querySelector('.questions-page')
const timerLeft = document.getElementById('timer')
const answerBar = document.querySelector('.answer-bar')
const correctOrWrong = document.getElementById('correct-or-wrong')
const resultsPage = document.querySelector('.main-results-page')
const fScore = document.getElementById('final-score')
const hsInitials = document.getElementById('fs')
const submitBtn = document.getElementById('submit-hs')
const highScoresPage = document.querySelector('.high-scores-page')
const highScoresList = document.querySelector('.high-scores-list')
const goBack = document.getElementById('go-back')
const clearHs = document.getElementById('clear')
const goToHsPage = document.getElementById('hs-link')
const topBar = document.getElementById('top-bar-container')

// global variables
let finalScore = 0
let gameOver = false
let questionIndex = 0
let totalTime = 75
let gimmeInitials = ''
let highScoresArray = []
let index = 1

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
        gameOver = true
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

// create high score with initials and a final score
const createHighScore = () => {
    gimmeInitials = hsInitials.value

    // if input box is empty
    if (!gimmeInitials) {
        alert("Please enter initials")
        return
    }
    // clear the input field
    hsInitials.value = ""

    let hs = {
        gimmeInitials,
        finalScore
    }
    // push to high scores array
    highScoresArray.push(hs)

    //  prevents displaying high score of the first child twice
    while (highScoresList.firstChild) {
        highScoresList.removeChild(highScoresList.firstChild)
    }

    // adds high score to the HTML with a for loop
    for (let i = 0; i < highScoresArray.length; i++) {
        let highScoreLi = document.createElement('li')
        highScoreLi.innerText = `${index}. ${highScoresArray[i].gimmeInitials} - ${highScoresArray[i].finalScore}`
        highScoresList.appendChild(highScoreLi)
        index++
    }

    saveHighScore()
    displayHighScores()
}

// save the high score to local storage
const saveHighScore = () => {
    localStorage.setItem('HighScore', JSON.stringify(highScoresArray))
}

// get the high scores loaded from local storage
const getHighScore = () => {
    let loadHighScores = JSON.parse(localStorage.getItem('HighScore'))

    // if localStorage.getItem is false, stop action
    if (!loadHighScores) {
        return false
    }

    // retrieve high scores from local storage for display, and push back into high scores array for initial rendering
    for (let i = 0; i < loadHighScores.length; i++) {
        let highScoreLi = document.createElement('li')
        highScoreLi.innerText = `${index}. ${loadHighScores[i].gimmeInitials} - ${loadHighScores[i].finalScore}`
        highScoresList.appendChild(highScoreLi)

        highScoresArray.push(loadHighScores[i])
    }
}

// display the high scores page
const displayHighScores = () => {
    gameOver = true

    resultsPage.classList.add('hide')
    startPage.classList.add('hide')
    questionsPage.classList.add('hide')

    highScoresPage.classList.remove('hide')
    topBar.classList.add('hide')
    timerLeft.innerText = `Time: 0`
}

// clear the high scores page
const clearScore = () => {
    highScoresArray = []
    index = 1

    // removes the high scores after clearing the local storage
    while (highScoresList.firstChild) {
        highScoresList.removeChild(highScoresList.firstChild)
     }

    localStorage.clear('HighScore')
} 

// set variables back to what they were, when clicking on the go back button
const goBackToStart = () => {
    gameOver = false
    questionIndex = 0
    totalTime = 75
    finalScore = 0
    gimmeInitials = ''
    index = 1

    renderStartPage()
}

// render the the start page after clicking go back
const renderStartPage = () => {
    highScoresPage.classList.add('hide')
    startPage.classList.remove('hide')
    topBar.classList.remove('hide')
    timerLeft.innerText = `Time: 0`
}

// get the local storage array to render from the start
getHighScore()


// add event listeners
startButton.addEventListener('click', startQuiz)

submitBtn.addEventListener('click', createHighScore)

goBack.addEventListener('click', goBackToStart)

goToHsPage.addEventListener('click', displayHighScores)

clearHs.addEventListener('click', clearScore)