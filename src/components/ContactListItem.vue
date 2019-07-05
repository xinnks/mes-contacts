<template>
    <div class="inline-flex items-center bg-white hover:bg-gray-100 cursor-pointer w-full h-auto sm:mx-1 md:mx-2 lg:mx-3 xl:mx-4 p-2 my-1" @click="$router.push({path: '/contact/'+contact.id})">
        <div class="flex-grow-0 ml-1">
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