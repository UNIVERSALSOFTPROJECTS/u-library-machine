<script lang="ts">
    import { onMount } from 'svelte';
	import UserService from '$lib/services/user.service';
	import { sessionUser } from '$lib/stores/user.store';
	import { reloadPage } from '$lib/utils/global.util';
    import { baseUrl } from '$lib/utils/assets.util';
    import { getConfig } from '$lib/configService';

    const config = getConfig(); 

    let platform = config.platform;
	let username: string = '';
	let password: string = '';
	let isLoginUserLoading: boolean = false;
	let isSavedUser: boolean = localStorage.getItem('savedUser') ? true : false;
	let viewMode: string = localStorage.getItem('viewMode') || '';
	let isAutoservice: boolean = isSavedUser && viewMode == 'autoservice';
	let isAutoserviceError: boolean = false;
	let autoserviceMessageError: string = 'Ocurrio un error, contactese con soporte';
	let autoLoginTimer: NodeJS.Timeout;
    let typeFormatImageLogo:string = "png";

	const loginUser = async () => {
		if (!username || !password) return alert('todos los campos son obligatorios');
		try {
			isLoginUserLoading = true;
			let userData = await UserService.login(username, password);
			sessionUser.set(userData);
			if (isSavedUser)
				localStorage.setItem('savedUser', `{"user":"${username}", "pass":"${password}"}`);
			if (autoLoginTimer) clearTimeout(autoLoginTimer);
		} catch (error: any) {
			if (
				error.message == 'Network Error' ||
				error.response?.data?.message.includes('Connection refused')
			) {
				error = 'Página en mantenimiento, espere unos minutos';
			} else if (
				error.response?.data?.message == 'NECO_LOGIN_FAILED' ||
				error.response?.data?.message == 'LOGIN_ERROR'
			) {
				error = 'Usuario o contraseña incorrecto';
			} else {
				error = 'Ocurrio un error, contactese con soporte';
			}
			isLoginUserLoading = false;
			if (isAutoservice) {
				autoserviceMessageError = error;
				isAutoserviceError = true;
			}
		}
	};

	const deleteSavedUser = (status: boolean) => {
		if (!status) {
			clearTimeout(autoLoginTimer);
			localStorage.removeItem('savedUser');
		}
	};

  const handleImageLogoError = () => typeFormatImageLogo = "gif";

	$: deleteSavedUser(isSavedUser);

	onMount(async () => {
		if (isSavedUser) {
			let savedUser = JSON.parse(localStorage.getItem('savedUser')!);
			username = savedUser.user;
			password = savedUser.pass;
			autoLoginTimer = setTimeout(
				() => {
					loginUser();
				},
				viewMode == 'autoservice' ? 2000 : 10000
			);
		}
	});

</script>
<!-- {#if isAutoservice} -->
{#if isAutoservice}
	<div class="login__autoservice">
		<!-- {#if isAutoserviceError} -->
		{#if isAutoserviceError}
			<div class="login__autoservice--error">
				<p>{autoserviceMessageError}</p>
				<button class="btn" onclick={reloadPage}>Actualizar</button>
			</div>
		{:else}
			<div class="login__autoservice--loading">
      <i class="icon icon__blocks-wave"></i>
				<p>Cargando...</p>
			</div>
		{/if}
	</div>
{/if}
<div class="login">
	<div class="login__title">Bienvenido a</div>
	<img
		class="login__logo"
		src="{baseUrl}/{platform}/logo.{typeFormatImageLogo}"
		alt="logo-login"
  onerror={handleImageLogoError}
	/>
	<div></div>
	<form class="login__form">
		<input
			type="text"
			class="ipt"
			placeholder="usuario"
			autocapitalize="off"
			autocomplete="off"
			disabled={isSavedUser}
			bind:value={username}
		/>
		<input
			type="password"
			class="ipt"
			placeholder="contraseña"
			autocapitalize="off"
			autocomplete="off"
			disabled={isSavedUser}
			bind:value={password}
		/>
		<div class="login__autosaved">
			<input type="checkbox" id="autosaved" bind:checked={isSavedUser} />
			<label for="autosaved">Recordar</label>
			<div></div>
			<div></div>
			<!-- <select name="" id="">
      <option value="s" selected>xd</option>
      <option value="ff">ff</option>
    </select> -->
			<!-- <DropdowIdiom bind:idioms {changeIdiom}/> -->
		</div>
	</form>
	<button type="button" class="btn btn__login" onclick={loginUser} disabled={isLoginUserLoading}>
		{#if isLoginUserLoading}
			<i class="icon icon__3-dots-scale"></i>
		{:else}
			Ingresar
		{/if}
	</button>
</div>