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
    class="w-full h-full text-center text-2xl font-semibold px-168 gradient-text-extra-light"
  >
    <h1>{contents.headline}</h1>
  </div>
  <div class="grid grid-cols-3 w-full h-full">
    <div
      class="col-span-2 flex items-center justify-center w-full h-full py-72"
    >
      <video id="vid" loop width="1280" autoplay>
        <source src="/assets/videos/360.webm" type="video/webm" />
      </video>
    </div>
    <div
      class="flex flex-col items-center justify-center w-full h-full pb-72 text-lg space-y-32"
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
