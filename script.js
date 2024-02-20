<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bulls and Cows Game</title>
    <style>
        .container {
            text-align: center;
        }
        #guesses {
            margin-bottom: 20px;
        }
=
        .guess {
            width: 30px;
            text-align: center;
            margin: 0 5px;
        }

        #keypad {
            margin-bottom: 20px;
        }

        #keypad button {
            padding: 5px 10px;
            margin: 5px;
        }

        #feedback {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Bulls and Cows Game</h1>
        <div id="guesses">
            <input type="text" maxlength="1" class="guess" id="guess1">
            <input type="text" maxlength="1" class="guess" id="guess2">
            <input type="text" maxlength="1" class="guess" id="guess3">
            <input type="text" maxlength="1" class="guess" id="guess4">
            <input type="text" maxlength="1" class="guess" id="guess5">
        </div>
        <div id="keypad">
            <button onclick="addDigit(1)">1</button>
            <button onclick="addDigit(2)">2</button>
            <button onclick="addDigit(3)">3</button>
            <button onclick="addDigit(4)">4</button>
            <button onclick="addDigit(5)">5</button>
            <button onclick="addDigit(6)">6</button>
            <button onclick="addDigit(7)">7</button>
            <button onclick="addDigit(8)">8</button>
            <button onclick="addDigit(9)">9</button>
            <button onclick="addDigit(0)">0</button>
            <button onclick="clearInput()">Clear</button>
            <button onclick="submitGuess()">Submit</button>
        </div>
        <div id="feedback"></div>
    </div>

    <script>
        let targetNumber = generateRandomNumber();
        let currentGuess = "";

        function generateRandomNumber() {
            let num = "";
            while (num.length < 5) {
                let digit = Math.floor(Math.random() * 10);
                if (!num.includes(digit.toString())) {
                    num += digit;
                }
            }
            return num;
        }

        function addDigit(digit) {
            if (currentGuess.length < 5) {
                currentGuess += digit;
                updateGuessDisplay();
            }
        }

        function clearInput() {
            currentGuess = "";
            updateGuessDisplay();
        }

        function updateGuessDisplay() {
            for (let i = 0; i < currentGuess.length; i++) {
                document.getElementById(`guess${i + 1}`).value = currentGuess[i];
            }
            for (let i = currentGuess.length; i < 5; i++) {
                document.getElementById(`guess${i + 1}`).value = "";
            }
        }

        function submitGuess() {
            if (currentGuess.length === 5) {
                let { bulls, cows } = checkGuess(currentGuess);
                let feedback = document.getElementById("feedback");
                feedback.textContent = `Bulls: ${bulls}, Cows: ${cows}`;
                clearInput();
            } else {
                alert("Please enter a 5-digit number.");
            }
        }

        function checkGuess(guess) {
            let bulls = 0;
            let cows = 0;

            for (let i = 0; i < guess.length; i++) {
                if (guess[i] === targetNumber[i]) {
                    bulls++;
                } else if (targetNumber.includes(guess[i])) {
                    cows++;
                }
            }

            return { bulls, cows };
        }
    </script>
</body>
</html>
