function chooseTurn() {
    document.getElementById('turn-choice').style.display = 'block';
}

function startGame(isFirst) {
    localStorage.setItem('isFirst', isFirst);
    window.location.href = 'play.html'; // Giả sử trang chính của trò chơi là index.html
}

window.onload = function() {
    // Kiểm tra giá trị isFirst từ localStorage
    let isFirst = localStorage.getItem('isFirst');

    if (isFirst === 'true') {
        document.getElementById('mana').textContent = 1; // Người đi trước bắt đầu với 1 Mana
    } else {
        document.getElementById('mana').textContent = 0; // Người đi sau bắt đầu không có Mana
    }
}

function startGame(isFirst) {
    localStorage.setItem('isFirst', isFirst);
    window.location.href = 'play.html'; // Redirect to the game page
}
