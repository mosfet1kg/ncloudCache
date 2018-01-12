const redisClient = require('../redis');
const client = redisClient.getRedisClient();

module.exports = (function() {
  return {
    memoize: ( fn, ttl ) => {
      return function ( ...props ) {
        return new Promise((resolve, reject) => {
          const key = JSON.stringify(props);

          client.exists( key, (error, exists) => {
            if ( error ) {
              return reject( error );
            }

            if ( exists ) {
              client.get( key, (error, storedValue) => {
                if ( error ) {
                  return reject( error );
                }

                console.log('Cache Hit');
                resolve( JSON.parse(storedValue) );
              })
            } else {

              fn.apply(null, props)
                .then( response => {
                  client.setex( key, ttl, JSON.stringify(response), (error, result) => {
                    if ( error ) {
                      throw error;
                    }

                    console.log('Create Cache');
                    resolve( response );
                  }) // end client.set
                })
                .catch( error => {
                  reject( error );
                })
            }
          }) // end client.exists
        }) // end new Promise
      }
    }
  }
})();
