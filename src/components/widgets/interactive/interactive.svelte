<script>
  //LIBS
  import { onMount } from "svelte";
  import { fly, scale } from "svelte/transition";

  //STORES
  import { break_point } from "../../../stores/renuestore";

  //PROPS
  export let contents;

  let mobileView = false;
  let innerWidth;

  onMount(async () => {
    if (innerWidth <= $break_point) {
      mobileView = true;
    } else {
      mobileView = false;
    }

    //console.log(innerWidth, mobileView);

    const mediaListener = window.matchMedia(
      "(max-width: " + $break_point + "px)"
    );
    mediaListener.addListener(switchView);
    await contents.forEach((item, i) => {
      let highlight = document.getElementById(item.id);
      highlight.style.visibility = "hidden";

      if (item.visible == true) {
        let root = document.querySelector(":root");
        root.style.setProperty("--imgurl", "url(" + item.imageUrl + ")");
      }
    });
  });

  const handleMouseEnter = async (item) => {
    let highlight = await document.getElementById(item);
    highlight.style.visibility = "visible";

    await contents.forEach((interactiveItem, i) => {
      if (interactiveItem.id == item) {
        contents[i].visible = true;
        let root = document.querySelector(":root");
        root.style.setProperty(
          "--imgurl",
          "url(" + interactiveItem.imageUrl + ")"
        );
      } else {
        contents[i].visible = false;
      }
    });
  };

  const handleMouseLeave = async (item) => {};

  const switchView = (e) => {
    if (innerWidth <= $break_point) {
      mobileView = true;
    } else {
      mobileView = false;
    }
  };

  onMount(async () => {});
</script>

<svelte:window bind:innerWidth />

{#if mobileView}
  <div
    id="wrapper"
    class="grid grid-flow-rows grid-rows-5 w-full h-720 gradient-bg-semidark-secondary"
  >
    <!-- TOP ROW -->
    <div
      class="flex my-auto row-span-1 xl:text-4xl md:text-xl sm:text-lg font-bold lg:px-32"
    >
      <div
        class="flex items-center justify-center w-full text-center lg:space-x-64 md:space-x-16 sm:space-x-12"
      >
        {#each contents as item}
          <div
            class="flex w-auto items-center"
            on:mouseenter={() => handleMouseEnter(item.id)}
            on:mouseleave={() => handleMouseLeave(item.id)}
          >
            <h1
              class="w-full md:pl-24 sm:pl-8 gradient-text-blue-to-green-vertical"
            >
              {item.label}
            </h1>
            {#if item.visible}
              <div
                id={item.id}
                class="absolute md:w-16 sm:w-4 md:h-48 sm:h-24 gradient-blue-to-green-light-diagonal"
                transition:scale={{ start: 0.1, duration: 300 }}
              />
            {:else}
              <div
                id={item.id}
                class="absolute md:w-16 sm:w-4 md:h-48 sm:h-24 bg-transparent"
              />
            {/if}
          </div>
        {/each}
      </div>
    </div>
    <!-- BOTTOM ROW -->
    <div class="flex relative items-center row-span-4">
      {#each contents as item}
        {#if item.visible}
          <div
            id="slide"
            class="w-full h-720"
            transition:fly={{ x: 800, duration: 1000 }}
          >
            <div
              id="overlay"
              class="flex flex-col w-full text-lg space-y-24 py-320 pr-32 px-32"
            >
              <div
                id="title"
                class="flex items-center text-xl text-on-background-variant w-full px-32"
              >
                <!-- <Icon icon="gridicons:share-computer" /> -->
                <h1 class="text-xl font-bold text-on-background-variant">
                  {item.label}
                </h1>
              </div>
              <div
                id="text-wrapper"
                class="flex w-auto h-auto text-on-background-variant"
              >
                <div
                  id="text-bar"
                  class="py-32 w-16 gradient-blue-to-green-light-diagonal"
                />
                <p class="text-on-background-variant text-lg px-32 w-full">
                  {item.paragraph}
                </p>
              </div>
            </div>
            <div class="w-full" id="img-container" />
          </div>
        {/if}
      {/each}
    </div>
  </div>
{:else}
  <div
    id="wrapper"
    class="grid grid-flow-col grid-cols-5 w-full h-720 gradient-bg-semidark-secondary"
  >
    <!-- LEFT COL -->
    <div
      class="flex my-auto col-span-2 pl-48 xl:text-4xl md:text-2xl font-bold"
    >
      <div class="w-full space-y-24">
        {#each contents as item}
          <div
            class="flex w-full items-center space-x-16"
            on:mouseenter={() => handleMouseEnter(item.id)}
            on:mouseleave={() => handleMouseLeave(item.id)}
          >
            {#if item.visible}
              <div
                id={item.id}
                class="absolute w-16 h-64 gradient-blue-to-green-light-diagonal"
                transition:scale={{ start: 0.1, duration: 300 }}
              />
            {:else}
              <div id={item.id} class="absolute w-16 h-64 bg-transparent" />
            {/if}
            <h1 class="px-16 gradient-text-blue-to-green-vertical">
              {item.label}
            </h1>
          </div>
        {/each}
      </div>
    </div>
    <!-- RIGHT COL -->
    <div class="flex relative items-center col-span-3">
      {#each contents as item}
        {#if item.visible}
          <div
            id="slide"
            class="xl:w-960 lg:w-720 md:w-520 h-720"
            transition:fly={{ x: 800, duration: 1000 }}
          >
            <div
              id="overlay"
              class="flex flex-col xl:w-960 lg:w-720 md:w-520 text-lg space-y-24 py-320 pr-32 xl:pl-200 lg:pl-168 md:pl-320"
            >
              <div
                id="title"
                class="flex items-center text-xl text-on-background-variant w-full px-32"
              >
                <!-- <Icon icon="gridicons:share-computer" /> -->
                <h1 class="text-xl font-bold text-on-background-variant">
                  {item.label}
                </h1>
              </div>
              <div
                id="text-wrapper"
                class="flex w-auto h-auto text-on-background-variant"
              >
                <div
                  id="text-bar"
                  class="py-32 w-16 gradient-blue-to-green-light-diagonal"
                />
                <p class="text-on-background-variant text-lg px-32 w-full">
                  {item.paragraph}
                </p>
              </div>
            </div>
            <div class="xl:w-960 lg:w-720 md:w-520" id="img-container" />
          </div>
        {/if}
      {/each}
    </div>
  </div>
{/if}

<style>
  :root {
    --imgurl: "";
  }

  * {
    overflow: hidden;
  }

  #wrapper {
    position: relative;
  }

  #img-container {
    height: 720px;
    background-image: var(--imgurl);
    background-repeat: no-repeat;
    background-size: cover;
  }

  #slide {
    position: absolute;
    left: 0;
    display: flex;
    height: auto;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }

  #text-bar {
    /* position: absolute; */
    background-color: -webkit-linear-gradient(
      rgb(82, 235, 255),
      rgb(168, 255, 128)
    );
    z-index: 10;
  }

  #title {
    margin: auto;
    z-index: 20;
  }

  #overlay {
    position: absolute;
    right: 0;
    background: linear-gradient(
      180deg,
      #02161be4,
      #02161bd7 20%,
      #000000a4 75%
    );
  }
</style>
