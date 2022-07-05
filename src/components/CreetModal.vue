<template>
    <teleport to="body">
        <div
        ref="modal"
        class="modal fade"
        :class="{ show: active, 'd-block': active }"
        tabindex="-1"
        role="dialog"
        >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <!-- Modal header -->
                    <div class="modal-header">
                        <h4 class="modal-title title">Post a new Creet</h4>
                        <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        @click="$emit('closeModal')"
                        >
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <!-- Modal body: creet/recreet text -->
                    <div class="modal-body">
                        <div class="row mb-3"> 
                            <img
                            class="img-fluid mx-auto"
                            id="post-img"
                            src="bunnyLetter.jpeg"
                            style="width:40%"
                            />    
                        </div>
                        <div class="row mx-3">
                            <textarea name="content"
                                type="text"
                                v-model="content"
                                rows="3"
                                autocomplete="off"
                                class="form-control"
                                placeholder="Insert content"
                            />
                        </div>
                        <div v-if="message" class="alert alert-danger mt-3 mb-0 fade show" role="alert">
                            {{ message }}
                        </div>
                    </div>

                    <!-- Modal footer: close/submit -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" @click="$emit('closeModal')">Close</button>
                        <button type="button" class="btn btn-secondary" :disabled="loading" @click="postNewCreet">
                            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                            <span>Submit</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="active" class="modal-backdrop fade show"></div>
    </teleport>
</template>

<script> 
import CreetService from "../services/creet-service";
export default{
    name: "CreetModal",
    emits: ["closeModal", "posted"],
    props: {
        showModal: Boolean,
    },
    watch: {
        showModal: {
            handler(newVal) {
                this.active = newVal;
                const body = document.querySelector("body");
                this.showModal ? body.classList.add("modal-open") : body.classList.remove("modal-open");
            },
            immediate: true,
            deep: true,
        },
    },
    data() {
        return {
            active: this.showModal,
            content: "",
            loading: false,
            message: "",
        }
    },
    methods: {
        postNewCreet() {
            this.loading = true;
            if (!this.content) {
                this.loading = false;
                this.message = "Content cannot be empty";
                return;
            }
            CreetService.postCreet(this.content)
                .then(() => {
                    this.loading = false;
                    this.$emit('posted');
                    this.content = "";
                    this.$emit('closeModal');
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
        },
    }
}
</script>

<style scoped lang="scss">
@import "../styles/settings.scss";
.title {
    font-family: 'Titan One', sans-serif;
}

.btn {
    padding: 0.4em 0.85em;
    font-size: 0.9em;
    border-style: none;
}
.btn-secondary {
    background-color: $boscoSoftDark;
    color: #ffffff;
}

.modal-content {
    background-color: #f9f9f9;
}
</style>
