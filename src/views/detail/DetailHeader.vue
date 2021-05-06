<template>
  <div>{{title}}</div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
  },
};
</script>
<style scoped>
div {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: #fff;
}
</style>