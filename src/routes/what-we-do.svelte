<script>
  //STORES
  import { cms_url } from "../stores/renuestore";

  //LIBS

  //CONTAINERS

  //COMPONENTS

  //SECTIONS
  import HeroSection from "../components/sections/what-we-do/hero-section.svelte";
  import Section1 from "../components/sections/what-we-do/section-1.svelte";
  import Section2 from "../components/sections/what-we-do/section-2.svelte";
  import Section4 from "../components/sections/what-we-do/section-4.svelte";

  let heroData;
  let section1Data, section4Data;

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

    let hero_data = {};
    let section_4_data = {};

    data.results.forEach((result, i) => {
      //console.log(index, result.uid);
      if (result.uid === "what-we-do") {
        //console.log(result.data.body);
        result.data.body.forEach((section, j) => {
          if (section.slice_type === "hero-section") {
            //console.log(section.primary);
            hero_data.imageUrl = section.primary.image.url;
            hero_data.headline = section.primary.headline[0].text;
            hero_data.paragraph = section.primary.paragraph[0].text;
          }

          if (section.slice_type === "section-4") {
            console.log(section.primary);
            section_4_data.headline = section.primary.headline[0].text;
            section_4_data.instructions = section.primary.instructions;
          }
        });
      }
    });

    let cleanData = {
      hero: {
        id: 1,
        uid: "hero",
        image_url: hero_data.imageUrl,
        headline: hero_data.headline,
        paragraph: hero_data.paragraph,
      },
      section4: {
        headline: section_4_data.headline,
        instructions: section_4_data.instructions,
      },
    };
    callback(cleanData);
  };

  fetchData($cms_url, async (data) => {
    heroData = await data.hero;
    section1Data = {
      headline:
        "We have a closed loop process with 90% heat recovery that produces 700 gallons of clean fuels or Lube oil base for every 1000 gallons of waste of waste oil. Our plant has the flexibility to process any high viscosity waste oil product such as: used lube oil bottoms, bunker slops, Asphalt Flux, Asphalt Extender, and off spec fuels oils.",
    };
    section4Data = await data.section4;
  });
</script>

<svelte:head>
  <title>RENUE</title>
</svelte:head>

{#await heroData}
  <h1 class="text-secondary text-8xl mt-72">Loading...</h1>
{:then data}
  {#if data !== undefined}
    <HeroSection contents={data} />
  {/if}
{/await}

<Section1 contents={section1Data} />

<!-- {#await section2Data}
  <h1 class="text-secondary text-8xl mt-72">Loading...</h1>
{:then data}
  {#if data !== undefined}
    <Section2 contents={data} />
  {/if}
{/await} -->

<Section2 />

{#await section4Data}
  <h1 class="text-secondary text-8xl mt-72">Loading...</h1>
{:then data}
  {#if data !== undefined}
    <Section4 contents={data} />
  {/if}
{/await}
