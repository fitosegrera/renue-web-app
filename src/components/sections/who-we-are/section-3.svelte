<script>
  //CONTAINERS
  import SectionContainer from "../../containers/section-one-col-center.svelte";

  //PROPS
  export let contents;
  // console.log("contents.", contents);
</script>

<SectionContainer>
  {#if contents !== undefined}
    <div
      class="bg-background-light text-4xl font-bold px-168 py-360 text-center"
    >
      <p class="gradient-text-dark">
        {contents.headline}
      </p>
    </div>
  {/if}
</SectionContainer>
