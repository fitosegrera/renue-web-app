<script>
  //PROPS
  export let slides;
  // console.log("slides", slides);
</script>

{#each slides as slide}
  {#if slide.active}
    <div id="dot" class="w-16 h-16 bg-secondary-main" />
  {:else}
    <div id="dot" class="w-16 h-16 bg-primary-main" />
  {/if}
{/each}

<style>
  #dot {
    border-radius: 50%;
  }
</style>
