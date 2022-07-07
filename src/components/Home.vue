<template>
    <div class="card card-container">
        <h2 class="title my-2 mx-auto">Post a Creet</h2>
        <button class="btn btn-secondary mb-2 mx-auto" style="width:25%" @click="toggleModal">Create</button>
        <CreetModal 
            :showModal="showCreetModal" 
            @closeModal="closeModal"
            @posted="updateFeed"
        />
    </div>

    <div class="card card-container">
        <h2 class="title my-2 mx-auto">Feed</h2>
        <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
        </div>
        <img
            class="img-fluid mx-auto"
            id="post-img"
            src="forestDance.jpg"
            style="width:70%; height:70%"
        />
        <div class="container mx-0 my-3 px-1 py-0 rounded" style="background-color:#fbfbfb">
            <Creet
                v-for="creet in creets"
                :key="creet.creetId"
                :creet="creet"
                @deleted="(creetId) => removeCreet(creetId)"
                @updated="updateFeed()"
            />
        </div>
    </div>

    <div class="row">
       <Pagination :pages="pages" :pageNum="currentPage" @pageUpd="(pgNum) => {this.currentPage = pgNum; this.updateFeed()}"/> 
    </div> 
</template>

<script>
import Creet from "./Creet"
import CreetService from '../services/creet-service';
import CreetModal from './CreetModal';
import Pagination from './Pagination';
export default {
    name: "Home",
    data() {
        return {
            creets: [],
            message: "",
            showCreetModal: false,
            currentPage: 1,
            pages: 1,
            creetsPerPage: 5,
        };
    },
    components: {
        Creet,
        CreetModal,
        Pagination,
    },
    mounted() {
        if (!this.$store.state.auth.status.loggedIn) {
            return this.$router.push("/Landing");
        }
        this.updateFeed();
    },
    methods: {
        updateFeed() {
            CreetService.getFeed(this.currentPage, this.creetsPerPage)
                .then(response => {
                    this.message = "";
                    this.creets = response.data.creets;
                    this.pages = response.data.totalPages;
                })
                .catch(error => {
                    this.message =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                });
        },
        removeCreet(creetId) {
            this.creets = this.creets.filter((el) => {
                return el.id !== creetId;
            });
        },
        closeModal() {
            this.showCreetModal = false;
        },
        toggleModal() {
            this.showCreetModal = !this.showCreetModal;
        }
    }
}
</script>

<style scoped lang="scss">
@import "../styles/settings.scss";
.card-container.card {
    background-color: #f7f7f7;
    padding: 20px 15px 30px;
    margin: 20px auto;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    max-width: 650px !important;
    padding: 0px 15px;
}

.title {
    font-family: 'Titan One', sans-serif;
}
.btn {
    background-color: $boscoDark;
    border-style: none;
    padding: 0.4em 0.55em;
    color: #ffffff;
    font-size: 0.85em;
}
</style>