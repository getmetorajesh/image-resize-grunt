module.exports = function(grunt) {
     // Project configuration.
    var mozjpeg = require('imagemin-mozjpeg');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    image_resize: {
          resize: {
              options: {
                width: 720,
                quality: 0.8
                },
            files: [{
                expand: true,
                cwd: 'MyWyndham/test/',
                src: '{,*/*/*}*.{gif,jpeg,jpg,png,JPG}',
                dest: 'tmp'
            }]
          }
    },
    imagemin:{
        dynamic: {                         // Another target
            options: {                       // Target options
                optimizationLevel: 7,
                use: [mozjpeg()],
                progressive:false
            },
          files: [{
            expand: true,                  // Enable dynamic expansion
            cwd: 'tmp',                   // Src matches are relative to this path
            src: '{,**/}*.{gif,jpeg,jpg,png,JPG}',   // Actual patterns to match
            dest: 'tmp'                  // Destination path prefix
        }]
        }
    },
    imageoptim:{
        myJpgs: {
            options: {
              jpegMini: true,
              imageAlpha: true,
              quitAfter: false
            },
            src: ['tmp']
        }
    },
    img: {
        task1: {
            src: 'tmp',
        },
    },
     image: {
        dynamic: {
            options: {
            pngquant: true,
            optipng: true,
            advpng: true,
            jpegtran: true,
          jpegRecompress: true,
          jpegoptim: true,
        },
        files: [{
          expand: true,
          cwd: 'tmp',
          src: ['**/*.{png,jpg,gif,svg,JPG}'],
          dest: 'tmp'
        }]
      }
     },
    imgmin: {
        files: [{
         expand: true,
          cwd: 'tmp',
          src: ['**/*.{png,jpg,gif,svg,JPG}'],
          dest: 'tmp'
        }]
  },
    image_resize: {
          crop: {
              options: {
                width: 100,
                quality: 1,
                crop: true
                },
            files: [{
                expand: true,
                cwd: 'tmp/',
                src: '{,*/*/*}*.{gif,jpeg,jpg,png,JPG}',
                dest: 'tmp/thumbs'
            }]
          }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-image-resize');
  grunt.loadNpmTasks('imagemin-mozjpeg');
  grunt.loadNpmTasks('grunt-imageoptim');
  grunt.loadNpmTasks('grunt-img');
  grunt.loadNpmTasks('grunt-image');
  grunt.loadNpmTasks('grunt-smushit');
  grunt.loadNpmTasks('grunt-imgmin');
   grunt.loadNpmTasks('grunt-resize-crop');
  // Default task(s).
  grunt.registerTask('default', ['image_resize:resize','imagemin',
    'imageoptim','img','image','imgmin','resize_crop']);

};
