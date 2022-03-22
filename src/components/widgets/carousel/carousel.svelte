<script>
  //LIBS
  import { flip } from "svelte/animate";
  import Icon from "@iconify/svelte";

  //COMPONENTS
  import Button from "../../buttons/md-primary-icon-outlined.svelte";

  //PROPS
  export let slides;
  export let transition_speed = 500;

  console.log(slides);

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
    document.getElementById(transitioningImage.id).style.opacity = 0;
    slides = [...slides.slice(1, slides.length), slides[0]];
    setTimeout(
      () => (document.getElementById(transitioningImage.id).style.opacity = 1),
      transition_speed
    );
  };
</script>

<div id="carousel-container" class="">
  <div id="carousel-slides" class="flex w-full justify-center max-h-520">
    {#each slides as slide (slide.id)}
      <div
        id={slide.id}
        animate:flip={{ duration: transition_speed }}
        class="grid grid-cols-2 items-center min-w-full"
      >
        <div class="mx-auto">
          <img class="w-640" src={slide.path} alt={slide.id} />
        </div>
        <div class="flex flex-col">
          <div class="w-75 text-xl text-primary-main font-semibold">
            <h1>{slide.headline}</h1>
          </div>
          <div class="w-75 text-md text-secondary-dark mt-24">
            <p>{slide.paragraph}</p>
          </div>
          <div class="mt-48">
            <Button label="Learn More" />
          </div>
        </div>
      </div>
    {/each}
  </div>
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

  #left {
    left: 10px;
  }

  #right {
    right: 10px;
  }
</style>
