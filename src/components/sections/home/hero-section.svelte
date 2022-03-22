<script>
  //COMPONENTS
  import HeroPrimary from "../../hero/hero-primary.svelte";

  export let contents;
</script>

<HeroPrimary
  heading={contents.heading}
  subheading={contents.subheading}
  paragraph={contents.paragraph}
  image_url={contents.image_url}
  button_label={contents.button_label}
  button_url={contents.button_url}
/>
