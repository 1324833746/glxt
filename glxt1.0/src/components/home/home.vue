<template>
  <div>home</div>
</template>

<script>
export default {
  beforeCreate(){
    const token = localStorage.getItem('token')
    if(!token){
      this.$router.push({name:'login'})
    }
  }
}
</script>

<style>

</style>