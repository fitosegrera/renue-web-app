<script>
  //CONTAINERS
  import SectionContainer from "../../containers/section-two-cols.svelte";

  //PROPS
  export let contents;
</script>

<div class="bg-background-light text-secondary-dark ">
  <SectionContainer>
    <div class="flex items-center w-full text-lg text-left">
      <h1>
        {contents.paragraph}
      </h1>
    </div>
    <div
      class="flex items-center justify-center w-full md:text-2xl md:leading-3xl text-left"
    >
      <div class="w-640">
        <img src={contents.image_url} alt="" />
      </div>
    </div>
  </SectionContainer>
</div>

<style>
  * {
    overflow: hidden;
  }
</style>
