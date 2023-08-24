<?php
/**
 * The template for displaying the homepage
 */
 
get_header(); ?>

<div class="home-container">

    <div class="home-banner">
        <?php
         $args = [
            'post_type'         => 'photo',
            'post_status'       => 'publish',
            'numberposts'       => 1,
            'orderby'           => 'rand',
        ];
        $photos = get_posts($args);
        $photo_banner = current($photos);
        ?>
        <?php if (!empty(custom_get_post_img($photo_banner)['url'])) : ?>
            <img src="<?= custom_get_post_img($photo_banner)['url'] ?>" alt="<?= custom_get_post_img($photo_banner)['url'] ?>">
        <?php endif ?>
    </div>

    <div class="page-content">

        <div class="home-filters">
            <form id="home-filters" action="<?= admin_url('admin-ajax.php'); ?>" method="post">
                <?php $categories = get_categories(); ?>

                <div class="custom-select">
                    <select id="categories" name="categories" class="filter">
                        <option value="default">Catégories</option>
                        <?php foreach ($categories as $category) : ?>
                            <option value="<?= $category->slug ?>" class="option"><?= $category->name ?></option>
                        <?php endforeach ?>
                    </select>
                </div>

                <?php $terms = get_terms('format'); ?>
                
                <div class="custom-select">
                    <select id="formats" name="formats" class="filter">
                        <option value="default">Formats</option>
                        <?php foreach ( $terms as $term ) : ?>
                            <option value="<?= $term->slug ?>"><?= $term->name ?></option>
                        <?php endforeach;?>
                    </select>
                </div>
            
                <div class="custom-select">
                    <select id="sort" name="sort" class="filter">
                        <option value="default">Trier par</option>
                        <option value="DESC">Du + récent au + ancien</option>
                        <option value="ASC">Du + ancien au + récent</option>
                    </select>
                </div>

                <input type="hidden" name="nonce" value="<?= wp_create_nonce( 'sort_posts_photo' ); ?>"> 
                <input type="hidden" name="action" value="sort_posts_photo">
                <input type="hidden" name="publishedPosts" value="<?= $published_posts = wp_count_posts('photo')->publish; ?>">
                <input type="hidden" name="numberPosts" value="8">
                <input type="hidden" name="offset" value="0">
            </form>
        </div>

        <div id="home-photos">
        </div>

    </div>
    
</div>

<?php get_footer(); ?>