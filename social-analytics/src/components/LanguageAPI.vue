<template>
    <div id = "title">
        <div class="container">
            <div class="row">
                <div class=".col-xs-8 .col-xs-offset-2">
                    <h1>Twitter</h1>

                    <div class="form-group">
                        <input class="form-control, text" v-model="user_id" placeholder="@Twitter"><br>
                    </div>

                    <button class="cp_btn" v-on:click="getTweet" v-scroll-to="'#result'">Analyze</button><br><br>

                    <div class = row>
                        <p class="col-lg-10 offset-lg-1">We think that you’re internet identity is important. From your Twitter account, we’ve gathered the following information about how your social media data represents you online. </p>
                    </div>
                    
                    <h2 id="result">{{ something }}</h2><br>

                    <p>{{ overallDescription1 }}<strong>{{ overallDescription2 }}</strong>{{ overallDescription3 }}</p>

                    <h3>Positivity Graph</h3>
                    <Chart :width="50" :height="10" :chartData="chartData"/><br>

                    <div class = "row">
                        <p class="col-lg-10 offset-lg-1">The graph shown above displays the positivity of the tweets with -100 being extremely negative and 100 being extremely positive as well as the respective magnitudes of the tweets from each present sentiment level, indicating the strength of the perceived sentiment.</p>
                    </div>

                    <p>{{ sentimentAverage }}</p>
                    <h3>Top categories of your tweets</h3>
                    <p>These are the top three categories that the content of your tweets can be associated with.</p>
                    <p>1. {{ tweetTopCategories[0].category }}</p>
                    <p>2. {{ tweetTopCategories[1].category }}</p>
                    <p>3. {{ tweetTopCategories[2].category }}</p>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
import Chart from '../components/Chart.vue'

export default {
    name: 'LanguageAPI',
    components: {
        Chart
    },
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
            dataCount: 10,    // number of tweet to get
            chartData: {},  // main chart data
            chartDataHist: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],   // create a histgram of positiveness
            tweetCategories: [],
            tweetTopCategories: [{"category":"-", "confidence":"-"}, // top 3 categories
                {"category":"-", "confidence":"-"},
                {"category":"-", "confidence":"-"}],
            overallDescription1: "",
            overallDescription2: "",
            overallDescription3: ""
        }
    },
    methods: {
        callLanguageAPI: async function () {

            let params = {
              "document":{
                "type":"PLAIN_TEXT",
                "language": "en",
                "content": ""
              },
            }

            for ( var i = 0; i < this.$data.tweet.text.length; i++ ) {
                // new content
                params.document.content = this.$data.tweet.text[i];

                let response  = await this.$http.post( 'https://language.googleapis.com/v1/documents:classifyText?key=AIzaSyAydMJ-w2ziu8KD8496UeYf3fH_v5ZsLiQ', params );
                if ( response ) {
                    for ( let category_num = 0; category_num < response.data.categories.length; category_num++ ) {

                        // if key exists, add 
                        if( this.tweetCategories[response.data.categories[category_num].name] ) {
                            this.tweetCategories[response.data.categories[category_num].name] += response.data.categories[category_num].confidence;
                        }else {
                            this.tweetCategories[response.data.categories[category_num].name] = response.data.categories[category_num].confidence;
                        }
                    }
                }else{
                    this.something = "error";
                }

                response  = await this.$http.post( 'https://language.googleapis.com/v1/documents:analyzeSentiment?key=AIzaSyAydMJ-w2ziu8KD8496UeYf3fH_v5ZsLiQ', params );
                if ( response ) {
                    this.$data.json.sentiment[i] = response.data.documentSentiment;
                    this.chartDataHist[this.json.sentiment[i].score * 10 + 10] += Number(this.json.sentiment[i].magnitude);
                }else{
                    this.something = "error";
                }
            }
            this.something = "Result";
            this.calcAverageSentiment();
            this.findTopCategories();
            this.updateChartData();
        },
        getTweet: async function () {
            await this.$http.get( 'http://localhost:8000/', {
                    params: {
                        user_id: this.$data.user_id,
                        count: this.$data.dataCount
                    }
            })
            
                .then( response => {
                    this.something = "Processing...";
                    this.$data.tweet = response.data;
                } ).catch(error => {
                    this.something = error;
                });

            this.callLanguageAPI();
        },
        iniChartData: function () {
            this.chartData = {
            labels: ['-100', '-80', '-60', '-40', '-20', '0', '20', '40', '60', '80', '100'],
            datasets: [
              {
                label: 'Positiveness of your tweets',
                backgroundColor: '#f87979',
                data: [10, 6, 1, 5, 7, 10, 8, 6, 3, 2, 2]
                }
            ]
          }
        },
        updateChartData: function () {
            this.chartData = {
            labels: ['-100', '-80', '-60', '-40', '-20', '0', '20', '40', '60', '80', '100'],
            datasets: [
              {
                label: 'Positiveness of your tweets',
                backgroundColor: '#f87979',
                data: [ this.chartDataHist[0]  + this.chartDataHist[1],
                        this.chartDataHist[2]  + this.chartDataHist[3],
                        this.chartDataHist[4]  + this.chartDataHist[5],
                        this.chartDataHist[6]  + this.chartDataHist[7],
                        this.chartDataHist[8]  + this.chartDataHist[9],
                        this.chartDataHist[10] * 2,
                        this.chartDataHist[11] + this.chartDataHist[12],
                        this.chartDataHist[13] + this.chartDataHist[14],
                        this.chartDataHist[15] + this.chartDataHist[16],
                        this.chartDataHist[17] + this.chartDataHist[18],
                        this.chartDataHist[19] + this.chartDataHist[20]
                    ]
                }
            ]
          }
        },
        calcAverageSentiment: function () {
            let sum = 0;
            for ( let dataNum = 0; dataNum <= 20; dataNum++ ) {
                sum += this.chartDataHist[dataNum];
            }
            let sentimentAverage = sum / this.dataCount;

            this.overallDescription1 = 'Overall, your social media data portrays you as a ';

            if ( sentimentAverage < -0.5 ) 
                this.overallDescription2= "extremely negative";
            else if ( sentimentAverage < 0 )
                this.overallDescription2 = "moderately negative";
            else if ( sentimentAverage < 0.5 )
                this.overallDescription2 = "moderately positive";
            else 
                this.overallDescription2 = "extremely positive";

            this.overallDescription3 = ' user.'; 

        },
        findTopCategories: function () {
            // find top 3
            for ( let i = 0; i < 3; i++ ) {
                let max_key = "";
                let max = 0;


                // find the max
                for ( let category in this.tweetCategories ) {
                    if ( this.tweetCategories[category] > max ) {
                        max_key = category;
                        max = this.tweetCategories[category];
                    } 
                }
                // add to the top categories
                if ( max == 0 ) {
                    this.tweetTopCategories[i] = {"category": "-", "confidence": "-"};
                }else {
                    this.tweetTopCategories[i] = {"category": max_key, "confidence": this.tweetCategories[max_key]};
                }
                
                // delete the max 
                delete this.tweetCategories[max_key];
            }
        }
    },
    mounted: function() {
        this.iniChartData();
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
    color:#526F75;;
    border:solid 1px #ccc;
    margin:0 0 20px;
    width:300px;
}
</style>