
<template>
    <div>
        <h1> Welcome to Social Analytics! </h1>
        <h3> Signup </h3>   
        <div>
            <label> Name  </label>
            <input type="text" name="name" v-model="name">  <br>
            <label>Email </label>
            <input type="text" name="email"> <br>
            <label> Password  </label>
            <input type="text" name="password">
        </div>
        {{ name }}
        {{ email }}
        {{ password }}
    </div>
</template>

<script>
export default {
    name: "Signup", 
    data: function(){
        return {
            name: "Name", 
            email: "Email", 
            password: "Password"
        }
    }
}
</script>