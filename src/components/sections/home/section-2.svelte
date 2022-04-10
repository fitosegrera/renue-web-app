<script>
  //LIBS
  import { onMount } from "svelte";
  //CONTAINERS
  import SectionContainerTwoCols from "../../containers/section-two-cols.svelte";
  import SectionOneCol from "../../containers/section-one-col.svelte";

  //STORES
  import { break_point } from "../../../stores/renuestore";

  //PROPS
  export let data;
  // console.log("DATA", data);

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

<svelte:window bind:innerWidth />

{#if mobileView}
  <SectionOneCol>
    <div
      class="flex items-center w-full text-on-background-variant md:text-2xl sm:text-xl md:leading-3xl text-left mt-32 md:px-72 sm:px-24"
    >
      <h1>
        {data.headline}
      </h1>
    </div>
    <div
      class="flex items-center w-full text-on-background-variant text-lg text-left md:px-72 sm:px-24 mt-64"
    >
      <h1>
        {data.paragraph.substr(0, data.start)}
        <p class="text-primary-light font-bold mt-64 text-xl">
          {data.paragraph.substr(data.start, data.end)}
        </p>
      </h1>
    </div>
  </SectionOneCol>
{:else}
  <SectionContainerTwoCols>
    <div
      class="flex items-center w-full text-on-background-variant md:text-2xl md:leading-3xl text-left my-120"
    >
      <h1>
        {data.headline}
      </h1>
    </div>
    <div
      class="flex items-center w-full text-on-background-variant text-lg text-left"
    >
      <h1>
        {data.paragraph.substr(0, data.start)}
        <p class="text-primary-light font-bold mt-32 text-xl">
          {data.paragraph.substr(data.start, data.end)}
        </p>
      </h1>
    </div>
  </SectionContainerTwoCols>
{/if}

<style>
  * {
    overflow: hidden;
  }
</style>
