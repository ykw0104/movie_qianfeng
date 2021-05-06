<template>
  <div>
    <van-index-bar :index-list="computedCityList" @select="handleSelect">
      <div v-for="data in cityList" :key="data.type">
        <van-index-anchor :index="data.type" />
        <van-cell :title="item.name" v-for="(item,index) in data.list" :key="index"
          @click="handleChangePage(item.name,item.cityId)" />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import Vue from "vue";
import { IndexBar, IndexAnchor, Toast } from "vant";
import http from "@/util/http";
import { mapMutations } from "vuex";

Vue.use(IndexBar);
Vue.use(IndexAnchor);
export default {
  data() {
    return {
      cityList: [],
    };
  },
  mounted() {
    http({
      url: "/gateway?k=6609625",
      headers: {
        "X-Host": "mall.film-ticket.city.list",
      },
    }).then((res) => {
      this.cityList = this.handleCityData(res.data.data.cities);
    });
  },
  computed: {
    computedCityList() {
      return this.cityList.map((item) => item.type);
    },
  },
  methods: {
    ...mapMutations("CityModule", ["changeCityName", "changCityId"]),

    handleCityData(cities) {
      const letterArr = [];
      const newCities = [];
      for (let code = 65; code < 91; code++) {
        letterArr.push(String.fromCharCode(code));
      }

      letterArr.forEach((letter) => {
        const list = cities.filter(
          (item) => item.pinyin.slice(0, 1).toUpperCase() === letter
        );
        if (list.length > 0) {
          newCities.push({
            type: letter,
            list: list,
          });
        }
      });

      return newCities;
    },

    handleSelect(index) {
      Toast(index);
    },
    handleChangePage(name, cityId) {
      this.changeCityName(name);
      this.changCityId(cityId);
      this.$router.back();
    },
  },
};
</script>
<style scoped>
.van-toast--text {
  min-width: auto;
}
</style>