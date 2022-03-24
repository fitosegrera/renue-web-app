<script>
  //LIBS
  import Icon from "@iconify/svelte";

  //CONTAINERS
  import SectionContainer from "../../containers/section-matrix.svelte";

  //COMPONENTS
  import CardBioDark from "../../cards/bio-dark.svelte";

  //PROPS
  export let contents;
  // console.log("contents.", contents);
</script>

<div
  class="flex items-center space-x-12 w-full text-2xl font-bold text-primary-light px-168"
>
  <!-- <Icon icon="bx:bx-comment-detail" /> -->
  <h1 class="text-on-background-variant">{contents.title}</h1>
</div>
<div class="relative">
  <SectionContainer>
    {#if contents !== undefined}
      {#each contents.section_3_data as card}
        <div class="flex justify-center w-full h-720">
          <CardBioDark
            id={card.name.replace(/\s/g, "").toLowerCase()}
            name={card.name}
            role={card.role}
            more={card.more}
            bio={card.bio}
            img_url={card.img_url}
          />
        </div>
      {/each}
    {/if}
  </SectionContainer>
</div>
