<script>
  //LIBS
  import { onMount } from "svelte";

  //COMPONENTS
  import Button from "../buttons/lg-primary-icon-fill.svelte";

  //PROPS
  export let heading,
    subheading,
    paragraph,
    image_url,
    button_label,
    button_url;

  onMount(async () => {
    let mainContainer = document.getElementById("mainContainer");
    mainContainer.style.backgroundImage = "url('" + image_url + "')";
  });

  let splitted = subheading.split("%%");
  //console.log("image_url", image_url);
</script>

<div id="mainContainer">
  <div id="gradient">
    <div
      id="contents"
      class="text-on-background-variant pt-168 xl:px-148 lg:px-96 md:px-72"
    >
      <h1 class="text-4xl font-bold leading-6xl">
        {heading}
      </h1>
      <h2 class="text-4xl font-bold leading-4xl">
        {splitted[0]}<span class="text-primary-main">{splitted[1]}</span
        >{splitted[2]}
      </h2>
      <h2 class="text-lg leading-md mt-56 xl:max-w-lg md:max-w-lg">
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
    margin: auto;
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
      #0b1d2ee5 40%,
      rgba(53, 53, 53, 0.541)
    );
  }

  #contents {
    position: absolute;
    z-index: 10;
  }
</style>
