<template>
    <h4 class="text-center" id="title">Admin panel</h4>
   <div class="mb-0">
        <div class="row mx-0 my-3 userCtrl"
            v-for="user in this.users"
            :key="user.userId"
        > 
            <span class="mr-auto my-auto" v-show="user.role !== 'ADMIN'">
                {{ user.username }}
            </span>
            <div class="ml-auto" v-show="user.role !== 'ADMIN'">
                <button 
                    class="btn btn-warning mr-2 px-2 py-1"
                    v-show="user.role === 'PENDING'"
                    @click="this.approve(user.id)"
                    :disabled="this.approveLoading"
                >Approve</button>
                <button class="btn btn-danger px-2 py-1"
                    @click="this.delete(user.id)"
                    :disabled="this.deleteLoading"
                >Delete</button>
            </div>
        </div>
    </div> 
    <div v-if="message" class="alert alert-danger m-0" role="alert">
        {{ message }}
    </div>
</template>

<script>
import AuthService from "../services/auth-service";
export default {
    name: "AdminPanel",
    data() {
        return {
            message: "",
            users: "",
            deleteLoading: false,
            approveLoading: false,
        }
    },
    methods: {
        getUsers() {
            AuthService.getUsers()
            .then(response => {
                this.users = response.data;
            })
            .catch(error => {
                this.displayError(error);
            });
        },
        approve(userId) {
            this.approveLoading = true; 
            AuthService.approve(userId).
            then(() =>  {
                this.approveLoading = false;
                this.getUsers();
            })
            .catch(err => {
                this.approveLoading = false;
                this.displayError(err);
            });
        },
        delete(userId) {
            if (confirm("Do you really want to permanently delete current user?")) {
                this.delLoading = true;
                AuthService.delete(userId)
                .then(() => {
                    this.deleteLoading = false;
                    this.getUsers();
                })
                .catch(err => {
                    this.deleteLoading = false;
                    this.displayError(err);
                });
            }
        },
        displayError(error) {
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
        },
    },
    mounted() {
        this.getUsers();
    }
}
</script>

<style scoped>
#title {
    font-family: 'Titan One', 'sans-serif';
}

.userCtrl, .btn{
    font-size: 0.75em;
}
</style>