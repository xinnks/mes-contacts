<template>
  <div class="container mx-auto px-2 py-1 bg-gray-100 w-full">
      <div class="flex sm:flex-col md:flex-col lg:flex-row xl:flex-row items-start">
          <ContactListItem v-for="(contact, key) of contacts" :key="key" :contact="contact"></ContactListItem>
      </div>
  </div>
</template>

<script>
import ContactListItem from '@/components/ContactListItem'
import { mapGetters } from 'vuex'
export default {
    name: 'home',
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
