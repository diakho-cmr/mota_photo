<footer>
    <div class="footer">
        <div class="horizontal-rule">
            <hr>
        </div>
        <div class="footer-nav">
            <nav>
                <?php
                wp_nav_menu(
                    [
                        'theme_location' => 'footer-menu',
                        'menu_id' => 'menu-footer',
                    ]
                );
                ?>
            </nav>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>

</body>
</html>