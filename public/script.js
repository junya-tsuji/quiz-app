const questions = [
    {
        question: 'どこの店舗？？',
        image: '/images/mita.jpeg',
        choices: ['三田', '目黒', '千住大橋', '小岩'],
        correct: 0
    },
    {
        question: 'どこの店舗？？',
        image: '/images/kabukichou.jpg',
        choices: ['中山', '西台', '歌舞伎町', '池袋'],
        correct: 2
    },
    {
        question: 'どこの店舗？？',
        image: '/images/sendai.jpg',
        choices: ['札幌', '府中', '仙台', '京都'],
        correct: 2
    },
    {
        question: 'どこの店舗？？',
        image: '/images/hibaji.jpg',
        choices: ['三田', '目黒', '生田', 'ひばりヶ丘'],
        correct: 3
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
    
     // 画像を非表示にする   
    const imageElement = document.getElementById('question-image');
    imageElement.style.display = 'none';
    imageElement.src = ''; // 念のため空にする
}

nextButton.addEventListener('click', nextQuestion);
showQuestion(); 