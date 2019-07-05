<template>
    <div class="block pt-3 bg-gray-200 sm:mx-1 md:mx-20 lg:mx-32 xl:mx-48">
        <div class="flex flex-col items-center align-middle my-2">
            <input type="text" v-model="searchQuery" class="w-full m-1 h-8 outline-none px-4 py-1">
        </div>
        <div class="flex flex-col sm:items-center md:items-start lg:items-start xl:items-start">
            <ContactListItem v-for="(contact, key) of contacts" :key="key" :contact="contact"></ContactListItem>
        </div>
    </div>
</template>
<!--sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4-->

<script>
import ContactListItem from '@/components/ContactListItem'
import { mapGetters } from 'vuex'
export default {
    name: 'home',
    data(){
        return {searchQuery: ''}
    },
    components: {
        ContactListItem
    },
    computed:{
        ...mapGetters({
            contacts: 'getContacts'
        })
    }
}
</script>
