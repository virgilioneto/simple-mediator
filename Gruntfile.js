'use strict'
const {clean, copy, sass} = require('./gruntTasks')

module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt)
  require('time-grunt')(grunt)

  grunt.configObject = {
    app: {
      src: 'src',
      www: 'www'
    }
  }

  clean.load(grunt.configObject)
  copy.load(grunt.configObject)
  sass.load(grunt.configObject)

  grunt.initConfig(grunt.configObject)

  grunt.registerTask('dev', [
    'clean:default',
    'copy:dev',
    'sass:dev'
  ])

/*

  grunt.initConfig({
    app: {
      src: 'src',
      dist: 'www'
    },

    clean: {
      dist: {
        src: ['<%= app.dist %>', '.tmp']
      }
    },

    copy: {
      dist: {
        expand: true,
        cwd: '<%= app.src %>',
        src: ['**!/!*.html', 'assets/fonts/!**', '!**!/!*.js', '!**!/!*.css', 'assets/config/!**'],
        dest: '<%= app.dist %>'
      },
      dev: {
        expand: true,
        cwd: '<%= app.src %>',
        src: ['**!/!*.*'],
        dest: '<%= app.dist %>'
      }
    },

    useminPrepare: {
      html: '<%= app.src %>/index.html',
      options: {
        dest: '<%= app.dist %>'
      }
    },

    usemin: {
      html: ['<%= app.dist %>/index.html']
    },

    htmlmin: {
      options: {
        useShortDoctype: true,
        removeComments: true,
        removeTagWhitespace: true,
        removeEmptyAttributes: true,
        collapseInlineTagWhitespace: true,
        conservativeCollapse: true,
        collapseWhitespace: true
      },

      dist: {
        expand: true,
        cwd: '<%= app.dist %>',
        src: '**!/!*.html',
        dest: '<%= app.dist %>'
      }
    }
  })
*/

  /* grunt.registerTask('default', [
    'clean:dist',
    'copy:dist',
    'useminPrepare',
    'concat',
    'uglify',
    'cssmin',
    'usemin',
    'htmlmin'
  ]) */
}
