<script>
  //LIBS
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import Icon from "@iconify/svelte";

  //PROPS
  export let contents;

  onMount(async () => {
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

  const handleMouseLeave = async (item) => {
    let highlight = document.getElementById(item);
    highlight.style.visibility = "hidden";
  };
</script>

<div
  id="wrapper"
  class="grid grid-flow-col grid-cols-5 w-full h-screen gradient-bg-semidark-secondary"
>
  <div class="flex my-auto col-span-2 pl-148 text-4xl font-bold">
    <div class="w-full space-y-24">
      {#each contents as item}
        <div
          class="flex w-full items-center space-x-16"
          on:mouseenter={() => handleMouseEnter(item.id)}
          on:mouseleave={() => handleMouseLeave(item.id)}
        >
          <div
            id={item.id}
            class="w-16 h-64 gradient-blue-to-green-light-diagonal"
          />
          <h1 class="gradient-text-blue-to-green-vertical">{item.label}</h1>
        </div>
      {/each}
    </div>
  </div>
  <div class="flex relative items-center col-span-3">
    {#each contents as item}
      {#if item.visible}
        <div
          id="slide"
          class="w-1120 h-1120"
          transition:fly={{ x: 600, duration: 1000 }}
        >
          <div
            id="overlay"
            class="flex flex-col w-1120 text-lg space-y-24 py-400"
          >
            <div
              id="title"
              class="flex items-center text-xl text-primary-light w-full px-120 space-x-12"
            >
              <Icon icon="gridicons:share-computer" />
              <h1 class="text-xl font-bold text-on-background-variant">
                {item.label}
              </h1>
            </div>
            <div
              id="text-wrapper"
              class="flex mx-120 text-on-background-variant"
            >
              <div
                id="text-bar"
                class="py-72 w-48 gradient-blue-to-green-light-diagonal"
              />
              <p class="text-secondary-light text-lg px-16">
                {item.paragraph}
              </p>
            </div>
          </div>
          <div id="img-container" />
        </div>
      {/if}
    {/each}
  </div>
</div>

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
    width: 1200px;
    height: 720px;
    background-image: var(--imgurl);
    background-repeat: no-repeat;
    background-size: fit;
  }

  #slide {
    position: absolute;
    right: 0;
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
      #02161ba6,
      #02161ba6 20%,
      #000000a4 75%
    );
  }
</style>
