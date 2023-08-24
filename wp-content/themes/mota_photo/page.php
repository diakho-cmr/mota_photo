<?php get_header(); ?>

<div class="linear-gradient"></div>

<div class="page-content">

	<h1 class="title-h2"><?= $post->post_title ?></h1>
	<?php if(!empty($post->post_content)) : ?>
		<div><?= $post->post_content ?></div>
	<?php endif; ?>

	<!-- Surround the select box within a "custom-select" DIV element.
	Remember to set the width: -->
	<div class="custom-select" style="width:200px;">
	<select name="test">
		<option value="0">Select car:</option>
		<option value="1">Audi</option>
		<option value="2">BMW</option>
		<option value="3">Citroen</option>
		<option value="4">Ford</option>
		<option value="5">Honda</option>
		<option value="6">Jaguar</option>
		<option value="7">Land Rover</option>
		<option value="8">Mercedes</option>
		<option value="9">Mini</option>
		<option value="10">Nissan</option>
		<option value="11">Toyota</option>
		<option value="12">Volvo</option>
	</select>
	</div>

</div>

<?php get_footer();?>
