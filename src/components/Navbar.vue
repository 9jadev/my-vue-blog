<template>
   <div>
        <b-navbar toggleable="lg"  type="light" variant="light" >
            <b-navbar-brand href="#">
            <router-link class="navbar-brand" to="/">
                    <img src="../assets/logo.png" width="30px" height="30px" alt="logo">
            </router-link>
            </b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item  v-if="!isAuthUser">
                            <router-link class="nav-link" to="/login"> Login </router-link>
                        </b-nav-item>
                        <b-nav-item  v-if="!isAuthUser">
                            <router-link class="nav-link" to="/signup"> Signup </router-link>
                        </b-nav-item>
                    </b-navbar-nav>
                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item  v-if="isAuthUser">
                        <router-link class="nav-link" to="/articles/create"> Create Articles </router-link>
                        </b-nav-item>
                        <b-nav-item-dropdown right  v-if="isAuthUser">
                        <!-- Using 'button-content' slot -->
                        <template v-slot:button-content>
                            <em> Hey {{ isAuthUser.name}} </em>
                        </template>
                        <b-dropdown-item @click="logout()">Sign Out</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                </b-collapse>
        </b-navbar>
</div>
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