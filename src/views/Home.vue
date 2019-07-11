<template>
    <div class="block pt-3 bg-gray-200 sm:mx-1 md:mx-20 lg:mx-32 xl:mx-48">
        <div class="flex flex-row-reverse items-center align-middle my-2">
            <div class="flex-grow-0 ml-2 mr-0 cursor-pointer rounded-full">
                <AddIcon class="fill-current rounded-full text-teal-400 hover:text-teal-500 focus:text-teal-800 active:shadow-inner active:text-red-300" w="40" h="40" @click="$router.push({path: '/add-contact'})"/>
            </div>
            <div class="flex-grow">
                <input type="text" v-model="searchQuery" class="w-full m-1 h-8 outline-none px-4 py-1">
            </div>
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
import AddIcon from 'vue-ionicons/dist/ios-add-circle'
export default {
    name: 'home',
    data(){
        return {searchQuery: ''}
    },
    components: {
        ContactListItem, AddIcon
    },
    computed:{
        ...mapGetters({
            contacts: 'getContacts'
        })
    }
}
</script>
