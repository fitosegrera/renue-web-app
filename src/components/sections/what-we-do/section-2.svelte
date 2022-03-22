<script>
  //LIBS
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";

  //COMPONENTS
  // import Button

  //PROPS
  export let contents;
  console.log("contents.", contents);
  // console.log(Object.keys(contents[0].image).length === 0);

  onMount(async () => {
    //await document.getElementById("vid").play();
  });
</script>

{#await contents then items}
  {#each items as item, i}
    {#if item.title1.length > 0}
      <div
        class="w-full text-center font-bold text-xl gradient-text-extra-light pt-120 py-32 px-148"
      >
        <h1>{item.title1[0].text}</h1>
      </div>
    {/if}
    <div
      class="flex items-center justify-center w-full h-full space-x-32 py-56"
    >
      {#if item.orientation === "left"}
        <div>
          <video id="vid" loop width="920" height="518" autoplay="autoplay">
            <source src="/assets/videos/scene-{i + 1}.webm" type="video/webm" />
          </video>
        </div>
        <div class="w-35">
          <div class="flex items-center space-x-16">
            <div class="text-2xl text-primary-light">
              <Icon icon="mdi:oil-level" />
            </div>
            <div>
              <h1 class="text-2xl font-semibold gradient-text-extra-light">
                {item.headline[0].text}
              </h1>
            </div>
          </div>
          {#each item.information as info, i}
            <div class="flex w-full items-center">
              {#if info.text.length > 0}
                <div class="text-xl font-bold text-primary-light w-56">
                  <p>{i + 1}.</p>
                </div>
                <div>
                  <p
                    class="w-620 text-lg text-on-background-variant mt-16 px-8"
                  >
                    {info.text}
                  </p>
                </div>
              {/if}
            </div>
          {/each}
          {#if Object.keys(item.image).length > 0}{/if}
        </div>
      {:else}
        <div class="w-35">
          <div class="flex items-center space-x-16">
            <div class="text-2xl text-primary-light">
              <Icon icon="mdi:oil-level" />
            </div>
            <div>
              <h1 class="text-2xl font-semibold gradient-text-extra-light">
                {item.headline[0].text}
              </h1>
            </div>
          </div>
          {#each item.information as info, i}
            <div class="flex w-full items-center">
              {#if info.text.length > 0}
                <div class="text-xl font-bold text-primary-light w-56">
                  <p>{i + 1}.</p>
                </div>
                <div>
                  <p
                    class="w-620 text-lg text-on-background-variant mt-16 px-8"
                  >
                    {info.text}
                  </p>
                </div>
              {/if}
            </div>
          {/each}
          {#if Object.keys(item.image).length > 0}
            <a href={item.image.url} target="__blank">
              <div
                class="flex w-full items-center justify-start text-primary-light hover:text-secondary-main h-full my-32 space-x-8 cursor-pointer"
              >
                <!-- <div class=" text-2xl font-bold">
                  <Icon icon="ant-design:area-chart-outlined" />
                </div> -->
                <div class="text-lg font-bold ">
                  <h2>{item.image.alt}</h2>
                </div>
              </div>
            </a>
          {/if}
        </div>
        <div>
          <video id="vid" loop width="820" autoplay="autoplay">
            <source src="/assets/videos/scene-{i + 1}.webm" type="video/webm" />
          </video>
        </div>
      {/if}
    </div>
    {#if item["extra-information"].length > 0}
      <div
        class="w-full text-center font-bold text-xl gradient-text-extra-light pt-120 py-32 px-148"
      >
        <h1>{item["extra-information"][0].text}</h1>
      </div>
    {/if}
  {/each}
{/await}
