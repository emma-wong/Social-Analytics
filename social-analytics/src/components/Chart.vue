
<script>
import { Bar, mixins } from 'vue-chartjs'
export default {
    name: 'chart',
    extends: Bar,
    mixins: [mixins.reactiveProp], // Use reactiveProp
    props: {
        chartData: Object // Get data chartData from parent component
    },
    mounted () {
        this.renderChart(this.chartData)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
