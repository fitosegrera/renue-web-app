<script>
  //LIBS
  import { onMount } from "svelte";

  //CONTAINERS
  import SectionContainer from "../../containers/matrix3x2.svelte";

  //PROPS
  export let contents;
  //console.log("contents.", contents);

  onMount(async () => {});

  let y;

  const mapValue = (val, in_min, in_max, out_min, out_max) => {
    return ((val - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  };
</script>

<svelte:window bind:scrollY={y} />

<SectionContainer>
  <!-- {#if contents !== undefined} -->

  {#each contents as item}
    <div
      class="flex flex-col mx-auto md:px-32 w-full text-on-background-variant text-center mt-32"
    >
      <div
        class="flex flex-col items-center justify-center text-2xl font-bold space-y-32"
      >
        {#if item.thumbnail.url !== undefined}
          <div
            id="img-container"
            class="flex items-center text-6xl text-secondary-light sm:h-200 md:h-320 mx-72 overflow-hidden rounded-xl"
            style="background-image: url({item.thumbnail.url});"
          >
            <!-- <img src={item.thumbnail.url} alt="" /> -->
          </div>
        {/if}
        <div class="w-full xl:h-148 md:h-132 lg:text-xl sm:text-2lg">
          <h1 class="text-primary-light">{item.headline[0].text}</h1>
        </div>
      </div>
      <div>
        <p class="md:text-lg sm:text-md leading-md pt-16">
          {item.paragraph[0].text}
        </p>
      </div>
    </div>
  {/each}

  <!-- {/if} -->
</SectionContainer>

<style>
  * {
    overflow: hidden;
  }
  #img-container {
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
</style>
