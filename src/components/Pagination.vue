<template>
    <nav class="mx-auto" aria-label="Page navigation example">
        <ul class="pagination">
            <!-- Link to first page -->
            <li class="page-item" @click="this.clickPage(0)">
                <a class="page-link" href="#" aria-label="First">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>

            <!-- Links to 3 central pages -->
            <li class="page-item" 
            :class="{active: (this.currentPage == this.pgNum[0])}"
            @click="this.clickPage(this.pgNum[0])">
                <a class="page-link" href="#">{{ this.pgNum[0] }}</a>
            </li>

            <li class="page-item"
            :class="{active: (this.currentPage == this.pgNum[1])}"
            v-show="(this.pgNum[1] > 0)"
            @click="this.clickPage(this.pgNum[1])">
                <a class="page-link" href="#">{{ this.pgNum[1] }}</a>
            </li>

            <li class="page-item"
            :class="{active: (this.currentPage == this.pgNum[2])}"
            v-show="(this.pgNum[2] > 0)"
            @click="this.clickPage(this.pgNum[2])">
                <a class="page-link" href="#">{{ this.pgNum[2] }}</a>
            </li>
            
            <!-- Link to last page -->
            <li class="page-item" @click="this.clickPage(-1)">
                <a class="page-link" href="#" aria-label="Last">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: "Pagination",
    emit: ["pageUpd"],
    props: {
        pages: Number,
        pageNum: Number,
    },
    data() {
        return {
            pgNum: [1, 2, 3],
            currentPage: 1,
        }
    },
    mounted() {
        this.currentPage = this.pageNum;
    },
    methods: {
        clickPage(num) {
            // Update current page
            if (num === 0) {
                this.currentPage = 1;
            } else if (num === -1) {
                this.currentPage = this.pages;
            } else {
                this.currentPage = num;
            }
            // Update page numbers
            this.pgNum = this.currentPage > 1 ? [-1, 0, 1].map(x => x+this.currentPage) : [1, 2 ,3];
            this.pgNum = this.currentPage < this.pages ? this.pgNum : [-2, -1, 0].map(x => x+this.pages);
            if (this.pages === 2) { this.pgNum = [1, 2, 0] }
            if (this.pages === 1) { this.pgNum = [1, 0, 0] }

            // Emit update
            this.$emit("pageUpd", this.currentPage);
        },
    }
}
</script>

<style scoped lang="scss">
@import "../styles/settings.scss";
a {
    color: $boscoDark;
}

.page-item.active .page-link {
    color: #fff;
    background-color: $boscoDark;
    border-color: $boscoDark;
}
</style>