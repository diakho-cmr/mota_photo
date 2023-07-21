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

    wp_enqueue_script( 
        'mota-photo-lightbox',
        get_template_directory_uri() . '/assets/js/lightbox.js', 
        array('jquery'),
        '1.0',
        true 
    );
}
add_action( 'wp_enqueue_scripts', 'mota_photo_styles_scripts' );

function add_type_attribute($tag, $handle, $src) {
    // if not your script, do nothing and return original $tag
    if ( 'mota-photo-lightbox' !== $handle ) {
        return $tag;
    }
    // change the script tag by adding type="module" and return it.
    $tag = '<script type="module" src="' . esc_url( $src ) . '" id="mota-photo-lightbox-js"></script>';
    return $tag;
}
add_filter('script_loader_tag', 'add_type_attribute' , 10, 3);

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
        $thumbnail_id = get_post_thumbnail_id($post->ID);
        $alt = get_post_meta($thumbnail_id, '_wp_attachment_image_alt', true); ;
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

/**
 * SORT POSTS IN HOMEPAGE
 */

add_action( 'wp_ajax_sort_posts_photo', 'sort_posts_photo' );
add_action( 'wp_ajax_nopriv_sort_posts_photo', 'sort_posts_photo' );

function sort_posts_photo() {

    //vérif sécurité
    if(!isset($_REQUEST['nonce']) || !wp_verify_nonce($_REQUEST['nonce'], 'sort_posts_photo')) {
    	wp_send_json_error( "Vous n’avez pas l’autorisation d’effectuer cette action.", 403 );
  	}

    // On vérifie que les données ont bien été envoyées
    if(!isset($_REQUEST)) {
    	wp_send_json_error( "Informations manquantes", 403 );
  	}

    // Récupération des données du formulaire
    $categories = [];
    foreach(get_categories() as $category) {
        $categories[] = $category->slug;
    }
    $formats = [];
    foreach(get_terms('format') as $format) {
        $formats[] = $format->slug;
    }

    $format = isset($_REQUEST['format']) && $_REQUEST['format'] !== 'default' ? sanitize_text_field($_REQUEST['format']) : $formats;
    $category = isset($_REQUEST['category']) && $_REQUEST['category'] !== 'default' ? sanitize_text_field($_REQUEST['category']) : $categories;
    $sort = isset($_REQUEST['sort']) && $_REQUEST['sort'] !== 'default'  ? sanitize_text_field($_REQUEST['sort']) : "DESC";
    $offset = isset($_REQUEST['offset']) ? sanitize_text_field($_REQUEST['offset'])  : '';
    $number_posts = isset($_REQUEST['numberPosts']) ? sanitize_text_field($_REQUEST['numberPosts'])  : '';

    //Requête des posts
    $args = array(
        'post_type'         => 'photo',
        'post_status'       => 'publish',
        'numberposts'       => $number_posts,
        'offset'            => $offset,
        'order'             => $sort,
        'tax_query'         => array(
        'relation'          => 'AND',
            array(
                'taxonomy'  => 'category', 
                'field'     => 'slug', 
                'terms'     => $category, 
            ),
            array(
                'taxonomy'  => 'format', 
                'field'     => 'slug', 
                'terms'     => $format, 
            )
        ),
    );
    $posts = get_posts($args);
    $published_posts = (new WP_Query($args))->found_posts;
    // End requête des posts

    $posts_data = [];
    foreach ($posts as $post) {
        $img_url = custom_get_post_img($post)['url'];
        $img_alt = custom_get_post_img($post)['alt'];
        $ref = get_field('reference', $post->ID);
        $category_terms = get_the_terms($post->ID, 'category');
        if ($category_terms && !is_wp_error($category_terms)) {
            foreach($category_terms as $term) {
                $cat_term = $term->name;
            }
        }
        $post_data =
        [
            'img_url' => $img_url,
            'img_alt' => $img_alt,
            'ref' => $ref,
            'term' => $cat_term
        ];
        $posts_data[] = $post_data;
    }

    $global_data = 
    [
        'publishedPosts' => $published_posts,
        'posts' => $posts_data,
    ];
    
    //envoyer les données au navigateur
	wp_send_json_success($global_data);

    wp_reset_postdata();
    
}



