<script>
  //LIBS
  import Icon from "@iconify/svelte";

  //CONTAINERS
  import VideoContainer from "../../containers/video.svelte";
  //COMPONENTS

  //PROPS
  export let contents;
  console.log(contents);

  const handleClick = () => {};
</script>

<VideoContainer>
  <div
    class="w-full h-full text-center text-2xl font-semibold px-168 gradient-text-light"
  >
    <h1>{contents.headline}</h1>
  </div>
  <div class="flex items-center justify-center w-full h-full pb-72">
    <video loop width="1280" autoplay="autoplay">
      <source src="/assets/videos/360.webm" type="video/webm" />
    </video>
  </div>
</VideoContainer>

<style>
  * {
    overflow: hidden;
  }
</style>
