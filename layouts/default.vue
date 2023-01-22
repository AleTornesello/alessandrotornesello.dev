<template>
  <div id="main-container">
    <div>
      <Particles
        id="particles-container"
        :particlesInit="particlesInit"
        :options="particlesOptions"
      />
    </div>
    <div id="inner-container">
      <Container>
        <slot />
      </Container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Container from "~/components/common/Container.vue";
import { Engine } from "tsparticles-engine";
import { loadStarsPreset } from "tsparticles-preset-stars";

export default defineComponent({
  name: "DefaultLayout",
  components: {
    Container,
  },
  setup() {
    const particlesOptions = {
      preset: "stars",
      autoPlay: true,
      background: {
        color: {
          value: "#000000",
        },
        opacity: 0,
      },
      // particles: {
      //   color: {
      //     value: "#f00",
      //   },
      //   size: {
      //     value: 33,
      //   },
      // },
    };

    const particlesInit = async (engine: Engine): Promise<void> => {
      await loadStarsPreset(engine);
    };

    return {
      particlesInit,
      particlesOptions,
    };
  },
});
</script>

<style scoped>
#main-container {
  background-color: #0d1117;
  color: #ffffff;
  min-height: 100vh;
  height: 100vh;
  max-height: 100vh;
}

#particles-container {
  position: relative;
  z-index: 10;
}

#inner-container {
  position: relative;
  z-index: 1000;
}
</style>
