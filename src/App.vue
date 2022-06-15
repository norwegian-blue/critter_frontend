<template>
  <div id="app">
    <nav class="navbar navbar-expand">
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/creets" class="nav-link">Critter</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/register" class="nav-link">Sign Up</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
      </div>
    </nav>
    <div class="container">
      <router-view />
    </div> 
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
$boscoLight: lighten(mediumAquamarine, 30);

#app {
  background-color: $boscoLight;
}
</style>