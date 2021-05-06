<template>
  <div v-if="filmInfo">
    <detail-header v-top :title="filmInfo.name"></detail-header>
    <div :style="{backgroundImage:'url('+filmInfo.poster+')'}"
      style="height:200px;background-size:cover;background-position:center;"></div>
    <h3>{{filmInfo.name}} - {{filmInfo.filmType.name}} </h3>
    <div>
      {{filmInfo.category}}
    </div>
    <div>
      {{filmInfo.premiereAt | dataFilter}}
    </div>
    <div>
      {{filmInfo.nation}}|{{filmInfo.runtime}}分钟
    </div>
    <div :class="isShow?'':'synopsis'">{{filmInfo.synopsis}}</div>
    <div style="text-align:center"><i class="iconfont" :class="isShow?'icon-less':' icon-moreunfold'"
        @click="isShow=!isShow"></i></div>
    <h3>演职人员</h3>
    <detail-swiper :perslide="3" swiperclass="swiper-actors">
      <div class="swiper-slide" v-for="(item,index) in filmInfo.actors" :key="index">
        <img :src="item.avatarAddress" />
        <div>
          <div>{{item.name}}</div>
          <div>{{item.role}}</div>
        </div>
      </div>
    </detail-swiper>
    <h3>剧照</h3>
    <detail-swiper :perslide="2" swiperclass="swiper-photos">
      <div class="swiper-slide" v-for="(item,index) in filmInfo.photos" :key="index">
        <div :style="{backgroundImage:'url('+item+')'}"
          style="height:100px;background-size:cover;background-position:center;" @click="handlePreview(index)"></div>
      </div>
    </detail-swiper>
  </div>
</template>

<script>
import Vue from "vue";
import http from "@/util/http";
import moment from "moment";
import DetailSwiper from "@/views/detail/DetailSwiper";
import DetailHeader from "@/views/detail/DetailHeader";
import { ImagePreview } from "vant";
import { mapMutations } from "vuex";

Vue.filter("dataFilter", (premiere) => {
  return moment(premiere * 1000).format("YYYY-MM-DD");
});
Vue.directive("top", {
  inserted(el) {
    el.style.display = "none";
    window.onscroll = () => {
      if (document.body.scrollTop || document.documentElement.scrollTop > 50) {
        el.style.display = "block";
      } else {
        el.style.display = "none";
      }
    };
  },
  unbind() {
    window.onscroll = null;
  },
});

export default {
  data() {
    return {
      filmInfo: null,
      isShow: false,
    };
  },
  components: {
    DetailSwiper,
    DetailHeader,
  },
  mounted() {
    // this.$store.commit("hide");
    this.hide();

    http({
      url: `/gateway?filmId=${this.$route.params.myid}&k=6951879`,
      headers: {
        "X-Host": "mall.film-ticket.film.info",
      },
    }).then((res) => {
      this.filmInfo = res.data.data.film;
    });
  },
  beforeDestroy() {
    // this.$store.commit("show");
    this.show();
  },
  methods: {
    ...mapMutations("TabbarModule", ["show", "hide"]),

    handlePreview(index) {
      ImagePreview({
        images: this.filmInfo.photos,
        startPosition: index,
        loop: false,
        closeable: true,
        closeIconPosition: "top-left",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.synopsis {
  height: 50px;
  overflow: hidden;
}
</style>