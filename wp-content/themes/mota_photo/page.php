<?php get_header(); ?>

<div class="linear-gradient"></div>

<div class="page-content">

	<h1 class="title-h2"><?= $post->post_title ?></h1>
	<?php if(!empty($post->post_content)) : ?>
		<div><?= $post->post_content ?></div>
	<?php endif; ?>

</div>

<?php get_footer();?>
