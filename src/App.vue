<template>
  <div id="app">
    <div id="content-wrap">
      <!-- Navbar -->
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

      <!-- Content -->
      <div class="container">
        <router-view />
      </div> 
    </div>

    <!-- Footer -->
    <footer>
      <div class="text-center p-2 my-footer font-italic">
        &copy; 2022 Copyright: ThousandPines<span style="font-size:0.9em"> srl</span>
        <br/> All rights reserved
      </div>
    </footer>

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

#app {
  position: relative;
  min-height: 100vh;
  background-color: $boscoLight;
}

#content-wrap {
  padding-bottom: 3.8rem;
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 3.8rem;
  background-color: $boscoSoftDark;
  font-size: 0.9em;
  color: rgba(255, 255, 255, 0.7);
}

.bosco-dark {
  background-color: $boscoDark;
}

li {
  cursor: pointer;
}

.nav-link {
  font-size: 0.95em;
}
</style>