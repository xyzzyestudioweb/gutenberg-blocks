<?php
/**
 * Plugin Name:       Gutenberg Blocks
 * Description:       Example block written with ESNext standard and JSX support – build step required.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gutenberg-blocks
 *
 * @package           create-block
 */

use GutenbergBlocks\App;

defined( 'ABSPATH' ) || die;

/**
 * Detects if gutenberg-blocks is installed as plugin or theme
 *
 * @return bool
 */
if ( ! function_exists( 'is_theme' ) ) {
	function is_theme(): bool {
			return strpos( dirname( __FILE__, 2 ), 'themes' );
	}
}

// Composer
require_once __DIR__ . '/vendor/autoload.php';

// App
require_once __DIR__ . '/constants.php';
require_once PLUGIN_PATH . '/app/App.php';

App::instance()->run();

