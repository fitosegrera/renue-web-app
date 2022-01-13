<script>
  //COMPONENTS
  import HeroPrimary from "../../hero/hero-primary.svelte";

  export let contents;
</script>

<HeroPrimary
  heading={contents.heading}
  subheading={contents.subheading}
  paragraph={contents.paragraph}
/>
