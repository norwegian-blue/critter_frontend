<template>
    <div class="container-fluid col-md-12"> 
        <img class="rounded-circle mx-auto d-block mt-4" src="rabbitAndHedgehog.jpg" />
        <div class="text-center mt-4">
            <a class="btn btn-bosco" href="/register">JOIN US NOW</a>
        </div>
    </div>
</template>

<script> 
export default {
    name: "Landing",
    mounted() {
        if (this.$store.state.auth.status.loggedIn) {
            this.$router.push("/Home");
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../styles/settings.scss";
.btn-bosco {
    color: #fff;
    background-color: $boscoDark;
}
</style>