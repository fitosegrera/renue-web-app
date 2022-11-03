<script>
  //LIBS
  import { scale } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  //STORES
  import { mobile_menu } from "../../../stores/renuestore";

  //PROPS
  export let label, url, id;

  const dispatch = createEventDispatcher();

  const handleClick = () => {
    console.log("mobile_menu", $mobile_menu);
    $mobile_menu = !$mobile_menu;
    console.log("mobile_menu", $mobile_menu);
    dispatch("openSidebar", { $mobile_menu });
  };

  $: visible = false;

  const handleMouseEnter = () => {
    // let underline = document.getElementById(id);
    // underline.style.background = "linear-gradient(to right, #3FC4E5, #C5E87B)";
    visible = true;
  };

  const handleMouseleave = () => {
    // let underline = document.getElementById(id);
    // underline.style.background = "#00000000";
    visible = false;
  };
</script>

<div
  id="wrapper"
  class="transition ease-in-out hover:text-secondary-main duration-400 cursor-pointer"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseleave}
>
  <div id="text-wrapper" class="">
    <a href={url} on:click={handleClick}>
      {label}
    </a>
  </div>
  <!-- <div class="w-75 h-8" /> -->

  {#if visible}
    {#if $mobile_menu}
      <div class="" />
    {:else}
      <div class="flex items-center justify-center">
        <div
          transition:scale={{ start: 0.5, duration: 600 }}
          class="underline-wrapper w-120 h-6"
        >
          <div class="underline-object w-full h-6" {id} />
        </div>
      </div>
    {/if}
  {/if}
</div>

<style>
  * {
    overflow: hidden;
  }

  #wrapper {
    /* position: relative; */
  }

  #text-wrapper {
  }

  .underline-object {
    /* background: linear-gradient(to right, #3fc4e5, #c5e87b); */
    background: #c5e87b;
  }

  .underline-wrapper {
    position: absolute;
  }
</style>
