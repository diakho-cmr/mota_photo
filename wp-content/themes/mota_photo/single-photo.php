<?php
/**
 * The template for displaying all single photo posts
 */
 
get_header(); ?>
 
<?php while ( have_posts() ) : the_post(); ?>

    <div class="linear-gradient"></div>

    <div class="post-photo-container page-content">

        <div class="post-photo-content">
            <div class="post-photo-content-text">
                <div class="padding">
                    <?php the_title('<h1 class="title-h2">', '</h1>'); ?>
                    <!--REF-->
                    <p class="photo-desc">Référence :<?= get_field('reference'); ?></p>
                    <!--END REF-->
                    <!--CATEGORY-->
                    <?php
                    $category_terms = get_the_terms(get_the_ID(), 'category');
                    if ($category_terms && ! is_wp_error($category_terms)) :
                        foreach ( $category_terms as $term ) : ?>
                            <p class="photo-desc">Catégorie : <?php echo $term->name; ?></p>
                        <?php endforeach; ?>
                    <?php endif; ?>
                    <!--END CATEGORY-->
                    <!--FORMAT-->
                    <?php
                    $format_terms = get_the_terms(get_the_ID(), 'format');
                    if ($format_terms && ! is_wp_error($format_terms)) :
                        foreach ( $format_terms as $term ) : ?>
                            <p class="photo-desc">Format : <?php echo $term->name; ?></p>
                        <?php endforeach; ?>
                    <?php endif; ?>
                    <!--END FORMAT-->
                    <!--TYPE-->
                    <p class="photo-desc">Type : <?php echo get_field('type'); ?></p>
                    <!--END TYPE-->
                    <!--SHOOTING YEAR-->
                    <p class="photo-desc">Année : <?php echo get_field('shooting_date'); ?></p>
                    <!--END SHOOTING YEAR-->
                </div>
                <div class=" horizontal-rule">
                    <hr>
                </div>
            </div>
            <!--IMAGE-->
            <?php if(has_post_thumbnail()) : ?>
                <?php
                $thumbnail_id = get_post_thumbnail_id($post->ID);
                $thumbnail_alt = get_post_meta($thumbnail_id, '_wp_attachment_image_alt', true);
                $thumbnail_url = get_the_post_thumbnail_url();
                ?>
                <div class="post-photo-content-img">
                    <img class="post-thumbnail" src="<?php echo $thumbnail_url; ?>" alt="<?php echo $thumbnail_alt; ?>">
                </div>
            <?php endif; ?>
            <!--END IMAGE-->
        </div>

        <div class="post-photo-more padding">
            <div class= "post-photo-contact">
                <p>Cette photo vous intéresse ?</p>
                <div class="grey-button">
                    <a href="#" class="photo-contact-link"><span class="button-text">Contact</span></a>
                </div>
            </div>
                <?php 
                $arrow_prev = get_template_directory_uri() . '/assets/images/arrow-prev.png';
                $arrow_next = get_template_directory_uri() . '/assets/images/arrow-next.png';
                ?>
            <div class="posts-navigation">
                <div class="posts-navigation-img">
                    <img src="<?= custom_get_post_img(get_previous_post())['url'] ?>" alt="<?= custom_get_post_img(get_previous_post())['alt'] ?>" class="img-post img-post-prev">
                    <img src="<?= custom_get_post_img(get_next_post())['url'] ?>" alt="<?= custom_get_post_img(get_next_post())['alt'] ?>" class="img-post img-post-next">
                </div>
                <div class="posts-navigation-arrows">
                    <?php if(!empty(get_previous_post())) : ?>
                        <div class="posts-navigation-prev">
                            <a href="<?= get_post_permalink(get_previous_post()->ID) ?>" class="arrow-prev">
                                <img src="<?= $arrow_prev ?>" alt="flèche précédent">
                            </a>
                        </div>
                    <?php endif; ?>
                    <?php if(!empty(get_next_post())) : ?>
                        <div class="posts-navigation-next">
                            <a href="<?= get_post_permalink(get_next_post()->ID) ?>" class="arrow-next">
                                <img src="<?= $arrow_next ?>" alt="flèche suivant">
                            </a>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>

        <?php $post_category_id = get_the_category(get_the_ID())[0]->term_id; ?>

<?php endwhile; ?>

        <?php
        $photos = get_posts([
            'exclude'        => [$post->ID],
            'numberposts'    => 2,
            'post_status'    => 'publish',
            'post_type'      => 'photo',
            'category'       => $post_category_id
        ]);
        ?>

        <?php if(!empty($photos)) : ?>
            <div class="horizontal-rule">
                <hr>
            </div>
            <div class="other-posts-content padding">
                <h2 class="title-h3">Vous aimerez aussi</h2>
                <div class="cards-photo-container">
                    <?php 
                    foreach($photos as $photo) {
                        if(!empty($photo)) {
                            set_query_var('photo', $photo);
                            get_template_part('template-parts/photo-card');
                        }
                    }
                    ?>
                </div>
                <div class="button-container">
                    <div class="grey-button">
                        <a href="#" class=""><span class="button-text">Toutes les photos</span></a>
                    </div>
                </div>
            </div>
        <?php endif; ?>

    </div><!-- END POST PHOTO CONTAINER -->
 
<?php get_footer(); ?>