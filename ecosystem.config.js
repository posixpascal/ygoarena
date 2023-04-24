module.exports = {
  apps : [{
    script: 'echo',
    watch: '.'
  }],

  deploy : {
    production : {
      user : 'root',
      host : 'h2955974.stratoserver.net',
      ref  : 'origin/main',
      repo : 'git@github.com:posixpascal/ygoarena.git',
      path : '/opt/ygoarena/',
      'pre-deploy-local': '',
      'post-deploy' : 'pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
