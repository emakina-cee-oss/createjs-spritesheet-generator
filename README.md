This project requires nodejs >= 8.1 incl. npm 5 to be installed.

In your project call
npm i --save createjs-spritesheet-generator
to install

Usage:

Create a js file that you can execute with node
```
const cjsSpritesheetGenerator = require('createjs-spritesheet-generator');

const options = {
    dest: 'dist/spritesheets',
    images: 'src/images@2x/*.png',
};

cjsSpritesheetGenerator(options);
```

Supported options:

dest: {String} output path, default: './spritesheet'
images: {String} supports globs, default: './images/\*.png'
outImgName: {String} name of ss that will be generated witout ext, default: 'spritesheet'
verbose: {Boolean} logs to console, default: false
padding: {Number} Space between sprites in px - doubled for retina version, default: 2
pngquantOptions: { the options will be passed to imageminpngquant
    quality: {String} range between 0..100, default: '30-75'
    floyd: {Number} between 0..1, default: 1
    speed: {Number} between 0..10 - 10 is fastest with decreased quality, default: 3
},

retina: {String} retina suffix - provide falsy value to disable retina support, default:  '@2x'
outDataExt: {String} 'js' || 'json' - ext of generated data file - decides which hbs template will be used, default: 'json'

outImgExt: {String} 'png' || 'jpg' - ext of generated image file, default: 'png',
cssTemplate: {String} 'pathtotemplate' - provide your own handlebars template, default: ''
