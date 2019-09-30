<template>
    <div class="card my-3">
        <div class="card-header font-weight-bolder">{{ articule.title }}</div>
        <div class="card-body">
            <div class="my-3" v-html="articule.content.substring(0, 200)"></div>
            <router-link :to="`/article/${articule.slug}`" class="btn btn-primary">Read more...</router-link>
        </div>
    </div>
</template>

<script>
export default {
    props : ['articule']
}
</script>