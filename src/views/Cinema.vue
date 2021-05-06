<template>
  <div>
    <van-nav-bar title="标题" @click-left="handleLeft" @click-right="handleRight">
      <template #left>
        {{cityName}}
        <van-icon name="arrow-down" color="#000" />
      </template>
      <template #right>
        <van-icon name="search" size="28" color="#000" />
      </template>
    </van-nav-bar>
    <div class="cinema" :style="{height:height}">
      <ul>
        <li v-for="data in cinemaList" :key="data.cinemaId">
          <div>{{data.name}}</div>
          <div class="address">{{data.address}}</div>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import BetterScroll from "better-scroll";
import Vue from "vue";
import { NavBar, Icon } from "vant";
import { mapState, mapMutations, mapActions } from "vuex";

Vue.use(NavBar).use(Icon);

export default {
  data() {
    return {
      height: 0,
    };
  },
  computed: {
    ...mapState("CinemaModule", ["cinemaList"]),
    ...mapState("CityModule", ["cityId", "cityName"]),
  },
  methods: {
    ...mapActions("CinemaModule", ["getCinemaList"]),
    ...mapMutations("CinemaModule", ["clearCinemaList"]),

    handleLeft() {
      //清空cienmaList
      this.clearCinemaList();
      this.$router.push("/city");
    },
    handleRight() {
      this.$router.push("/cinema/search");
    },
  },
  mounted() {
    this.height = document.documentElement.clientHeight - 100 + "px";

    if (this.cinemaList.length === 0) {
      //vuex 异步流程
      this.getCinemaList(this.cityId).then((res) => {
        this.$nextTick(() => {
          new BetterScroll(".cinema", {
            scrollbar: {
              fade: true,
            },
          });
        });
      });
    } else {
      this.$nextTick(() => {
        new BetterScroll(".cinema", {
          scrollbar: {
            fade: true,
          },
        });
      });
    }
  },
};
</script>
<style lang="scss" scoped>
li {
  padding: 5px;
  .address {
    font-size: 12px;
    color: #333;
  }
}

.cinema {
  position: relative;
  overflow: hidden;
}
</style>

