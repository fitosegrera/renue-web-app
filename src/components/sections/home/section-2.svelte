<script>
  //LIBS

  //CONTAINERS
  import SectionContainer from "../../containers/section-two-cols.svelte";

  //PROPS
  export let data;
  // console.log("DATA", data);
</script>

<SectionContainer>
  <div
    class="flex items-center w-full text-on-background-variant md:text-2xl md:leading-3xl text-left my-120"
  >
    <h1>
      {data.headline}
    </h1>
  </div>
  <div
    class="flex items-center w-full text-on-background-variant text-lg text-left"
  >
    <h1>
      {data.paragraph.substr(0, data.start)}
      <p class="text-primary-light font-bold mt-32 text-xl">
        {data.paragraph.substr(data.start, data.end)}
      </p>
    </h1>
  </div>
</SectionContainer>

<style>
  * {
    overflow: hidden;
  }
</style>
