<template>
    <div class = "title">
        <p>{{ input }}</p>
        <button v-on:click="callLanguageAPI">Search</button>
        <p>{{ something }}</p>
        <p>{{json}}</p>
    
        <p>{{defOfTerms}}</p>

        <pre id="json1"></pre>
        <pre id="json2"></pre>
        <pre id="json3"></pre>
        <pre id="json4"></pre>


        <pre id="json5"></pre>
        <pre id="json6"></pre>
        <pre id="json7"></pre>
        <pre id="json8"></pre>

        

    </div>
</template>

<script>
//import grassroots from '../assets/sample.txt'   
export default {
    name: 'LanguageAPI',
    data: function(){
        return {
            json: "",
            json1:"",
            json2: "",
            json3: "",
            json4: "",

            json5:"",
            json6: "",
            json7: "",
            json8: "",

            defOfTerms: "",

            something: "waiting",
            input: "Social media is a waste of time",  
            results: "",
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
                "content": this.input
              },
              "encodingType":"UTF8"
            }
            this.$http.post( 'https://language.googleapis.com/v1/documents:analyzeEntitySentiment?key=AIzaSyAydMJ-w2ziu8KD8496UeYf3fH_v5ZsLiQ', params )
            .then( response => {
                this.something = "success";
                this.defOfTerms = "Entity sentiment analysis combines both entity analysis and sentiment analysis and attempts to determine the sentiment (positive or negative) expressed about entities within the text. Each block of text represents a subject or entity extracted from the input. The salience represents the relevance of the entity. The sentiment score explains the interpreted feelings about the entity on a scale from -1.0 to 1.0, negative numbers representing negative emotional leaning and positive numbers representing positive leaning. Lastly, the magnitude indicates the overall strength of emotion from 0.0 to +inf."
                //this.$data.json = response.data

                this.results = response.data.entities
                this.getResults(this.results)

            } ).catch(error => {
                 this.something = error;
            });
        },
        getResults: function (tmpData) {
            document.getElementById("json1").innerHTML = JSON.stringify("Name: " + tmpData[0].name, undefined, 2);
            document.getElementById("json2").innerHTML = JSON.stringify("Salience: " + tmpData[0].salience, undefined, 2);
            document.getElementById("json3").innerHTML = JSON.stringify("Sentiment Score: " + tmpData[0].sentiment.score, undefined, 2);
            document.getElementById("json4").innerHTML = JSON.stringify("Sentiment Magnitude: " + tmpData[0].sentiment.magnitude, undefined, 2);


          document.getElementById("json5").innerHTML = JSON.stringify("Name: " + tmpData[1].name, undefined, 2);
            document.getElementById("json6").innerHTML = JSON.stringify("Salience: " + tmpData[1].salience, undefined, 2);
            document.getElementById("json7").innerHTML = JSON.stringify("Sentiment Score: " + tmpData[1].sentiment.score, undefined, 2);
            document.getElementById("json8").innerHTML = JSON.stringify("Sentiment Magnitude: " + tmpData[1].sentiment.magnitude, undefined, 2);    
        }
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
  white-space:pre-line
}

#json2 {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-left: 400px;
  margin-right:;
  font-size: 14px;
}

#json3 {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-left: 400px;
  margin-right:;
  font-size: 14px;
}

#json4 {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-left: 400px;
  margin-right:;
  font-size: 14px;
  white-space:pre
}

#json5 {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 40px;
  margin-left: 400px;
  margin-right:;
  font-size: 14px;
  white-space:pre-line
}

#json6 {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-left: 400px;
  margin-right:;
  font-size: 14px;
  white-space:pre-line
}

#json7 {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-left: 400px;
  margin-right:;
  font-size: 14px;
  white-space:pre-line
}

#json8 {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-left: 400px;
  margin-right:;
  font-size: 14px;
  white-space:pre-line      
}
</style>