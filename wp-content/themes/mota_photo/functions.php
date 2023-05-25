<?php

/**
 * Enqueue scripts and styles
 */

function mota_photo_styles_scripts() {

    //styles
	wp_enqueue_style( 
        'mota-photo-styles', 
        get_template_directory_uri() . '/assets/css/style.css',
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
 * Register nav menu
 */

function register_my_menu() {
    register_nav_menu( 'main-menu', 'Menu principal' );
}
add_action( 'after_setup_theme', 'register_my_menu' );

