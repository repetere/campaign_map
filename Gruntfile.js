'use strict';

const path = require('path');
const finalhandler = require('finalhandler');
const serveStatic = require('serve-static');
const serve = serveStatic(__dirname+'/public', { 'index': ['index.html', 'index.htm'] });


module.exports = (grunt) => {
  grunt.initConfig({
    env: {
      prod: {
        NODE_ENV: 'development',
      },
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      all: [
        '!app/doc/**/*.js',
        'Gruntfile.js',
        'src/**/*.js',
        'test/**/*.js',
        'package.json',
      ],
    },
    browserify: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*_src.js'],
          dest: 'public/build',
          rename: function (dest, src) {
            var finallocation = path.join(dest, src);
            finallocation = finallocation.replace('_src', '_build');
            // finallocation = finallocation.replace('resources', 'public');
            finallocation = path.resolve(finallocation);
            return finallocation;
          },
        }],
        options: {
          transform: [
            ['babelify', {
              presets: ['es2015', 'react'],
            }]
          ],
        },
      },
    },
    uglify: {
      options: {
        sourceMap: true,
        compress: {
          drop_console: false,
        },
      },
      all: {
        files: [{
          expand: true,
          cwd: 'public/build',
          src: ['**/*_build.js'],
          dest: 'public/build',
          rename: function (dest, src) {
            var finallocation = path.join(dest, src);
            finallocation = finallocation.replace('_build', '.min');
            finallocation = path.resolve(finallocation);
            return finallocation;
          },
        }],
      },
    },
    connect: {
      server: {
        options: {
          port: 8100,
          base: {
            path: 'public',
            options: {
              index: 'index.html',
              maxAge: 300000,
            },
          },
          debug: true,
          // keepalive: true,
          middleware: [
            function myMiddleware(req, res, next) {
              console.log('middleware call');
              next();
            },
            function staticFiles(req, res) {
              serve(req, res, finalhandler(req, res));
            },
          ],
        },
      },
    },
    watch: {
      options: {
        interrupt: true,
      },
      // css: {
      //   files: ['public/stylesheets/**/*.less'],
      //   tasks: ['newer:less']
      // },
      js: {
        files: ['<%= jshint.all %>'],
        tasks: ['env', 'browserify', 'newer:uglify'],
      },
    },
  });

  // Loading dependencies
  for (var key in grunt.file.readJSON('package.json').devDependencies) {
    if (key.indexOf('grunt') === 0 && key !== 'grunt') {
      grunt.loadNpmTasks(key);
    }
  }
  // grunt.registerTask('doc', 'jsdoc');
  // grunt.registerTask('test', 'mocha_istanbul');
  grunt.registerTask('lint', 'jshint');
  grunt.registerTask('default', ['connect', 'watch']);
};