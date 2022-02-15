<script>
  //LIBS
  import Icon from "@iconify/svelte";

  //CONTAINERS
  import SectionContainer from "../../containers/matrix3x2.svelte";

  //PROPS
  export let contents;
  // console.log("contents.", contents);

  let items = ["", "", "", "", "", ""];

  let y;

  const mapValue = (val, in_min, in_max, out_min, out_max) => {
    return ((val - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  };
</script>

<svelte:window bind:scrollY={y} />

<SectionContainer>
  <!-- {#if contents !== undefined} -->

  {#each items as item}
    <div
      class="flex flex-col mx-auto w-full text-on-background-variant text-center"
    >
      <div
        class="flex flex-col items-center justify-center text-2xl font-bold text-center space-y-32"
      >
        <div class="text-6xl text-secondary-light">
          <Icon icon="fa:recycle" />
        </div>
        <div>
          <h1 class="gradient-text-light">Title One</h1>
        </div>
      </div>
      <!-- {contents.headline} -->
      <div>
        <p class="text-lg leading-sm px-72 py-16">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna.
        </p>
      </div>
    </div>
  {/each}

  <!-- {/if} -->
</SectionContainer>

<style>
</style>
