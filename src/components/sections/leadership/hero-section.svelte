<script>
  //COMPONENTS
  import HeroSecondary from "../../hero/hero-secondary.svelte";

  export let contents;
</script>

<HeroSecondary
  headline={contents.headline}
  paragraph={contents.paragraph}
  image_url={contents.image_url}
/>
