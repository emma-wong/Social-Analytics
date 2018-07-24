<template>
    <div id = "title">
        User ID: 
        <input class="text" v-model="user_id" placeholder="account name"><br><br>
        <button class="cp_btn" v-on:click="getTweet">Get Tweet</button><br><br>
        <br>
        <button class="cp_btn" v-on:click="callLanguageAPI">Search</button>
        <p>{{ something }}</p>
        <li v-for="value2 in json.sentiment">
            {{ value2 }}
        </li>

    </div>
</template>
<script>
export default {
    name: 'LanguageAPI',
    data: function() {
        return {
            json: {
                sentiment: []
            },
            something: "",
            user_id: "",
            tweet: {
                text: []
            },
            dataCount: 2    // number of tweet to get
        }
    },
    methods: {
        callLanguageAPI: async function () {

            let params = {
              "document":{
                "type":"PLAIN_TEXT",
                "language": "EN",
                "content": ""
              },
              
              "encodingType":"UTF8"
            }

            for ( var i = 0; i < this.$data.tweet.text.length; i++ ) {
                // new content
                params.document.content = this.$data.tweet.text[i];

                const response  = await this.$http.post( 'https://language.googleapis.com/v1/documents:analyzeSentiment?key=AIzaSyAydMJ-w2ziu8KD8496UeYf3fH_v5ZsLiQ', params );
                if ( response ) {
                    this.$data.json.sentiment[i] = response.data.documentSentiment;
                }else{
                    this.something = error;
                }
            }
            this.something = "process completed";

        },
        getTweet: function () {
            this.$http.get( 'http://localhost:8000/', {
                    params: {
                        user_id: this.$data.user_id,
                        count: this.$data.dataCount
                    }
            })
            
                .then( response => {
                    this.something = "obrained tweet";
                    this.$data.tweet = response.data;
                } ).catch(error => {
                    this.something = error;
                });
        }
    },
    mounted: function() {
        //this.callLanguageAPI();
    }
}
</script>

<style>
#title {
  font-size: 20px;
}


.cp_btn {
width: 160px;
padding: 0.8em;
text-align: center;
text-decoration: none;
font-size: 0.8em;
color: #52C0CD;
border: 2px solid #52C0CD;
border-radius: 3px;
transition: .4s;
}
.cp_btn:hover {
background: #52C0CD;
color: #fff;
}

.text{
    border:0;
    padding:10px;
    font-size:1.3em;
    font-family:Arial, sans-serif;
    color:#526F75;;
    border:solid 1px #ccc;
    margin:0 0 20px;
    width:300px;
}
</style>