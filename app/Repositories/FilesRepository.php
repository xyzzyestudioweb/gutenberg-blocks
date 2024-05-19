<?php
namespace GutenbergBlocks\Repositories;

\defined( 'ABSPATH' ) || die;

class FilesRepository {

    /**
     * Get the files.
     *
     * @param  int   $post_id  The post ID.
     * @return array $response The files.
     */
    public function get_files( $post_id ) {
        $response           = [];
        $attached_documents = get_post_meta( $post_id, 'documents_repeater', false );
        if ( empty( $attached_documents ) ) {
            return $response;
        }
        foreach ( $attached_documents[0] as $doc ) {
            if ( empty( $doc['file'] ) ) {
                continue;
            }
            $response[] = [
                'icon'  => wp_get_attachment_url( $doc['file_icon'] ),
                'title' => $doc['file_title'],
                'url'   => wp_get_attachment_url( $doc['file'] ),
            ];
        }

        return $response;
    }
}