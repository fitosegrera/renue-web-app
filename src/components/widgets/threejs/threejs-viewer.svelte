<script>
  import { onMount } from "svelte";

  let e;

  onMount(async () => {
    const { createScene } = await import("./js/scene");
    createScene(e);
  });
</script>

<canvas bind:this={e} />
<div
  id="loader"
  class="flex w-full h-full items-center justify-center text-4xl text-secondary-dark"
/>

<style>
  div {
    position: absolute;
    top: 0;
    z-index: 10;
  }
</style>
