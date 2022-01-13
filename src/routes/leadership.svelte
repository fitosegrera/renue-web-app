<script>
  //LIBS
  import { onMount } from "svelte";

  //STORES
  import { cms_url } from "../stores/renuestore";

  //SECTIONS
  import HeroSection from "../components/sections/leadership/hero-section.svelte";
  import Section1 from "../components/sections/leadership/section-1.svelte";
  import Section2 from "../components/sections/leadership/section-2.svelte";
  import Section3 from "../components/sections/leadership/section-3.svelte";
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

    // console.log("Leadership", data);

    let hero_data = {};
    let section_1_data = {};
    let section_2_data = [];
    let section_2_title = "";
    let section_3_data = [];
    let section_3_title = "";
    let contact_data = {};

    await data.results.forEach((result, i) => {
      //console.log(index, result.uid);
      if (result.uid === "leadership") {
        //console.log(result.data.body);
        result.data.body.forEach((section, j) => {
          //console.log(section.primary.image.url);
          if (section.slice_type === "hero-section") {
            hero_data.imageUrl = section.primary.image.url;
            hero_data.headline = section.primary.headline[0].text;
            hero_data.paragraph = section.primary.paragraph[0].text;
          }

          if (section.slice_type === "section-1") {
            // console.log(section.primary.image.url);
            section_1_data.imageUrl = section.primary.image.url;
            section_1_data.paragraph = section.primary.paragraph[0].text;
          }

          if (section.slice_type === "section-2") {
            section.items.forEach((item, i) => {
              console.log(section);
              console.log(item);
              let tmp = {};
              if (i == 0) {
                tmp.visible = true;
              } else {
                tmp.visible = false;
              }
              tmp.more = item.more[0].text;
              tmp.name = item.name[0].text;
              tmp.role = item.role[0].text;
              tmp.img_url = item.profile.url;
              tmp.bio = item.bio[0].text;

              //console.log("tmp", tmp);

              section_2_data.push(tmp);
            });
            section_2_title = section.primary["section-title"][0].text;
          }

          if (section.slice_type === "section-3") {
            section.items.forEach((item, i) => {
              //console.log(item);
              let tmp = {};
              if (i == 0) {
                tmp.visible = true;
              } else {
                tmp.visible = false;
              }
              tmp.more = item.more[0].text;
              tmp.name = item.name[0].text;
              tmp.role = item.role[0].text;
              tmp.img_url = item.profile.url;
              tmp.bio = item.bio[0].text;

              //console.log("tmp", tmp);

              section_3_data.push(tmp);
            });
            section_3_title = section.primary["title-bio-card"][0].text;
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
      section2: {
        title: section_2_title,
        section_2_data,
      },
      section3: {
        title: section_3_title,
        section_3_data,
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
  let contactData;

  onMount(async () => {
    fetchData($cms_url, async (data) => {
      heroData = await data.hero;
      section1Data = await data.section1;
      section2Data = await data.section2;
      section3Data = await data.section3;
      contactData = await data.contact;
    });
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

{#await section3Data}
  <h1 class="text-secondary text-8xl mt-72">Loading...</h1>
{:then data}
  {#if data !== undefined}
    <Section3 contents={data} />
  {/if}
{/await}

<SpacerLine />
<!-- 
{#await contactData}
  <h1 class="text-secondary text-8xl mt-72">Loading...</h1>
{:then data}
  {#if data !== undefined}
    <ContactSection {data} />
  {/if}
{/await} -->
