<script>
  // LIBS
  import { onMount } from "svelte";

  // PROPS
  export let background;

  onMount(async () => {
    let bg = document.getElementById("main-container");
    bg.style.backgroundImage = "url(" + background + ")";
    bg.style.backgroundRepeat = "no-repeat";
    bg.style.backgroundSize = "cover";
  });
</script>

<main id="main-container" class="w-full bg-transparent lg:py-168 sm:py-120">
  <slot />
</main>

<style>
  * {
    overflow: hidden;
  }

  #main-container {
    position: relative;
    top: 0;
    left: 0;
    max-width: 1920px;
    margin-left: auto;
    margin-right: auto;
    background-repeat: no-repeat;
  }
</style>
