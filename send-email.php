<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/includes/PHPMailer/Exception.php';
require __DIR__ . '/includes/PHPMailer/PHPMailer.php';
require __DIR__ . '/includes/PHPMailer/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["Name"] ?? ''));
    $email = filter_var(trim($_POST["Email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $inquiryType = strip_tags(trim($_POST["Inquiry_type"] ?? ''));
    $subject = strip_tags(trim($_POST["Subject"] ?? ''));
    $message = trim($_POST["Message"] ?? '');

    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: contact.php?status=error");
        exit;
    }

    $envFile = __DIR__ . '/.env';
    $env = file_exists($envFile) ? parse_ini_file($envFile) : [];
    
    $smtpHost = $env['SMTP_HOST'] ?? 'smtp.gmail.com';
    $smtpPort = $env['SMTP_PORT'] ?? 465;
    $smtpUser = $env['SMTP_USER'] ?? 'mr.hypera.co@gmail.com';
    $smtpPass = $env['SMTP_PASS'] ?? '';
    $recipient = $env['RECEIVER_EMAIL'] ?? 'mr.hypera.co@gmail.com';

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = $smtpHost;
        $mail->SMTPAuth   = true;
        $mail->Username   = $smtpUser;
        $mail->Password   = $smtpPass;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = $smtpPort;

        // Recipients
        $mail->setFrom($smtpUser, 'TEERTHA Website');
        $mail->addAddress($recipient);
        $mail->addReplyTo($email, $name);

        // Content
        $mail->isHTML(false);
        $mail->Subject = "New Inquiry from TEERTHA: $subject";
        
        $email_content = "Name: $name\n";
        $email_content .= "Email: $email\n";
        $email_content .= "Inquiry Type: $inquiryType\n\n";
        $email_content .= "Message:\n$message\n";
        
        $mail->Body    = $email_content;

        $mail->send();
        header("Location: contact.php?status=success#contact-form");
    } catch (Exception $e) {
        // You can log $mail->ErrorInfo here if needed
        header("Location: contact.php?status=error#contact-form");
    }
} else {
    header("Location: contact.php");
}
?>
