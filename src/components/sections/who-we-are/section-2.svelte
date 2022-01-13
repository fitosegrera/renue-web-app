<script>
  //CONTAINERS
  import SectionContainer from "../../containers/section-one-col-center.svelte";

  //COMPONENTS
  import Interactive from "../../widgets/interactive/interactive.svelte";

  //PROPS
  export let contents;
</script>

<SectionContainer>
  <Interactive {contents} />
</SectionContainer>
