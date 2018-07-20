<template>
    <div id = "title">
        User ID: 
        <input class="text" v-model="user_id" placeholder="account name"><br><br>
        <button class="cp_btn" v-on:click="getTweet">Get Tweet</button>
        <p>{{ text }}</p>
        <button class="cp_btn" v-on:click="callLanguageAPI">Search</button>
        <p>{{ something }}</p>
        <p>{{ json }}</p>
    </div>
</template>
<script>
export default {
    name: 'LanguageAPI',
    data: function() {
        return {
            json: "",
            something: "",
            user_id: "",
            text: ""
        }
    },
    methods: {
        callLanguageAPI: function () {

            let params = {
                "encodingType": "UTF8",
              "document":{
                "type":"PLAIN_TEXT",
                "language": "EN",
                "content": this.$data.text
              },
              
              "encodingType":"UTF8"
            }
            this.$http.post( 'https://language.googleapis.com/v1/documents:analyzeSentiment?key=AIzaSyAydMJ-w2ziu8KD8496UeYf3fH_v5ZsLiQ', params )
            
                .then( response => {
                    this.something = "success";
                    this.$data.json = response.data;
                } ).catch(error => {
                    this.something = error;
                });
        },
        getTweet: function () {
            this.$http.get( 'http://3dmoldgenerator.com:8000/', {
                    params: {
                        user_id: this.$data.user_id
                    }
            })
            
                .then( response => {
                    this.something = "success";
                    this.$data.text = response.data;
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