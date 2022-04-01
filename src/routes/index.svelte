<script>
  //STORES
  import { cms_url } from "../stores/renuestore";

  //LIBS

  //COMPONENTS
  import SpacerLine from "../components/containers/spacer-line.svelte";

  //SECTIONS
  import HeroSection from "../components/sections/home/hero-section.svelte";
  import Section1 from "../components/sections/home/section-1.svelte";
  import Section2 from "../components/sections/home/section-2.svelte";
  import Section3 from "../components/sections/home/section-3.svelte";
  import OilSection from "../components/sections/home/oil-section.svelte";
  import ContactSection from "../components/sections/home/contact-section.svelte";

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

    let carouselSlides = [];

    let hero_data = {};
    let section_2_data = {};
    let oil_life_data = [];
    let section_3_data = {};
    let contact_data = {};

    data.results.forEach((result, i) => {
      //console.log(index, result.uid);
      if (result.uid === "homepage") {
        //console.log(result.data.body);
        result.data.body.forEach((section, j) => {
          if (section.slice_type === "hero-section") {
            //console.log(section.primary.subheading[0].spans[0].start);
            hero_data.imageUrl = section.primary["bg-image"].url;
            hero_data.heading = section.primary.heading[0].text;
            hero_data.paragraph = section.primary.paragraph[0].text;
            hero_data.subheading = section.primary.subheading[0].text;
            hero_data.subheading_start =
              section.primary.subheading[0].spans[0].start;
            hero_data.subheading_end =
              section.primary.subheading[0].spans[0].end;
            hero_data.buttonLabel = section.primary["button-label"];
            hero_data.buttonUrl = section.primary["button-url"][0].text;
          }
          if (section.slice_type === "section-1") {
            section.items.forEach((item) => {
              let tmpData = {
                image_url: item.thumbnail.url,
                headline: item.headline[0].text,
                paragraph: item.paragraph[0].text,
                button_url: item["button-url"],
              };
              carouselSlides.push(tmpData);
            });
          }
          if (section.slice_type === "section-2") {
            section_2_data.headline = section.items[0].headline[0].text;
            section_2_data.paragraph = section.items[0].paragraph[0].text;
            section_2_data.start = section.items[0].paragraph[0].spans[0].start;
            section_2_data.end = section.items[0].paragraph[0].spans[0].end;
          }
          if (section.slice_type === "section-3") {
            section_3_data.headline = section.primary.headline[0].text;
          }
          if (section.slice_type === "section-4") {
            section.items.forEach((item, j) => {
              //console.log("ITEM", item);
              oil_life_data.push(item);
            });
          }
          if (section.slice_type === "contact-section") {
            contact_data.headline = section.primary.headline[0].text;
            contact_data.start = section.primary.headline[0].spans[0].start;
            contact_data.end = section.primary.headline[0].spans[0].end;
            contact_data.button_label = section.primary["button-label"];
            contact_data.button_url = "/contact";
          }
        });
      }
    });

    let cleanData = {
      hero: {
        id: 1, //data.id,
        uid: "hero", //data.uid,
        image_url: hero_data.imageUrl,
        button_label: hero_data.buttonLabel,
        button_url: hero_data.buttonUrl,
        heading: hero_data.heading,
        subheading: hero_data.subheading,
        subheading_start: hero_data.subheading_start,
        subheading_end: hero_data.subheading_end,
        paragraph: hero_data.paragraph,
      },
      section1: {
        carousel: {
          slides: carouselSlides,
        },
      },
      section2: {
        headline: section_2_data.headline,
        paragraph: section_2_data.paragraph,
        start: section_2_data.start,
        end: section_2_data.end,
      },
      oil: oil_life_data,
      section3: {
        headline: section_3_data.headline,
      },
      contact: {
        headline: contact_data.headline,
        start: contact_data.start,
        end: contact_data.end,
      },
    };
    //console.log("cleanData", cleanData);
    callback(cleanData);
    // });
  };

  let heroData;
  let section1Data, section2Data, section3Data;
  let oilLifeData;
  let contactData;

  fetchData($cms_url, async (data) => {
    heroData = await data.hero;
    section1Data = await data.section1;
    section2Data = await data.section2;
    section3Data = await data.section3;
    oilLifeData = await data.oil;
    contactData = await data.contact;
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

{#await section1Data}
  <h1 class="text-secondary text-8xl mt-72">Loading...</h1>
{:then data}
  {#if data !== undefined}
    <Section1 {data} />
  {/if}
{/await}

<SpacerLine />

{#await section2Data}
  <h1 class="text-secondary text-8xl mt-72">Loading...</h1>
{:then data}
  {#if data !== undefined}
    <Section2 {data} />
  {/if}
{/await}

<!-- {#await section3Data}
  <h1 class="text-secondary text-8xl mt-72">Loading...</h1>
{:then data}
  {#if data !== undefined}
    <Section3 {data} />
  {/if}
{/await} -->

{#await oilLifeData}
  <h1 class="text-secondary text-8xl mt-72">Loading...</h1>
{:then data}
  {#if data !== undefined}
    <OilSection {data} />
  {/if}
{/await}

{#await contactData}
  <h1 class="text-secondary text-8xl mt-72">Loading...</h1>
{:then data}
  {#if data !== undefined}
    <ContactSection {data} />
  {/if}
{/await}

<style>
  .section-2-out {
    opacity: 0;
  }

  .section-2-in {
    -webkit-animation: fadein 20s; /* Safari, Chrome and Opera > 12.1 */
    -moz-animation: fadein 20s; /* Firefox < 16 */
    -ms-animation: fadein 20s; /* Internet Explorer */
    -o-animation: fadein 20s; /* Opera < 12.1 */
    animation: fadein 20s;
  }

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  /* Firefox < 16 */
  @-moz-keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  /* Safari, Chrome and Opera > 12.1 */
  @-webkit-keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  /* Internet Explorer */
  @-ms-keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  /* Opera < 12.1 */
  @-o-keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
