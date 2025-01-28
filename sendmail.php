<?php

// Autoriser les requêtes CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Si la méthode de la requête est OPTIONS, renvoyer une réponse 200 (préflight request)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Vérifier si la méthode de la requête est POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // 405 Method Not Allowed
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed salem']);
    exit;
}

// Charger les fichiers PHPMailer
require './php-mailer/src/Exception.php';
require './php-mailer/src/PHPMailer.php';
require './php-mailer/src/SMTP.php';

require 'vendor/autoload.php';

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\PHPMailer;

function getEmailTemplate($name, $email, $phone, $subject, $message) {
    return "
        <!DOCTYPE html>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        </head>
        <body>
            <div class='email-container'>
                <div class='header'>
                    <h2>New contact form</h2>
                </div>
                <div class='content'>
                    <p><b>Name:</b> $name</p>
                    <p><b>Email:</b> $email</p>
                    <p><b>Phone:</b> $phone</p>
                    <p><b>Subject:</b> $subject</p>
                    <p><b>Message:</b> $message</p>
                </div>
                <div class='footer'>
                    <p>&copy; Copyright Adc, created with love by <a href='https://ibrahim.tn/'>Lokmani Ibrahim </a>, <span class='copyright_year'>2025</span> All Rights Reserved to ADC</p>
                </div>
            </div>
        </body>
        </html>
    ";
}

function sendEmail($body, $email, $name) {

    //Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->SMTPAuth = true;
        $mail->Host = 'smtp.adc-transitions.com';                     //Set the SMTP server to send through
        $mail->Username = 'contact@adc-transitions.com';                     //SMTP username
        $mail->Password = 'Contact123*';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;            //Enable implicit TLS encryption
        $mail->Port= 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        // Expéditeur et destinataire
        //$mail->setFrom($userEmail, $name);
        //$mail->addReplyTo($userEmail, $name);
        $mail->addAddress('contact@adc-transitions.com');

        // Contenu de l'email
        $mail->isHTML(true);
        $mail->Body = $body;

        $mail->send();
        return ['status' => 'success', 'message' => 'Email envoyé avec succès'];
    } catch (Exception $e) {
        error_log("Erreur d'envoi de l'email : {$mail->ErrorInfo}");
        return ['status' => 'error', 'message' => "Erreur : {$mail->ErrorInfo}"];
    }
}

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        //$to = filter_var($_POST['to'], FILTER_VALIDATE_EMAIL);
        $name = htmlspecialchars($_POST['name'] ?? null);
        $email = htmlspecialchars($_POST['email'] ?? null);
        $phone = htmlspecialchars($_POST['phone'] ?? null);
        $subject = htmlspecialchars($_POST['subject'] ?? null);
        $message = htmlspecialchars($_POST['message'] ?? null);

        if (!$name || !$email || !$phone || !$subject || !$message) {
            echo json_encode(['status' => 'error', 'message' => 'All fiels are required']);
            exit;
        }

        $body = getEmailTemplate($name, $email, $phone, $subject, $message);
        $result = sendEmail($body, $email, $name);
        echo json_encode($result);
        exit;
    }

    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
?>

