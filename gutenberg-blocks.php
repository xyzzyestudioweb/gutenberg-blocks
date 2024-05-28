<?php
/**
 * Plugin Name:       Gutenberg Blocks
 * Description:       Example Gutenberg blocks written with ESNext standard and JSX support – build step required.
 * Requires at least: 5.8
 * Requires PHP:      7.4
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gutenberg-blocks
 *
 * @package           create-block
 */

defined( 'ABSPATH' ) || die;

require_once( __DIR__ . "/vendor/autoload.php" );

use Inc\PluginSetup;

new PluginSetup();