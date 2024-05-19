<?php
namespace GutenbergBlocks;

\defined( 'ABSPATH' ) || die;

class App {
    private static $instance = null;

    public static function instance() {
        if ( null === self::$instance ) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public function run() {
        $this->load_controllers();
    }

    private function load_controllers() {
        $controllers = [
            'AssetsController',
            'ApiController',
            'BlocksController',
        ];

        foreach ( $controllers as $controller ) {
            $controller = __NAMESPACE__ . '\\Controllers\\' . $controller;
            $controller = new $controller();
        }
    }

}