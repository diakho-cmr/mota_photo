<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <?php wp_body_open(); ?>
    <div class="main-header">
        <header>
            <div class="main-header-logo">
                <img src="<?= get_template_directory_uri() . '/assets/images/logo.svg' ?>" alt="Nathalie Mota logo">
            </div>
            <nav class="main-header-nav" id="navigation">
                <?php
                wp_nav_menu(
                array(
                    'theme_location' => 'main-menu',
                    'menu_id' => 'primary-menu',
                )
                );
                ?>
            </nav>
        </header>
    </div>