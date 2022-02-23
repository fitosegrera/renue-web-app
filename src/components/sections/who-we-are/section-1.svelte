<script>
  //LIBS
  import { fade } from "svelte/transition";

  //CONTAINERS
  import SectionContainer from "../../containers/section-two-cols.svelte";

  //PROPS
  export let contents;

  let y;
</script>

<svelte:window bind:scrollY={y} />

<div id="bg" class="bg-background-light text-secondary-dark">
  <SectionContainer>
    <div
      class="flex items-center justify-center w-full md:text-2xl md:leading-3xl text-left"
    >
      <div class="w-100 h-full">
        <img src={contents.image_url} alt="" />
      </div>
    </div>
    <div class="flex items-center w-full h-full text-lg text-left">
      {#if y > 250}
        <h1 in:fade={{ duration: 600 }} out:fade class="">
          {contents.paragraph}
        </h1>
      {:else}
        <div class="w-full h-full bg-transparent" />
      {/if}
    </div>
  </SectionContainer>
</div>

<style>
  * {
    overflow: hidden;
  }
</style>
