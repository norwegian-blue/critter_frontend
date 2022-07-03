<template>
    <div class="card card-container">
        <PostCreet @posted="updateFeed" />
    </div>
    <div class="card card-container">
        <h1 class="title my-3">Feed</h1>
        <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
        </div>
        <img
            class="img-fluid mx-auto"
            id="post-img"
            src="forestDance.jpg"
            style="width:70%; height:70%"
        />
        <div>
            <ul>
                <li v-for="creet in creets">
                    {{ creet.content }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import PostCreet from "./PostCreet"
import CreetService from '../services/creet-service';
export default {
    name: "Home",
    data() {
        return {
            creets: [],
            message: "",
        };
    },
    components: {
        PostCreet,
    },
    mounted() {
        if (!this.$store.state.auth.status.loggedIn) {
            return this.$router.push("/Landing");
        }
        this.updateFeed();
    },
    methods: {
        updateFeed() {
            CreetService.getFeed()
                .then(response => {
                    this.creets = response.data;
                })
                .catch(error => {
                    this.message =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                });
        }
    }
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