<script>
  //LIBS
  import { fade } from "svelte/transition";

  //CONTAINERS
  import SectionContainer from "../../containers/section-two-cols-non-proportional.svelte";

  //PROPS
  export let contents;
  //console.log(contents.image_alt);

  let y;
</script>

<svelte:window bind:scrollY={y} />

<div id="bg" class="bg-background-light text-secondary-dark">
  <SectionContainer>
    <div
      class="flex items-center justify-center my-auto w-50 h-full text-lg text-left"
    >
      <h1>{contents.paragraph}</h1>
      <!-- {#if y > 150} 
      <h1 in:fade={{ duration: 600 }} out:fade class="">
        {contents.paragraph}
      </h1>
      {:else}
        <div class="w-full h-full bg-transparent" />
      {/if} -->
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

<style>
  * {
    overflow: hidden;
  }
</style>
