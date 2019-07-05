<template>
    <div class="inline-flex items-center bg-gray-200 sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 h-auto sm:mx-0 md:mx-2 lg:mx-4 xl:mx-6 p-2 my-1">
        <div class="flex-grow-0">
            <img v-if="contact.photos.thumb" :src="contact.photos.thumb">
            <img v-else :src="defaultPhotos.thumb">
        </div>
        <div class="flex-grow text-left px-3">
            <span class="">{{contact.name}}</span>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "ContactListItem",
        props: {contact: Object},
        computed:{
            ...mapGetters({
                defaultPhotos: 'getDefaultPhotos'
            })
        }
    }
</script>

<style scoped>

</style>