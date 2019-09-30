<template>
    <div class="row my-4">
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-body">
                    <h3 class="text-center">
                        Signup
                    </h3>
                    <div class="form-group">
                        <input type="name" v-bind:class="{ 'is-invalid' : errors.name , 'is-valid' : !errors.name && this.submitted }"  v-model="name" placeholder="Name" class="form-control" required/>
                        <div class="errors" v-if="errors.name">
                            <small class="text-danger" :key="error" v-for="error in errors.name"> {{error}}</small>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="email" v-bind:class="{ 'is-invalid' : errors.email , 'is-valid' : !errors.email && this.submitted }"  v-model="email" placeholder="Email" class="form-control" required/>
                        <div class="errors" v-if="errors.email">
                            <small class="text-danger" :key="error" v-for="error in errors.email"> {{error}}</small>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="password" v-bind:class="{ 'is-invalid' : errors.password , 'is-valid' : !errors.password && this.submitted }" v-model="password" placeholder="Password" class="form-control" required/>
                        <div class="errors" v-if="errors.password">
                            <small class="text-danger" :key="error" v-for="error in errors.password"> {{error}}</small>
                        </div>
                    </div>
                    <div class="form-group">
                        <button @click="registerUser()" :disabled="btload" class="btn btn-success form-control"> 
                            <font-awesome-icon icon="spinner" spin v-if="btload" />
                            <span v-if="!btload">Sign up</span>
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
import config from'@/config';
    export default {
    beforeRouteEnter(to, from, next){
      if (localStorage.getItem('auth')) {
          return next({ path: "/" });
      }    
      next();  
    },
    data(){
         return {
             name: '',
             email: '',
             password: '',
             errors: {},
             btload: false,
             submitted: false
         }
     },
     methods: {
         registerUser(){
             //console.log(this.name+ " " +this.email+" "+this.password);
             this.btload = true,
             Axios.post(`${config.apiUrl}/auth/register`, {
                 name: this.name,
                 email: this.email,
                 password: this.password
             }).then(response => {
                 localStorage.setItem('auth',JSON.stringify(response.data.data))
                 this.$root.auth = response.data.data;
                 this.btload = false;
                 this.submitted = true;
                 this.$noty.success("Successful Registration.");
                 this.$router.push('/');
             }).catch(({ response }) => {
                 this.errors = response.data;
                 this.btload = false;
                 this.submitted = true;
                 this.$noty.error("Oops, something went wrong.");
             })
            }
        }  
    }
</script>