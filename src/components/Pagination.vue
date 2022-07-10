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
            currentPage: 1,
        }
    },
    computed: {
        pgNum() {
            // Update page numbers
            let pgNum = this.currentPage > 1 ? [-1, 0, 1].map(x => x+this.currentPage) : [1, 2 ,3];
            pgNum = this.currentPage < this.pages ? pgNum : [-2, -1, 0].map(x => x+this.pages);
            if (this.pages === 2) { pgNum = [1, 2, 0] }
            if (this.pages === 1) { pgNum = [1, 0, 0] }
            return pgNum;
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

.page-link:hover {
    color: $boscoDark;
}
</style>