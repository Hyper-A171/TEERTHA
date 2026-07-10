<?php
declare(strict_types=1);

$pageTitle = $pageTitle ?? 'TEERTHA';
$pageDescription = $pageDescription ?? "Experience India's sacred heritage through immersive storytelling.";
$activePage = $activePage ?? '';

function pageNavClass(string $page, string $activePage): string
{
    return $page === $activePage ? 'site-nav__link is-active' : 'site-nav__link';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') ?> | TEERTHA</title>
    <meta name="description" content="<?= htmlspecialchars($pageDescription, ENT_QUOTES, 'UTF-8') ?>">
    <meta name="theme-color" content="#a63b00">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Geist:wght@400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/tailwind.css">
    <link rel="stylesheet" href="assets/css/loader.css">
    <link rel="stylesheet" href="assets/css/theme-pages.css">
</head>
<body class="theme-page">
    <a class="skip-link" href="#main-content">Skip to content</a>

    <header class="site-header" id="site-header">
        <div class="site-header__inner">
            <a class="site-brand" href="index.php" aria-label="TEERTHA home">
                <img src="assets/images/logo.png" alt="" aria-hidden="true">
                <span>TEERTHA</span>
            </a>

            <nav class="site-nav" aria-label="Primary navigation">
                <a class="<?= pageNavClass('home', $activePage) ?>" href="index.php" <?= $activePage === 'home' ? 'aria-current="page"' : '' ?>>Home</a>
                <a class="<?= pageNavClass('experience', $activePage) ?>" href="experience.php" <?= $activePage === 'experience' ? 'aria-current="page"' : '' ?>>Experience</a>
                <a class="<?= pageNavClass('timeline', $activePage) ?>" href="timeline.php" <?= $activePage === 'timeline' ? 'aria-current="page"' : '' ?>>Timeline</a>
                <a class="<?= pageNavClass('partner', $activePage) ?>" href="partner.php" <?= $activePage === 'partner' ? 'aria-current="page"' : '' ?>>Partners</a>
                <a class="<?= pageNavClass('contact', $activePage) ?>" href="contact.php" <?= $activePage === 'contact' ? 'aria-current="page"' : '' ?>>Contact</a>
            </nav>

            <a class="button button--primary site-header__cta" href="partner.php">Partner With Us</a>

            <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-navigation" aria-label="Open navigation">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>

        <nav class="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation" hidden>
            <a class="<?= pageNavClass('home', $activePage) ?>" href="index.php">Home</a>
            <a class="<?= pageNavClass('experience', $activePage) ?>" href="experience.php">Experience</a>
            <a class="<?= pageNavClass('timeline', $activePage) ?>" href="timeline.php">Timeline</a>
            <a class="<?= pageNavClass('partner', $activePage) ?>" href="partner.php">Partners</a>
            <a class="<?= pageNavClass('contact', $activePage) ?>" href="contact.php">Contact</a>
            <a class="button button--primary" href="partner.php">Partner With Us</a>
        </nav>
    </header>
