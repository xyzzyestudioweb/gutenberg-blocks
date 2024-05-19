# Gutenberg Blocks

Simple WordPress plugin with a group of custom reusable Gutenberg blocks to use on any project.
Written with PHP, Javascript and JSX support – build step required.

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

## How we reuse React Components in dynamic blocks

We build our dynamic blocks as a React component that isn't aware of Gutenberg. That block accepts a prop that is used to pass block attributes. But for now, Gutenberg only allow to render the dynamic blocks using PHP. 
So, to be able to reuse the same React Component that we have in the Edit function we based on [this article from WooCommerce](https://developer.woocommerce.com/2021/11/15/how-does-woocommerce-blocks-render-interactive-blocks-in-the-frontend/). 

And what we do basically is:

* When the post or page is saved, only an empty `div` element with an ID or class is saved to the Database.
* In the PHP `render_callback`, we append the block attributes as `data-` HTML attributes to that `div`. So this is what ends up being rendered in the page.
* We enqueue a new `frontend.js` file which will import the React component.
* From there, we just need to render the React component as you would render any other React app: `render(BlockComponent, divElement)`. We read `data-` HTML attributes and pass them as props to the component.

## License

WordPress is free software, and is released under the terms of the GNU General Public License version 2 or (at your option) any later version.

## Changelog

* 0.1.0
  * Release
