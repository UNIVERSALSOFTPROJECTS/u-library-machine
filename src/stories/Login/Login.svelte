<script lang="ts">
	import '../../lib/styles/global/global.scss';
	import init from '$lib/init';
  import Login from '$lib/components/login/Login.svelte';
  import { sessionUser } from '$lib/stores/user.store';

  export let userSaved:string;
  export let viewmode:string;

  init.start();

  localStorage.setItem('viewMode',viewmode);
  localStorage.setItem('savedUser', userSaved);
  sessionStorage.removeItem('sessionUser');
  
  // let userX:any;
  // const userDetected = (user:any) => {
  //   // if (sessionStorage.getItem('sessionUser')) { 
  //     console.log(user);
  //     userX = $sessionUser; //ESTO SE TIENE QUE ETESTEAR BIEN EN Si
  // //  }
  // //  else{

  //   // }


  // }

  // $: userDetected($sessionUser);
  
</script>

<div class="machine">
  <!-- {#if userX}
    <div style="position:relative;z-index:100;">HOLA</div>
  {/if} -->
<!-- <div>  {sessionUser.get()}</div> -->
  <Login/>
</div>