<?php
namespace GutenbergBlocks\Controllers;

use GutenbergBlocks\Controllers\Blocks\DocumentsBlockController;
use GutenbergBlocks\Controllers\Blocks\PaginatedPostsBlockController;

\defined( 'ABSPATH' ) || die;

class BlocksController {
    private $paginated_posts_block;
    private $documents_block;
    private $project_path;

    public function __construct() {
        $this->project_path = is_theme() ? get_stylesheet_directory() : PLUGIN_PATH;
        $this->set_dynamic_blocks_attributes();

        add_action( 'init', [$this, 'register_dynamic_block_type'] );
        add_action( 'init', [$this, 'register_static_block_type'] );
        add_action( 'admin_enqueue_scripts', [$this, 'admin_enqueue_scripts'] );
        add_action( 'wp_enqueue_scripts', [$this, 'frontend_enqueue_scripts'] );
        add_filter( 'block_categories_all', [$this, 'block_categories_init'], 10, 2 );
    }

    /**
     * Set the attributes for the container of the dynamic blocks.
     */
    public function set_dynamic_blocks_attributes() {
        $project_url            = is_theme() ? get_stylesheet_directory_uri() : PLUGIN_URL;
        $paged_posts_attributes = [
            'block_basedir'          => $this->project_path . 'assets/build/js/Components/paginated-posts/',
            'frontend_script_handle' => 'paginated-posts-frontend',
            'block_name'             => 'gutenberg-blocks/paginated-posts',
            'block_baseurl'          => $project_url . 'assets/build/js/Components/paginated-posts/',
        ];
        $documents_attributes = [
            'block_basedir'          => $this->project_path . 'assets/build/js/Components/documents/',
            'frontend_script_handle' => 'documents-frontend',
            'block_name'             => 'gutenberg-blocks/documents',
            'block_baseurl'          => $project_url . 'assets/build/js/Components/documents/',
        ];

        $this->paginated_posts_block = new PaginatedPostsBlockController( $paged_posts_attributes['block_basedir'], $paged_posts_attributes['frontend_script_handle'], $paged_posts_attributes['block_name'], $paged_posts_attributes['block_baseurl'] );
        $this->documents_block       = new DocumentsBlockController( $documents_attributes['block_basedir'], $documents_attributes['frontend_script_handle'], $documents_attributes['block_name'], $documents_attributes['block_baseurl'] );
    }

    /**
     * Registers the block using the metadata loaded from the `block.json` file.
     * Behind the scenes, it registers also all assets so they can be enqueued
     * through the block editor in the corresponding context.
     *
     * @see https://developer.wordpress.org/reference/functions/register_block_type/
     */
    public function register_dynamic_block_type() {
        register_block_type( $this->project_path . 'assets/build/js/Components/documents', [
            'render_callback' => [$this->documents_block, 'render_block_with_attributes'],

        ] );
        register_block_type( $this->project_path . 'assets/build/js/Components/paginated-posts', [
            'render_callback' => [$this->paginated_posts_block, 'render_block_with_attributes'],
        ] );
    }

    /**
     * Registers the block using the metadata loaded from the `block.json` file.
     * Behind the scenes, it registers also all assets so they can be enqueued
     * through the block editor in the corresponding context.
     *
     * @see https://developer.wordpress.org/reference/functions/register_block_type/
     */
    public function register_static_block_type() {
        register_block_type( $this->project_path . 'assets/build/js/Components/hero-slider' );
        register_block_type( $this->project_path . 'assets/build/js/Components/hero-slide' );
        // register_block_type( $this->project_path . 'assets/build/js/Components/video-facade' );
    }

    /**
     * Add a new category to the list of block categories.
     *
     * @param  array   $categories Array of block categories.
     * @return array
     */
    public function block_categories_init( $categories ) {
        $categories[] = [
            'slug'  => 'custom-gutenberg-blocks',
            'title' => 'Custom Gutenberg Blocks',
        ];

        return $categories;
    }
    /**
     * We use the 'react' script handle to localize the customBlocks object with the REST API URL and nonce, so we can use it in the React components since react is a dependency for all blocks.
     */
    private function localize() {
        //  TODO: add 'gutenberg-blocks' route to a constant.
        wp_localize_script( 'react', 'customBlocks', [
            'api' => [
                'root'  => get_rest_url( null, 'gutenberg-blocks' ),
                'nonce' => wp_create_nonce( 'wp_rest' ),
            ],
        ] );
    }

    /**
     * Enqueue assets for custom blocks in admin.
     */
    public function admin_enqueue_scripts() {
        $this->localize();
    }

    /**
     * Enqueue assets for custom blocks in the frontend only when needed by the blocks.
     */
    public function frontend_enqueue_scripts() {
        // We need to use the localize of customBlocks also in the frontend.
        $this->localize();
        !wp_script_is( 'swiper', 'enqueued' ) && (has_block( 'gutenberg-blocks/hero-slider' ) || has_block( 'gutenberg-blocks/paginated-posts' ) ) && wp_enqueue_script( 'swiper', PLUGIN_URL . 'assets/build/lib/swiper/swiper-bundle.min.js', [], wp_get_theme()->get( 'Version' ) );
        !wp_style_is( 'swiper', 'enqueued' ) && (has_block( 'gutenberg-blocks/hero-slider' ) || has_block( 'gutenberg-blocks/paginated-posts' ) ) && wp_enqueue_style( 'swiper', PLUGIN_URL . 'assets/build/lib/swiper/swiper-bundle.min.css', [], wp_get_theme()->get( 'Version' ) );
        // !wp_script_is( 'lite-yt-embed', 'enqueued' ) && has_block( 'gutenberg-blocks/video-facade' ) && wp_enqueue_script( 'lite-yt-embed', PLUGIN_URL . 'assets/build/lib/lite-yt-embed/lite-yt-embed.min.js', [], wp_get_theme()->get( 'Version' ) );
        // !wp_style_is( 'lite-yt-embed', 'enqueued' ) && has_block( 'gutenberg-blocks/video-facade' ) && wp_enqueue_style( 'lite-yt-embed', PLUGIN_URL . 'assets/build/lib/lite-yt-embed/lite-yt-embed.min.css', [], wp_get_theme()->get( 'Version' ) );
    }
}