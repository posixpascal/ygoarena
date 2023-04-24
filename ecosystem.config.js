module.exports = {
  apps : [{
    script: 'pnpm run start',
    watch: '.',
    shared: ['.env']
  }],

  deploy : {
    production : {
      user : 'root',
      host : 'h2955974.stratoserver.net',
      ref  : 'origin/main',
      repo : 'git@github.com:posixpascal/ygoarena.git',
      path : '/opt/ygoarena/',
      'pre-deploy-local': '',
      'post-deploy' : 'rm /opt/ygoarena/source/.env && ln -sf /opt/ygoarena/shared/.env /opt/ygoarena/source/.env && pnpm install && pnpm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
