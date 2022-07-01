<template>
    <h1 class="title my-3">Post a Creet</h1>
    <img
        class="img-fluid mx-auto"
        id="post-img"
        src="bunnyLetter.jpeg"
        style="width:50%; height:50%"
    />
    <form @submit.prevent="postCreet">
        <div class="form-group my-3">
            <textarea name="content" 
                type="text" 
                v-model="content"
                rows="2"
                autocomplete="off"
                placeholder="Insert content"
                class="form-control"
                required />
        </div>
        <div class="row mb-3 mx-0">
            <div class="col-xs-3 form-group my-auto mr-3">
                <button class="btn btn-secondary" type="submit" :disabled="loading">
                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                    <span>Submit</span>
                </button>
            </div>
            <div class="col-xs-9 my-auto ml-auto" style="max-width:65%">
                <div v-if="message" class="alert mb-0 fade show" 
                    :class="success ? 'alert-success' : 'alert-danger'" 
                    role="alert">
                    {{ message }}
                </div>
            </div>
        </div>
    </form>
</template>

<script>
import CreetService from '../services/creet-service';
export default {
    name: "PostCreet",
    emits: ['posted'], 
    data() {
        return {
            content: "",
            message: "",
            success: false,
            loading: false,
        }
    },
    methods: {
        postCreet() {
            this.loading = true;
            CreetService.postCreet(this.content)
                .then(() => {
                    this.loading = false;
                    this.success = true;
                    this.message = "Posted successfully";
                    this.$emit('posted');
                    this.content = "";
                    setTimeout(this.clearMessage, 4000);
                })
                .catch(error => {
                    this.success = false;
                    this.loading = false;
                    this.message =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                });
        },
        clearMessage() {
            this.message = "";
        },
    }
}
</script>

<style scoped>
.title {
    font-family: 'Titan One', sans-serif;
}
</style>