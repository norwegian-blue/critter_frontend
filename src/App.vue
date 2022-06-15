<template>
  <div id="app">
    <nav class="navbar navbar-expand">
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <p class="nav-link">Critter</p>
        </li>
        <li class="nav-item">
          <p class="nav-link">Sign Up</p>
        </li>
        <li class="nav-item">
          <p class="nav-link">Login</p>
        </li>
      </div>
    </nav>
    <div> 
      <h3>TODO</h3>
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