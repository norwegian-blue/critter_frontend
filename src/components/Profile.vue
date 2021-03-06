<template>
    <div class="container col-md-12">
        <header>
            <div v-if="currentUser" id="userName">
                <h4 class="mx-0 my-3 text-center">&#x1008A; - {{ currentUser.alias }} - &#x1008A;</h4>
            </div>
        </header>

        <!-- Admin control panel -->
        <div class="card card-container py-3" v-if="currentUser && currentUser.role === 'ADMIN'">
            <AdminPanel/>
        </div>

        <!-- Update user info -->
        <div class="card card-container">
            <img class="rounded mx-auto mb-3" src="hedgehogMagician.jpg" style="width:75%;height:75%"/>
            <Form @submit="handleUpdate" :validation-schema="schema">
                <div class="form-group">
                    <label for="username">New Username</label>
                    <Field name="username" type="text" class="form-control" />
                    <ErrorMessage name="username" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="password">New Password</label>
                    <Field name="password" type="password" class="form-control" />
                    <ErrorMessage name="password" class="error-feedback" />
                </div>
                <div class="form-group mb-0">
                    <button class="btn btn-bosco btn-block" :disabled="updLoading">
                        Update Profile
                    </button>
                </div>
                <div class="form-group mt-3">
                    <div v-if="updMessage" class="alert" 
                        :class="updSuccess ? 'alert-success' : 'alert-danger'"
                         role="alert">
                        {{ updMessage }}
                    </div>
                </div>
            </Form>  
        </div>

        <!-- Delete user -->
        <div class="card card-container">
            <img class="rounded mx-auto mb-3" src="rabbitMoon.jpg" style="width:50%;height:50%"/>
            <Form @submit="handleDelete">
                <div class="form-group">
                    <button class="btn btn-bosco btn-block" :disabled="delLoading">
                        Delete Profile
                    </button> 
                </div>
                <div class="form-group mt-3">
                    <div v-if="delMessage" class="alert alert-danger" role="alert">
                        {{ delMessage }}
                    </div>
                </div>
            </Form>
       </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import AdminPanel from "./AdminPanel.vue";
import * as yup from "yup";
export default {
    name: "Profile",
    components: {
        Form,
        Field,
        ErrorMessage,
        AdminPanel,
    },
    data() {
        const schema = yup.object().shape({
            username: yup
                .string()
                .required("Username is required!")
                .min(3, "Must be at least 3 characters!")
                .max(20, "Must be maximum 20 characters!"),
            password: yup
                .string()
                .required("Password is required!")
                .min(6, "Must be at least 6 characters!")
                .max(40, "Must be maximum 40 character"),
        });
        return {
            updLoading: false,
            updMessage: "",
            updSuccess: false,
            delLoading: false,
            delMessage: "",
            schema,
        };
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
    },
    updated() {
        if (!this.$store.state.auth.status.loggedIn) {
            return this.$router.push("/Landing");
        }
    },
    methods: {
        handleUpdate(user) {
            this.updLoading = true;
            this.updMessage = "";
            this.updSuccess = false;
            this.$store.dispatch("auth/update", {user: user, userId: this.currentUser.id}).then(
                (data) => {
                    this.updLoading = false;
                    this.updMessage = "Successfully updated user info!";
                    this.updSuccess = true;
                },
                (error) => {
                    this.updLoading = false;
                    this.updMessage = 
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },
        handleDelete() {
            if (confirm("Do you really want to permanently delete current user?")) {
                this.delLoading = true;
                this.$store.dispatch("auth/delete", this.currentUser.id).then(
                    () => {
                        this.$router.push("/home");
                    },
                    (error) => {
                        this.delLoading = false;
                        this.delMessage = 
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();
                    }
                );
            }
        },
    }
}
</script>

<style lang="scss" scoped>
@import "../styles/settings.scss";

label {
    display: block;
    margin-top: 10px;
}

.card-container.card {
    max-width: 350px !important;
    padding: 25px 30px;
}

.card {
    background-color: #f7f7f7;
    padding: 20px 25px 30px;
    margin: 0 auto 25px;
    margin-top: 20px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.error-feedback {
color: red;
}

.btn-bosco {
    color: #fff;
    background-color: $boscoDark;
}

#userName {
    font-family: 'Titan One', 'Noto Sans Linear B', sans-serif; 
}
</style>