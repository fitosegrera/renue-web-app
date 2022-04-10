<script>
  //LIBS
  import { onMount } from "svelte";

  //COMPONENTS
  import Button from "../buttons/lg-primary-icon-fill.svelte";

  //PROPS
  export let heading,
    subheading,
    subheading_start,
    subheading_end,
    paragraph,
    image_url,
    button_label,
    button_url;

  onMount(async () => {
    let mainContainer = document.getElementById("mainContainer");
    mainContainer.style.backgroundImage = "url('" + image_url + "')";
  });
</script>

<div id="mainContainer">
  <div id="gradient">
    <div
      id="contents"
      class="text-on-background-variant md:pt-168 sm:pt-120 lg:text-3xl md:text-2xl sm:text-xl font-bold xl:leading-6xl sm:leading-2xl xl:px-168 lg:px-96 md:px-64 sm:px-32"
    >
      <h1 class="">
        {heading}
      </h1>
      <h2 class="">
        {subheading.substring(0, subheading_start)}
        <span class="text-primary-main"
          >{subheading.substring(subheading_start, subheading_end)}</span
        >
        {subheading.substring(subheading_end, subheading.length)}
      </h2>
      <h2
        class="lg:text-lg md:text-md sm:text-md lg:leading-md md:leading-sm mt-56 2xl:max-w-lg xl:max-w-xl sm:max-w-2xl"
      >
        {paragraph}
      </h2>
      <div class="mt-56 w-300">
        <Button
          icon_label="ic:outline-eco"
          label={button_label}
          url={button_url}
        />
      </div>
    </div>
  </div>
</div>

<style>
  * {
    overflow: hidden;
  }
  #mainContainer {
    position: relative;
    z-index: 1;
    min-height: 800px;
    /* margin: auto; */
    background-image: url("https://media.istockphoto.com/photos/stainless-steel-pipes-and-pipelines-in-modern-beer-factory-brewery-picture-id1152495926");
    background-repeat: no-repeat;
    background-size: cover;
  }

  #gradient {
    position: absolute;
    margin: auto;
    left: 0;
    top: 0;
    min-height: 800px;
    width: 100%;
    z-index: -10;
    background: linear-gradient(
      to bottom right,
      #0b1d2ee5 20%,
      rgba(53, 53, 53, 0.13)
    );
  }

  #contents {
    position: absolute;
    z-index: 10;
  }
</style>
