<script>
  //LIBS
  import { onMount } from "svelte";

  //COMPONENTS
  import Hamburger from "./hamburger.svelte";
  import MenuItem from "./menu-item.svelte";

  //STORES
  import { break_point } from "../../../stores/renuestore";

  // PROPS
  export let sb = false;
  export let navbar_data;

  let mobileView = false;
  let innerWidth;

  const switchView = (e) => {
    if (innerWidth <= $break_point) {
      mobileView = true;
    } else {
      mobileView = false;
    }
    //console.log(mobileView);
  };

  onMount(async () => {
    if (innerWidth <= $break_point) {
      mobileView = true;
    } else {
      mobileView = false;
    }

    const mediaListener = window.matchMedia(
      "(max-width: " + $break_point + "px)"
    );
    mediaListener.addListener(switchView);
  });
</script>

<svelte:window bind:innerWidth />

{#await navbar_data then navBarItems}
  {#if mobileView}
    <nav
      class="flex justify-center max-h-72 px-32 py-16 w-full bg-on-background-variant"
    >
      <div class="flex-grow h-full items-center space-x-16 text-textColorDark">
        <a class="" href="/">
          {#if navBarItems.logo !== undefined}
            <img src={navBarItems.logo.url} alt="Renue Logo" class="w-200" />
          {/if}
        </a>
      </div>
      <Hamburger bind:open={sb} />
    </nav>
  {:else}
    <nav
      class="flex justify-center items-center max-h-72 py-16 w-full bg-on-background-variant xl:px-72 md:px-48 sm:px-24"
    >
      {#if navBarItems["menu-item"] !== undefined}
        <div class="flex-grow h-full items-center text-textColorDark">
          <a class="" href="/">
            {#if navBarItems.logo !== undefined}
              <img src={navBarItems.logo.url} alt="Renue Logo" class="w-200" />
            {/if}
          </a>
        </div>
        <div class=" flex w-auto text-center xl:space-x-32 md:space-x-32">
          {#each navBarItems["menu-item"] as item}
            <div
              class="w-auto h-full xl:text-lg md:text-md text-secondary-dark"
            >
              <MenuItem
                label={item.label}
                url={item.url}
                id={item.label}
                mobile_view={mobileView}
              />
            </div>
          {/each}
        </div>
      {/if}
    </nav>
  {/if}
{/await}

<style>
  * {
    overflow: hidden;
  }
  nav {
    position: fixed;
    top: 0;
    left: 0;
    /* max-width: 1920px; */
    /* background-color: rgba(104, 42, 104, 0.301); */
    /* backdrop-filter: blur(8px); */
    z-index: 40;
  }

  a {
    color: #161016;
  }

  a:hover {
  }
</style>
