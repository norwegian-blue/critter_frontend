<template>
    <div class="card p-0 my-3">
        <!-- Author and date-->
        <div class="card-header row mx-0 p-2">
            <div class="col-xs-6 font-weight-bold">
                {{ creet.user.username }}
            </div>
            <div class="col-xs-6 ml-auto text-right font-italic">
                {{ this.dateAndTime }}
            </div>
        </div>
        <!-- Creet content -->
        <div class="card-body p-2 border-0">
            {{ creet.content }}
        </div>
        <!-- Interaction -->
        <div class="card-footer row mx-0 p-2 border-0">
            <div class="col-xs-3 mr-2" v-show="this.isOwner">
                <button class="btn btn-sm mx-auto" @click="editCreet">Edit</button>
            </div>
            <div class="col-xs-3" v-show="this.isOwner">
                <button class="btn btn-sm ml-auto" @click="deleteCreet">Delete</button>
            </div>
            <div class="col-xs-3" v-show="!this.isOwner">
                <button class="btn btn-sm mx-auto" @click="recreet">Re-creet</button>
            </div>
            <div class="col-xs-2 my-auto ml-auto">
                Likes: {{ this.likes }}
            </div>
            <div class="col-xs-4 mx-2">
                <button class="btn btn-sm" :disabled="this.isOwner" @click="upvote">
                    <font-awesome-icon icon="ice-cream"/>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import CreetService from '../services/creet-service';
export default {
    name: "Creet",
    props: ['creet'],
    emits: ['updated'],
    data() {
        return {
            author: "EmilioConiglio",
            likes: 5,
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
            return this.creet.user.userId === this.currentUser.id;
        },
    },
    methods: {
        editCreet() {
            console.log('todo edit');
        },
        deleteCreet() {
            if (confirm("Do you really want to delete this creet?")) {
                CreetService.deleteCreet(this.creet.creetId);
                this.$emit('updated', this.creet.creetId);
            }
        },
        recreet() {
            console.log('todo recreet');
        },
        upvote() {
            console.log('todo upvote');
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
}

.card-body, .card-footer {
    background-color: $boscoLight;
}

.btn {
    background-color: $boscoSoftDark;
    padding: 0.2em 0.85em;
    color: #ffffff;
    font-size: 0.9em;
}
</style>