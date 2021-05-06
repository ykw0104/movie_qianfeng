<template>
  <div>
    <tabbar v-show="isTabbarShow"></tabbar>

    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import Tabbar from "./components/Tabbar";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    Tabbar,
  },
  computed: {
    ...mapState("TabbarModule", ["isTabbarShow"]),
  },
  methods: {},
};
</script>
<style>
li {
  list-style: none;
}
* {
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}

section {
  margin-bottom: 50px;
}
</style>
