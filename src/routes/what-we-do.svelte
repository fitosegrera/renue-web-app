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
  import Section3 from "../components/sections/what-we-do/section-3.svelte";
  import Section4 from "../components/sections/what-we-do/section-4.svelte";
  import ContactSection from "../components/sections/what-we-do/contact-section.svelte";

  let heroData, contactData;
  let section1Data, section2Data, section3Data, section4Data;

  let hero_data = {};
  let section_1_data = {};
  let section_2_data = [];
  let section_3_data = [];
  let section_4_data = {};
  let contact_data = {};

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
      //console.log(index, result.uid);
      if (result.uid === "what-we-do") {
        //console.log(result.data.body);
        await result.data.body.forEach(async (section, j) => {
          if (section.slice_type === "hero-section") {
            //console.log(section.primary);
            hero_data.imageUrl = section.primary.image.url;
            hero_data.headline = section.primary.headline[0].text;
            hero_data.paragraph = section.primary.paragraph[0].text;
          }

          if (section.slice_type === "section-3") {
            //This registered as section-3 on PRISMIC, but it is actually section-1
            section_1_data.headline = section.primary.headline[0].text;
            section_1_data.spans = section.primary.headline[0].spans;
          }

          if (section.slice_type === "section-2") {
            //console.log("section-2", section.items);
            // section_1_data.headline = section.primary.headline[0].text;

            await section.items.forEach((item, j) => {
              console.log("ITEM", item);
              section_2_data.push(item);
            });
          }

          if (section.slice_type === "section-31") {
            //This registered as section-31 on PRISMIC, but its actually section-3
            await section.items.forEach((item) => {
              //console.log("ITEM", item);
              section_3_data.push(item);
            });
          }

          if (section.slice_type === "section-4") {
            //console.log("section-4", section);
            section_4_data.headline = section.primary.headline[0].text;
          }

          if (section.slice_type === "contact-section") {
            //console.log("CONTACT", section);
            contact_data.headline = section.primary.headline[0].text;
            contact_data.start = section.primary.headline[0].spans[0].start;
            contact_data.end = section.primary.headline[0].spans[0].end;
            contact_data.button_label = section.primary["button-label"];
            contact_data.button_url = "/contact";
            // console.log("contact_data", contact_data);
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
      section1: {
        headline: section_1_data.headline,
        spans: section_1_data.spans,
      },
      section2: section_2_data,
      section3: section_3_data,
      section4: {
        headline: section_4_data.headline,
      },
      contact: {
        headline: contact_data.headline,
        start: contact_data.start,
        end: contact_data.end,
        button_label: contact_data.button_label,
        button_url: contact_data.button_url,
      },
    };
    callback(cleanData);
  };

  fetchData($cms_url, async (data) => {
    heroData = await data.hero;
    section1Data = await data.section1;
    section2Data = await data.section2;
    section3Data = await data.section3;
    section4Data = await data.section4;
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
    <Section1 contents={data} />
  {/if}
{/await}

{#await section2Data}
  <h1 class="text-secondary text-8xl mt-72">Loading...</h1>
{:then data}
  {#if data !== undefined}
    <Section2 contents={data} />
  {/if}
{/await}

{#await section3Data}
  <h1 class="text-secondary text-8xl mt-72">Loading...</h1>
{:then data}
  {#if data !== undefined}
    <Section3 contents={data} />
  {/if}
{/await}

{#await section4Data}
  <h1 class="text-secondary text-8xl mt-72">Loading...</h1>
{:then data}
  {#if data !== undefined}
    <Section4 contents={data} />
  {/if}
{/await}

{#await contactData}
  <h1 class="text-secondary text-8xl mt-72">Loading...</h1>
{:then data}
  {#if data !== undefined}
    <ContactSection contents={data} />
  {/if}
{/await}
