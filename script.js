const questions = [
    {
        question: '日本の首都は？',
        image: '/images/tokyo.jpg',
        choices: ['東京', '大阪', '京都', '福岡'],
        correct: 0
    },
    {
        question: '世界で最も大きな大陸は？',
        image: '/images/lion.png',
        choices: ['アフリカ', 'アジア', '北アメリカ', '南アメリカ'],
        correct: 1
    },
    {
        question: '1 + 1 = ?',
        image: '/images/apple.png',
        choices: ['2', '3', '4', '5'],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let canAnswer = true;

const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const nextButton = document.getElementById('next');
const scoreElement = document.getElementById('score');

function showQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    choicesElement.innerHTML = '';
    canAnswer = true;

    // 画像を表示
    const imageElement = document.getElementById('question-image');
    imageElement.src = question.image;
    imageElement.style.display = 'block';

    question.choices.forEach((choice, index) => {
        const button = document.createElement('div');
        button.className = 'choice';
        button.textContent = choice;
        button.addEventListener('click', () => selectChoice(index));
        choicesElement.appendChild(button);
    });

    nextButton.style.display = 'none';
    updateScore();
}

function selectChoice(index) {
    if (!canAnswer) return;
    canAnswer = false;

    const choices = document.querySelectorAll('.choice');
    const correct = questions[currentQuestion].correct;

    choices.forEach((choice, i) => {
        if (i === correct) {
            choice.classList.add('correct');
        } else if (i === index) {
            choice.classList.add('wrong');
        }
    });

    if (index === correct) {
        score++;
    }

    nextButton.style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function updateScore() {
    scoreElement.textContent = `スコア: ${score}/${currentQuestion}`;
}

function showResults() {
    questionElement.textContent = 'クイズ終了！';
    choicesElement.innerHTML = '';
    nextButton.style.display = 'none';
    scoreElement.textContent = `最終スコア: ${score}/${questions.length}`;
}

nextButton.addEventListener('click', nextQuestion);
showQuestion(); 