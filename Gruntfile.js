module.exports = function(grunt) {
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-sass');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-autoprefixer');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-spritesmith');
grunt.loadNpmTasks('grunt-contrib-jade');
grunt.initConfig({
    
  jade: {
    compile: {
      options: {
        client: false,
        pretty: true
      },
      files: [ {
        cwd: "",
        src: "*.jade",
        dest: "",
        expand: true,
        ext: ".html"
      } ]
    }
  },   
  
  sass: {                              
    dist: {                            
      options: {                       
        outputStyle: 'nested'
      },
      files: {                        
        'css/style.css' : ['scss/style.scss']
      }
    }
  },

  autoprefixer: {
    single_file: {
        options: {
          browsers: ['last 2 versions', 'ie 8', 'ie 9']
        },
      src: 'css/style.css',
      dest: 'css/prefixed/style.css'
    }
  },

  cssmin: {
    target: {
      files: {
        'css/minified/style.css': 'css/prefixed/style.css'
      }
    }
  },

  jshint: {
    options: {
        reporter: require('jshint-stylish')
      },
    target: ['js/*.js']
  },

 concat: {
    options : {
      sourceMap :true
    },
    dist: {
      src: [
        'js/libs/*.js',
        'js/*.js'
      ],
      dest: 'js/concat/script.js'
    }
  }, 

  uglify: {
    my_target: {
      options: {
        sourceMap: true,
        sourceMapIncludeSources : true,
        sourceMapIn: 'js/concat/script.js.map'
      },
      files: {
        'js/minified/script.min.js' : ['js/concat/script.js']
      } 
    } 
  },

  sprite:{
    all: {
      src: 'sprites/*.jpg',
      dest: 'sprites/spritesheet.jpg',
      destCss: 'scss/utilities/_sprites.scss'
    }
  },

  imagemin: {
    dist: {
      files: [{
        expand: true,
        cwd: 'images/',
        src: '*.{gif,GIF,jpg,JPG,png,PNG}',
        dest: 'images/'
      }]
    }
  },

  watch: {
    options: {livereload: true},
      scripts : {
        files: ['js/*.js'],
        tasks: ['jshint', 'concat', 'uglify'],
        options: {
        spawn: false,
        },
      },
      sass: {
        files: ['scss/**/*.scss'],
        tasks: ['sass','autoprefixer','cssmin'],
        options: {
        spawn: false,
        },
      },
      jade: {
        files: ['*.jade'],
        tasks: ['jade'],
        options: {
        spawn: false,
        },
      },
      html: {
        files: ['**/*.html'],
        options: {
        spawn: false,
        },
      }
    }
})

grunt.registerTask('default','watch');
grunt.registerTask('img','imagemin');
grunt.registerTask('spritesheet','sprite')

} 