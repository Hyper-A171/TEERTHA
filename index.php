<?php
declare(strict_types=1);

/*
 * Keep the converted PHP entry point pixel-for-pixel aligned with the
 * approved static UI. The template currently contains no PHP tags, so
 * including it returns the same document while allowing the page to be
 * served through PHP.
 */
$homeTemplate = __DIR__ . DIRECTORY_SEPARATOR . 'index.html';

if (!is_file($homeTemplate) || !is_readable($homeTemplate)) {
    http_response_code(500);
    exit('The home page template is unavailable.');
}

require $homeTemplate;
