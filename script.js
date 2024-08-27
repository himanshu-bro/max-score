const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
let isJumping = false;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

// Update the high score display
highScoreDisplay.textContent = 'High Score: ' + highScore;

function jump() {
    if (isJumping) return; // Prevents multiple jumps at once
    isJumping = true;

    let position = 0;
    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            // Move down
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 5;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            // Move up
            position += 5;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

// Event listener for keydown to jump
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        jump();
    }
});

function checkCollision() {
    const dinoRect = dino.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        dinoRect.left < obstacleRect.right &&
        dinoRect.right > obstacleRect.left &&
        dinoRect.bottom > obstacleRect.top &&
        dinoRect.top < obstacleRect.bottom
    ) {
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
            highScoreDisplay.textContent = 'High Score: ' + highScore;
        }
        alert('Game Over! Your score: ' + score);
        document.location.reload();
    } else {
        // Check if the dinosaur has passed the obstacle successfully
        if (obstacleRect.right < dinoRect.left) {
            score++;
            scoreDisplay.textContent = 'Score: ' + score;

            // Reset obstacle position to keep game going
            obstacle.style.animation = 'none';
            setTimeout(() => {
                obstacle.style.animation = '';
                obstacle.style.animation = 'moveObstacle 2s linear infinite';
            }, 10);
        }
    }
}

setInterval(checkCollision, 10);
