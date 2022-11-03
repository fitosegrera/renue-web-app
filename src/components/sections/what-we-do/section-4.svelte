<script>
  //LIBS
  import { onMount } from "svelte";

  //CONTAINERS
  import VideoContainer from "../../containers/video.svelte";

  //COMPONENTS
  import EnterButton from "../../buttons/lg-primary-icon-only-outlined.svelte";

  //PROPS
  export let contents;

  onMount(async () => {
    //document.getElementById("vid").play();
  });
</script>

<VideoContainer>
  <div
    class="w-full h-full text-center md:text-xl sm:text-lg font-semibold sm:px-16 lg:px-72 lg:py-64 md:py-32 text-primary-light-variant"
  >
    <h1>{contents.headline}</h1>
  </div>
  <div class="grid lg:grid-cols-3 md:grid-rows-3 w-full h-full">
    <div
      class="lg:col-span-2 md:row-span-2 lg:row-span-3 flex items-center justify-center w-full h-full pt-32"
    >
      <video id="vid" loop width="1280" autoplay mute>
        <source src="/assets/videos/360.webm" type="video/webm" />
      </video>
    </div>
    <div
      class="flex flex-col lg:row-span-3 items-center justify-center w-full h-full text-lg space-y-32 sm:mb-64"
    >
      <div>
        <p class="gradient-text-extra-light">
          See our <span class="gradient-text-light font-semibold"
            >Interactive Model</span
          >
        </p>
      </div>
      <div class="flex items-center justify-center w-full">
        <EnterButton
          icon_label="file-icons:3d-model"
          label="Enter"
          url="/model-viewer"
        />
      </div>
    </div>
  </div>
</VideoContainer>

<style>
  * {
    overflow: hidden;
  }
</style>
