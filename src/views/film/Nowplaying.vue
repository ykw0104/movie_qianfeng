<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
      <van-cell v-for="data in datalist" :key="data.filmId" @click="handleClick(data.filmId)">
        <img :src="data.poster" />
        <h3>{{data.name}}</h3>
        <p>主演:{{data.actors | actorFilter }}</p>
        <p>{{data.nation}} | {{data.runtime}}分钟</p>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import http from "@/util/http";
import Vue from "vue";
import { List, Cell } from "vant";
import { mapState } from "vuex";

Vue.use(List).use(Cell);

Vue.filter("actorFilter", (actors) => {
  if (actors === undefined) return "暂无主演";
  return actors.map((item) => item.name).join(" ");
});

export default {
  data() {
    return {
      datalist: [],
      loading: false,
      finished: false,
      current: 1,
      total: 0,
    };
  },

  mounted() {
    http({
      url: `/gateway?cityId=${this.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=136082`,
      headers: {
        "X-Host": "mall.film-ticket.film.list",
      },
    }).then((res) => {
      this.datalist = res.data.data.films;
      this.total = res.data.data.total;
    });
  },
  computed: {
    ...mapState("CityModule", ["cityId"]),
  },
  methods: {
    handleClick(id) {
      this.$router.push(`/detail/${id}`);
    },
    onLoad() {
      if (this.datalist.length === this.total && this.datalist.length !== 0) {
        this.finished = true;
        return;
      }

      this.current++;
      http({
        url: `/gateway?cityId=${this.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=136082`,
        headers: {
          "X-Host": "mall.film-ticket.film.list",
        },
      }).then((res) => {
        this.datalist = [...this.datalist, ...res.data.data.films];
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.van-cell {
  overflow: hidden;
  padding: 10px;
  img {
    float: left;
    width: 100px;
  }
  p {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>
