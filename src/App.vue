<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bosco-dark">
      <div class="navbar-nav mr-auto">
        <li class="navbar-brand">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="tree" /> Critter
          </router-link>
        </li>
      </div>
      <div v-if="!currentUser" class="navbar-nav ml-auto">
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
      <div v-else class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="paw" /> {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="suitcase" /> Logout
          </a>
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
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
}
</script>

<style lang="scss">
@import "./styles/settings.scss";

#app, body, html {
  background-color: $boscoLight;
  min-height: 100%;
}

.bosco-dark {
  background-color: $boscoDark;
}

li {
  cursor: pointer;
}
</style>