const gulp = require('gulp');
const $ = require('gulp-load-plugins')({
    pattern: ['merge-stream', 'vinyl-buffer', 'imagemin-pngquant', 'path'],
    overridePattern: false
});

const DEFAULT_CFG = {
    dest: './spritesheet',
    images: './images/*.png',
    outImgName: 'spritesheet',

    verbose: false,
    padding: 2,
    pngquantOptions: {
        quality: '30-75',
        floyd: 1,
        speed: 3
    },

    retina: '@2x',
    outDataExt: 'json', // 'js' || 'json'

    outImgExt: 'png',
    cssTemplate: ''
};

let cfg = {};

gulp.task('sprites', () => {

    cfg.jsMode = cfg.outDataExt === 'js';

    if (!cfg.cssTemplate) {
        cfg.cssTemplate = $.path.resolve(
            __dirname,
            `templates/createjs-${cfg.jsMode ? 'lib' : 'ss'}.template.hbs`
        );
    }

    const pngquantOptions = JSON.parse(JSON.stringify(cfg.pngquantOptions));
    pngquantOptions.verbose = cfg.verbose;

    const imageMinOptions = [
        $.imageminPngquant(pngquantOptions)
    ];

    const spriteSmithConfig2x = {
        imgName: `${cfg.outImgName}${cfg.retina}.${cfg.outImgExt}`,
        cssName: `${cfg.outImgName}${cfg.retina}.${cfg.outDataExt}`,
        cssTemplate: cfg.cssTemplate,
        padding: cfg.padding * 2
    };

    const spriteSmithConfig1x = JSON.parse(
        JSON.stringify(spriteSmithConfig2x).replace(new RegExp(cfg.retina, 'g'), '')
    );
    spriteSmithConfig1x.padding = cfg.padding;

    spriteSmithConfig2x.cssVarMap = (sprite) => {
        sprite.name = sprite.name.replace(cfg.retina, '');
    };

    const srcImagesStream = gulp.src(cfg.images);

    const sprites2x = srcImagesStream
        .pipe($.spritesmith(spriteSmithConfig2x));

    // Pipe image stream through image optimizer
    const imgStream2x = sprites2x.img
        .pipe($.vinylBuffer())
        .pipe($.imagemin(imageMinOptions, {verbose: cfg.verbose}));

    // Pipe JS/JSON stream through optimizer
    const jsStream2x = cfg.jsMode ? sprites2x.css.pipe($.uglify()) : sprites2x.css;

    const sprites1x = srcImagesStream
        .pipe($.jimp({
            '': {
                scale: 0.5,
            }
        }))
        .pipe($.rename((path) => {
            path.basename = path.basename.replace(cfg.retina, '');
        }))
        .pipe($.spritesmith(spriteSmithConfig1x));

    const imgStream1x = sprites1x.img
        .pipe($.vinylBuffer())
        .pipe($.imagemin(imageMinOptions, {verbose: cfg.verbose}));


    const jsStream1x = cfg.jsMode ? sprites1x.css.pipe($.uglify()) : sprites1x.css;

    // Return the merged stream to handle all `end` events and write to disk
    return $.mergeStream(imgStream2x, jsStream2x, imgStream1x, jsStream1x)
        .pipe(gulp.dest(cfg.dest));
});

function cjsSpritesheetGenerator(options = {}) {
    cfg = Object.assign(JSON.parse(JSON.stringify(DEFAULT_CFG)), options);
    gulp.start('sprites');
}

module.exports = cjsSpritesheetGenerator;
