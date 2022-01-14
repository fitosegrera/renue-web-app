<script>
  //CONTAINERS
  import SectionContainer from "../../containers/section-one-col-center.svelte";

  //PROPS
  export let contents;
  // console.log("contents.", contents);

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
        "deg, rgb(255, 255, 255), rgb(220, 255, 220));"}
      class="text-4xl font-bold px-168 py-360 text-center"
    >
      <p class="gradient-text-dark">
        {contents.headline}
      </p>
    </div>
  {/if}
</SectionContainer>
