<script>
  //CONTAINERS
  import SectionContainer from "../../containers/section-one-col-center.svelte";

  //SKETCHES
  import Sketch from "../../sketches/bg-aurora.svelte";

  //PROPS
  export let contents;
  // console.log("contents.", contents);

  let y;

  const mapValue = (val, in_min, in_max, out_min, out_max) => {
    return ((val - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  };
</script>

<svelte:window bind:scrollY={y} />

<SectionContainer>
  <div class="relative w-full h-full">
    {#if contents !== undefined}
      <div
        id="text-wrapper"
        class="text-4xl font-bold px-168 py-360 text-center"
      >
        <p class="gradient-text-dark">
          {contents.headline}
        </p>
      </div>
    {/if}
    <div id="bg-aurora" />
    <Sketch />
  </div>
</SectionContainer>

<style>
  * {
    overflow: hidden;
  }

  #bg-aurora {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  #text-wrapper {
    position: relative;
    /* top: 0;
    left: 0; */
    z-index: 10;
  }
</style>
