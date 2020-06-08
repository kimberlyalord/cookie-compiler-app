const modal = document.getElementById('modal');

const modalButton = document.getElementById('about');

const closeButton = document.getElementById('close-modal');

modalButton.onclick = function() {
    modal.style.display = 'block';
}

closeButton.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}