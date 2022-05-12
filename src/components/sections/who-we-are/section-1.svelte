<script>
  //LIBS
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";

  //CONTAINERS
  import SectionContainer from "../../containers/section-two-cols-non-proportional.svelte";

  //STORES
  import { break_point } from "../../../stores/renuestore";

  //PROPS
  export let contents;
  //console.log(contents.image_alt);

  let y;

  let mobileView = false;
  let innerWidth;

  const switchView = (e) => {
    if (innerWidth <= $break_point) {
      mobileView = true;
    } else {
      mobileView = false;
    }
  };

  onMount(async () => {
    if (innerWidth <= $break_point) {
      mobileView = true;
    } else {
      mobileView = false;
    }

    //console.log(innerWidth, mobileView);

    const mediaListener = window.matchMedia(
      "(max-width: " + $break_point + "px)"
    );
    mediaListener.addListener(switchView);
  });
</script>

<!-- <svelte:window bind:scrollY={y} /> -->
<svelte:window bind:innerWidth />

{#if mobileView}
  <div id="bg" class="bg-background-light text-secondary-dark">
    <div class="w-full md:text-2xl md:leading-3xl text-center">
      <div class="w-full h-full leading-sm pt-48">
        <img src={contents.image_url} alt={contents.image_alt} />
        <p class="w-full text-md text-center font-semibold">
          {contents.image_alt.split("%%")[0]}
        </p>
        <p class="w-full text-md text-center italic">
          {contents.image_alt.split("%%")[1]}
        </p>
      </div>
    </div>
    <div class="w-full h-full text-md text-left px-32 my-48">
      <h1>{contents.paragraph}</h1>
    </div>
  </div>
{:else}
  <div id="bg" class="bg-background-light text-secondary-dark">
    <SectionContainer>
      <div
        class="flex items-center justify-center my-auto w-full h-full text-lg text-left"
      >
        <h1>{contents.paragraph}</h1>
      </div>
      <div
        class="flex items-center justify-center w-full md:text-2xl md:leading-3xl text-center"
      >
        <div class="w-full h-full leading-sm">
          <img src={contents.image_url} alt={contents.image_alt} />
          <p class="w-full text-md text-center font-semibold">
            {contents.image_alt.split("%%")[0]}
          </p>
          <p class="w-full text-md text-center italic">
            {contents.image_alt.split("%%")[1]}
          </p>
        </div>
      </div>
    </SectionContainer>
  </div>
{/if}

<style>
  * {
    overflow: hidden;
  }
</style>
