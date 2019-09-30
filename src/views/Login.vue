<template>
    <div class="row my-4">
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-body">
                    <h3 class="text-center">
                        Login
                    </h3>
                    <div class="form-group">
                        <input type="email"  v-bind:class="{ 'is-invalid' : errors.email , 'is-valid' : !errors.email && this.submitted }" v-model="email" placeholder="Email" class="form-control" required/>
                        <div class="errors" v-if="errors.email">
                            <small class="text-center" :key="error" v-for="error in errors.email"> {{ error}}</small>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="password"  v-bind:class="{ 'is-invalid' : errors.password , 'is-valid' : !errors.password && this.submitted }" v-model="password" placeholder="Password" class="form-control" required/>
                        <div class="errors" v-if="errors.password">
                            <small class="text-center" :key="error" v-for="error in errors.password"> {{ error}}</small>
                        </div>
                    </div>
                    <div class="form-group">
                        <button @click="loginUser()" :disabled="btload" class="btn btn-success form-control"> 
                             <font-awesome-icon icon="spinner" spin v-if="btload" />
                             <span v-if="!btload">Login</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
import config from "@/config";

export default {
    beforeRouteEnter(to, from, next){
      if (localStorage.getItem('auth')) {
          return next({ path: "/" });
      }    
      next();  
    },
    data(){
        return {
            email: '',
            password: '',
            errors: {},
            submitted: false,
            btload: false
        }
    },
    methods: {
        loginUser(){
            this.btload = true;
            Axios.post(`${config.apiUrl}/auth/login`,{
                email: this.email,
                password: this.password
            }).then((response) => {
                 localStorage.setItem('auth',JSON.stringify(response.data.data))
                 this.$root.auth = response.data.data;
                 this.btload = false;
                 this.submitted = true;
                 this.$router.push('/');
                 this.$noty.success("Successfully Loggin out.");
            }).catch(({ response }) => {
                this.submitted = true;  
                this.btload = false;   
                if (response.status === 401 ) {
                    this.errors = {
                        email: [" These crentials don't match our records"] ,
                        password: [" These crentials don't match our records"]
                    } 
                }else{
                    this.errors = response.data;  
                    this.$noty.error("Oops, something went wrong.");
                }        
            });
        }
    }
}
</script>