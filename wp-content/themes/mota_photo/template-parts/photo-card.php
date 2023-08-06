<?php 
$photo = get_query_var('photo'); 
$class = $post->post_type == 'photo' ? 'single-post' : 'page';
?>
<?php if(custom_get_post_img($photo)['url']) : ?>
    <div class="card-photo <?= $class ?>">
        <img src="<?= custom_get_post_img($photo)['url'] ?>" alt="<?= custom_get_post_img($photo)['alt'] ?>" class="card-photo-img">
        <i class="photo-icon fa-regular fa-eye fa-lg"></i>
        <div class="photo-icon circle">
            <i class="photo-icon fa-solid fa-expand fa-lg"></i>
        </div>
        <div class="photo-info">
            <span class="photo-desc ref"><?= get_field('reference', $photo->ID); ?></span>
            <?php
            $category_terms = get_the_terms($photo->ID, 'category');
            if ($category_terms && !is_wp_error($category_terms)) :
                foreach ( $category_terms as $term ) : ?>
                    <span class="photo-desc category"><?= $term->name; ?></span>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
    </div>
<?php endif; ?>