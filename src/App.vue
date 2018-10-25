<template>
  <div id="app">
    <div class="header">
      <div class="news-flash">
        <div class="title fl">快讯</div>
        <div class="fr">简体中文</div>
      </div>
    </div>
    <h1>这里公共部分</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
