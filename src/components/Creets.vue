<template>
    <div class="card card-container">
        <PostCreet />
    </div>
    <div class="card card-container">
        <h1 class="title my-3">Creets feed</h1>
    </div>
</template>

<script>
import PostCreet from "./PostCreet"
export default {
    name: "Creets",
    components: {
        PostCreet,
    },
}
</script>

<style scoped>
.card {
    background-color: #f7f7f7;
    padding: 20px 25px 30px;
    margin: 0 auto 25px;
    margin-top: 30px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.card-container.card {
    max-width: 650px !important;
    padding: 0px 25px;
}

.title {
    font-family: 'Titan One', sans-serif;
}
</style>