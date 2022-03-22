<script>
  //CONTAINERS
  import SectionContainer from "../../containers/section-one-col-center.svelte";

  //PROPS
  export let contents;
  console.log("contents.", contents);

  let y;

  const mapValue = (val, in_min, in_max, out_min, out_max) => {
    return ((val - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  };
</script>

<svelte:window bind:scrollY={y} />

<SectionContainer>
  {#if contents !== undefined}
    <div
      style={"background: linear-gradient(" +
        mapValue(y, 2500, 3000, 0, 180) +
        "deg, rgb(255, 255, 255), rgb(230, 255, 230));"}
      class="text-3xl font-bold px-168 py-168 text-center"
    >
      <p class="text-secondary-dark-alpha">
        {contents.headline.slice(0, contents.spans[0].start)}
        <span class="text-primary-main font-bold"
          >{contents.headline.slice(
            contents.spans[0].start,
            contents.spans[0].end
          )}</span
        >
        {contents.headline.slice(
          contents.spans[0].end,
          contents.spans[1].start
        )}
        <span class="text-primary-main font-bold"
          >{contents.headline.slice(
            contents.spans[1].start,
            contents.spans[1].end
          )}</span
        >
        {contents.headline.slice(
          contents.spans[1].end,
          contents.spans[2].start
        )}
        <span class="text-primary-main font-bold"
          >{contents.headline.slice(
            contents.spans[2].start,
            contents.spans[2].end
          )}</span
        >
        {contents.headline.slice(
          contents.spans[2].end,
          contents.spans[3].start
        )}
        <span class="text-primary-main font-bold"
          >{contents.headline.slice(
            contents.spans[3].start,
            contents.spans[3].end
          )}.</span
        >
      </p>
    </div>
  {/if}
</SectionContainer>
