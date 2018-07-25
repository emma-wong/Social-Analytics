
<template>
    <div>
        <h3> Signup </h3>   
        <div class="form-group">
            <input type="text" name="name" v-model="name" placeholder="Name" class="form-control">
            <input type="text" name="email" v-model="email" placeholder="Email" class="form-control">
            <input type="text" name="password" v-model="password" placeholder="Password" class="form-control">
            <br>
            <button class="cp_btn" v-on:click="sendData"> Signup </button>
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
        sendData: function(){
            alert('NAME: '+ this.name + '\nEMAIL:  '+ this.email + '\nPASSWORD: ' + this.password);
            this.$http.get('http://localhost:3000/', {
                params: {
                    name: this.$data.name,
                    email: this.$data.email,
                    password: this.$data.password 
                }
            });
        }
    }
}
</script>

<style>
.cp_btn {
width: 160px;
padding: 0.7em;
text-align: center;
text-decoration: none;
font-size: 0.8em;
color: white;
border: 2px solid white;
border-radius: 3px;
transition: .4s;
background: rgba(0,0,0,0);
}
.cp_btn:hover {
background: white;
color: #4FC3F7;
}

.form-control{
    margin: 5px;
}
</style>