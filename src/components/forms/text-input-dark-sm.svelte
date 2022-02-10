<script>
  export let type, label, placeholder, id;
</script>

<div class="">
  <div class="my-16 text-md text-on-background-variant">
    <label for={id}>{label}</label>
  </div>

  <div class="relative flex w-full h-64 flex-col items-center">
    <input
      {id}
      {type}
      name={id}
      {placeholder}
      class="w-full h-64 rounded-md px-16 bg-secondary-variant text-md"
      required
    />
    <div class="grad-line w-full h-6 gradient-blue-to-green-light-diagonal" />
  </div>
</div>

<style>
  *,
  *:focus,
  *:hover {
    outline: none;
  }

  input[type="text"] {
    outline: none;
    border: none;
    color: #eee;
  }

  input[type="email"] {
    outline: none;
    border: none;
    color: #eee;
  }

  input[type="tel"] {
    outline: none;
    border: none;
    color: #eee;
  }

  ::-webkit-input-placeholder {
    color: rgb(200, 200, 200);
  }

  :-moz-placeholder {
    /* Firefox 18- */
    color: #eee;
  }

  ::-moz-placeholder {
    /* Firefox 19+ */
    color: #eee;
  }

  :-ms-input-placeholder {
    color: #eee;
  }

  /**/
  input[type="text"]:focus {
    outline: none;
    border: 2px solid #a6cf4d;
    color: #eee;
  }

  input[type="email"]:focus {
    outline: none;
    border: 2px solid #a6cf4d;
    color: #eee;
  }

  input[type="tel"]:focus {
    outline: none;
    border: 2px solid #a6cf4d;
    color: #eee;
  }

  .grad-line {
    position: absolute;
    bottom: 0;
  }
</style>
