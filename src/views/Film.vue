<template>
  <div>
    <film-swiper>
      <div class="swiper-slide" v-for="(item,index) of imgList" :key="index">
        <div :style="{backgroundImage:'url('+item+')'}" style="height:200px;background-size:cover;"></div>
      </div>
    </film-swiper>
    <film-header style="position:sticky;top:0;background:white;z-index:100">
    </film-header>

    <router-view></router-view>
  </div>
</template>

<script>
import FilmHeader from "./film/FilmHeader";
import FilmSwiper from "./film/FilmSwiper";

const img1 =
  "https://pic.maizuo.com/usr/movie/849c13caead70928f1ec801cd052b014.jpg?x-oss-process=image/quality,Q_70";
const img2 =
  "https://static.maizuo.com/pc/v5/usr/movie/55e5788156b285f036bb09748266b8dc.jpg?x-oss-process=image/quality,Q_70";
const img3 =
  "https://pic.maizuo.com/usr/movie/947906c4689a464364b5d96e977de6d2.jpg?x-oss-process=image/quality,Q_70";

export default {
  components: { FilmHeader, FilmSwiper },
  data() {
    return {
      imgList: [img1, img2, img3],
    };
  },
};
</script>
<style scoped>
</style>

