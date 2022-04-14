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

  const handleInfoVisibility = async (e) => {
    console.log("state", e.detail.state);
    isInfoVisible = e.detail.state;
  };

  onMount(async () => {
    let imgContainer = await document.getElementById("image-container-" + id);
    imgContainer.style.backgroundImage = await ("url(" + img_url + ")");
    imgContainer.style.backgroundRepeat = await "no-repeat";
    imgContainer.style.backgroundPosition = await "center";
    imgContainer.style.backgroundSize = await "cover";
  });
</script>

{#await id then identifier}
  {#if isInfoVisible}
    <div
      transition:fly={{ x: 900, duration: 1000 }}
      id="info-window"
      class="w-screen h-full bg-secondary-dark-alpha"
    >
      <div class="flex w-full h-72 justify-end items-center px-32">
        <div
          on:click={() => {
            isInfoVisible = false;
          }}
          class="text-2xl text-primary-light hover:text-secondary-main cursor-pointer"
        >
          <Icon icon="ant-design:close-square-outlined" />
        </div>
      </div>
      <div class="md:flex md:space-x-32 lg:px-72 md:px-32 sm:px-16">
        <div class="xl:w-50 md:w-full h-full ">
          <!-- <div id={"image-container-" + identifier} class="w-full h-50" /> -->
          <img class="w-full mt-16" src={img_url} alt="" />
          <div class="text-xl font-bold text-primary-light pt-32">
            <h1>{name}</h1>
          </div>
          <div class="text-lg font-bold text-primary-light-variant">
            <h1>{role}</h1>
          </div>
        </div>
        <div
          class="w-full text-lg text-on-background-variant md:pt-4 sm:pt-32 pb-72"
        >
          <p>{bio}</p>
        </div>
      </div>
    </div>
  {/if}

  <div
    id="card-wrapper"
    class="w-full h-full gradient-bg-secondary-main rounded-lg"
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
    /* overflow: hidden; */
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
    left: 0;
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
    /* background-image: var(--img_url);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover; */
  }

  #info-window::-webkit-scrollbar {
    width: 24px;
  }

  /* Track */
  #info-window::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  /* Handle */
  #info-window::-webkit-scrollbar-thumb {
    background: linear-gradient(
      45deg,
      rgb(82, 235, 255),
      rgba(168, 255, 128, 0.719)
    );
    border-radius: 10px;
  }

  /* Handle on hover */
  #info-window::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(0deg, #6498a5, #063b48);
  }
</style>
