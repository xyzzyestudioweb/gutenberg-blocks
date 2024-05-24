<?php
namespace GutenbergBlocks\Services;

use GutenbergBlocks\Repositories\PostsRepository;
use WP_oEmbed;
use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;

\defined( 'ABSPATH' ) || die;

class GetPostsService {
    private $posts_repository;

    public function __construct() {
        $this->posts_repository = new PostsRepository();
    }

    /**
     * Get the posts.
     *
     * @param  WP_REST_Request    $request The request object.
     * @return WP_REST_Response
     */
    public function get( WP_REST_Request $request ): WP_REST_Response {
        if ( $request->get_method() !== WP_REST_Server::READABLE ) {
            return new WP_REST_Response(
                [
                    'code'    => 'method_not_allowed',
                    'message' => __( 'Method not allowed.', PLUGIN_TEXTDOMAIN ),
                ],
                405 );
        }

        $post_type = !empty( $request->get_param( 'post_type' ) ) ? $request->get_param( 'post_type' ) : 'post';
        $per_page  = !empty( (int) $request->get_param( 'per_page' ) ) ? (int) $request->get_param( 'per_page' ) : 6;
        $page      = !empty( (int) $request->get_param( 'page' ) ) ? (int) $request->get_param( 'page' ) : 1;
        $page_lang = !empty( $request->get_param( 'lang' ) ) ? $request->get_param( 'lang' ) : '';

        if ( empty( $page_lang ) ) {
            $page_lang = function_exists( 'pll_current_language' ) ? pll_current_language() : '';
        }

        $response = $this->posts_repository->get_posts( $post_type, $per_page, $page, $page_lang );

        // if is wp error
        if ( is_wp_error( $response ) ) {
            return new WP_REST_Response(
                [
                    'code'    => $response->get_error_code(),
                    'message' => __( "Error getting posts: ", PLUGIN_TEXTDOMAIN ) . $response->get_error_message(),
                ],
                500 );
        }

        if ( empty( $response['posts'] ) ) {
            return new WP_REST_Response(
                [
                    'code'    => 'no_items_found',
                    'message' => __( 'No items were found. ', PLUGIN_TEXTDOMAIN ),
                ],
                404 );
        }

        return new WP_REST_Response(
            [
                'count'   => count( $response ),
                'message' => __( 'Found entities.', 'mapfre-entities' ),
                'details' => $response,
            ],
            200
        );
    }
}