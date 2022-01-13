<script>
  //CONTAINERS
  import SectionContainer from "../../containers/section-one-col-center.svelte";

  //PROPS
  export let data;
</script>

<SectionContainer>
  <div
    id="wrapper"
    class="flex items-center h-full xl:text-4xl md:text-2xl xl:leading-6xl md:leading-4xl font-bold text-center text-on-background-variant"
  >
    <h1 class="px-168 py-360">
      {data.headline}
    </h1>
    <div id="gradient" class="" />
  </div>
</SectionContainer>

<style>
  * {
    overflow: hidden;
  }
  #wrapper {
    position: relative;
    z-index: 1;
    background-image: url("https://media.istockphoto.com/photos/sewage-treatment-plant-waste-water-purification-picture-id684896938?s=2048x2048");
    background-repeat: no-repeat;
    background-size: cover;
  }

  #alpha {
    opacity: 0.5;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0);
    z-index: -1;
  }

  #gradient {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -10;
    background: linear-gradient(
      to bottom right,
      #0b1d2ec4 50%,
      rgba(27, 50, 56, 0.726)
    );
  }
</style>
