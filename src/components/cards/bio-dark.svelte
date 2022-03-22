<script>
  //LIBS
  import { Motion } from "svelte-motion";
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";
  import { scale } from "svelte/transition";
  import Icon from "@iconify/svelte";

  //COMPONENTS
  import Button from "../buttons/sm-primary-text-only.svelte";

  //PROPS
  export let name, role, more, bio, img_url, id;
  //console.log("img_url", img_url);

  let isInfoVisible = false;

  const handleInfoVisibility = (e) => {
    //console.log("state", e.detail.state);
    isInfoVisible = e.detail.state;
  };

  onMount(async () => {
    let imgContainer = await document.getElementById("image-container-" + id);
    //console.log("URL:", img_url);
    imgContainer.style.backgroundImage = await ("url(" + img_url + ")");
    imgContainer.style.backgroundRepeat = await "no-repeat";
    imgContainer.style.backgroundPosition = await "center";
    imgContainer.style.backgroundSize = await "cover";
  });
</script>

{#if isInfoVisible}
  <div
    transition:fly={{ x: 900, duration: 1000 }}
    id="info-window"
    class="w-screen h-full bg-secondary-dark-alpha"
  >
    <div class="flex w-full h-72 justify-end items-center p-64">
      <div
        on:click={() => {
          isInfoVisible = false;
        }}
        class="text-2xl text-primary-light hover:text-secondary-main cursor-pointer"
      >
        <Icon icon="ant-design:close-square-outlined" />
      </div>
    </div>
    <div class="flex px-120">
      <div class="w-75 h-800 px-72">
        <div id="image-container-small" class="w-full h-75" />
        <div class="text-2xl font-bold text-primary-light pt-32">
          <h1>{name}</h1>
        </div>
        <div class="text-lg font-bold text-primary-light-variant pt-8">
          <h1>{role}</h1>
        </div>
      </div>
      <div class="w-100 px-72 text-lg text-on-background-variant">
        <p>{bio}</p>
      </div>
    </div>
  </div>
{/if}

{#await id then identifier}
  <div
    id="card-wrapper"
    class="w-full h-75 gradient-bg-secondary-main rounded-lg"
  >
    <div
      id="horizontal-spacer"
      class="w-full h-24 gradient-blue-to-green-light-diagonal"
    />

    <Motion
      whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
      let:motion
    >
      <div
        class="w-100 h-75"
        id={"image-container-" + identifier}
        transition:scale={{ start: 1.5 }}
        use:motion
      />
    </Motion>

    <div
      id="info-wrapper"
      class="space-y-4 py-24 w-full gradient-bg-secondary-main"
    >
      <div class="text-2lg text-center text-primary-light font-bold">
        <h1>{name}</h1>
      </div>
      <div
        class="h-32 text-md text-center text-primary-light-variant font-bold"
      >
        <p>{role}</p>
      </div>
      <div>
        <Button on:infovisible={handleInfoVisibility} label={more} />
      </div>
    </div>
  </div>
{/await}

<style>
  * {
    overflow: hidden;
  }

  :root {
    --img_url: url("");
  }

  #card-wrapper {
    position: relative;
  }

  #info-wrapper {
    position: absolute;
    bottom: 0;
  }

  #info-window {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 50;
    backdrop-filter: blur(4px);
  }

  #horizontal-spacer {
    position: absolute;
    top: 0;
    z-index: 20;
  }

  #image-container-small {
    cursor: pointer;
    background-image: var(--img_url);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
