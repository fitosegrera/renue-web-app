<script>
  //LIBS
  import { onMount } from "svelte";
  import { flip } from "svelte/animate";
  import Icon from "@iconify/svelte";

  //COMPONENTS
  import Button from "../../buttons/md-primary-icon-outlined.svelte";

  //STORES
  import { break_point } from "../../../stores/renuestore";

  //PROPS
  export let slides;
  export let transition_speed;
  export let slide_stimeout;

  let mobileView = false;
  let innerWidth;

  //console.log(slides);

  const rotateLeft = (e) => {
    const transitioningImage = slides[slides.length - 1];
    document.getElementById(transitioningImage.id).style.opacity = 0;
    slides = [slides[slides.length - 1], ...slides.slice(0, slides.length - 1)];
    setTimeout(
      () => (document.getElementById(transitioningImage.id).style.opacity = 1),
      transition_speed
    );
  };

  const rotateRight = (e) => {
    const transitioningImage = slides[0];
    if (transitioningImage.id !== null) {
      document.getElementById(transitioningImage.id).style.opacity = 0;
      slides = [...slides.slice(1, slides.length), slides[0]];
      setTimeout(
        () =>
          (document.getElementById(transitioningImage.id).style.opacity = 1),
        transition_speed
      );
    }
  };

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

    //console.log(innerWidth, mobileView);

    setInterval(() => {
      rotateRight();
    }, slide_stimeout);

    const mediaListener = window.matchMedia(
      "(max-width: " + $break_point + "px)"
    );
    mediaListener.addListener(switchView);
  });
</script>

<svelte:window bind:innerWidth />

<div id="carousel-container" class="">
  <div id="carousel-slides" class="flex w-full justify-center lg:max-h-520">
    {#each slides as slide (slide.id)}
      <div
        id={slide.id}
        animate:flip={{ duration: transition_speed }}
        class="grid lg:grid-cols-2 lg:grid-rows-1 sm:grid-rows-2 sm:grid-cols-1 lg:gap-48 items-center min-w-full h-auto"
      >
        <!-- {console.log(slide.button_url)} -->
        {#if mobileView}
          <div class="mx-auto px-16">
            <img
              class="xl:w-640 lg:w-480 sm:w-480"
              src={slide.path}
              alt={slide.id}
            />
          </div>
          <div class="flex flex-col">
            <div
              class="w-full xl:text-xl md:text-2lg sm:text-lg text-primary-main font-semibold lg:px-168 md:px-72 sm:px-32 lg:py-32"
            >
              <h1>{slide.headline}</h1>
            </div>
            <div
              class="w-full text-md text-secondary-dark mt-24 lg:px-168 md:px-72 sm:px-32"
            >
              <p>{slide.paragraph}</p>
            </div>
            <div class="mt-48 lg:px-168 md:px-72 sm:px-32">
              <Button label="Learn More" />
            </div>
          </div>
        {:else}
          <div class="mx-auto md:px-48 sm:px-32">
            <img class="xl:w-640 lg:w-480" src={slide.path} alt={slide.id} />
          </div>
          <div class="flex flex-col">
            <div
              class="w-75 xl:text-xl lg:text-2lg text-primary-main font-semibold"
            >
              <h1>{slide.headline}</h1>
            </div>
            <div class="w-75 text-md text-secondary-dark mt-24">
              <p>{slide.paragraph}</p>
            </div>
            <div class="mt-48">
              <Button label="Learn More" url={slide.button_url} />
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
  {#if !mobileView}
    <button id="left" on:click={rotateLeft}>
      <slot name="left-control">
        <div
          class="w-full h-full text-6xl text-primary-main transition ease-in-out hover:text-secondary-main duration-600"
        >
          <Icon icon="bx:bx-chevron-left" />
        </div>
      </slot>
    </button>
    <button id="right" on:click={rotateRight}>
      <slot name="right-control">
        <div
          class="w-full h-full text-6xl text-primary-main transition ease-in-out hover:text-secondary-main duration-600"
        >
          <Icon icon="bx:bx-chevron-right" />
        </div>
      </slot>
    </button>
  {/if}
</div>

<style>
  * {
    overflow: hidden;
  }

  #carousel-container {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }
  #carousel-slides {
  }

  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
  }

  button:focus {
    outline: none;
  }

  .mobile-button {
    position: absolute;
    top: 100%;
    transform: translateY(-100%);
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
  }

  #left {
    left: 10px;
  }

  #left-mobile {
    left: 60%;
  }

  #right {
    right: 10px;
  }
</style>
