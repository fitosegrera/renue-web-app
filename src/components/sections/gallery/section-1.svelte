<script>
  //CONTAINERS
  import SectionContainer from "../../containers/matrix3x2.svelte";

  //COMPONENTS
  import Button from "../../buttons/md-primary-light-icon-outlined.svelte";

  //PROPS
  export let contents;
  // console.log("contents.", contents);
</script>

<div class="gradient-bg-semidark-secondary">
  <SectionContainer>
    {#each contents as item}
      <div
        class="flex flex-col mx-auto w-full h-full text-on-background-variant text-center"
      >
        <div
          class="flex flex-col items-center justify-center text-2xl font-bold text-center space-y-32"
        >
          {#if item.image.url !== undefined}
            <div
              id="img-container"
              class="flex items-center text-6xl text-secondary-light h-320  overflow-hidden rounded-xl"
            >
              <img src={item.image.url} alt="" />
            </div>
          {:else}
            <div
              class="flex items-center w-full justify-center h-320 overflow-hidden rounded-xl"
            >
              <video id="vid" loop width="920" height="518" autoplay="autoplay">
                <source src="/assets/videos/oil.webm" type="video/webm" />
              </video>
            </div>
          {/if}
          <div class="w-full md:h-96 sm:h-120 leading-lg">
            <h1 class="gradient-text-light text-xl">
              {item.headline[0].text}
            </h1>
          </div>
        </div>
        <div class="md:h-240">
          <p class="text-lg leading-sm px-72 py-16">
            {item.paragraph[0].text}
          </p>
        </div>
        <div class="flex justify-center my-32">
          {#if item["button-label"].length > 0}
            <Button
              label={item["button-label"][0].text}
              icon_label="ic:baseline-read-more"
              url={item["button-url"].url}
            />
          {/if}
        </div>
      </div>
    {/each}
  </SectionContainer>
</div>

<style>
  * {
    overflow: hidden;
  }

  #img-container {
    /* background-repeat: no-repeat;
    background-position: center;
    background-size: cover; */
  }
</style>
