<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <?php wp_body_open(); ?>

        <header>

        <!-- MENU DESKTOP -->
        <div class="main-header main-header-desktop">
            <div class="main-header-logo">
                <a href="<?= get_home_url() ?>">
                    <img src="<?= get_template_directory_uri() . '/assets/images/logo.svg' ?>" alt="Nathalie Mota logo">
                </a>
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
        </div>
        <!-- END MENU DESKTOP -->

        <!-- MENU MOBILE -->
        <div class="main-header-mobile">
            <div class="navbar-head">
                <div class="main-header-logo">
                    <a href="<?= get_home_url() ?>">
                        <img src="<?= get_template_directory_uri() . '/assets/images/logo.svg' ?>" alt="Nathalie Mota logo">
                    </a>
                </div>
                <i class="fas fa-bars burger-menu-mobile"></i>
            </div>
            <div class="burger-menu-modal">
                <nav>
                    <?php
                    wp_nav_menu(
                    array(
                        'theme_location' => 'main-menu',
                        'menu_id' => 'primary-menu',
                    )
                    );
                    ?>
                </nav>
            </div>
        </div>
        <!-- END MENU MOBILE -->
            
        </header>

    <?php get_template_part('template-parts/contact-modal'); ?>