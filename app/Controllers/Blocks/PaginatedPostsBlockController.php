<?php
namespace GutenbergBlocks\Controllers\Blocks;

\defined( 'ABSPATH' ) || die;

class PaginatedPostsBlockController extends AbstractBlockController {
    public function __construct( $block_basedir, $frontend_script_handle, $block_name, $block_baseurl ) {
        $this->setAttributes( $block_basedir, $frontend_script_handle, $block_name, $block_baseurl );
    }

    public function setAttributes( $block_basedir, $frontend_script_handle, $block_name, $block_baseurl ) {
        $this->block_basedir          = $block_basedir;
        $this->frontend_script_handle = $frontend_script_handle;
        $this->block_name             = $block_name;
        $this->block_baseurl          = $block_baseurl;
    }
}