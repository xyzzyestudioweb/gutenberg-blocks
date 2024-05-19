<?php
namespace GutenbergBlocks\Controllers;

\defined( 'ABSPATH' ) || die;

class AssetsController {
    
    public function __construct() {
        add_action( 'plugins_loaded', [$this, 'setup'] );
        add_action( 'wp_enqueue_scripts', [$this, 'add_scripts'] );
        add_action( 'enqueue_block_assets', [$this, 'add_scripts'] );
        add_action( 'enqueue_block_assets', [$this, 'enqueue_block_assets'] );
        add_action( 'init', [$this, 'add_block_pattern_categories'] );
        add_action( 'init', [$this, 'add_block_styles'] );
    }

    /**
     * Add scripts to the front of theme.
     */
    public function add_scripts() {
        if ( !is_admin() ) {
            wp_dequeue_script( 'jquery' );
            wp_deregister_script( 'jquery' );
        }
    }

    /**
     * Initial setup
     */
    public function setup() {
        $result = load_theme_textdomain( PLUGIN_TEXTDOMAIN, PLUGIN_PATH . '/languages' );
        if ( false === $result ) {
            $locale = apply_filters( 'theme_locale', get_locale(), 'my_theme' );
            error_log( "Could not find " . get_template_directory() . "/languages/{$locale}.mo ." );
        }
    }

    /**
     * Enqueue assets for patterns and native blocks in Editor and frontend.
     */
    public function enqueue_block_assets() {
        /* Enqueue in front (all pages) and back editor. */
        !wp_style_is( 'editor-and-front', 'enqueued' ) && wp_enqueue_style( 'editor-and-front', PLUGIN_URL . 'assets/build/css/editor-and-front.min.css', [], wp_get_theme()->get( 'Version' ) );

        /* Enqueue only in back editor. The styles defined here take precedence over the previous one (for both back and front). */
        !wp_style_is( 'editor-only', 'enqueued' ) && is_admin() && wp_enqueue_style( 'editor-only', PLUGIN_URL . 'assets/build/css/editor-only.min.css', [], wp_get_theme()->get( 'Version' ) );

        /* Enqueue only in front (all pages). */
        !wp_style_is( 'front-only', 'enqueued' ) && !is_admin() && wp_enqueue_style( 'front-only', PLUGIN_URL . 'assets/build/css/front-only.min.css', [], wp_get_theme()->get( 'Version' ) );

        // Script & styles for latest-posts block.
        !wp_style_is( 'block-latest-posts', 'enqueued' ) && wp_enqueue_style( 'block-latest-posts', PLUGIN_URL . 'assets/build/css/block-latest-posts.min.css', [], wp_get_theme()->get( 'Version' ) );
        wp_register_script( 'block-latest-posts', PLUGIN_URL . 'assets/build/js/block-latest-posts.min.js', ['wp-blocks', 'wp-editor'], wp_get_theme()->get( 'Version' ) );
        wp_localize_script( 'block-latest-posts', 'latestPosts', [
            'readMoreBtnText' => __( 'More information', PLUGIN_TEXTDOMAIN ),
            'readMoreBtnIcon' => esc_url( PLUGIN_URL . 'assets/build/img/icons/Plus-blue-1.svg' ),
        ] );

        has_block( 'core/latest-posts' ) && !wp_script_is( 'block-latest-posts', 'enqueued' ) && wp_enqueue_script( 'block-latest-posts' );

        !wp_script_is( 'block-counters', 'enqueued' ) && has_block( 'core/columns' ) && wp_enqueue_script( 'block-counters', PLUGIN_URL . 'assets/build/js/counters.min.js', [], wp_get_theme()->get( 'Version' ) );
    }

    /**
     * Add block patterns.
     */
    public function add_block_pattern_categories() {

        register_block_pattern_category(
            'custom-gutenberg-blocks',
            [
                'label'       => __( 'Block components', PLUGIN_TEXTDOMAIN ),
                'description' => __( 'Group of block pattern for this plugin', PLUGIN_TEXTDOMAIN ),
            ]
        );
    }

    /**
     * Add block styles.
     */
    public function add_block_styles() {
        register_block_style(
            "core/columns", [
                "name"  => "counters",
                "label" => __( 'Counters', PLUGIN_TEXTDOMAIN ),
            ]
        );

        register_block_style(
            "gutenberg-blocks/paginated-posts", [
                "name"  => "custom-cpt",
                "label" => __( 'Gallery + Modal', PLUGIN_TEXTDOMAIN ),
            ]
        );
    }

}