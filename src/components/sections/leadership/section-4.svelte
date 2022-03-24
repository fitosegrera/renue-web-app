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
    class="px-148 py-120 text-center text-2xl font-bold text-on-background-variant leading-lg"
  >
    {#each contents.headline as headline, i}
      {#if i < 2}
        <div class="my-72">
          <h1>{headline.text}</h1>
        </div>
      {:else}
        <div class="my-72">
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
      #0b1d2ec4 25%,
      rgba(27, 50, 56, 0.493)
    );
  }
</style>
