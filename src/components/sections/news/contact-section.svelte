<script>
  //SECTIONS
  import SectionContainer from "../../containers/section-one-col-center.svelte";

  //COMPONENTS
  import Button from "../../buttons/lg-primary-icon-fill.svelte";

  //PROPS
  export let contents;
  // console.log("XXXX", contents);
</script>

<SectionContainer>
  <div class="flex flex-col justify-center w-full text-center py-120">
    <h1 class="text-2xl font-bold text-on-background-variant mb-56">
      {contents.headline.slice(0, contents.start)}
      <span class="text-primary-main font-bold"
        >{contents.headline.slice(contents.start, contents.end)}</span
      >
      {contents.headline.slice(contents.end)}
    </h1>
    <div class="w-auto mx-auto">
      <Button icon_label="ic:outline-eco" label="Get Started" url="/contact" />
    </div>
  </div>
</SectionContainer>
