<script>
  //LIBS
  import { onMount } from "svelte";

  //PROPS
  export let headline, paragraph, image_url, start, end;

  onMount(async () => {
    let root = document.documentElement;
    //let style = getComputedStyle(document.body);
    await root.style.setProperty("--image-url", "url(" + image_url + ")");
    //console.log("XXXX:", style.getPropertyValue("--image-url"));
  });
</script>

<div id="wrapper">
  <div id="gradient">
    <div
      id="contents"
      class="flex text-on-background-variant pt-240 lg:px-56 md:px-32 sm:px-16"
    >
      <div class="flex items-center space-x-24 h-auto">
        <div
          id="vertical-line"
          class="w-5 lg:h-292 md:h-240 sm:h-360 gradient-blue-to-green-light-diagonal"
        />
        <div>
          <div>
            <h1
              class="lg:text-3xl md:text-2xl sm:text-2xl font-bold xl:leading-5xl md:leading-4xl sm:leading-lg w-full"
            >
              {headline}
            </h1>
          </div>
          <div class="lg:w-75">
            {#if start != undefined}
              <h2 class="text-lg leading-md mt-16">
                {paragraph.substring(0, start)}
                <a
                  href="mailto:cnieto@renueenviro.com"
                  class="text-primary-main font-bold"
                >
                  {paragraph.substring(start, end)}
                </a>
              </h2>
            {:else}
              <h2
                class="mt-32 font-normal lg:text-lg md:text-md sm:text-md lg:leading-md sm:leading-sm"
              >
                {paragraph}
              </h2>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  * {
    overflow: hidden;
  }

  :root {
    --image-url: url("https://media.istockphoto.com/photos/stainless-steel-pipes-and-pipelines-in-modern-beer-factory-brewery-picture-id1152495926");
  }

  #wrapper {
    position: relative;
    z-index: 1;
    min-height: 700px;
    margin: auto;
    background-image: var(--image-url);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  #gradient {
    position: absolute;
    margin: auto;
    left: 0;
    top: 0;
    min-height: 700px;
    width: 100%;
    z-index: -10;
    background: linear-gradient(
      to bottom right,
      #0b1d2ef0 10%,
      rgba(53, 53, 53, 0.414)
    );
  }

  #contents {
    position: absolute;
    z-index: 10;
  }
</style>
