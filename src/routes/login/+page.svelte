<script lang="ts">
  import { goto } from "$app/navigation";
  import { login as userLogin } from "$lib/apiFunctions/userFunction.js";
  import Icon from "../../components/+icon.svelte";

  let passwordShow: boolean = false;

  async function login() {
    let usernameInput = (document.getElementById("username") as HTMLInputElement)?.value;
    let passwordInput = (document.getElementById("password") as HTMLInputElement)?.value;

    const x = await userLogin(usernameInput, passwordInput);
    console.log(x)
  }

  async function passHideShow() {
    let passwordElement = document.getElementById("password") as HTMLInputElement;
    if (passwordShow) {
        passwordElement.type = "password";
        passwordShow = false;
    } else {
        passwordElement.type = "text";
        passwordShow = true;
    }
  }
</script>

<div class="flex flex-col h-screen bg-zinc-900 items-center justify-center">
    <div class="flex flex-col text-white gap-2 p-3 border rounded-lg">
        <h3 class="text-center text-2xl font-bold">Login</h3>
        <div class="bg-neutral-800 rounded-full flex">
            <input id="username" class="p-2 bg-neutral-800 rounded-full outline-none" type="text" placeholder="Username">
            <span class="flex items-center mr-2">
                <Icon icon="user" size="25" color="gray" />
            </span>
        </div>
        <div class="bg-neutral-800 rounded-full flex">
            <input id="password" class="p-2 bg-neutral-800 rounded-full outline-none" type="password" placeholder="Password">
            <button on:click={passHideShow} class="flex items-center mr-2">
                <Icon icon={ passwordShow ? "eye open": "eye close" } size="22" color="gray" />
            </button>
        </div>
        <span class="text-xs font-thin text-blue-700 text-end mr-2">
            <button on:click={() => {
                goto("/forgotpass");
            }}>Forgot password</button>
        </span>
        <button on:click={login} class="p-1 text-white font-medium bg-blue-800 rounded-full w-full">Login</button>
    </div>
    <span class="text-xs text-blue-700 text-end m-2">
        <button on:click={() => {
            goto("/signup");
        }}>Don't have an account?</button>
    </span>
</div>