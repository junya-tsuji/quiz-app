// クイズの問題データを定義
// 各問題は、質問文、画像パス、選択肢、正解の選択肢インデックスを含む
const questions = [
    {
        question: 'どこの店舗？',
        image: '/images/001_mita.jpg',
        choices: ['三田', '目黒', '千住大橋', '小岩'],
        correct: 0 //　正解は「三田」（インデックス0）
    },
    //　他の問題も同様の構造
    {
        question: 'どこの店舗？',
        image: '/images/001_nakayama.jpg',
        choices: ['中山', '西台', '品川', '仙台'],
        correct: 0
    },
    {
        question: 'どこの店舗？',
        image: '/images/001_sendai.jpg',
        choices: ['朝倉街道', '栃木街道', '仙台', '中山'],
        correct: 2
    },
    {
        question: 'どこの店舗？',
        image: '/images/001_kaminoge.jpg',
        choices: ['朝倉街道', '上野毛', '桜台', '府中'],
        correct: 1
    },
    {
        question: 'どこの店舗？',
        image: '/images/002_kaminoge.jpg',
        choices: ['朝倉街道', '目黒', '府中', '上野毛'],
        correct: 3
    },
    {
        question: 'どこの店舗？',
        image: '/images/001_kyouto.jpg',
        choices: ['生田', '中山', '京成大久保', '京都'],
        correct: 3
    }
];

//　クイズの状態を管理する変数
let currentQuestion = 0;    //現在の問題インデックス
let score = 0;              //正解数
let canAnswer = true;       //回答可能かどうかのフラグ
let userAnswers = [];       // ユーザーの回答を保存

// 最初にスタート画面を表示
// DOM要素の取得
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz');
const startButton = document.getElementById('start-btn');

// スタートボタンがクリックされた時にクイズ画面を表示
startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';  // スタート画面を非表示
    quizScreen.style.display = 'block';  // クイズ画面を表示
    showQuestion();  // 最初の問題を表示
});

const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const nextButton = document.getElementById('next');
const scoreElement = document.getElementById('score');

// 問題表示関数
function showQuestion() {
    const question = questions[currentQuestion];

    // 問題文と画像を設定
    questionElement.textContent = question.question;
    const imageElement = document.getElementById('question-image');
    imageElement.src = question.image;
    imageElement.style.display = 'block';
   
    // 選択肢ボタンを動的に生成 
    choicesElement.innerHTML = '';
    question.choices.forEach((choice, index) => {
        const button = document.createElement('div');
        button.className = 'choice';
        button.textContent = choice;
        button.addEventListener('click', () => selectChoice(index));
        choicesElement.appendChild(button);
    });

    // UI要素のリセット
    nextButton.style.display = 'none';
    canAnswer = true;
    updateScore();
}

// ユーザーが選択肢を選んだとき　
// 選択肢選択時の処理
function selectChoice(index) {
    if (!canAnswer) return;
    canAnswer = false;

    const choices = document.querySelectorAll('.choice');
    const correct = questions[currentQuestion].correct;

    // 正誤判定と視覚的フィードバック
    choices.forEach((choice, i) => {
        if (i === correct) {
            choice.classList.add('correct');
        } else if (i === index) {
            choice.classList.add('wrong');
        }
    });

    // 正解・不正解のフィードバックを追加
    const feedback = document.createElement('div');
    feedback.classList.add('feedback');
    if (index === correct) {
        feedback.textContent = '正解！';
        feedback.style.color = '#28a745'; // 緑
    } else {
        feedback.textContent = '不正解！';
        feedback.style.color = '#dc3545'; // 赤
    }
    choicesElement.appendChild(feedback);

    // ユーザーの回答を記録
    userAnswers.push({
        question: questions[currentQuestion].question,
        answer: questions[currentQuestion].choices[index],
        correct: index === correct
    });

     // 正解の場合、スコアを加算
    if (index === correct) {
        score++;
    }

    // 次の問題ボタンを表示
    nextButton.style.display = 'block';
}

// 次の問題を表示する関数
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        // 最後の問題の場合、「次の問題」ボタンの名前を「結果」に変更
        nextButton.textContent = '結果';
        nextButton.classList.add('result-btn');  // この行を追加

        nextButton.removeEventListener('click', nextQuestion);  // 古いイベントを削除
        nextButton.addEventListener('click', showResults);     // 結果を表示するイベントを追加
    }
}

function updateScore() {
    scoreElement.textContent = `スコア: ${score}/${questions.length}`;
}

