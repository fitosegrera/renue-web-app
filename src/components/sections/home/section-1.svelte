<script>
  //STORES

  //LIBS

  //COMPONENTS
  import Carousel from "../../widgets/carousel/carousel.svelte";

  //PROPS
  export let data;

  const slides = [];

  let id = 1;

  data.carousel.slides.forEach((slide) => {
    let isActive;

    if (id == 1) {
      isActive = true;
    } else {
      isActive = false;
    }

    slides.push({
      path: slide.image_url,
      headline: slide.headline,
      paragraph: slide.paragraph,
      id: id,
      active: isActive,
      button_url: slide.button_url,
    });

    id++;
  });
</script>

<div class="bg-background-light w-full lg:h-auto sm:h-auto lg:py-72 sm:py-32">
  <Carousel {slides} transition_speed={800} slide_stimeout={10000} />
</div>
