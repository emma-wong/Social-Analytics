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
        <Chart :width="50" :height="10" :chartData="chartData"/>
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
            chartDataHist: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]   // create a histgram of positiveness
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
                    this.chartDataHist[this.json.sentiment[i].score * 10 + 10] += Number(this.json.sentiment[i].magnitude);
                }else{
                    this.something = "error";
                }
            }
            this.something = "process completed";
            this.updateChartData();
        },
        getTweet: function () {
            this.$http.get( 'http://localhost:8000/', {
                    params: {
                        user_id: this.$data.user_id,
                        count: this.$data.dataCount
                    }
            })
            
                .then( response => {
                    this.something = "obtained tweet";
                    this.$data.tweet = response.data;
                } ).catch(error => {
                    this.something = error;
                });
        },
        iniChartData: function () {
            this.chartData = {
            labels: ['-100', '-80', '-60', '-40', '-20', '0', '20', '40', '60', '80', '100'],
            datasets: [
              {
                label: 'Positiveness of your tweets',
                backgroundColor: '#f87979',
                data: [10, 6, 2, 5, 7, 10, 8, 6, 3, 2, 2]
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
    font-size:1.3em;
    font-family:Arial, sans-serif;
    color:#526F75;;
    border:solid 1px #ccc;
    margin:0 0 20px;
    width:300px;
}
</style>