module.exports = {
  apps : [{
    script: 'pnpm run start',
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
      'post-deploy' : 'pnpm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};