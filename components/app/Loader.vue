<template>
  <div class="loader loader-ellipsis" :class="{ active: isLoading }">
    <div v-for="i in 4" :key="i" :class="`circle circle--${i}`"></div>
  </div>
</template>

<script>
export default {
  name: 'AppLoader',
  props: ['isLoading'],
};
</script>

<style scoped lang="scss">
.active.loader-ellipsis .circle {
  &.circle--1 {
    left: 8px;
    animation: loader-ellipsis1 0.6s infinite;
  }
  &.circle--2 {
    left: 8px;
    animation: loader-ellipsis2 0.6s infinite;
  }
  &.circle--3 {
    left: 32px;
    animation: loader-ellipsis2 0.6s infinite;
  }
  &.circle--4 {
    left: 56px;
    animation: loader-ellipsis3 0.6s infinite;
  }
}

.circle--1,
.circle--2 {
  background-color: $prim-color;
}
.circle--3,
.circle--4 {
  background-color: $op-color;
}
.loader-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.loader-ellipsis .circle {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #fff;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

@keyframes loader-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes loader-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
@keyframes loader-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>
