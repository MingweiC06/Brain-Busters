document.addEventListener('DOMContentLoaded', () => {
    const welcomeSection = document.getElementById('welcome');
    const playGameSection = document.getElementById('game');
    const registrationSection = document.getElementById('registration');

    let users = {};
    let currentDifficulty = 'easy';
    let currentQuestion = {};
    let score = 0;

    document.getElementById('play-game').addEventListener('click', () => {
        playGameSection.style.display = 'block';
        registrationSection.style.display = 'none';
        welcomeSection.style.display = 'none';
        document.getElementById('contact').style.display = 'none';
        generateQuestion(); // Generate the first question when starting the game
    });

    document.getElementById('login-btn').addEventListener('click', login);
    document.getElementById('register-btn').addEventListener('click', showRegistration);
    document.getElementById('register-confirm-btn').addEventListener('click', register);
    document.getElementById('difficulty').addEventListener('change', (e) => {
        currentDifficulty = e.target.value;
        generateQuestion(); // Regenerate question when difficulty changes
    });
    document.getElementById('submit-btn').addEventListener('click', checkAnswer);

    function login() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (!username || !password) {
            document.getElementById('login-feedback').innerText = 'Please enter both username and password. 🚫';
            return;
        }
        if (users[username] && users[username] === password) {
            document.getElementById('login-feedback').innerText = 'Login successful! 🎉';
            welcomeSection.style.display = 'block';
            playGameSection.style.display = 'none';
        } else {
            document.getElementById('login-feedback').innerText = 'Invalid username or password. Try again! 🚫';
        }
    }

    function showRegistration() {
        registrationSection.style.display = 'block';
        playGameSection.style.display = 'none';
        welcomeSection.style.display = 'none';
    }

    function register() {
        const newUsername = document.getElementById('new-username').value;
        const newPassword = document.getElementById('new-password').value;
        if (!newUsername || !newPassword) {
            document.getElementById('register-feedback').innerText = 'Please enter both username and password. 🚫';
            return;
        }
        if (users[newUsername]) {
            document.getElementById('register-feedback').innerText = 'Username already taken. Try another one! 🚫';
        } else {
            users[newUsername] = newPassword;
            document.getElementById('register-feedback').innerText = 'Registration successful! You can now log in. 🎉';
            registrationSection.style.display = 'none';
            playGameSection.style.display = 'block';
        }
    }

    function generateQuestion() {
        const operations = {
            easy: { op: '+', max: 10 },
            medium: { op: '*', max: 20 },
            hard: { op: '-', max: 50 }
        };

        const { op, max } = operations[currentDifficulty];
        const num1 = Math.floor(Math.random() * max) + 1;
        const num2 = Math.floor(Math.random() * max) + 1;

        currentQuestion = {
            question: `${num1} ${op} ${num2}`,
            answer: calculateAnswer(num1, num2, op)
        };

        document.getElementById('question').innerText = `What is ${currentQuestion.question}?`;
        document.getElementById('answer').value = '';
        document.getElementById('feedback').innerText = '';
        document.getElementById('hint-text').style.display = 'none';
    }

    function calculateAnswer(num1, num2, operator) {
        switch (operator) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            default:
                return null;
        }
    }

    function checkAnswer() {
        const userAnswer = parseInt(document.getElementById('answer').value.trim()); // Trim whitespace
        console.log(`User Answer: ${userAnswer}, Correct Answer: ${currentQuestion.answer}`); // Debugging log

        if (isNaN(userAnswer)) {
            document.getElementById('feedback').innerText = 'Please enter a valid number. 🚫';
            return;
        }
        if (userAnswer === currentQuestion.answer) {
            showConfetti();
            score++;
            document.getElementById('feedback').innerText = `Correct! 🎉 Score: ${score}`;
            generateQuestion(); // Move to the next question
        } else {
            showWrongFeedback();
            document.getElementById('feedback').innerText = `Wrong answer. Try again!`;
            showHint(); // Provide hint after wrong answer
        }
    }

    function showWrongFeedback() {
        const wrongFeedback = document.createElement('div');
        wrongFeedback.innerText = '😢 Wrong answer!';
        wrongFeedback.style.color = 'red';
        wrongFeedback.style.fontSize = '2em';
        wrongFeedback.style.animation = 'shake 0.5s';
        document.querySelector('.game-container').appendChild(wrongFeedback);
        setTimeout(() => wrongFeedback.remove(), 1500);
    }

    function showHint() {
        // Provide a simple hint based on the current question
        const hintText = document.getElementById('hint-text');
        const [num1, op, num2] = currentQuestion.question.split(' ');
        if (op === '+') {
            hintText.innerText = `Hint: Think about how many ${num1} and ${num2} make.`;
        } else if (op === '-') {
            hintText.innerText = `Hint: How much do you need to add to ${num2} to get ${num1}?`;
        } else if (op === '*') {
            hintText.innerText = `Hint: It's ${num1} groups of ${num2}.`;
        }
        hintText.style.display = 'block';
    }

    function showConfetti() {
        const canvas = document.createElement('canvas');
        canvas.classList.add('confetti');
        document.body.appendChild(canvas);
        const confetti = new ConfettiGenerator({ target: canvas });
        confetti.render();
        setTimeout(() => {
            confetti.clear();
            document.body.removeChild(canvas);
        }, 3000);
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            document.querySelectorAll('section').forEach(section => section.style.display = 'none');
            const targetSection = e.target.getAttribute('href').substring(1);
            document.getElementById(targetSection).style.display = 'block';
        });
    });
});
