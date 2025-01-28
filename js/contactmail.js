document.getElementById('emailForm').addEventListener('submit', function(event){
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !phone || !subject || !message) {
        document.getElementById('erreur').innerHTML = 'All fields are required';
        return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('subject', subject);
    formData.append('message', message);

    fetch('/sendmail.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            document.getElementById('erreur').innerHTML = 'Message has been sent';
        } else {
            document.getElementById('erreur').innerHTML = 'Erreur: ' + data.message;
        }
    })
    .catch(error => {
        document.getElementById('erreur').innerHTML = 'Message could not be sent. Mail Error: ' + error.message;
    });
});