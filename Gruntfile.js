module.exports = function(grunt) {
     // Project configuration.
     var srcPath = 'MyWyndham/test/';
     var destPath = 'tmp/';
     var dest720 = destPath+'/720p';
     var dest100 = destPath+'/100';
     var dest82 = destPath+'/82';
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
                cwd: srcPath,
                src: ['**/*.{gif,jpeg,jpg,png,JPG}'],
                dest: destPath+"/720p"
            }]
          },
          crop100: {
              options: {
                width: 100,
                quality: 1,
                crop: true
                },
            files: [{
                expand: true,
                cwd: dest720,
                src: ['**/*.{gif,jpeg,jpg,png,JPG}'],
                dest: destPath+'/100'
            }]
          },
    crop82: {
              options: {
                width: 82,
                quality: 1,
                crop: true
                },
            files: [{
                expand: true,
                cwd: dest720,
                src: ['**/*.{gif,jpeg,jpg,png,JPG}'],
                dest: destPath+'/82'
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
            cwd: dest720,                   // Src matches are relative to this path
            src: ['**/*.{gif,jpeg,jpg,png,JPG}'],   // Actual patterns to match
            dest: dest720                  // Destination path prefix
        }]
        }
    },
    imageoptim:{
        myJpgs: {
            options: {
              jpegMini: false,
              imageAlpha: true,
              quitAfter: false
            },
            src: [dest720]
        }
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
          cwd: dest720,
          src: ['**/*.{png,jpg,gif,svg,JPG}'],
          dest: dest720
        }]
      }
     },
    watch: {
      images: {
        files: [srcPath+'/**/*.{png,jpg,JPG}'],
        tasks: ['newer:image_resize:resize','newer:imagemin:dynamic','newer:imageoptim:myJpgs','newer:image'],
        options: {
          spawn: false,
        },
      },
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
 grunt.loadNpmTasks('grunt-contrib-watch');
 grunt.loadNpmTasks('grunt-newer');

  // Default task(s).
  grunt.registerTask('minify', ['image_resize:resize','imagemin',
    'imageoptim','img','image','image_resize:crop100','image_resize:crop82']);

  grunt.registerTask('minify-newer', ['newer:image_resize:resize','newer:imagemin:dynamic',
    'newer:imageoptim:myJpgs','newer:image']);

  grunt.registerTask('gen_thumb100', ['newer:image_resize:crop100']);
  grunt.registerTask('gen_thumb82', ['newer:image_resize:crop82']);
};
