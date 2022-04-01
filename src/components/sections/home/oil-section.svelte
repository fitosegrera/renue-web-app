<script>
  //CONTAINERS
  import SectionContainer from "../../containers/section-two-cols.svelte";

  // LIBS
  import Icon from "@iconify/svelte";

  //PROPS
  export let data;
</script>

{#await data then item}
  <div class="w-auto h-auto grid grid-cols-2 xl:mx-72 md:mx-72 my-96">
    <div id="video-container">
      <video id="vid" loop width="1200" autoplay="autoplay" muted>
        <source src="/assets/videos/scene-1.webm" type="video/webm" />
        <track kind="captions" />
      </video>
    </div>
    <div class="ml-60">
      <div class="flex items-center space-x-12">
        <!-- <div class="text-2xl text-primary-light">
          <Icon icon="mdi:oil-level" />
        </div> -->
        <div>
          <h1 class="text-2xl font-semibold text-on-background-variant">
            {item[0].headline[0].text}
          </h1>
        </div>
      </div>

      {#each item[0].information as info, i}
        <div class="flex w-full items-center">
          {#if info.text.length > 0}
            <div>
              <p class="text-lg text-on-background-variant mt-16">
                <span class="font-bold text-primary-light mr-12"
                  >{i + 1}.
                </span>{info.text}
              </p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
{/await}

<style>
  * {
    overflow: hidden;
  }
  #video-container {
    position: relative;
    width: 100%;
  }
  video {
    margin: auto;
    display: block;
  }
</style>
