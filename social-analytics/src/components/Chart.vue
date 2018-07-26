
<script>
import { Bar, mixins } from 'vue-chartjs'
export default {
    name: 'chart',
    extends: Bar,
    mixins: [mixins.reactiveProp], // Use reactiveProp
    props: {
        chartData: Object, // Get data chartData from parent component
        chartOptions: Object
    },
    data () {
        return {
            options: {
                legend: {
                    display: true,
                    labels: {
                        fontSize: 20
                    }
                },
                scales:{
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Magnitude',
                            fontSize: 20
                        },
                        ticks: {
                            fontSize: 20
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Positivity',
                            fontSize: 20
                        },
                        ticks: {
                            fontSize: 20
                        }
                    }]
                }
            }
        }
    },
    mounted () {
        this.renderChart(this.chartData, this.options);
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
