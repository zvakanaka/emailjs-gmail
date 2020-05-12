const email = require('emailjs');

/** 
 * Usage:
 *   const { send } = require('gmailjs')(user, password);
 *   await send(to, body, subject);
 */

module.exports = init;

/**
 * 
 * @param {string} user Gmail username for send account
 * @param {string} password Gmail password for send account
 * @returns {object} Contains `send` function
 */
function init(user, password) {
  const mailServer = email.server.connect({
    user,
    password,
    host: 'smtp.gmail.com',
    ssl: true,
    port: 465
  });

  return {
    send:
    /**
    * 
    * @param {string} to Email address to send message to
    * @param {string} body Text body of email
    * @param {function} [callback=null] Called once message is sent
    * @param {string} [subject=''] Subject of email
    * @async
    */
   async function send(to, body, callback = null, subject = '') {
     const message = await mailServer.send({
       text: body,
       from: user,
       to,
       subject
     }, (err, cbMessage) => {
       if (callback) {
         callback(err, cbMessage);
       }
     });
   
     return message;
   }
  };
}
