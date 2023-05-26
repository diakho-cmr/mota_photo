<div class="footer">
    <footer>
        <nav class="footer-nav">
            <?php
                wp_nav_menu(
                    array(
                        'theme_location' => 'footer-menu',
                        'menu_id' => 'menu-footer',
                    )
                );
            ?>
        </nav>
    </footer>
</div>

<?php wp_footer(); ?>

</body>
</html>