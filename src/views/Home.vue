<template>
    <div>
         <div class="d-flex mt-5 justify-content-between">
            <button @click="getPrevOne()" :disabled="articules.prev_page_url === null" class="btn btn-warning"> Previous </button>
            <button @click="getNextOne()" :disabled="articules.next_page_url === null" class="btn btn-warning"> Next </button>
        </div>
        <div class="row" v-if="!loading">
            <div class="col-md-8 offset-md-2" v-for="articule in articules.data"   :key="articule.id">
               <Article v-if="articules.data" :articule="articule"/>
            </div>
        </div>

         <div class="text-center" v-else> 
            <font-awesome-icon icon="spinner" size="6x" spin />
        </div>

    </div>
   
    
</template>

<script>
import Axios from 'axios';
import config from'@/config';
import Article from '@/components/Article.vue';
export default {
    components: {
         Article
    },
    mounted(){
        this.getArticules();
    },
    data(){
        return{
            articules: {},
            loading: true
        }
    },
    methods: {
        getArticules($url = `${config.apiUrl}/articles`){
            this.loading = true;
            Axios.get($url).then(
                response => {
                    this.loading = false;
                    this.articules = response.data.data;
                }).catch();
        },
        getNextOne(){
            this.getArticules(this.articules.next_page_url);
        },
        getPrevOne(){
            this.getArticules(this.articules.prev_page_url);
        }
    }
}
</script>