<template>
    <h1 class="title my-3">Post a Creet</h1>
    <img
        class="img-fluid mx-auto"
        id="post-img"
        src="bunnyLetter.jpeg"
        style="width:70%; height:70%"
    />
    <form @submit.prevent="postCreet">
        <div class="form-group my-3">
            <textarea name="content" 
                type="text" 
                v-model="content"
                rows="3"
                autocomplete="off"
                placeholder="Insert content"
                class="form-control"
                required />
        </div>
        <div class="form-group mb-3">
            <button class="btn btn-secondary" type="submit" :disabled="loading">
                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                <span>Submit</span>
            </button>
        </div>
        <div class="form-group">
            <div v-if="message" class="alert alert-danger" role="alert">
                {{ message }}
            </div>
        </div>
    </form>
</template>

<script>
import CreetService from '@/services/creet-service';
export default {
    name: "PostCreet",
    data() {
        return {
            content: "",
            message: "",
            loading: false,
        }
    },
    methods: {
        postCreet() {
            this.loading = true;
            CreetService.postCreet(this.content)
                .then(() => {
                    this.loading = false;
                    console.log('Todo emit update');
                })
                .catch(error => {
                    this.loading = false;
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
.title {
    font-family: 'Titan One', sans-serif;
}
</style>