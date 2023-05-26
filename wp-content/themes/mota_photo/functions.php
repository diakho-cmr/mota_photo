<?php

/**
 * Enqueue scripts and styles
 */

function mota_photo_styles_scripts() {

    //styles
    wp_enqueue_style( 
        'reset-css', 
        get_template_directory_uri() . '/assets/css/normalize.css',
        array(),
        '8.0.1'
    );
	wp_enqueue_style( 
        'mota-photo-styles', 
        get_template_directory_uri() . '/assets/css/global-style.css',
        array(),
        '1.0'
    );

    //scripts JS
	wp_enqueue_script( 
        'mota-photo-scripts',
        get_template_directory_uri() . '/assets/js/script.js', 
        array('jquery'),
        '1.0', 
        true 
    );
}
add_action( 'wp_enqueue_scripts', 'mota_photo_styles_scripts' );

/**
 * Add theme supports
 * @link https://developer.wordpress.org/reference/functions/add_theme_support/
 */

// Enable support for post thumbnails
add_theme_support( 'post-thumbnails' );

// Allow theme to add document title tag to HTML <head>
add_theme_support( 'title-tag' );

/**
 * Register nav menu
 */

function register_my_menu() {
    register_nav_menu( 'main-menu', 'Menu principal' );
}
add_action( 'after_setup_theme', 'register_my_menu' );

/**
 * Add contact item in main menu
 */

function add_contact_item ($items, $args) {
    if($args->theme_location == 'main-menu') {
        $item = '<li class="menu-contact-link"><a href="#">Contact</a></li>';
        $items .= $item;
    }
    return $items;
}
add_filter('wp_nav_menu_items', 'add_contact_item', 10, 2);

/**
 * Register new menu for footer
 */
function register_footer_menu() {
	register_nav_menu( 'footer-menu', 'Menu footer' );
}
add_action( 'after_setup_theme', 'register_footer_menu' );

/**
 * Add copyright in footer menu
 */

function add_copyright_item ($items, $args) {
    if($args->theme_location == 'footer-menu') {
        $item = '<li>Tous droits réservés</li>';
        $items .= $item;
    }
    return $items;
}
add_filter('wp_nav_menu_items', 'add_copyright_item', 10, 2);