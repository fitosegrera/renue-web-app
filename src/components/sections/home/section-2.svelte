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
    class="flex items-center w-full text-on-background-variant md:text-2xl md:leading-3xl text-left my-240"
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
      <span class="text-primary-light font-bold underline"
        >{data.paragraph.substr(data.start, data.end)}</span
      >
    </h1>
  </div>
</SectionContainer>

<style>
  * {
    overflow: hidden;
  }
</style>
