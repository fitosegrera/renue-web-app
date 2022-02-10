<script>
  export let name, label, placeholder, id, rows, cols;
</script>

<div>
  <div class="my-16 text-md  text-on-background-variant">
    <label for={id}>{label}</label>
  </div>

  <div class="relative flex w-800 flex-col items-center">
    <textarea
      {id}
      name={id}
      class="w-800 p-16 rounded-md bg-secondary-variant text-md text-tertiary-main"
      {rows}
      {cols}
      {placeholder}
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

  ::-webkit-input-placeholder {
    color: rgb(200, 200, 200);
  }

  :-moz-placeholder {
    /* Firefox 18- */
    color: rgb(200, 200, 200);
  }

  ::-moz-placeholder {
    /* Firefox 19+ */
    color: rgb(200, 200, 200);
  }

  :-ms-input-placeholder {
    color: rgb(200, 200, 200);
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

  .grad-line {
    position: absolute;
    bottom: 0;
  }
</style>
