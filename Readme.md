Express-Server for MHS
===

## Outline

This is the server built for MHS-APP. RESTful style APIs makes the code more readable and other engineers can easily jump in.

## Installation

> Built with FreeBSD 12.1, Node.js v14.4.0

1. Install Nodejs.
2. Install pm2 `$npm install pm2`.
3. Clone repository.
4. cd to express-server.
5. Run `$npm install`.
6. create a file userConfig.js in root folder
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

## Usage

`$pm2 start bin/www --watch --max-memory-restart 20M.`

###### tags: `expressjs`
