<template>
    <div class = "title">
        <button v-on:click="callGetTweet">Get Tweet</button>
        <p>{{ status }}</p>
        <p>{{ json }}</p>
    </div>
</template>

<script>
export default {
    name: 'GetTweet',
    data: function(){
        return {
            json: "",
            status: "waiting",
            response: ""
        }
    },
    methods: {
        callGetTweet: function () {

            this.$http.get( 'http://3dmoldgenerator.com:8000/', {
                    user_id: "WWE"
            })
            
                .then( response => {
                    this.something = "success";
                    this.$data.json = response.data;
                } ).catch(error => {
                    this.something = error;
                });

            //const twit = require('twit');  

            //this.$data.json = this.$tweet()

            /*this.$http.get( 'https://api.twitter.com/1.1/statuses/user_timeline.json', {
                    user_id: "WWE"

            })
            
                .then( response => {
                    this.something = "success";
                    this.$data.json = response.data;
                } ).catch(error => {
                    this.something = error;
                });*/


            /*let Twitter = twit({
                consumer_key:         'BeFoAu6uSrfrdbqZYLdj6WbNi',
                consumer_secret:      'H4VbGk6N6mbVs3XjKVanaASF09YWjmM7SE3C33I4em40xlIor2',
                access_token:         '1015107663695261696-5iLyh0RTOd1ekk0UKn2UdeKgxL6Poh',
                access_token_secret:  'nDVnX00tpNkfnLe5I4F9BGekoHIDcEc1shd9w6mfdlyow',
                timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
                strictSSL:            true,     // optional - requires SSL certificates to be valid.
            })

            Twitter.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
                console.log(err)
            })*/

            /*let params = {
              q: 'HolloW1one',
              count: '100',
              result_type: 'recent',
              lang: 'en'
            }

            Twitter.get('search/tweets', params, function(err, data) {
                this.$data.status = "success";
            });

            /*Twitter.get( 'search/tweets', params )
                .then( response => {
                    this.$data.status = "success";
                    this.$data.json = response;
                } ).catch(error => {
                    this.$data.status = "error";
                    this.$data.json = error
                });*/
        }
    },
    mounted: function() {
        this.callGetTweet();
    }
}
</script>