// 結果画面を表示する関数
function showResults() {
    // 結果画面を表示する
    const resultScreen = document.getElementById('result-screen');
    resultScreen.style.display = 'block';

    questionElement.textContent = 'クイズ終了！';     // クイズ終了のメッセージを追加
    choicesElement.innerHTML = '';   // 選択肢をクリア
    nextButton.style.display = 'none';     // 次の問題ボタンを非表示

    // スコアを計算
    const totalQuestions = questions.length;
    const scorePercentage = (score / totalQuestions) * 100;

    // メッセージを決定
    let resultMessage = '';
    if (scorePercentage === 100) {
        resultMessage = 'おめでとう、君はジロリアンだ！🏆';
    } else if (scorePercentage >= 80) {
        resultMessage = '二郎のスペシャリストに近づいているぞ！👍';
    } else if (scorePercentage >= 50) {
        resultMessage = 'まだまだ二郎の訓練が必要だ！💪';
    } else {
        resultMessage = 'まずは全国制覇が必要だな！🍜';
    }

    // スコアを表示
    const scoreFinalElement = document.getElementById('score-final');
    scoreFinalElement.textContent = `${score}/${totalQuestions} (${Math.round(scorePercentage)}%)`;

    //結果一覧を取得
    const resultList = document.getElementById('result-list');
    resultList.innerHTML = ''; // 既存の内容をクリア

    // スコアの後にメッセージを追加
    const resultContainer = document.querySelector('.result-container');

    // 既存のメッセージがあれば削除
    const existingMessage = resultContainer.querySelector('.result-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // メッセージを表示する要素を追加（オプション）
    const messageElement = document.createElement('p');
    messageElement.textContent = resultMessage;
    messageElement.classList.add('result-message');
    messageElement.style.fontSize = '1.2rem';
    messageElement.style.fontWeight = 'bold';
    messageElement.style.marginTop = '15px';
    messageElement.style.color = '#007bff';
    messageElement.style.textAlign = 'center';

    //メッセージを追加
    resultContainer.insertBefore(messageElement, resultList);

    // quiz-button-containerの「メニューに戻る」ボタンを非表示にする
    const quizButtonContainer = document.querySelector('.quiz-button-container');
    if (quizButtonContainer) {
        const menuButton = quizButtonContainer.querySelector('a');
        if (menuButton) {
            menuButton.style.display = 'none';
        }
    }
    // スコアを表示
    scoreElement.textContent = `最終スコア: ${score}/${totalQuestions}`;

    // 画像を非表示にする   
    const imageElement = document.getElementById('question-image');
    imageElement.style.display = 'none';
    imageElement.src = ''; // 念のため空にする
    
    // 結果一覧を表示
    userAnswers.forEach((answer, index) => {
        const resultItem = document.createElement('li');
        resultItem.textContent = `問題 ${index + 1}: ${answer.question} - あなたの答え: ${answer.answer} - ${answer.correct ? '正解' : '不正解'}`;
        resultList.appendChild(resultItem);
    });

    // 再挑戦ボタンを表示
    const retryButton = document.getElementById('retry');
    retryButton.style.display = 'block';

    // 新しく追加するログ保存のコード
    saveQuizResult();
}

// 再挑戦ボタンのイベントリスナー
const retryButton = document.getElementById('retry');
retryButton.addEventListener('click', () => {
    // 結果画面を非表示にする
    const resultScreen = document.getElementById('result-screen');
    resultScreen.style.display = 'none';
    
    // クイズ画面を再表示
    const quizScreen = document.getElementById('quiz');
    quizScreen.style.display = 'block';

    // 初期化して再度クイズを開始
    score = 0;
    currentQuestion = 0;
    userAnswers = []; // ユーザーの回答をリセット
    
    // 画像と選択肢を再設定
    const imageElement = document.getElementById('question-image');
    imageElement.style.display = 'block';

    // quiz-button-containerの「メニューに戻る」ボタンを再表示
    const quizButtonContainer = document.querySelector('.quiz-button-container');
    if (quizButtonContainer) {
        const menuButton = quizButtonContainer.querySelector('a');
        if (menuButton) {
            menuButton.style.display = 'block'; // これを追加
        }
    }

    // 最初の問題を再表示   
    showQuestion();
    updateScore();

    // 次の問題ボタンを元の状態に戻す
    nextButton.textContent = '次の問題';
    nextButton.classList.remove('result-btn'); // 結果ボタンのクラスを削除
    nextButton.removeEventListener('click', showResults);
    nextButton.addEventListener('click', nextQuestion);
});

nextButton.addEventListener('click', nextQuestion);

// ログ保存用の関数を追加
function saveQuizResult() {
    // 結果オブジェクトを作成
    const result = {
        date: new Date().toLocaleString(), // 日付
        score: score,                      // スコア
        totalQuestions: questions.length,  // 全問題数
        timestamp: Date.now()              // タイムスタンプ
    };

    // ローカルストレージに保存
    // 以前の結果を取得（なければ空の配列）
    const previousResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    
    // 新しい結果を追加
    previousResults.push(result);
    
    // 上限を設定（例：最新の10件のみ保存）
    const limitedResults = previousResults.slice(-10);
    
    // ローカルストレージに保存
    localStorage.setItem('quizResults', JSON.stringify(limitedResults));
}

// 保存した結果を表示する関数（オプション）
function displayQuizResults() {
    const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
    
    // 結果表示用の要素を取得（HTMLに追加が必要）
    const resultList = document.getElementById('result-history');
    resultList.innerHTML = ''; // 既存の内容をクリア
    
    // 結果を逆順（最新のものが上）で表示
    results.reverse().forEach((result, index) => {
        const resultItem = document.createElement('div');
        resultItem.innerHTML = `
            <p>テスト ${results.length - index}:</p>
            <p>日付: ${result.date}</p>
            <p>スコア: ${result.score}/${result.totalQuestions}</p>
            <hr>
        `;
        resultList.appendChild(resultItem);
    });
}

// 結果履歴をクリアする関数（オプション）
function clearQuizResults() {
    localStorage.removeItem('quizResults');
    displayQuizResults(); // 表示を更新
}