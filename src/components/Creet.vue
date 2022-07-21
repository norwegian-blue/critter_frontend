<template>
    <div class="card p-0 mb-4">
        <!-- Author and date-->
        <div class="card-header row mx-0 p-2">
            <div class="col-xs-6 font-weight-bold">
                {{ creet.user.alias }}
            </div>
            <div class="col-xs-6 ml-auto text-right font-italic">
                {{ this.dateAndTime }}
            </div>
        </div>

        <!-- Creet content -->
        <div class="card-body p-2 border-0">
            <span style="white-space: pre-wrap;" v-html="this.creetFmt(this.creet.content)" />
            <div v-if="this.creet.reCreet" class="card reCreet mt-3">
                <div class="card-header reCreet font-weight-bold text-right">
                    {{ creet.reCreet.user.alias }}
                </div>
                <div class="card-body reCreet">
                    <span style="white-space: pre-wrap;" v-html="this.creetFmt(creet.reCreet.content)" />
                </div>
            </div>
        </div>

        <!-- Interaction -->
        <div class="card-footer p-2 border-0">
            <div class = "row mx-0">
                <div class="col-xs-3 mr-2" v-show="this.isOwner">
                    <CreetModal
                    :showModal="showEditModal"
                    :editCreet="this.creet"
                    @closeModal="(showEditModal = false)"
                    @posted="this.$emit('updated')"
                    />
                    <button 
                    class="btn btn-sm mx-auto" 
                    @click="(showEditModal = true)"
                    >Edit</button>
                </div>

                <div class="col-xs-3" v-show="this.isOwner">
                    <button class="btn btn-sm ml-auto" @click="deleteCreet">Delete</button>
                </div>
                
                <div class="col-xs-3" v-show="!this.isOwner">
                    <CreetModal
                    :showModal="showRecreetModal"
                    :reCreet="this.creet"
                    @closeModal="(showRecreetModal = false)"
                    @posted="this.$emit('updated')"
                    />
                    <button class="btn btn-sm mx-auto" 
                    :disabled="this.creet.reCreet"
                    @click="(showRecreetModal = true)"
                    >Re-creet</button>
                </div>
                
                <div class="col-xs-2 my-auto ml-auto">
                    Likes: {{ this.likes }}
                </div>
                <div class="col-xs-4 mx-2">
                    <button class="btn btn-sm" :disabled="!this.canLike" @click="upvote">
                        <font-awesome-icon icon="ice-cream"/>
                    </button>
                    <span
                        v-show="loading"
                        class="ml-2 spinner-border spinner-border-sm"
                    ></span>
                </div>
            </div>
            <div class="row">
                <div v-if="message" class="alert alert-danger mx-auto mt-3 mb-2 p-2 fade show" role="alert">
                    {{ message }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CreetService from '../services/creet-service';
import CreetModal from './CreetModal.vue';
export default {
    name: "Creet",
    components: {
        CreetModal,
    },
    props: ['creet'],
    emits: ['updated'],
    data() {
        return {
            showEditModal: false,
            showRecreetModal: false,
            message: "",
            loading: false,
        }
    },
    computed: {
        // formatted date-and-time
        dateAndTime() {
            const currDate = new Date(this.creet.createdAt);
            const dateFormat = new Intl.DateTimeFormat('en-GB', {
                weekday: 'short',
                day: '2-digit',
                year: 'numeric',
                month: 'long',
                hour: 'numeric',
                minute: 'numeric',
            });
            return dateFormat.format(currDate);
        },
        currentUser() {
            return this.$store.state.auth.user;
        },
        isOwner() {
            if (!this.currentUser) { return false }
            return this.creet.user.id === this.currentUser.id;
        },
        likes() {
            return this.creet.likes.length;
        },
        canLike() {
            if (!this.currentUser) {return false}
            const liked = this.creet.likes.map(
                el => (el.id === this.currentUser.id)
            ).reduce(
                (prev, el) => (prev || el),
                false
            )
            return !this.isOwner && !liked;
        }
    },
    methods: {
        creetFmt(creet) {
            let fmtText = creet.replace(/(#[^\s]+)/g, "<b>$1</b>");             // Apply bold tags to tags
            return fmtText.replace(/\n/g, "<br/>");                             // Insert html break for new lines
        },
        deleteCreet() {
            if (confirm("Do you really want to delete this creet?")) {
                CreetService.deleteCreet(this.creet.id)
                    .then(() => {
                        this.$emit('updated');
                    })
                    .catch(error => {
                        this.message =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();
                            setTimeout(() => {this.message = ""}, 1000);
                    });
            }
        },
        upvote() {
            if (!this.canLike) { return };
            this.loading = true;
            CreetService.upvoteCreet(this.creet.id)
                .then(() => {
                    this.loading = false;
                    this.$emit('updated');
                })
                .catch(error => {
                    this.loading = false;
                    this.message =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString(); 
                        setTimeout(() => {this.message = ""}, 1000);
                });
        },
    },
}
</script>

<style scoped lang="scss">
@import "../styles/settings.scss";
.card {
    font-size: 0.75em;
    -moz-box-shadow: 0px;
    -webkit-box-shadow: 0px;
    box-shadow: 0px;
}

.card-header {
    background-color: $boscoSoftDark;
    color: #ffffff;
    border-bottom-width: 0.25em;
}

.card-body, .card-footer {
    background-color: $boscoLight;
}

.card.reCreet {
    font-size: 0.9em;
    border-color: #888;
}

.card-header.reCreet {
    color: #212529;
    background-color: #ccc;
    padding: 5px;
} 
.card-body.reCreet {
    background-color: rgba(255, 255, 255, 0);
    border-style: none;
    padding: 5px;
}


.btn {
    background-color: $boscoSoftDark;
    padding: 0.2em 0.85em;
    color: #ffffff;
    font-size: 0.9em;
}
</style>