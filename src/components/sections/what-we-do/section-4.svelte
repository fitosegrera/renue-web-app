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

  const handleOkClick = () => {
    document.getElementById("blocker").style.visibility = "hidden";
    document.getElementById("ok-button").style.visibility = "hidden";
    document.getElementById("back-button").style.visibility = "visible";
  };

  const handleBackClick = () => {
    document.getElementById("blocker").style.visibility = "visible";
    document.getElementById("ok-button").style.visibility = "visible";
    document.getElementById("back-button").style.visibility = "hidden";
  };
</script>

<div class="relative w-full h-full">
  <div id="blocker" class="flex flex-col w-full h-full px-168 pt-120">
    <div class="w-full h-240 mx-auto px-120">
      <h1
        class="text-2xl leading-11 text-center font-semibold text-on-background-variant "
      >
        Our process produces recycled purified oil suitable for use as fuel oil,
        industrial grease or in the preparation of lubricant motor oils.
      </h1>
    </div>

    <div
      class="flex flex-col items-center justify-center w-full h-50 mx-auto space-x-32 py-32"
    >
      <div class="w-96 h-96 mt-32" id="image-container" />
      <div
        id="loader"
        class="flex w-full text-lg justify-center text-on-background-variant"
      />
    </div>
    <div class="w-full h-full mx-auto text-center text-on-background-variant">
      <div>
        <h2 class="text-2xl font-semibold">Explore our plant virtually.</h2>
      </div>
      <div class="flex items-center justify-center space-x-12 mt-48">
        <div class="text-primary-light text-lg">
          <Icon icon="ri:drag-move-2-fill" />
        </div>
        <p class="text-lg">Left click to drag, right click to rotate.</p>
      </div>
      <div class="flex items-center justify-center space-x-12">
        <div class="text-primary-light text-lg">
          <Icon icon="iconoir:mouse-scroll-wheel" />
        </div>
        <p class="text-lg">Mouse scroll to zoom in and out.</p>
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

  #blocker {
    position: absolute;
    background: linear-gradient(15deg, #184550e1, #022129);
  }

  #image-container {
    background-image: url("/assets/icons/3d.png");
    background-repeat: no-repeat;
    background-size: contain;
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
