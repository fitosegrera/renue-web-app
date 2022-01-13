<script>
  //STORES
  import { cms_url } from "../stores/renuestore";

  //SECTIONS
  import HeroSection from "../components/sections/who-we-are/hero-section.svelte";
  import Section1 from "../components/sections/who-we-are/section-1.svelte";
  import Section2 from "../components/sections/who-we-are/section-2.svelte";
  import Section3 from "../components/sections/who-we-are/section-3.svelte";
  import ContactSection from "../components/sections/who-we-are/contact-section.svelte";

  //COMPONENTS
  import SpacerLine from "../components/containers/spacer-line.svelte";

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
    let section_2_data = [];
    let section_2_title = "";
    // let section_3_data = [];
    let section_3_title = "";
    let contact_data = {};

    data.results.forEach((result, i) => {
      //console.log(index, result.uid);
      if (result.uid === "who-we-are") {
        //console.log(result.data.body);
        result.data.body.forEach((section, j) => {
          //console.log(section);
          if (section.slice_type === "hero-section") {
            hero_data.imageUrl = section.primary.image_url.url;
            hero_data.headline = section.primary.headline[0].text;
            hero_data.paragraph = section.primary.paragraph[0].text;
          }

          if (section.slice_type === "section-1") {
            console.log(section.primary.image.url);
            section_1_data.imageUrl = section.primary.image.url;
            section_1_data.paragraph = section.primary.paragraph[0].text;
          }

          if (section.slice_type === "section-2") {
            //console.log(section);
            section.items.forEach((item, i) => {
              let tmp = {};
              if (i == 0) {
                tmp.visible = true;
              } else {
                tmp.visible = false;
              }
              tmp.paragraph = item.paragraph[0].text;
              tmp.imageUrl = item["image-url"].url;
              tmp.label = item["interactive-menu-item"][0].text;
              tmp.id = item["interactive-menu-item"][0].text.toLowerCase();

              section_2_data.push(tmp);
            });
          }

          if (section.slice_type === "section-3") {
            console.log(section);
            section_3_title = section.primary.headline[0].text;
          }

          if (section.slice_type === "contact-section") {
            //console.log(section);
            contact_data.headline = section.primary.headline[0].text;
            contact_data.start = section.primary.headline[0].spans[0].start;
            contact_data.end = section.primary.headline[0].spans[0].end;
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
        image_url: section_1_data.imageUrl,
        paragraph: section_1_data.paragraph,
      },
      section2: section_2_data,
      section3: { headline: section_3_title },
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
  let contactData;

  fetchData($cms_url, async (data) => {
    heroData = await data.hero;
    section1Data = await data.section1;
    section2Data = await data.section2;
    section3Data = await data.section3;
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

<SpacerLine />

{#await section2Data}
  <h1 class="text-secondary text-8xl mt-72">Loading...</h1>
{:then data}
  {#if data !== undefined}
    <Section2 contents={data} />
  {/if}
{/await}

<SpacerLine />

{#await section3Data}
  <h1 class="text-secondary text-8xl mt-72">Loading...</h1>
{:then data}
  {#if data !== undefined}
    <Section3 contents={data} />
  {/if}
{/await}

{#await contactData}
  <h1 class="text-secondary text-8xl mt-72">Loading...</h1>
{:then data}
  {#if data !== undefined}
    <ContactSection {data} />
  {/if}
{/await}
