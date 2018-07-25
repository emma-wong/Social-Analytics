<template>
    <div id="app">
        <Signup/>
        <Language-API/>
        <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import twit from 'twit'
import HelloWorld from './components/HelloWorld.vue'
import LanguageAPI from './components/LanguageAPI.vue'
import GetTweet from './components/GetTweet.vue'
import tweet from './components/tweet.js'
import Signup from './components/Signup.vue'

Vue.prototype.$http = axios;
Vue.prototype.$twit = twit;
Vue.prototype.$tweet = tweet;

export default {
    name: 'app',
    components: {
        Signup, 
    }
}
Vue.component("Hello-World", HelloWorld);


Vue.component("Language-API", LanguageAPI);
Vue.component("Get-Tweet", GetTweet);
</script>
<style>
body{
    background-color: #9FDFEC;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #526F75;
  margin-top: 60px;
  font-size: 30px;
}
</style>