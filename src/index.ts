// src/index.js
'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register({ strapi }) {
    // Add socket.io to the Strapi server
    const io = require('socket.io')(strapi.server.httpServer, {
      cors: strapi.config.get('server.socketConfig.cors')
    });

    // Store the io instance in strapi
    strapi.io = io;
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  bootstrap({ strapi }) {
    strapi.io.on('connection', (socket) => {
      console.log('a user connected');

      socket.on('chat message', (msg) => {
        console.log('message:', msg);
        // Broadcast to all connected clients
        strapi.io.emit('chat message', msg);
      });

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
  },

  
};