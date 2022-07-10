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
                        <h4 class="modal-title title">
                            <span v-if="this.editCreet">Edit Creet</span>
                            <span v-else-if="this.reCreet">Repost Creet</span>
                            <span v-else>Post a new Creet</span>
                        </h4>
                        <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        @click="closeModal()"
                        >
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <!-- Modal body: creet/recreet text -->
                    <div class="modal-body py-0">
                        <div class="row my-3"> 
                            <img
                            class="img-fluid mx-auto"
                            id="post-img"
                            src="bunnyLetter.jpeg"
                            style="width:40%"
                            />    
                        </div>
                        <div class="row m-3">
                            <textarea name="content"
                                type="text"
                                v-model="content"
                                rows="3"
                                autocomplete="off"
                                class="form-control"
                                placeholder="Insert content"
                            />
                        </div>
                        <div v-if="this.reCreet" class="row m-3">
                            <div class="card">
                                <div class="card-header font-weight-bold text-right pl-auto">
                                    {{ this.reCreet.user.username }}
                                </div>
                                <div class="card-body">
                                    {{ this.reCreet.content }}
                                </div>
                            </div>
                        </div>
                        <div v-if="message" class="alert alert-danger m-3 fade show" role="alert">
                            {{ message }}
                        </div>
                    </div>

                    <!-- Modal footer: close/submit -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" @click="closeModal()">Close</button>
                        <button 
                            type="button" 
                            class="btn btn-secondary" 
                            :disabled="loading" 
                            @click="submitCreet">
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
        editCreet: Object,
        reCreet: Object,
    },
    watch: {
        showModal: {
            handler(newVal) {
                if (this.editCreet) {
                    this.content = this.editCreet.content;
                }
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
        closeModal() {
            this.message = "";
            this.loading = false;
            this.$emit('closeModal');
        },
        submitCreet() {
            // Check content
            this.loading = true;
            if (!this.content) {
                this.loading = false;
                this.message = "Content cannot be empty!";
                return;
            }

            // Dispatch correct method
            let dispatch;
            if (this.editCreet) {
                dispatch = this.editOldCreet;
            } else if (this.reCreet) {
                dispatch = this.repostCreet;
            } else {
                dispatch = this.postNewCreet;
            }
            dispatch()
                .then(() => {
                    this.loading = false;
                    this.$emit('posted');
                    if (!this.editCreet) {
                        this.content = "";
                    }
                    this.$emit('closeModal');
                })
                .catch(error => {
                    this.loading = false;
                    if (!this.editCreet) {
                        this.content = "";
                    } else {
                        this.content = this.editCreet.content;
                    }
                    this.message =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                });
        },
        postNewCreet() {
            return CreetService.postCreet(this.content)
        },
        editOldCreet() {
            return CreetService.editCreet(this.editCreet.id, this.content)
        },
        repostCreet() {
            return CreetService.repostCreet(this.reCreet.id, this.content);
        }
    },
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

.card {
    background-color: white;
    border-color: #888;
    font-size: 0.7em;
    width: 100%;
}

.card-header, .card-body {
    padding: 5px 10px;
}
</style>
