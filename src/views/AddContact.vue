<template>
    
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