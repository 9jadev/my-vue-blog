<template>
    <div class="container my-5">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                    <div class="card" v-if="!loading">
                        <img height="420px" :src="article.imageUrl" alt="" class="card-img-top">
                        <div class="card-body">
                            <h1 class="card-title text-center my-3"> {{ article.title }} </h1>
                            <div v-html="article.content"></div>
                            <div class="comments">
                                <vue-disqus shortname="snip-life" :identifier="article.slug" :url="url"></vue-disqus>
                            </div>
                        </div>
                    </div>
                    <div class="card text-center" v-else>
                         <div class="card-body">
                             <font-awesome-icon icon="spinner" size="6x" spin />
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
    mounted(){
        this.getArticle();
    },
    data(){
        return {
            article: {},
            loading: true,
            url: window.location.href

        }
    },
    methods: {
        getArticle() {
          
          Axios.get(`${config.apiUrl}/article/${this.$route.params.id}`).then(
                response => {
                   this.loading = false;  
                   this.article = response.data.data;
                }).catch();
        }
    }
}
</script>