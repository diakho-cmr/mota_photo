<?php
/**
 * The template for displaying all single photo posts
 */
 
get_header(); ?>
 
<?php while ( have_posts() ) : the_post(); ?>

    <div class="linear-gradient"></div>

    <div class="post-photo-container">

        <div class="post-photo-content">
            <div class="post-photo-content-text">
                <div>
                    <?php the_title('<h2 class="post-photo-title">', '</h2>'); ?>
                    <!--REF-->
                    <p>Référence :<?php echo get_field('reference'); ?></p>
                    <!--END REF-->
                    <!--CATEGORY-->
                    <?php
                    $category_terms = get_the_terms(get_the_ID(), 'category');
                    if ($category_terms && ! is_wp_error($category_terms)) :
                        foreach ( $category_terms as $term ) : ?>
                            <p>Catégorie : <?php echo $term->name; ?></p>
                        <?php endforeach; ?>
                    <?php endif; ?>
                    <!--END CATEGORY-->
                    <!--FORMAT-->
                    <?php
                    $format_terms = get_the_terms(get_the_ID(), 'format');
                    if ($format_terms && ! is_wp_error($format_terms)) :
                        foreach ( $format_terms as $term ) : ?>
                            <p>Format : <?php echo $term->name; ?></p>
                        <?php endforeach; ?>
                    <?php endif; ?>
                    <!--END FORMAT-->
                    <!--TYPE-->
                    <p>Type : <?php echo get_field('type'); ?></p>
                    <!--END TYPE-->
                    <!--SHOOTING YEAR-->
                    <p>Année : <?php echo get_field('shooting_date'); ?></p>
                    <!--END SHOOTING YEAR-->
                </div>
                <div class=" horizontal-rule">
                    <hr>
                </div>
            </div>
            <!--IMAGE-->
            <?php if(has_post_thumbnail()) : ?>
                <?php
                $thumbnail_id = get_post_thumbnail_id( $post->ID );
                $thumbnail_alt = get_post_meta($thumbnail_id, '_wp_attachment_image_alt', true);
                $thumbnail_url = get_the_post_thumbnail_url();
                ?>
                <div class="post-photo-content-img">
                    <img class="post-thumbnail" src="<?php echo $thumbnail_url; ?>" alt="<?php echo $thumbnail_alt; ?>">
                </div>
            <?php endif; ?>
            <!--END IMAGE-->
        </div>

        <div class="post-photo-more">
            <div class= "post-photo-contact">
                <p>Cette photo vous intéresse ?</p>
                <div class="grey-button">
                    <a href="#" class="photo-contact-link"><span>Contact</span></a>
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
                            <a href="<?= get_post_permalink(get_next_post()->ID) ?>" class="arrow-left">
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
            <div class="other-posts-content">
                <h3>Vous aimerez aussi</h3>
                <div class="related-posts">
                    <?php foreach($photos as $photo ) : ?>
                        <div class="related-post">
                            <img src="<?= custom_get_post_img($photo)['url'] ?>" alt="<?= custom_get_post_img($photo)['url'] ?>">
                            <i class="photo-icon fa-regular fa-eye fa-lg"></i>
                            <div class="photo-icon circle">
                                <i class="photo-icon fa-solid fa-expand fa-lg"></i>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
                <div class="all-photo-posts">
                    <div class="grey-button">
                        <a href="#" class=""><span>Toutes les photos</span></a>
                    </div>
                </div>
            </div>
        <?php endif; ?>

    </div><!-- END POST PHOTO CONTAINER -->
 
<?php get_footer(); ?>