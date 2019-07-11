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
                <!--<div v-if="contact.hasOwnProperty('emails') && contact.emails.length > 0" class="inline-flex flex-col items-stretch h-auto w-full pt-1">
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
                </div>-->
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: "AddContact",
        data(){
            return {
                contact: {
                    name: '',
                    id: '',
                    photos: [],
                    phones: [],
                    emails: [],
                    faxes: [],
                    address: '',
                    notes: '',
                },
                error: {
                    name: '',
                    phones: '',
                },
                contactImage: '',
                displayContactPhoto: false,
            }
        },
        methods:{
            submitContact(){
                let error = 0
                let mc = this
                const addContactPhotoNow = () => {// upload the new image
                    mc.createThumbnailsDispImg(mc.$refs.displayImage.files[0]);
                    /*console.log(this.product.display_image)*/
                    setTimeout(()=>{
                        /*document.getElementById("great-image").src = this.product.display_image.image_medium*/
                        mc.displayContactPhoto = true
                    }, 500)
                }
                if(this.contact.name === ''){
                    this.error.name = 'Fill in the name'
                    error =+ 1
                }else{
                    this.error.name = ''
                }
                if(this.contact.phones.length < 1){
                    this.error.phones = 'Add a phone number'
                    error =+ 1
                }else{
                    this.error.phones = ''
                }
                if(!this.$refs.contactPhoto.files[0]){
                    console.log('No photo selected')
                }else{

                }
                if(error > 0){
                    return false
                }else{
                    this.addContact(this.contact)
                }
            },
            createThumbnailsDispImg(image) {
                let mc = this
                let canvas, ctx, thumbnailScale, thumbnailWidth, thumbnailHeight, thumbnailMaxWidth, thumbnailMaxHeight;
                // create an off-screen canvas
                canvas = document.createElement('canvas');
                ctx = canvas.getContext('2d');
                let preview = new Image();
                let reader  = new FileReader();
                reader.addEventListener("load", function () {
                    preview.addEventListener('load', function() {
                        for(let i = 0; i < 2; i++){
                            if(i === 0){
                                //Camculate the size of the thumbnail, to best fit within max/width (cropspadding)
                                thumbnailMaxWidth = 200;
                                thumbnailMaxHeight = 200;
                                thumbnailScale = (preview.width / preview.height) > (thumbnailMaxWidth / thumbnailMaxHeight) ? thumbnailMaxWidth / preview.width : thumbnailMaxHeight / preview.height;
                                thumbnailWidth = preview.width * thumbnailScale;
                                thumbnailHeight = preview.height * thumbnailScale;
                                // set its dimension to target size
                                canvas.width = thumbnailWidth;
                                canvas.height = thumbnailHeight;
                                ctx.drawImage(preview, 0, 0, thumbnailWidth, thumbnailHeight);
                                mc.contactImage.large = canvas.toDataURL('image/jpeg')
                            }else if(i === 1){
                                //Camculate the size of the thumbnail, to best fit within max/width (cropspadding)
                                thumbnailMaxWidth = 80;
                                thumbnailMaxHeight = 80;
                                thumbnailScale = (preview.width / preview.height) > (thumbnailMaxWidth / thumbnailMaxHeight) ? thumbnailMaxWidth / preview.width : thumbnailMaxHeight / preview.height;
                                thumbnailWidth = preview.width * thumbnailScale;
                                thumbnailHeight = preview.height * thumbnailScale;
                                // set its dimension to target size
                                canvas.width = thumbnailWidth;
                                canvas.height = thumbnailHeight;
                                ctx.drawImage(preview, 0, 0, thumbnailWidth, thumbnailHeight);
                                mc.contactImage.thumb = canvas.toDataURL('image/jpeg', 80)
                            }
                        }
                    }, false);
                    preview.src = reader.result;
                }, false);
                if (image) {
                    reader.readAsDataURL(image);
                }
            },
            ...mapActions[
                'addContact'
                ]
        }
    }
</script>

<style scoped>

</style>