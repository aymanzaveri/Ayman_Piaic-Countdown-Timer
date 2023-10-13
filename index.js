import inquirer from "inquirer";
import chalk from "chalk";
function startTimer() {
    console.clear();
    console.log(chalk.blue("🕒 CLI Countdown Timer 🕒"));
    console.log(chalk.gray("Enter a duration in minutes or seconds."));
    inquirer
        .prompt([
        {
            type: "input",
            name: "duration",
            message: "Enter the duration (e.g., 5s or 2m):",
            validate: (value) => {
                if (!value.match(/^(\d+(s|m))$/)) {
                    return "Please enter a valid duration (e.g., 5s or 2m).";
                }
                return true;
            },
        },
    ])
        .then((answers) => {
        const input = answers.duration;
        const isMinutes = input.endsWith("m");
        const duration = parseInt(input);
        let secondsLeft = isMinutes ? duration * 60 : duration;
        const countdown = setInterval(() => {
            console.clear();
            console.log(chalk.yellow(`⏳ Time remaining: ${secondsLeft}s ⏳`));
            secondsLeft--;
            if (secondsLeft < 0) {
                clearInterval(countdown);
                console.log(chalk.green("✅ Countdown completed! ✅"));
                repeatGame();
            }
        }, 1000);
    })
        .catch((error) => {
        console.error(chalk.red("❌ An error occurred:", error));
        repeatGame();
    });
}
function repeatGame() {
    inquirer
        .prompt([
        {
            type: "confirm",
            name: "repeat",
            message: "Do you want to repeat the countdown?",
            default: false,
        },
    ])
        .then((answers) => {
        if (answers.repeat) {
            startTimer();
        }
        else {
            console.log(chalk.green("👋 Goodbye! 👋"));
            process.exit(0);
        }
    })
        .catch((error) => {
        console.error(chalk.red("❌ An error occurred:", error));
        process.exit(1);
    });
}
startTimer();
