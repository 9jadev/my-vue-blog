<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        
        <div class="container">
            <router-link class="navbar-brand" to="/">
                 <img src="../assets/logo.png" width="30px" height="30px" alt="logo">
            </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item" v-if="!isAuthUser">
                        <router-link class="nav-link" to="/login"> Login </router-link>
                    </li>
                     <li class="nav-item"  v-if="!isAuthUser">
                        <router-link class="nav-link" to="/signup"> Signup </router-link>
                    </li>
                    <li class="nav-item"  v-if="isAuthUser">
                        <router-link class="nav-link" to="/articles/create"> Create Articles </router-link>
                    </li>
                    <li class="nav-item dropdown" v-if="isAuthUser">
                        <a class="nav-link dropdown-toggle" href="#" @click="logout()" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Hey {{ isAuthUser.name}}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Logout</a>
                        </div>
                    </li>
                   
                </ul>    
            </div>
        </div>
        
    </nav>
</template>

<script>
export default {
    mounted(){
        //console.log(this.$root);
    },
    computed:{ 
        isAuthUser(){
            return this.$root.auth.user;
        }
    },
    methods:{
        logout() {
            localStorage.removeItem("auth");
            this.$root.auth = {};
            this.$noty.success("Successful Logged out.");   
        }
    }   
}
</script>