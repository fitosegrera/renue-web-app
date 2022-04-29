<script>
  //LIBS
  import { onMount } from "svelte";

  //STORES
  import { break_point } from "../../../stores/renuestore";

  //PROPS
  export let contents;
  console.log(contents);

  let mobileView = false;
  let innerWidth;

  const switchView = (e) => {
    if (innerWidth <= $break_point) {
      mobileView = true;
    } else {
      mobileView = false;
    }
  };

  onMount(async () => {
    if (innerWidth <= $break_point) {
      mobileView = true;
    } else {
      mobileView = false;
    }

    console.log(innerWidth, mobileView);

    const mediaListener = window.matchMedia(
      "(max-width: " + $break_point + "px)"
    );
    mediaListener.addListener(switchView);
  });
</script>

<svelte:window bind:innerWidth />

<!-- ==================================== -->
<!-- ============ MOBILE VIEW =========== -->
<!-- ==================================== -->
{#if mobileView}
  {#await contents then items}
    {#each items as item, i}
      {#if item.title1.length > 0}
        <div
          class="w-full text-center font-bold text-lg gradient-text-extra-light py-32 px-32"
        >
          <h1>{item.title1[0].text}</h1>
        </div>
      {/if}
      <div class="w-full h-full mt-32">
        <div>
          {#if Object.keys(item.image).length === 0}
            <video
              id="vid"
              loop
              width="920"
              height="518"
              autoplay="autoplay"
              muted
            >
              <source
                src="/assets/videos/scene-{i + 1}.webm"
                type="video/webm"
              />
            </video>
          {:else}
            <div class="flex w-full justify-center">
              <img
                class="max-h-620"
                src={item.image.url}
                alt={item.image.alt}
              />
            </div>
          {/if}
        </div>
        <div class="w-full mt-48">
          <div class="flex items-center px-32 space-x-16">
            <div>
              <h1 class="text-2lg font-semibold gradient-text-extra-light">
                {item.headline[0].text}
              </h1>
            </div>
          </div>
          {#each item.information as info, i}
            <div class="flex w-full items-center">
              {#if info.text.length > 0}
                <div class="text-2lg font-bold text-primary-light w-56 px-8">
                  <p>{i + 1}.</p>
                </div>
                <div
                  class="w-full text-md text-on-background-variant px-8 mt-24 space-y-16"
                >
                  {#if item["attachment-1"].name !== undefined}
                    <p>
                      {info.text.split("%%")[0]}
                    </p>
                    <p class="italic">
                      {info.text.split("%%")[1]}
                    </p>

                    <div
                      class="flex w-full items-center justify-start text-primary-light hover:text-secondary-main h-full my-32 space-x-8 cursor-pointer font-semibold"
                    >
                      <a
                        class=""
                        href={item["attachment-1"].url}
                        target="__blank">Read Document</a
                      >
                    </div>
                  {:else}
                    <p>
                      {info.text}
                    </p>
                  {/if}
                </div>
              {/if}
            </div>
          {/each}
          {#if Object.keys(item.attachment).length > 0}
            <a href={item.attachment.url} target="__blank">
              <div
                class="flex w-full items-center justify-start text-primary-light hover:text-secondary-main h-full my-32 px-32 cursor-pointer"
              >
                <div class="text-lg font-bold ">
                  <h2>{item.attachment.alt}</h2>
                </div>
              </div>
            </a>
          {/if}
        </div>
      </div>
      {#if item["extra-information"].length > 0}
        <div
          class="w-full text-center font-bold text-lg text-primary-light-variant mt-48 py-32 px-24"
        >
          <h1>{item["extra-information"][0].text}</h1>
        </div>
      {/if}
    {/each}
  {/await}
  <!-- ==================================== -->
  <!-- =========== DESKTOP VIEW =========== -->
  <!-- ==================================== -->
{:else}
  {#await contents then items}
    {#each items as item, i}
      {#if item.title1.length > 0}
        <div
          class="w-full text-center font-bold text-xl gradient-text-extra-light pt-120 py-32 xl:px-148 md:px-64"
        >
          <h1>{item.title1[0].text}</h1>
        </div>
      {/if}
      <div
        class="flex items-center justify-center w-full h-full space-x-32 py-56 px-32"
      >
        {#if item.orientation === "left"}
          {#if Object.keys(item.image).length === 0}
            <div class="lg:w-50">
              <video
                id="vid"
                loop
                width="920"
                height="518"
                autoplay="autoplay"
                muted
              >
                <source
                  src="/assets/videos/scene-{i + 1}.webm"
                  type="video/webm"
                />
              </video>
            </div>
          {:else}
            <div class="lg:w-50">
              <img class="w-75" src={item.image.url} alt={item.image.alt} />
            </div>
          {/if}
          <div class="xl:w-35 md:w-50">
            <div class="flex items-center space-x-16">
              <!-- <div class="text-2xl text-primary-light">
              <Icon icon="mdi:oil-level" />
            </div> -->
              <div>
                <h1
                  class="xl:text-2xl md:text-xl font-semibold gradient-text-extra-light"
                >
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
                  <div
                    class="w-620 text-lg text-on-background-variant mt-24 px-8 space-y-16"
                  >
                    {#if item["attachment-1"].name !== undefined}
                      <p>
                        {info.text.split("%%")[0]}
                      </p>
                      <p class="italic">
                        {info.text.split("%%")[1]}
                      </p>

                      <div
                        class="flex w-full items-center justify-start text-primary-light hover:text-secondary-main h-full my-32 space-x-8 cursor-pointer font-semibold"
                      >
                        <a
                          class=""
                          href={item["attachment-1"].url}
                          target="__blank">Read Document</a
                        >
                      </div>
                    {:else}
                      <p>
                        {info.text}
                      </p>
                    {/if}
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        {:else}
          <div class="">
            <div class="flex items-center space-x-16">
              <!-- <div class="text-2xl text-primary-light">
              <Icon icon="mdi:oil-level" />
            </div> -->
              <div>
                <h1 class="text-2xl font-semibold gradient-text-extra-light">
                  {item.headline[0].text}
                </h1>
              </div>
            </div>
            {#each item.information as info, i}
              <div class="flex w-full items-center">
                {#if info.text.length > 0}
                  <div
                    class="text-xl font-bold text-primary-light w-auto pr-16"
                  >
                    <p>{i + 1}.</p>
                  </div>
                  <div>
                    <p
                      class="xl:w-520 md:w-400 text-lg text-on-background-variant mt-16 px-8"
                    >
                      {info.text}
                    </p>
                  </div>
                {/if}
              </div>
            {/each}
            {#if Object.keys(item.attachment).length > 0}
              <a href={item.attachment.url} target="__blank">
                <div
                  class="flex w-full items-center justify-start text-primary-light hover:text-secondary-main h-full my-32 space-x-8 cursor-pointer"
                >
                  <!-- <div class=" text-2xl font-bold">
                  <Icon icon="ant-design:area-chart-outlined" />
                </div> -->
                  <div class="text-lg font-bold ">
                    <h2>{item.attachment.alt}</h2>
                  </div>
                </div>
              </a>
            {/if}
          </div>
          <div class="lg:w-50">
            <video
              id="vid"
              loop
              width="920"
              height="518"
              autoplay="autoplay"
              muted
            >
              <source
                src="/assets/videos/scene-{i + 1}.webm"
                type="video/webm"
              />
            </video>
          </div>
        {/if}
      </div>
      {#if item["extra-information"].length > 0}
        <div
          class="w-full text-center font-bold text-xl gradient-text-extra-light py-32 px-148"
        >
          <h1>{item["extra-information"][0].text}</h1>
        </div>
      {/if}
    {/each}
  {/await}
{/if}
