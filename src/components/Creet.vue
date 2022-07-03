<template>
    <div class="card p-0 my-2">
        <div class="card-header row mx-0 p-2">
            <div class="col-xs-6 font-weight-bold">
                {{ this.author }}
            </div>
            <div class="col-xs-6 ml-auto text-right font-italic">
                {{ this.dateAndTime }}
            </div>
        </div>
        <div class="card-body p-2">
            {{ creet.content }}
        </div>
        <div class="card-footer p-2">
            todo
        </div>
    </div>
</template>

<script>
export default {
    name: "Creet",
    props: ['creet'],
    data() {
        return {
            author: "EmilioConiglio",
            isOwner: true,
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
    background-color: $boscoSemiDark;
}

.card-body, .card-footer {
    background-color: $boscoLight;
}

</style>