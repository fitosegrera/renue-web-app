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

  const handleImageClicked = (e) => {
    //console.log(e.detail);
  };
</script>

<div class="bg-background-light w-full h-auto py-120">
  <Carousel
    {slides}
    displayControls={true}
    autoplay={true}
    autoplaySpeed={5000}
    speed={800}
    on:imageClicked={handleImageClicked}
  />
</div>
