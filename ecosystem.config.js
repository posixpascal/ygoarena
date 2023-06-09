module.exports = {
  apps : [{
    script: 'pnpm run start',
    watch: '.',
    shared: ['.env', 'public/', 'dev.db']
  }],

  deploy : {
    production : {
      user : 'root',
      host : 'h2955974.stratoserver.net',
      ref  : 'origin/main',
      repo : 'git@github.com:posixpascal/ygoarena.git',
      path : '/opt/ygoarena/',
      'pre-deploy-local': '',
      'post-deploy' : 'rm -f /opt/ygoarena/source/.env && ln -sf /opt/ygoarena/shared/.env /opt/ygoarena/source/.env && pnpm install && pnpm run build && pm2 reload ecosystem.config.js --env production && cp -R shared/public/* source/public/  && ln -sf /opt/ygoarena/shared/dev.db /opt/ygoarena/source/dev.db',
      'pre-setup': ''
    }
  }
};
