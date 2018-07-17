<template>
    <div class = "title">
        <p>{{ input }}</p>
        <button v-on:click="callLanguageAPI">Search</button>
        <p>{{ something }}</p>
        <p>{{ json }}</p>
        <pre id="json1"></pre>
    </div>
</template>

<script>
//const input = 'test input';    
export default {
    name: 'LanguageAPI',
    data: function(){
        return {
            json: "",
            json1: "",
            something: "waiting",
            input: "Meryl Streep, one of the most over-rated actresses in Hollywood, doesn’t know me but attacked last night at the Golden Globes. She is a Hillary flunky who lost big. For the 100th time, I never “mocked” a disabled reporter (would never do that) but simply showed him “grovelling” when he totally changed a 16 year old story that he had written in order to make me look bad. Just more very dishonest media!"
                }
    },
    methods: {
        changeTitle: function () {
            this.$data.title = "this is a new title"
        },
        callLanguageAPI: function () {
            let params = {
              "document":{
                "type":"PLAIN_TEXT",
                "language": "EN",
                "content":"Meryl Streep, one of the most over-rated actresses in Hollywood, doesn’t know me but attacked last night at the Golden Globes. She is a Hillary flunky who lost big. For the 100th time, I never “mocked” a disabled reporter (would never do that) but simply showed him “grovelling” when he totally changed a 16 year old story that he had written in order to make me look bad. Just more very dishonest media!"
              },
              
              "encodingType":"UTF8"
            }
            this.$http.post( 'https://language.googleapis.com/v1/documents:analyzeEntitySentiment?key=AIzaSyAydMJ-w2ziu8KD8496UeYf3fH_v5ZsLiQ', params )
            
            .then( response => {
                this.something = "success";
                //this.$data.json = response.data;
                var tmp = response.data;
                document.getElementById("json1").innerHTML = JSON.stringify(tmp, undefined, 2);
            } ).catch(error => {
                 this.something = error;
            });
        }
    },
    mounted: function() {
    }
}
</script>


<style>
#json1 {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 40px;
  margin-left: 400px;
  margin-right:;
  font-size: 14px;
}
</style>