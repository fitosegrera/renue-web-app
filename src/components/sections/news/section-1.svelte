<script>
  //CONTAINERS
  import SectionContainer from "../../containers/matrix3x2.svelte";

  //COMPONENTS
  import Button from "../../buttons/md-primary-light-icon-outlined.svelte";

  //PROPS
  export let contents;
  console.log("contents.", contents);
</script>

<div class="gradient-bg-semidark-secondary">
  <SectionContainer>
    {#each contents as item}
      <div
        class="flex flex-col mx-auto w-full text-on-background-variant text-center"
      >
        <div
          class="flex flex-col items-center justify-center text-2xl font-bold text-center space-y-32"
        >
          <div id="img-container" class="text-6xl text-secondary-light w-240">
            <img src={item.image.url} alt="" />
          </div>
          <div>
            <h1 class="gradient-text-light">{item.headline[0].text}</h1>
          </div>
        </div>
        <div>
          <p class="text-lg leading-sm px-72 py-16">
            {item.paragraph[0].text}
          </p>
        </div>
        <div class="flex justify-center my-32">
          {#if item["button-label"].length > 0}
            <Button
              label={item["button-label"][0].text}
              icon_label="ic:baseline-read-more"
              url={item["button-url"].url}
            />
          {/if}
        </div>
      </div>
    {/each}
  </SectionContainer>
</div>
