<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Charger les classes PHPMailer
require 'vendor/autoload.php';

// Créer une instance de PHPMailer
$phpmailer = new PHPMailer();

try {
    // Configuration SMTP pour Gmail
    $phpmailer->isSMTP();
    $phpmailer->Host = 'smtp.gmail.com';
    $phpmailer->SMTPAuth = true;
    $phpmailer->Port = 465;
    $phpmailer->SMTPSecure = 'ssl';
    $phpmailer->Username = 'ratiktok173@gmail.com';
    $phpmailer->Password = 'ohsr nigy gbxi zspu';

    // Récupérer les données du formulaire
    $nom = isset($_POST['nom']) ? $_POST['nom'] : '';
    $prenom = isset($_POST['prenom']) ? $_POST['prenom'] : '';
    $nePourrontAssister = isset($_POST['ne-pourront-assister']);
    $reception = isset($_POST['reception']) ? 'Assisteront à la réception' : '';
    $tephiline = isset($_POST['tephiline']) ? 'Assisteront au chabbat' : '';
    $nombre = isset($_POST['nombre']) ? $_POST['nombre'] : '';
    $message = isset($_POST['message']) ? $_POST['message'] : '';

    // Construire le nom de l'expéditeur
    $nomExpediteur = "REPONSE DE : " . htmlspecialchars("$nom $prenom", ENT_QUOTES, 'UTF-8');

    // Destinataire, sujet, corps, etc.
    $phpmailer->setFrom('votre_adresse@outlook.com', $nomExpediteur);
    $phpmailer->addAddress('raphaelmoula@gmail.com');
    $phpmailer->Subject = 'Sujet de l\'e-mail';

    // Construire le corps de l'e-mail
    $corpsEmail = "
    <html>
    <head>
        <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
            }
            .container {
                background-color: #fff;
                border-radius: 8px;
                padding: 30px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            h2 {
                color: #333;
                font-size: 24px;
            }
            p {
                color: #666;
                font-size: 16px;
                line-height: 1.6;
            }
            .message {
                border: 1px solid #ccc;
                padding: 10px;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <h2>Informations du formulaire :</h2>
            <p><strong>Nom :</strong> $nom</p>
            <p><strong>Prénom :</strong> $prenom</p>";

    if ($nePourrontAssister) {
        $corpsEmail .= "<p><strong>Participation :</strong> Ne pourront pas assister</p>";
    } else {
        $corpsEmail .= "<p><strong>Participation :</strong></p>";
        $corpsEmail .= "<p>$reception</p>";
        $corpsEmail .= "<p>$tephiline</p>";
        $corpsEmail .= "<p><strong>Nombre de personnes :</strong> $nombre</p>";
    }

    $corpsEmail .= "<div class='message'>
            <h2>Message aux mariés :</h2>
            <p>$message</p>
        </div>
        </div>
    </body>
    </html>";

    $phpmailer->Body = $corpsEmail;
    $phpmailer->isHTML(true); // Définit le format de l'e-mail comme HTML

    // Envoi de l'e-mail
    $phpmailer->send();

    echo "<script type='text/javascript'>";
    echo "window.onload = function() {";
    echo "  alert('Formulaire envoyé avec succès !');";
    echo "}";
    echo "</script>";

} catch (Exception $e) {
    echo "L'e-mail n'a pas pu être envoyé. Erreur de l'expéditeur: {$phpmailer->ErrorInfo}";
}
?>
