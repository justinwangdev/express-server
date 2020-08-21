Express-Server for MHS
===

## Installation

> Built with FreeBSD 12.1, Node.js v14.4.0

1. Install Nodejs.
2. Install pm2 $npm install pm2
3. Clone repository.
4. cd to express-server.
5. Run $npm install.
6. Run $pm2 start bin/www --watch --max-memory-restart 20M.

> Set config file

1. create a file userConfig.js in root folder
```
//in userConfig.js

const mysqlConfig = {
    host: 'your host',
    user: 'your user',
    password: 'your password',
    database: 'your database'
}

module.exports = {mysqlConfig};
```

## Appendix and FAQ

:::info
**Find this document incomplete?** Leave a comment!
:::

###### tags: `expressjs`
