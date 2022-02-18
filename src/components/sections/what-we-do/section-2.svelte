<script>
  //LIBS
  import Icon from "@iconify/svelte";

  //PROPS
  export let contents;
  console.log("CONTENTS", contents.length);
</script>

{#await contents then items}
  {#each items as item, i}
    <div
      class="flex items-center justify-center w-full h-full pt-200 space-x-32"
    >
      {#if item.orientation === "left"}
        <div>
          <video loop width="920" height="518" autoplay="autoplay">
            <source src="/assets/videos/scene-{i + 1}.webm" type="video/webm" />
          </video>
        </div>
        <div class="w-35">
          <div class="flex items-center space-x-16">
            <div class="text-2xl text-primary-light">
              <Icon icon="mdi:oil-level" />
            </div>
            <div>
              <h1 class="text-2xl font-semibold text-on-background-variant">
                {item.headline[0].text}
              </h1>
            </div>
          </div>
          {#each item.information as info, i}
            <div class="flex w-full items-center">
              {#if info.text.length > 0}
                <div class="text-xl font-bold text-primary-light w-120">
                  <p>{i + 1}.</p>
                </div>
                <div>
                  <p class="text-lg text-on-background-variant mt-16">
                    {info.text}
                  </p>
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {:else}
        <div class="w-35">
          <div class="flex items-center space-x-16">
            <div class="text-2xl text-primary-light">
              <Icon icon="mdi:oil-level" />
            </div>
            <div>
              <h1 class="text-2xl font-semibold text-on-background-variant">
                {item.headline[0].text}
              </h1>
            </div>
          </div>
          {#each item.information as info, i}
            <div class="flex w-full items-center">
              <div class="text-xl font-bold text-primary-light w-148">
                <p>{i + 1}.</p>
              </div>
              <div>
                <p class="text-lg text-on-background-variant mt-16">
                  {info.text}
                </p>
              </div>
            </div>
          {/each}
        </div>
        <div>
          <video loop width="920" height="518" autoplay="autoplay">
            <source src="/assets/videos/scene-{i + 1}.webm" type="video/webm" />
          </video>
        </div>
      {/if}
    </div>
  {/each}
{/await}
