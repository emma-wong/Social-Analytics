
<template>
    <div>
        <h1> Welcome to Social Analytics! </h1>
        <h6> We think that you’re internet identity is important. Let us show how your social media data represents you online.</h6>
        <h3> Sign Up Here </h3>   
        <div>
            <input type="text" class="form-control" name="name" placeholder="Name" v-model="name">  <br>
            <input type="text" class="form-control" name="email" placeholder="Email" v-model="email"> <br>
            <input type="text" class="form-control" name="password" placeholder="Password" v-model="password"> <br>
            <input type="text" class="form-control" name="twitter" placeholder="Twitter Handle" v-model="twitter"> <br>
            <button class="button" v-on:click="sendData"> Signup </button>
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
            password: "",
            twitter: ""
        }
    },
    methods: {
        // Ideally, we should validate the data before storing in the DB
        // eslint-disable-next-line
        sendData: function(event){
            alert('Name: '+ this.name + '\nEmail:  '+ this.email + '\nPassword: ' + this.password + '\nTwitter: ' + this.twitter + '\n\nPlease fill in all entry forms.');
            this.$http.get('http://localhost:3001/', {
                params: {
                    name: this.$data.name,
                    email: this.$data.email,
                    password: this.$data.password, 
                    twitter: this.$data.twitter
                }
            });
        }
    }
}
</script>


<style>

h1 {
    margin-bottom: -40px;
}

h3 {
    margin-bottom: 5px;
    color: white;
    font-size: 30px;
}

h6 {
    margin-bottom: 7px;
}

.form-control {
    border-radius: 5px;
    position: relative;
    font-size: 16px;
    height: auto;
    padding: 10px;
    margin-bottom: 3px;
}

.button {
    width: 100px;
    padding: 7px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    color: #52C0CD;
    border: 2px solid #52C0CD;
    border-radius: 3px;
    transition: .4s;
    margin-bottom: 40px;
}
.button:hover {
    background: #52C0CD;
    color: #fff;
}

</style>
