<template>
    <div class="title">
        <button v-on:click="callLanguageAPI">Search</button>
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
            something: ""
        }
    },
    methods: {
        changeTitle: function() {
            this.$data.title = "this is a new title"
        },
        callLanguageAPI: function() {
            let params = {
                "document": {
                    "type": "PLAIN_TEXT",
                    "language": "EN",
                    "content": "The windy, cold weather was unbearable this winter."
                },

                "encodingType": "UTF8"
            }
            this.$http.post('https://language.googleapis.com/v1/documents:analyzeEntitySentiment?key=AIzaSyAydMJ-w2ziu8KD8496UeYf3fH_v5ZsLiQ', params)

            .then(response => {
                this.something = "success";
                this.$data.json = response.data;
            }).catch(error => {
                this.something = error;
            });
        }
    },
    mounted: function() {
        //this.callLanguageAPI();
    }
}
</script>