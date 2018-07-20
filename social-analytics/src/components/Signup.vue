
<template>
    <div>
        <h1> Welcome to Social Analytics! </h1>
        <h3> Signup </h3>   
        <div>
            <label> Name  </label>
            <input type="text" name="name" v-model="name">  <br>
            <label>Email </label>
            <input type="text" name="email" v-model="email"> <br>
            <label> Password  </label>
            <input type="text" name="password" v-model="password">
            <br>
            <button v-on:click="sendData"> Signup </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Signup", 
    data: function(){
        return {
            name: "", 
            email: "", 
            password: ""
        }
    },
    methods: {
        // Ideally, we should validate the data before storing in the DB
        sendData: function(event){
            alert('NAME: '+ this.name + '\nEMAIL:  '+ this.email + '\nPASSWORD: ' + this.password);
        }
    }
}
</script>