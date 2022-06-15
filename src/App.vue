<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bosco-dark">
      <div class="navbar-nav mr-auto">
        <li class="navbar-brand">
          <router-link to="/creets" class="nav-link">
            <font-awesome-icon icon="tree" /> Critter
          </router-link>
        </li>
      </div>
      <div class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="seedling" /> Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="carrot" /> Login
          </router-link>
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
$boscoLight: lighten(mediumAquamarine, 35);
$boscoDark: darken(mediumAquamarine, 25);

#app, body, html {
  background-color: $boscoLight;
  min-height: 100%;
}

.bosco-dark {
  background-color: $boscoDark;
}
</style>