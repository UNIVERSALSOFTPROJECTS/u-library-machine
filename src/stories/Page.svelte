<script lang="ts">
	// import './page.css';
	import '../lib/styles/global/global.scss';
	import init from '$lib/init';
  import Login from '$lib/components/login/Login.svelte';
  init.start();
</script>

<div class="machine">
  <Login/>
</div>