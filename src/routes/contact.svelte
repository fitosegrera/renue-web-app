<script>
  //STORES
  import { cms_url } from "../stores/renuestore";

  //SECTIONS
  import HeroSection from "../components/sections/contact/hero-section.svelte";
  import Section1 from "../components/sections/contact/section-1.svelte";

  //CODE
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
    let section_1_data = {};

    data.results.forEach((result, i) => {
      //console.log(index, result.uid);
      if (result.uid === "contact") {
        //console.log(result.data.body);
        result.data.body.forEach((section, j) => {
          if (section.slice_type === "hero-section") {
            //console.log(section.primary.paragraph[0].spans[0].start);
            hero_data.imageUrl = section.primary.image.url;
            hero_data.headline = section.primary.headline[0].text;
            hero_data.paragraph = section.primary.paragraph[0].text;
            hero_data.start = section.primary.paragraph[0].spans[0].start;
            hero_data.end = section.primary.paragraph[0].spans[0].end;
          }

          if (section.slice_type === "section-1") {
            section_1_data.heading = section.primary.heading[0].text;
            section_1_data.instructions = section.primary.instructions[0].text;
            section_1_data.start = section.primary.heading[0].spans[0].start;
            section_1_data.end = section.primary.heading[0].spans[0].end;
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
        start: hero_data.start,
        end: hero_data.end,
      },
      section1: {
        heading: section_1_data.heading,
        start: section_1_data.start,
        end: section_1_data.end,
        instructions: section_1_data.instructions,
      },
    };
    //console.log("cleanData", cleanData);
    callback(cleanData);
    // });
  };

  let heroData;
  let section1Data;

  fetchData($cms_url, async (data) => {
    heroData = await data.hero;
    section1Data = await data.section1;
  });
</script>

<svelte:head>
  <title>RENUE</title>
  <script src="https://smtpjs.com/v3/smtp.js"></script>
</svelte:head>

{#await heroData}
  <h1 class="text-secondary text-8xl mt-72">Loading...</h1>
{:then data}
  {#if data !== undefined}
    <HeroSection contents={data} />
  {/if}
{/await}

{#await section1Data}
  <h1 class="text-secondary text-8xl mt-72">Loading...</h1>
{:then data}
  {#if data !== undefined}
    <Section1 contents={data} />
  {/if}
{/await}

<style>
</style>
