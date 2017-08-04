# createjs-spritesheet-generator
Create a Spritesheet from a folder of images via [spritesmith](https://github.com/Ensighten/spritesmith)

This project requires nodejs >= 8.1 incl. npm 5 to be installed.

## Getting Started
Install the module with: `npm i createjs-spritesheet-generator`

```js
const cjsSpritesheetGenerator = require('createjs-spritesheet-generator');

const options = {
    dest: 'dist/spritesheets',
    images: 'src/images@2x/*.png',
};

cjsSpritesheetGenerator(options);
```

## Documentation
`createjs-spritesheet-generator` exports the function `cjsSpritesheetGenerator` as its `module.exports`.

### options

- dest: `String` Output path, default: `'./spritesheet'`
- images: `String` Path to input-images, supports globs, default: `'./images/\*.png'`
- outImgName: `String` Name of ss that will be generated without extension, default: `'spritesheet'`
- verbose: `Boolean` En|disable logs to console, default: false
- padding: `Number` Space between sprites in `px` - doubled for retina version, default: `2`
- pngquantOptions: `Object` Will be passed to [imageminpngquant](https://github.com/imagemin/imagemin-pngquant)
    - quality: `String` Imagequality, range between `0..100`, default: `'30-75'`
    - floyd: `Number` Controls level of dithering, between `0..1`, default: `1`
    - speed: `Number` Speed between `0..10` - 10 is fastest with decreased quality, default: `3`

- retina: `String` Retina suffix - provide falsy value to disable retina support, default: `'@2x'`
- outDataExt: `String` Extension of generated data-file, `'js' || 'json'`, also decides which `hbs` template will be used, default: `'json'`

- outImgExt: `String` Extension of generated image-file, `'png' || 'jpg'`, default: `'png'`
- cssTemplate: `String` Path to custom handlebars template, default: `''`
