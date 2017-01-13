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
}
