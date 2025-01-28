document.getElementById('appointmentForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Empêcher la soumission normale du formulaire

    // Récupérer les valeurs des champs
    const fname = document.getElementById('appointmentFname').value.trim();
    const lname = document.getElementById('appointmentLname').value.trim();
    const email = document.getElementById('appointmentEmail').value.trim();
    const phone = document.getElementById('appointmentPhone').value.trim();
    const gender = document.getElementById('appointmentGender').value;
    const date = document.getElementById('appointmentDate').value;
    const message = document.getElementById('appointmentMessage').value.trim();

    // Vérifier les champs obligatoires côté client avant d'envoyer la requête
    if (!fname || !lname || !email || !phone || !gender || !date || !message) {
        document.getElementById('appointmentResponse').innerHTML = 'Tous les champs sont obligatoires.';
        return;
    }

    // Créer l'objet de données à envoyer
    const formData = new FormData();
    formData.append('to', email);
    formData.append('subject', 'Neue Terminbuchung');
    formData.append('fname', fname);
    formData.append('lname', lname);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('gender', gender);
    formData.append('date', date);
    formData.append('message', message);

    // Envoyer les données via une requête POST à votre serveur PHP
    fetch('send_email.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                document.getElementById('appointmentResponse').innerHTML = 'Votre demande a été envoyée avec succès!';
            } else {
                document.getElementById('appointmentResponse').innerHTML = 'Erreur : ' + data.message;
            }
        })
        .catch(error => {
            document.getElementById('appointmentResponse').innerHTML = 'Erreur lors de l\'envoi : ' + error.message;
        });
});
