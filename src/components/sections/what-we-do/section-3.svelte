<script>
  //LIBS
  import Icon from "@iconify/svelte";

  //CONTAINERS
  import SectionContainer from "../../containers/matrix3x2.svelte";

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
  <!-- {#if contents !== undefined} -->

  {#each contents as item}
    <div
      class="flex flex-col mx-auto w-full text-on-background-variant text-center"
    >
      <div
        class="flex flex-col items-center justify-center text-xl font-bold text-center space-y-32"
      >
        <div id="img-container" class="text-6xl text-secondary-light w-240">
          <img src={item.thumbnail.url} alt="" />
        </div>
        <div>
          <h1 class="gradient-text-light">{item.headline[0].text}</h1>
        </div>
      </div>
      <!-- {contents.headline} -->
      <div>
        <p class="text-lg leading-sm px-72 py-16">
          {item.paragraph[0].text}
        </p>
      </div>
    </div>
  {/each}

  <!-- {/if} -->
</SectionContainer>

<style>
  #img-container {
  }
</style>
