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
            <button class="btn btn-secondary" type="submit">
                Submit
            </button>
        </div>
    </form>
</template>

<script>
export default {
    name: "PostCreet",
    data() {
        return {
            content: '',
        }
    },
    methods: {
        postCreet() {
            console.log(this.content);
        }
    }
}
</script>

<style scoped>
.title {
    font-family: 'Titan One', sans-serif;
}
</style>