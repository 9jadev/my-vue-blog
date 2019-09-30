<template>
    <div class="container">
        <div class="row my-5">
            <div class="col-md-8 offset-md-2">
                <div class="card">
                    <div class="card-body">
                        <input type="text" v-model="title" placeholder="Title" class="mb-3 form-control" />
                        <select v-model="category" class="form-control mb-3">
                            <option value=""> Select a category </option>
                            <option :key="category.id" :value="category.id" v-for="category in categories">{{ category.name }}</option>
                        </select>
                        <picture-input 
                        accept="image/jpeg,image/png" 
                        size="10" 
                        button-class="btn btn-danger"
                        @change="onChange">
                        </picture-input>

                        <wysiwyg v-model="content" class="my-3" />
                        <div class="text-center">
                            <button @click="CreateArticle" :disabled="loading" class="btn btn-success mt-3 btn btn-large">
                                 <font-awesome-icon icon="spinner" spin v-if="loading" />
                                 <span v-if="!loading">Create Articles </span>    
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
import PictureInput from 'vue-picture-input'
import config from '@/config';
export default {
     beforeRouteEnter(to, from, next){
      if (!localStorage.getItem('auth')) {
          return next({ path: "/login" });
      }    
      next();  
    },
    mounted(){
       this.getCategories(); 
    },
    data(){
        return{
            title: "",
            content: "",
            image: null,
            category: "",
            categories: [],
            loading: false
        }
    },
    components: {
        PictureInput
    },
    methods: {
        onChange(image) {
           
            if (image) {
                this.image = image
            }
        },
        CreateArticle(){
            if(!this.title || !this.content || !this.category || !this.image){
                this.$noty.error('Title is required');
                this.$noty.error('Image is required');
                this.$noty.error('Content is required');
                this.$noty.error('Category is required');
                return;
            }
            this.loading = true;
            const form = new FormData();
            form.append('file', this.image);
            form.append('upload_preset',process.env.VUE_APP_CLOUDINARY_PRESET);
            form.append('api_key',process.env.VUE_APP_CLOUDINARY_API_KEY); 
            Axios.post(process.env.VUE_APP_CLOUDINARY_ARTICLE, form).then(res =>{
               Axios.post(`${config.apiUrl}/articles`,{
                    title: this.title,
                    content: this.content,
                    category_id: this.category,
                    imageUrl: res.data.secure_url
                },{
                    headers:{
                        Authorization: `Bearer ${this.$root.auth.token}`
                    }
                }).then(() => {
                    this.loading = false;
                    this.$noty.success('Article Created Successfully. ');
                    this.$router.push('/');
                }).catch(() => {
                    this.$noty.error('Something Went Wrong. ');
                })
            }).catch(() => {
                    this.loading = false;    
                    this.$noty.error('Something Went Wrong. ');
            });
        },
        posting(){
             
        },
        getCategories(){
                 const categories = localStorage.getItem('categories');
                if (categories) {
                    this.categories = JSON.parse(categories);
                    return;
                }
                Axios.get(`${config.apiUrl}/categories`).then(res => {
                    this.categories = res.data.categories;
                    localStorage.setItem('categories', JSON.stringify(this.categories));
                });
        }

    }
}
</script>