<script>
  //STORES
  import { cms_url } from "../stores/renuestore";

  //LIBS

  //CONTAINERS

  //COMPONENTS

  //SECTIONS
  import Section1 from "../components/sections/model-viewer/section-1.svelte";

  let section1Data;

  let section_1_data = {};

  const fetchRefs = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data.refs;
  };

  const fetchData = async (cms_url, callback) => {
    const refs = await fetchRefs(cms_url);

    const masterRef = await refs.map((ref, index) => {
      return ref.ref;
    });

    const url = cms_url + "/documents/search?ref=" + masterRef + "#format=json";
    const res = await fetch(url);
    const data = await res.json();

    //console.log(data);

    await data.results.forEach(async (result, i) => {
      //console.log(i, result.uid);
      if (result.uid === "model-viewer") {
        console.log(result.data.body[0].primary.instructions);
        section_1_data.headline = result.data.body[0].primary.headline[0].text;
        section_1_data.instructions = result.data.body[0].primary.instructions;
      }
    });

    let cleanData = {
      section1: {
        headline: section_1_data.headline,
        instructions: section_1_data.instructions,
      },
    };

    callback(cleanData);
  };

  fetchData($cms_url, async (data) => {
    section1Data = await data.section1;
  });
</script>

<svelte:head>
  <title>RENUE</title>
</svelte:head>

{#await section1Data}
  <h1 class="text-secondary text-8xl mt-72">Loading...</h1>
{:then data}
  {#if data !== undefined}
    <Section1 contents={data} />
  {/if}
{/await}
