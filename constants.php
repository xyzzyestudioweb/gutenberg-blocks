<?php
// Define
if ( is_theme() ) {
    \define( 'THEME_VER', '0.1.0' );
    \define( 'THEME_NAME', basename( get_template_directory() ) );
    \define( 'THEME_PATH', get_template_directory() . '/' );
    \define( 'THEME_URIPATH', get_template_directory_uri() . '/' );
    \define( 'THEME_PARENT_PATH', get_template_directory() . '/' );
    \define( 'THEME_PARENT_URIPATH', get_template_directory_uri() . '/' );
    \define( 'THEME_CHILD_PATH', get_stylesheet_directory() . '/' );
    \define( 'THEME_CHILD_URIPATH', get_stylesheet_directory_uri() . '/' );
    \define( 'THEME_TEXTDOMAIN', 'gutenberg-blocks' );
} else {
    \define( 'PLUGIN_VER', '0.1.0' );
    \define( 'PLUGIN_NAME', 'gutenberg-blocks' );
    \define( 'PLUGIN_URL', plugin_dir_url( __FILE__ ) );
    \define( 'PLUGIN_BASE', plugin_basename( __FILE__ ) );
    \define( 'PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
    \define( 'PLUGIN_TEXTDOMAIN', 'gutenberg-blocks' );
}
