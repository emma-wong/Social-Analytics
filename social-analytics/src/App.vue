<template>
    <div id="app">
       <!--  <Language-API/> -->
        <Signup/>
        
        <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import HelloWorld from './components/HelloWorld.vue'
// import LanguageAPI from './components/LanguageAPI.vue'
import Signup from './components/Signup.vue'

Vue.prototype.$http = axios;

export default {
    name: 'app',
    components: {
        Signup
    }
}

Vue.component("Hello-World", HelloWorld);

</script>
<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    font-size: 20px;
}
</style>