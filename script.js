const questions = [
    {
        question: "In Web design, what stands for CSS?",
        answers: [
            { text: "Counter Strike: Source", correct: false },
            { text: "Corrective style sheet", correct: false },
            { text: "computer style sheet", correct: false },
            { text: "Cascading style sheet", correct: true }
        ]
    }
    // You can add more questions here
];

let currentQuestionIndex = 0;

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');

function startQuiz() {
    currentQuestionIndex = 0;
    nextButton.classList.add('hide');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    resetState();
    questionElement.innerText = question.question;
    question.answers.forEach((answer, index) => {
        const button = answerButtonsElement.children[index];
        button.querySelector('.option-text').innerText = answer.text;
        button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    Array.from(answerButtonsElement.children).forEach(button => {
        button.classList.remove('correct', 'wrong');
        button.disabled = false;
    });
}

function selectAnswer(e) {
    const selectedButton = e.target.closest('button');
    const correct = selectedButton.dataset.correct === 'true';
    setStatusClass(selectedButton, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
        button.disabled = true;
    });
    nextButton.classList.remove('hide');
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        alert('You have completed the quiz!');
        startQuiz();
    }
});

startQuiz();
