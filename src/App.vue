<template>
  <!--  <AddForm />-->
  <PageContent />
  
</template>

<script>
//import AddForm from './components/AddForm.vue'
import PageContent from './components/MainContent/PageContent.vue'

export default {
  name: 'App',
  
  components: {
    //AddForm
    PageContent
  },
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
