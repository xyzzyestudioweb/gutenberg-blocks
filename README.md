# Gutenberg Blocks

Contributors:      Adriana Hernández Regueiro
Tags:              gutenberg, block, wordpress, plugin
Tested up to:      6.5.3
Stable tag:        0.1.0
License:           GPL-3.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-3.0.html

Simple WordPress plugin with a group of custom Gutenberg blocks written with Javascript and JSX support – build step required.

## Description

Group of reusable Gutenberg blocks to use on any project.

## Installation

1. Upload the plugin files to the `/wp-content/plugins/gutenberg-blocks` directory.
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Build assets: Go to the plugin folder from terminal, and run these commands (`v19.6.0` of Node is recommended): 
   ```
   npm install
   gulp
   npm run build
   ```
4. Enjoy!

## Contributing

You are welcome to contribute with this project. You can create a fork from [this repository](https://github.com/adrianahdez/gutenberg-blocks) and send PRs or open issues [here](https://github.com/adrianahdez/gutenberg-blocks/issues).

## Changelog

* 0.1.0
  * Release
