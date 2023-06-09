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

/**
 * Create photo post type
 */

function photo_post_type() {
     $labels = [
         'name'               => 'Photos',
         'singular_name'      => 'Photo',
         'add_new'            => 'Ajouter une photo',
         'add_new_item'       => 'Ajouter une photo',
         'edit_item'          => 'Modifier la photo',
         'new_item'           => 'Nouvelle photo',
         'view_item'          => 'Voir la photo',
         'search_items'       => 'Rechercher une photo',
         'not_found'          => 'Aucune photo',
         'not_found_in_trash' => 'Aucune photo',
         'parent_item_colon'  => ''
     ];
     $args = array(
         'labels'             => $labels,
         'menu_icon'          => 'dashicons-format-image',
         'supports'           => ['title', 'thumbnail', 'editor','author'],
         'public'             => true,
         'publicly_queryable' => true,
         'show_ui'            => true,
         'query_var'          => true,
         'hierarchical'       => false,
         'show_in_rest'       => true,
         'taxonomies'         => array('category', 'format'),
         'has_archive'        => true,
         'publicly_queryable' => true,
     );
     register_post_type( 'photo', $args );
}
 
add_action( 'init', 'photo_post_type' );

/**
 * Register taxonomies
 */

function format_custom_taxonomy() {
    $labels = array(
        'name'                  => 'Format',
        'singular_name'         => 'Format',
        'search_items'          => 'Rechercher dans les formats',
        'all_items'             => 'Tous les formats',
        'parent_item'           => 'Format parent',
        'parent_item_colon'     => 'Format parent :',
        'edit_item'             => 'Modifier le format',
        'update_item'           => 'Mettre à jour le format',
        'add_new_item'          => 'Ajouter un nouveau format',
        'new_item_name'         => 'Nom du nouveau format',
        'menu_name'             => 'Formats'
    );
    $args = array(
        'labels'                => $labels,
        'hierarchical'          => true,
        'public'                => true,
        'show_ui'               => true,
        'show_admin_column'     => true,
        'show_in_nav_menus'     => true,
        'show_tagcloud'         => true,
        'show_in_rest'          => true,
        'show_in_quick_edit'    => true,
        'query_var'             => true,
        'show_in_menu'          => true,
    );
    register_taxonomy('format', array('photo'), $args);
}
add_action('init', 'format_custom_taxonomy');

/**
 * Register taxonomies terms
 */

function category_terms_taxonomy() {
    $terms = array(
        'Réception',
        'Concert',
        'Mariage',
        'Télévision'
    );
    foreach ($terms as $term) {
        wp_insert_term($term, 'category');
    }
}
add_action('init', 'category_terms_taxonomy');

function format_terms_taxonomy() {
    $terms = array(
        'Portrait',
        'Paysage'
    );
    foreach ($terms as $term) {
        wp_insert_term($term, 'format');
    }
}
add_action('init', 'format_terms_taxonomy');

/**
 * Get post image alt and url
 */

function custom_get_post_img ($post) {
    $post_id = '';
    $url = '';
    $alt = '';
    if(!empty($post)) {
        $post_id = $post->ID;
        $alt = get_post_meta($post_id, '_wp_attachment_image_alt', true); ;
        $url = get_the_post_thumbnail_url($post_id);
    }
    return [
        'alt' => $alt,
        'url' => $url,
    ];
}

/**
 * Add line breaks in post title
 */
function custom_post_title($titles) {
    return str_replace(' | ', '<br>', $titles);
}
add_filter( 'the_title', 'custom_post_title', 10, 1 );

