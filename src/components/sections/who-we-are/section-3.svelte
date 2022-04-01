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
    {#if contents.spans !== undefined}
      <div
        id="text-wrapper"
        class="text-4xl font-bold px-168 py-200 text-center"
      >
        <p class="">
          <span class="gradient-text-dark px-8">
            {contents.headline.substring(0, contents.spans[0].start)}
          </span>
          <span class="gradient-text-dark-variant px-8 italic">
            {contents.headline.substring(
              contents.spans[0].start,
              contents.spans[0].end
            )}
          </span>
          <span class="gradient-text-dark px-8">
            {contents.headline.substring(
              contents.spans[0].end,
              contents.spans[1].start
            )}
          </span>
          <span class="gradient-text-dark-variant px-8 italic">
            {contents.headline.substring(
              contents.spans[1].start,
              contents.spans[1].end
            )}
          </span>
          <span class="gradient-text-dark px-8">
            {contents.headline.substring(
              contents.spans[1].end,
              contents.spans[2].start
            )}
          </span>
          <span class="gradient-text-dark-variant px-8 italic">
            {contents.headline.substring(
              contents.spans[2].start,
              contents.spans[2].end
            )}
          </span>
          <span class="gradient-text-dark px-8">
            {contents.headline.substring(
              contents.spans[2].end,
              contents.headline.length
            )}
          </span>
        </p>
      </div>
    {:else}
      <div
        id="text-wrapper"
        class="text-4xl font-bold px-168 py-200 text-center"
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
