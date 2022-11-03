<script>
  //LIBS
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { spring } from "svelte/motion";
  import { initializeApp } from "firebase/app";
  import {
    getFirestore,
    collection,
    getDocs,
    setDoc,
    doc,
  } from "firebase/firestore/lite";

  // import "firebase/firestore";

  //CONTAINERS
  import SectionContainer from "../../containers/contact-form.svelte";

  //COMPONENTS
  import TextInputDarkSm from "../../forms/text-input-dark-sm.svelte";
  import TextInputDarkLg from "../../forms/text-input-dark-lg.svelte";
  import PhoneInputDarkSm from "../../forms/phone-input-dark-sm.svelte";
  import TextAreaDarkLg from "../../forms/textarea-dark-lg.svelte";
  import Button from "../../buttons/lg-primary-icon-fill.svelte";

  //STORES
  import { firebase_config } from "../../../stores/renuestore";

  //PROPS
  export let contents;

  onMount(async () => {
    console.log($firebase_config);
    // const app = await initializeApp($firebase_config);
    // const db = await getFirestore(app);
    // const contactCollection = await collection(db, "contact");
    // const contactSnapshot = await getDocs(contactCollection);
    // const contactList = await contactSnapshot.docs.map((d) => {
    //   d.data();
    //   console.log(d.data());
    // });

    console.log(contents);
  });

  const onSubmit = async (e) => {
    // console.log(e.target.options[0].text);
    console.log(e.target.innerText);
    const formData = new FormData(e.target);
    const data = {};
    for (let field of formData) {
      // console.log(field);
      const [key, value] = field;
      data[key] = value;
      console.log(value);
      if (key === "country") {
        console.log(JSON.stringify(value));
      }
    }

    //console.log(data.country);

    const app = await initializeApp($firebase_config);
    const db = await getFirestore(app);

    // await setDoc(doc(db, "contact", "testuser2@mail.com"), {
    //   first_name: data.first_name,
    //   last_name: data.second_name,
    //   email: data.email,
    //   company_name: data.company_name,
    //   message: data.message,
    //   country: "",
    //   phone: data.phone,
    // });
  };

  let isBooped = false;
  let rotation = 10;
  let timing = 200;

  let springyRotation = spring(0, {
    stiffness: 0.1,
    damping: 0.15,
  });

  $: springyRotation.set(isBooped ? rotation : 0);

  $: style = `
		transform: rotate(${$springyRotation}deg)
	`;

  $: if (isBooped) {
    setTimeout(() => {
      isBooped = false;
    }, timing);
  }

  const toggle = () => {
    isBooped = true;
  };
</script>

<SectionContainer background={contents.background.url}>
  <div class="relative lg:w-800 md:w-640 sm:w-360 mx-auto">
    <div
      id="wrapper"
      class="w-auto lg:text-2xl md:text-xl sm:text-2lg lg:leading-2xl md:leading-xl sm:leading-2lg text-on-background-variant text-left font-bold"
    >
      <div class="w-full h-full px-16">
        <h1>
          {contents.heading.substring(0, contents.start)}
          <a href="mailto:cnieto@renueenviro.com" class="text-primary-main">
            {contents.heading.substring(contents.start, contents.end)}
          </a>
          {contents.heading.substring(contents.end)}
        </h1>
      </div>
    </div>
    <div
      class="w-full md:text-lg md:leading-xl text-on-background-variant text-left pt-240"
    >
      <div class="w-100 h-full px-16">
        <p>{contents.instructions}</p>
      </div>
    </div>
    <form on:submit|preventDefault={onSubmit}>
      <div
        class="px-16 grid lg:grid-flow-col md:grid-flow-row justify-items-center my-24 gap-32"
      >
        <div class="w-full">
          <TextInputDarkSm
            id="first_name"
            label="First Name *"
            type="text"
            placeholder="First Name"
          />
        </div>
        <div class="w-full">
          <TextInputDarkSm
            id="last_name"
            label="Last Name *"
            type="text"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div class="my-24 px-16">
        <div class="w-full">
          <TextInputDarkLg
            id="email"
            label="Email *"
            type="email"
            placeholder="Email"
          />
        </div>
      </div>
      <div
        class="px-16 grid md:grid-flow-col sm:grid-flow-row justify-items-center my-24 gap-32"
      >
        <div class="w-full">
          <PhoneInputDarkSm
            id="phone"
            label="Phone *"
            type="tel"
            placeholder="000-000-0000"
          />
        </div>
        <div class="w-full">
          <TextInputDarkSm
            id="company_name"
            label="Company *"
            type="text"
            placeholder="Company Name"
          />
        </div>
      </div>
      <div class="px-16">
        <TextAreaDarkLg
          id="message"
          label="Message *"
          placeholder="Send us a message..."
          rows="6"
          cols="50"
        />
      </div>
      <div class="px-16 flex mt-56 justify-end">
        <!-- <Button
          type="submit"
          icon_label="bi:send"
          label="Send Message"
          url="/contact"
        /> -->

        <button
          type="submit"
          on:mouseenter={toggle}
          on:mouseleave={toggle}
          class="flex items-center w-280 px-32 space-x-16 h-72 text-on-background-variant font-bold rounded-md bg-primary-main transition ease-in-out hover:bg-secondary-main duration-500"
        >
          <div class="text-xl">
            <Icon icon="bi:send" {style} />
          </div>
          <h1 class="text-lg">Send Message</h1>
        </button>
      </div>
    </form>
  </div></SectionContainer
>

<style>
  * {
    overflow: hidden;
  }

  #wrapper {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
