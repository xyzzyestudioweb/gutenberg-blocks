<?php

namespace Inc;

class PluginSetup {

    public function __construct()
    {
        add_action( "init", [ $this, "blocks_init" ] );
    }

    public function blocks_init() 
    {
        register_block_type( dirname( dirname( __FILE__ ) ). '/build/test-block' );
    }
}