<template>
    <div class = "title">
        <button v-on:click="callVisionAPI">Search</button>
        <p>{{ something }}</p>
        <p>{{ json }}</p>
    </div>
</template>

<script>
export default {
    name: 'VisionAPI',
    data: function(){
        return {
            json: "",
            something: "waiting"
        }
    },
    methods: {
        changeTitle: function () {
            this.$data.title = "this is a new title"
        },
        callVisionAPI: function () {
            /*let params = new URLSearchParams();
            params.append('requests', {
                imege: {
                    content: 'assets/logo.png'
                },
                features: {
                    type: 'LABEL_DETECTION',
                    maxResults: 5
                }
            });*/

            let params = {
              "requests":[
                {
                  "image":{
                    "content":""
                  },
                  "features":[
                    {
                      "type":"LOGO_DETECTION",
                      "maxResults":1
                    }
                  ]
                }
              ]
            }

            this.$http.post( 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyA2bG9TQXZnbMh-njF4G0Tj9C_9UKw8tuw', params )
                .then( response => {
                    this.something = "success";
                    this.$data.json = response.data;
                } ).catch(error => {
                    this.something = error;
                });
        }
    },
    mounted: function() {
        //this.callVisionAPI();
    }
}
</script>