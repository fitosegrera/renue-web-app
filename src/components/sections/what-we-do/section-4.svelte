<script>
  //CONTAINERS
  import ThreeJsContainer from "../../containers/threejs.svelte";
  import ThreejsViewer from "../../widgets/threejs/threejs-viewer.svelte";
  //COMPONENTS
  import ThreeJsViewer from "../../widgets/threejs/threejs-viewer.svelte";

  //PROPS
  export let contents;
</script>

<div class="relative w-full h-full">
  <div
    id="blocker"
    class="flex flex-col w-full h-full px-200 py-120 space-y-64"
  >
    <div class="w-75 mx-auto">
      <h1 class="text-2xl text-center font-semibold text-on-background-variant">
        Our process produces recycled purified oil suitable for use as fuel oil,
        industrial grease or in the preparation of lubricant motor oils.
      </h1>
    </div>
    <div class="w-120 h-120 mx-auto">
      <div id="image-container" />
    </div>
  </div>
  <ThreeJsContainer>
    <ThreejsViewer />
  </ThreeJsContainer>
</div>

<style>
  #blocker {
    position: absolute;
    background: linear-gradient(15deg, #184550e1, #022129);
  }

  #image-container {
    widows: 100%;
    height: 100%;
    background-image: url("/assets/icons/3d.png");
    background-repeat: no-repeat;
    background-size: contain;
  }
</style>
