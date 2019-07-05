<template>
    <div class="container m-0 pt-3 bg-gray-200 w-full">
        <div class="container m-0 pt-3 pl-0 pr-0 pb-0 bg-gray-200 w-full">
            <div class="flex flex-col items-start sm:w-full md:w-1/2 lg:w-2/3 xl:w-3/5 mx-auto">
                <div class="relative inline-flex items-center flex-col h-auto w-full">
                    <div class="absolute top-auto bottom-auto left-0 h-auto w-auto p-2 m-2 cursor-pointer" @click="$router.go(-1)"><BackIcon class="fill-current text-gray-400 hover:text-gray-500" w="40" h="40"/></div>
                    <div class="absolute top-auto bottom-auto right-0 h-auto w-auto p-2 m-2 cursor-pointer" @click="edit()"><EditIcon class="fill-current text-gray-400 hover:text-gray-500" w="40" h="40"/></div>
                    <img class="flex-1" v-if="contact.hasOwnProperty('photos') && contact.photos.hasOwnProperty('large') && contact.photos.large" :src="contact.photos.large">
                    <img class="flex-1" v-else :src="defaultPhotos.medium">
                    <div class="flex-1 text-center text-lg mt-1 font-bold">
                        {{contact.hasOwnProperty('name') && (contact.name !== '') ? contact.name : contact.hasOwnProperty('phones') && (contact.phones > 0) ? contact.phones[0] : 'No Name'}}
                    </div>
                </div>
                <div v-if="contact.hasOwnProperty('phones') && contact.phones.length > 0" class="inline-flex flex-col items-stretch h-auto w-full pt-1">
                    <div v-for="(number, key) of contact.phones" :key="key" class="inline-flex flex-row align-middle items-start bg-white mt-1 h-auto py-2">
                        <div class="flex-grow-0 w-20 text-left my-1 mx-2 mr-1 px-2">Phone</div>
                        <div class="flex-grow my-1 mx-2 font-large text-left">{{number}}</div>
                    </div>
                </div>
                <div v-if="contact.hasOwnProperty('emails') && contact.emails.length > 0" class="inline-flex flex-col items-stretch h-auto w-full pt-1">
                    <div v-for="(email, key) of contact.emails" :key="key" class="inline-flex flex-row align-middle items-start bg-white mt-1 h-auto py-2">
                        <div class="flex-grow-0 w-20 text-left my-1 mx-2 mr-1 px-2">Email</div>
                        <div class="flex-grow my-1 mx-2 font-large text-left">{{email}}</div>
                    </div>
                </div>
                <div v-if="contact.hasOwnProperty('faxes') && contact.faxes.length > 0" class="inline-flex flex-col items-stretch h-auto w-full pt-1">
                    <div v-for="(fax, key) of contact.faxes" :key="key" class="inline-flex flex-row align-middle items-start bg-white mt-1 h-auto py-2">
                        <div class="flex-grow-0 w-20 text-left my-1 mx-2 mr-1 px-2">Fax</div>
                        <div class="flex-grow my-1 mx-2 font-large text-left">{{fax}}</div>
                    </div>
                </div>
                <div v-if="contact.hasOwnProperty('address') && (contact.address !== '')" class="inline-flex flex-row w-full align-middle items-start bg-white mt-2 h-auto py-2 pt-1">
                    <div class="flex-grow-0 w-20 text-left my-1 mx-2 mr-1 px-2">Address</div>
                    <div class="flex-grow my-1 mx-2 font-large text-left">{{contact.address}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import BackIcon from 'vue-ionicons/dist/ios-arrow-dropleft-circle'
    import EditIcon from 'vue-ionicons/dist/ios-create'
    export default {
        name: "Contact",
        data(){
            return {contact: ''}
        },
        components: {BackIcon, EditIcon},
        computed:{
            ...mapGetters({
                defaultPhotos: 'getDefaultPhotos'
            })
        },
        mounted(){
            let mc = this
            this.getContact(this.$route.params.id)
                .then((response)=>{
                    mc.contact = response[0]
                })
        },
        methods:{
            edit(){
                return false
            },
            ...mapActions([
                'getContact'
            ])
        }
    }
</script>

<style scoped>

</style>