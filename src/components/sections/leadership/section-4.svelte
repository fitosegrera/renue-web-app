<script>
  //LIBS
  import { onMount } from "svelte";

  //CONTAINERS
  import SectionContainer from "../../containers/section-one-col-center.svelte";

  //PROPS
  export let contents;
  console.log("contents", contents);

  onMount(async () => {
    let root = document.querySelector(":root");
    root.style.setProperty("--image_url", "url(" + contents.image_url + ")");
  });
</script>

<SectionContainer>
  <div
    id="wrapper"
    class="lg:px-48 sm:px-16 md:py-48 text-center lg:text-2xl md:text-xl sm:text-lg font-bold text-on-background-variant md:leading-lg sm:leading-md"
  >
    {#each contents.headline as headline, i}
      {#if i < 2}
        <div class="md:pt-72 sm:pt-48">
          <h1>{headline.text}</h1>
        </div>
      {:else}
        <div class="md:py-72 sm:py-48">
          <h1>
            {headline.text.slice(0, contents.spans[0].start)}
            <span class="text-primary-main">
              {headline.text.slice(contents.spans[0].start)}
            </span>
          </h1>
        </div>
      {/if}
    {/each}
    <div id="gradient" class="" />
  </div>
</SectionContainer>

<style>
  * {
    overflow: hidden;
  }

  :root {
    --image_url: url("https://previews.123rf.com/images/kinwun/kinwun1703/kinwun170300510/74707872-equipment-and-piping-as-found-inside-of-industrial-thermal-power-plant.jpg");
  }

  #wrapper {
    position: relative;
    z-index: 1;
    background-image: var(--image_url);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  #gradient {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: linear-gradient(
      to bottom right,
      #0b1d2ee2 25%,
      rgba(27, 50, 56, 0.668)
    );
  }
</style>
