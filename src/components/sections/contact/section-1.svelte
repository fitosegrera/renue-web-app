<script>
  //LIBS
  import Icon from "@iconify/svelte";
  import { spring } from "svelte/motion";

  //CONTAINERS
  import SectionContainer from "../../containers/form.svelte";

  //COMPONENTS
  import TextInputDarkSm from "../../forms/text-input-dark-sm.svelte";
  import TextInputDarkLg from "../../forms/text-input-dark-lg.svelte";
  import PhoneInputDarkSm from "../../forms/phone-input-dark-sm.svelte";
  import TextAreaDarkLg from "../../forms/textarea-dark-lg.svelte";
  import Button from "../../buttons/lg-primary-icon-fill.svelte";

  //PROPS
  export let contents;

  const onSubmit = async (e) => {
    // console.log(e);
    const formData = new FormData(e.target);
    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }

    let composedMail = {
      Host: "smtp.gmail.com",
      Username: "renueenviro@gmail.com",
      Password: "RenueEnviro_2021!",
      To: "fitosegrera@gmail.com",
      From: "renueenviro@gmail.com",
      Subject: "Message from " + data.first_name + " " + data.last_name,
      Body: JSON.stringify(data),
    };

    console.log(composedMail);

    await Email.send(composedMail).then((message) => {
      console.log(message);
      alert("mail sent successfully");
    });
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

<SectionContainer>
  <div class="w-800 mx-auto">
    <div
      class="w-800 md:text-3xl md:leading-5xl text-on-background-variant text-left font-bold"
    >
      <div class="w-100 h-full">
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
      class="w-800 md:text-lg md:leading-xl text-on-background-variant text-left pt-96"
    >
      <div class="w-100 h-full">
        <p>{contents.instructions}</p>
      </div>
    </div>
    <form on:submit|preventDefault={onSubmit}>
      <div class="grid grid-flow-col justify-items-center my-24 gap-32">
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
      <div class="my-24">
        <div class="w-full">
          <TextInputDarkLg
            id="email"
            label="Email *"
            type="email"
            placeholder="Email"
          />
        </div>
      </div>
      <div class="grid grid-flow-col justify-items-center my-24 gap-32">
        <div class="w-full">
          <PhoneInputDarkSm
            id="phone"
            label="Phone *"
            type="tel"
            placeholder="Phone number"
          />
        </div>
        <div class="w-full">
          <TextInputDarkSm
            id="company_name"
            label="Company (optional)"
            type="text"
            placeholder="Company Name"
          />
        </div>
      </div>
      <div>
        <TextAreaDarkLg
          id="message"
          label="Message *"
          placeholder="Send us a message..."
          rows="6"
          cols="50"
        />
      </div>
      <div class="flex mt-56 justify-end">
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
          class="flex items-center px-32 space-x-16 w-268 h-72 text-on-background-variant font-bold rounded-md bg-primary-main transition ease-in-out hover:bg-secondary-main duration-500"
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
</style>
