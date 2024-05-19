<?php
namespace GutenbergBlocks\Services;

use GutenbergBlocks\Repositories\FilesRepository;
use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;

\defined( 'ABSPATH' ) || die;

class GetFilesService {
    private $files_repository;

    public function __construct() {
        $this->files_repository = new FilesRepository();
    }

    /**
     * Get the files.
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

        $post_id = (int) $request->get_param( 'post_id' );

        if ( empty( $post_id ) ) {
            return new WP_REST_Response(
                [
                    'code'    => 'missing_post_id',
                    'message' => __( 'Post ID is required. ', PLUGIN_TEXTDOMAIN ) . $post_id->get_error_message(),
                ],
                400 );
        }

        $response = $this->files_repository->get_files( $post_id );

        // if is wp error
        if ( is_wp_error( $response ) ) {
            return new WP_REST_Response(
                [
                    'code'    => $response->get_error_code(),
                    'message' => $response->get_error_message(),
                ],
                500 );
        }

        if ( empty( $response ) ) {
            return new WP_REST_Response(
                [
                    'code'    => 'no_items_found',
                    'message' => __( 'No items were found.', PLUGIN_TEXTDOMAIN ),
                ],
                404 );
        }

        return new WP_REST_Response(
            [
                'count'   => count( $response ),
                'message' => __( 'Found entities.', 'mapfre-entities' ),
                'details' => $response,
            ],
            200 );

    }
}