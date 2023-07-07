module.exports = {
    apps : [{
      name   : 'primary',
      script : './server.js',
      exec_mode: 'cluster',
      instances: 1
    },
    {
        name: 'replica',
        script: './server.js',
        exec_mode: 'cluster',
        instances: -1
    }]
  }
