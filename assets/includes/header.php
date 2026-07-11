<?php
// Get current page for active nav highlighting
$current_page = basename($_SERVER['PHP_SELF'], '.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($page_title) ? $page_title . ' | TEERTHA' : 'TEERTHA - Digital Spiritual Heritage'; ?></title>
    <meta name="description" content="Experience India's spiritual heritage through immersive storytelling and cutting-edge technology.">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="assets/css/style.css">
    <?php if ($current_page == 'index'): ?>
    <link rel="stylesheet" href="assets/css/cinematic.css">
    <?php endif; ?>
</head>
<body<?php echo isset($body_class) ? ' class="' . htmlspecialchars($body_class, ENT_QUOTES, 'UTF-8') . '"' : ''; ?>>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="index">
                <img src="assets/images/logo.png" alt="TEERTHA Logo" style="height: 60px; width: auto;">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mx-auto">
                    <li class="nav-item">
                        <a class="nav-link <?php echo $current_page == 'index' ? 'active' : ''; ?>" href="index">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php echo $current_page == 'about' ? 'active' : ''; ?>" href="about">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php echo $current_page == 'experience' ? 'active' : ''; ?>" href="experience">Experience</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php echo $current_page == 'technology' ? 'active' : ''; ?>" href="technology">Technology</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php echo $current_page == 'how-it-works' ? 'active' : ''; ?>" href="how-it-works">How It Works</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php echo $current_page == 'partner' ? 'active' : ''; ?>" href="partner">Partner</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php echo $current_page == 'contact' ? 'active' : ''; ?>" href="contact">Contact</a>
                    </li>
                </ul>
                <a href="experience" class="btn btn-primary btn-nav">Experience Teertha</a>
            </div>
        </div>
    </nav>
