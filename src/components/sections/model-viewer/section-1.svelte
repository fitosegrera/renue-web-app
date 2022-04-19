<script>
  //LIBS
  import Icon from "@iconify/svelte";

  //CONTAINERS
  import ThreeJsContainer from "../../containers/threejs.svelte";
  import ThreejsViewer from "../../widgets/threejs/threejs-viewer.svelte";

  //COMPONENTS
  import ThreeJsViewer from "../../widgets/threejs/threejs-viewer.svelte";
  import Button from "../../buttons/md-primary-light-icon-outlined.svelte";
  import IconButton from "../../buttons/md-primary-icon-only.svelte";

  //PROPS
  export let contents;

  console.log(contents);

  const handleOkClick = () => {
    document.getElementById("blocker").style.visibility = "hidden";
    document.getElementById("ok-button").style.visibility = "hidden";
    document.getElementById("back-button").style.visibility = "visible";
    document.getElementById("loaded-icon").style.visibility = "hidden";
  };

  const handleBackClick = () => {
    document.getElementById("blocker").style.visibility = "visible";
    document.getElementById("ok-button").style.visibility = "visible";
    document.getElementById("back-button").style.visibility = "hidden";
    document.getElementById("loaded-icon").style.visibility = "visible";
  };
</script>

<div class="relative w-full h-full">
  <div
    id="blocker"
    class="flex flex-col w-full h-full lg:px-120 md:px-32 sm:px-16 pt-72"
  >
    <div
      class="flex flex-col items-center w-full h-520 mx-auto space-x-32 py-32"
    >
      <!-- <div class="flex items-center w-full h-240 mt-32" id="image-container" /> -->
      <div class="relative w-full h-full my-48">
        <div
          id="loaded-icon"
          class="flex w-full h-full justify-center text-4xl text-primary-light"
        >
          <Icon icon="el:ok-circle" />
        </div>
        <div
          id="loading-icon"
          class="flex w-full h-full justify-center text-4xl text-primary-light"
        >
          <Icon icon="eos-icons:bubble-loading" />
        </div>
      </div>
      <div
        id="loader"
        class="flex w-full h-full md:text-lg sm:text-md justify-center text-on-background-variant"
      />
    </div>
    <div class="w-full h-full mx-auto text-center text-on-background-variant">
      <div>
        <h2 class="lg:text-2xl sm:text-2lg font-semibold">
          {contents.instructions[0].text}
        </h2>
      </div>
      <div class="flex items-center justify-center space-x-12 mt-48">
        <div class="text-primary-light md:text-lg sm:text-sm">
          <Icon icon="mdi:rotate-3d" />
        </div>
        <p class="md:text-lg sm:text-sm">{contents.instructions[1].text}</p>
      </div>
      <div class="flex items-center justify-center space-x-12">
        <div class="text-primary-light text-lg">
          <Icon icon="ri:drag-move-2-fill" />
        </div>
        <p class="md:text-lg sm:text-sm">{contents.instructions[2].text}</p>
      </div>
      <div class="flex items-center justify-center space-x-12">
        <div class="text-primary-light text-lg">
          <Icon icon="iconoir:mouse-scroll-wheel" />
        </div>
        <p class="md:text-lg sm:text-sm">{contents.instructions[3].text}</p>
      </div>
      <div
        on:click={handleOkClick}
        id="ok-button"
        class="flex items-center justify-center w-full mt-72"
      >
        <Button label="OK" icon_label="gg:enter" />
      </div>
    </div>
  </div>

  <div id="back-button" class="" on:click={handleBackClick}>
    <!-- <Icon icon="ep:menu" /> -->
    <IconButton label="" icon_label="file-icons:3d-model" />
  </div>

  <ThreeJsContainer>
    <ThreejsViewer />
  </ThreeJsContainer>
</div>

<style>
  * {
    overflow: hidden;
  }

  #loader {
    margin: 0 !important;
  }

  #loading-icon {
    position: absolute;
    visibility: visible;
    margin: 0 !important;
  }

  #loaded-icon {
    position: absolute;
    visibility: hidden;
    margin: 0 !important;
  }

  #blocker {
    position: absolute;
    background: linear-gradient(15deg, #184550e1, #022129);
  }

  #ok-button {
    visibility: hidden;
  }

  #back-button {
    position: absolute;
    bottom: 56px;
    right: 56px;
    visibility: hidden;
  }
</style>
