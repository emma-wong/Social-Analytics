const twit = require('twit');  
let Twitter = twit({
    consumer_key:         'BeFoAu6uSrfrdbqZYLdj6WbNi',
    consumer_secret:      'H4VbGk6N6mbVs3XjKVanaASF09YWjmM7SE3C33I4em40xlIor2',
    access_token:         '1015107663695261696-5iLyh0RTOd1ekk0UKn2UdeKgxL6Poh',
    access_token_secret:  'nDVnX00tpNkfnLe5I4F9BGekoHIDcEc1shd9w6mfdlyow',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

Twitter.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
    console.log(data)
})