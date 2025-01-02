<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Login from './Login.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Example/Login',
    component: Login,
    parameters: {
      layout: 'fullscreen',
      args: {
        userSaved: '',
        viewmode: 'default',
      },
    },
  });

</script>


<Story name="Login Default" args={{ userSaved: '', viewmode: '' }}/>
<Story name="Login autoservice" args={{ userSaved: '{"user":"TESTPRUEBA6", "pass":"123456"}', viewmode: 'autoservice' }}/>
<Story name="Login autoservice error" args={{ userSaved: '{"user":"TESTPRUEBA6xd", "pass":"123456"}', viewmode: 'autoservice' }}/>