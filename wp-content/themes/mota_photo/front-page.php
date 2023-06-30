<?php
/**
 * The template for displaying the homepage
 */
 
get_header(); ?>

<div class="home-container">

    <div class="home-banner">
        <?php if (!empty(custom_get_post_img($post)['url'])) : ?>
            <img src="<?= custom_get_post_img($post)['url'] ?>" alt="<?= custom_get_post_img($post)['url'] ?>">
        <?php endif ?>
    </div>

    <div class="page-content">

        <div class="home-filters">
            <form id="home-filters" action="<?= admin_url('admin-ajax.php'); ?>" method="post">
                <?php $categories = get_categories(); ?>
                <select id="categories" name="categories" class="filter">
                    <option value="default">Catégories</option>
                    <?php foreach ($categories as $category) : ?>
                        <option value="<?= $category->slug ?>"><?= $category->name ?></option>
                    <?php endforeach ?>
                </select>

                <?php $terms = get_terms('format'); ?>
                
                <select id="formats" name="formats" class="filter">
                    <option value="default">Formats</option>
                    <?php foreach ( $terms as $term ) : ?>
                        <option value="<?= $term->slug ?>"><?= $term->name ?></option>
                    <?php endforeach;?>
                </select>
            
                <select id="sort" name="sort" class="filter">
                    <option value="default">Trier par</option>
                    <option value="DESC">Du + récent au + ancien</option>
                    <option value="ASC">Du + ancien au + récent</option>
                </select>

                <input type="hidden" name="nonce" value="<?= wp_create_nonce( 'sort_posts_photo' ); ?>"> 
                <input type="hidden" name="action" value="sort_posts_photo">
            </form>
        </div>

        <div id="home-photos" class="cards-photo-container ">
            <?php
            $args = [
                'post_type' => 'photo',
                'post_status' => 'publish',
                'numberposts' => -1,
            ];
            $photos = get_posts($args);
            ?>
            <?php
            foreach($photos as $photo) {
                if(!empty($photo)) {
                    set_query_var('photo', $photo);
                    get_template_part('template-parts/photo-card');
                }
            }
            ?>
        </div>

    </div>

</div>

<?php get_footer(); ?>