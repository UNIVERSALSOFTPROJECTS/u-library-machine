<script lang="ts">
	// import './page.css';
	import '../lib/styles/global/global.scss';
	import { onMount } from 'svelte';
	import Header from './Header.svelte';
	import UserService from '$lib/services/user.service';
	import init from '$lib/init';
	import { sessionUser } from '$lib/stores/user.store';
	import { reloadPage } from '$lib/utils/global.util';

	init.start();

	let username: string = '';
	let password: string = '';
	let isLoginUserLoading: boolean = false;
	let isSavedUser: boolean = localStorage.getItem('savedUser') ? true : false;
	let viewMode: string = localStorage.getItem('viewMode') || '';
	let isAutoservice: boolean = isSavedUser && viewMode == 'autoservice';
	let isAutoserviceError: boolean = false;
	let autoserviceMessageError: string = '';
	let autoLoginTimer: NodeJS.Timeout;

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
			// isLoginUserLoading = false;
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

<div class="machine">
	{#if isAutoservice}
		<div class="modal-body">
			{#if isAutoserviceError}
				<div class="login__autoservice error">
					<p>{autoserviceMessageError}</p>
					<button class="btn" onclick={reloadPage}>Actualizar</button>
				</div>
			{:else}
				<div class="login__autoservice">
					<div class="loading">
						<svg fill="hsl(228, 97%, 42%)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
							><rect x="1" y="1" width="7.33" height="7.33"
								><animate
									id="spinner_oJFS"
									begin="0;spinner_5T1J.end+0.2s"
									attributeName="x"
									dur="0.6s"
									values="1;4;1"
								/><animate
									begin="0;spinner_5T1J.end+0.2s"
									attributeName="y"
									dur="0.6s"
									values="1;4;1"
								/><animate
									begin="0;spinner_5T1J.end+0.2s"
									attributeName="width"
									dur="0.6s"
									values="7.33;1.33;7.33"
								/><animate
									begin="0;spinner_5T1J.end+0.2s"
									attributeName="height"
									dur="0.6s"
									values="7.33;1.33;7.33"
								/></rect
							><rect x="8.33" y="1" width="7.33" height="7.33"
								><animate
									begin="spinner_oJFS.begin+0.1s"
									attributeName="x"
									dur="0.6s"
									values="8.33;11.33;8.33"
								/><animate
									begin="spinner_oJFS.begin+0.1s"
									attributeName="y"
									dur="0.6s"
									values="1;4;1"
								/><animate
									begin="spinner_oJFS.begin+0.1s"
									attributeName="width"
									dur="0.6s"
									values="7.33;1.33;7.33"
								/><animate
									begin="spinner_oJFS.begin+0.1s"
									attributeName="height"
									dur="0.6s"
									values="7.33;1.33;7.33"
								/></rect
							><rect x="1" y="8.33" width="7.33" height="7.33"
								><animate
									begin="spinner_oJFS.begin+0.1s"
									attributeName="x"
									dur="0.6s"
									values="1;4;1"
								/><animate
									begin="spinner_oJFS.begin+0.1s"
									attributeName="y"
									dur="0.6s"
									values="8.33;11.33;8.33"
								/><animate
									begin="spinner_oJFS.begin+0.1s"
									attributeName="width"
									dur="0.6s"
									values="7.33;1.33;7.33"
								/><animate
									begin="spinner_oJFS.begin+0.1s"
									attributeName="height"
									dur="0.6s"
									values="7.33;1.33;7.33"
								/></rect
							><rect x="15.66" y="1" width="7.33" height="7.33"
								><animate
									begin="spinner_oJFS.begin+0.2s"
									attributeName="x"
									dur="0.6s"
									values="15.66;18.66;15.66"
								/><animate
									begin="spinner_oJFS.begin+0.2s"
									attributeName="y"
									dur="0.6s"
									values="1;4;1"
								/><animate
									begin="spinner_oJFS.begin+0.2s"
									attributeName="width"
									dur="0.6s"
									values="7.33;1.33;7.33"
								/><animate
									begin="spinner_oJFS.begin+0.2s"
									attributeName="height"
									dur="0.6s"
									values="7.33;1.33;7.33"
								/></rect
							><rect x="8.33" y="8.33" width="7.33" height="7.33"
								><animate
									begin="spinner_oJFS.begin+0.2s"
									attributeName="x"
									dur="0.6s"
									values="8.33;11.33;8.33"
								/><animate
									begin="spinner_oJFS.begin+0.2s"
									attributeName="y"
									dur="0.6s"
									values="8.33;11.33;8.33"
								/><animate
									begin="spinner_oJFS.begin+0.2s"
									attributeName="width"
									dur="0.6s"
									values="7.33;1.33;7.33"
								/><animate
									begin="spinner_oJFS.begin+0.2s"
									attributeName="height"
									dur="0.6s"
									values="7.33;1.33;7.33"
								/></rect
							><rect x="1" y="15.66" width="7.33" height="7.33"
								><animate
									begin="spinner_oJFS.begin+0.2s"
									attributeName="x"
									dur="0.6s"
									values="1;4;1"
								/><animate
									begin="spinner_oJFS.begin+0.2s"
									attributeName="y"
									dur="0.6s"
									values="15.66;18.66;15.66"
								/><animate
									begin="spinner_oJFS.begin+0.2s"
									attributeName="width"
									dur="0.6s"
									values="7.33;1.33;7.33"
								/><animate
									begin="spinner_oJFS.begin+0.2s"
									attributeName="height"
									dur="0.6s"
									values="7.33;1.33;7.33"
								/></rect
							><rect x="15.66" y="8.33" width="7.33" height="7.33"
								><animate
									begin="spinner_oJFS.begin+0.3s"
									attributeName="x"
									dur="0.6s"
									values="15.66;18.66;15.66"
								/><animate
									begin="spinner_oJFS.begin+0.3s"
									attributeName="y"
									dur="0.6s"
									values="8.33;11.33;8.33"
								/><animate
									begin="spinner_oJFS.begin+0.3s"
									attributeName="width"
									dur="0.6s"
									values="7.33;1.33;7.33"
								/><animate
									begin="spinner_oJFS.begin+0.3s"
									attributeName="height"
									dur="0.6s"
									values="7.33;1.33;7.33"
								/></rect
							><rect x="8.33" y="15.66" width="7.33" height="7.33"
								><animate
									begin="spinner_oJFS.begin+0.3s"
									attributeName="x"
									dur="0.6s"
									values="8.33;11.33;8.33"
								/><animate
									begin="spinner_oJFS.begin+0.3s"
									attributeName="y"
									dur="0.6s"
									values="15.66;18.66;15.66"
								/><animate
									begin="spinner_oJFS.begin+0.3s"
									attributeName="width"
									dur="0.6s"
									values="7.33;1.33;7.33"
								/><animate
									begin="spinner_oJFS.begin+0.3s"
									attributeName="height"
									dur="0.6s"
									values="7.33;1.33;7.33"
								/></rect
							><rect x="15.66" y="15.66" width="7.33" height="7.33"
								><animate
									id="spinner_5T1J"
									begin="spinner_oJFS.begin+0.4s"
									attributeName="x"
									dur="0.6s"
									values="15.66;18.66;15.66"
								/><animate
									begin="spinner_oJFS.begin+0.4s"
									attributeName="y"
									dur="0.6s"
									values="15.66;18.66;15.66"
								/><animate
									begin="spinner_oJFS.begin+0.4s"
									attributeName="width"
									dur="0.6s"
									values="7.33;1.33;7.33"
								/><animate
									begin="spinner_oJFS.begin+0.4s"
									attributeName="height"
									dur="0.6s"
									values="7.33;1.33;7.33"
								/></rect
							></svg
						>
					</div>
					<p>Cargando...</p>
				</div>
			{/if}
		</div>
	{/if}
	<div class="login">
		<div class="login__title">Bienvenido a</div>
		<img
			class="login__logo"
			src="https://assets.apiusoft.com/Dajaratech/logo.png"
			alt="logo-login"
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
        <!-- <svg fill='#000' width='100%' height='100%' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><circle cx='0' cy='12' r='6'><animate id='spinner_jObz' begin='0;spinner_vwSQ.end-0.25s' attributeName='r' dur='0.8s' values='6;1;6'/></circle><circle cx='14' cy='12' r='6'><animate begin='spinner_jObz.end-0.6s' attributeName='r' dur='0.8s' values='6;1;6' /></circle><circle cx='28' cy='12' r='6'><animate id='spinner_vwSQ' begin='spinner_jObz.end-0.45s' attributeName='r' dur='0.8s' values='6;1;6'/></circle></svg> -->
      
			{:else}
				Ingresar
			{/if}
		</button>
	</div>
</div>