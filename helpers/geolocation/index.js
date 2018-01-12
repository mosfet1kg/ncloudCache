const ncloud = require('ncloud');
const { CONSUMER_KEY, CONSUMER_SECRET } = process.env;

const client = ncloud.createClient({
  oauth_consumer_key: CONSUMER_KEY,
  oauth_consumer_secret: CONSUMER_SECRET
});

module.exports = (function() {
  return {
    getLocation: ({ ip }, callback ) => {
      if ( ip.includes('::ffff:') ) {
        ip = ip.replace('::ffff:','');
      }

      client.openapi.geolocation.findLocation({ ip, ext: 't' }, (error, response) => {
        if ( error ) {
          return callback( error );
        }
        callback( null, response );
      })
    }
  }
})();
