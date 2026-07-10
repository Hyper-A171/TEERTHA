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
    $organisation = strip_tags(trim($_POST["Organisation"] ?? ''));
    $role = strip_tags(trim($_POST["Role"] ?? ''));
    $redirectTo = strip_tags(trim($_POST["redirect_to"] ?? 'contact.php'));
    $formAnchor = ($redirectTo === 'partner.php') ? '#partner-inquiry' : '#contact-form';

    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: {$redirectTo}?status=error{$formAnchor}");
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
        if (!empty($organisation)) $email_content .= "Organisation: $organisation\n";
        if (!empty($role)) $email_content .= "Role: $role\n";
        $email_content .= "Inquiry Type: $inquiryType\n\n";
        $email_content .= "Message:\n$message\n";
        
        $mail->Body    = $email_content;

        $mail->send();

        // 2. Send Auto-Responder "Thank You" email to the user
        $mail->clearAllRecipients();
        $mail->clearReplyTos();
        
        $mail->setFrom($smtpUser, 'TEERTHA');
        $mail->addAddress($email, $name);
        $mail->addReplyTo($recipient, 'TEERTHA Support');
        
        $mail->Subject = "Thank you for contacting TEERTHA";
        
        $auto_reply = "Dear $name,\n\n";
        $auto_reply .= "Thank you for reaching out to TEERTHA. We have successfully received your inquiry regarding \"$inquiryType\".\n\n";
        $auto_reply .= "Our team will review your message and get back to you as soon as possible.\n\n";
        $auto_reply .= "Best regards,\n";
        $auto_reply .= "The TEERTHA Team\n";
        
        $mail->Body = $auto_reply;
        
        try {
            $mail->send();
        } catch (Exception $e) {
            // Ignore auto-responder failure so the user still sees the success message for the main inquiry
        }

        header("Location: {$redirectTo}?status=success{$formAnchor}");
    } catch (Exception $e) {
        // You can log $mail->ErrorInfo here if needed
        header("Location: {$redirectTo}?status=error{$formAnchor}");
    }
} else {
    header("Location: contact.php");
}
?>
