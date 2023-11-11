<?php
/**
 * Plugin Name:       Image Container - Static
 * Plugin URI:        https://github.com/willsides/image-container-static
 * Description:       Displays an image as a background over nested blocks.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Will Sides
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       image-container-static
 *
 * @package           willsides
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function image_container_static_image_container_static_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'image_container_static_image_container_static_block_init' );
