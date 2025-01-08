<script>
  import { goto } from "$app/navigation";

</script>

<div class="flex flex-col h-screen items-center justify-center bg-gray-900">
    <div class="flex flex-col items-center justify-center rounded-md w-40 text-bold text-lg text-neutral-900 bg-neutral-900">
        <button on:click={() => {
            goto("/signup");
        }} class="rounded-md p-1 m-2 w-20 bg-blue-600">Signup</button>
        <button on:click={() => {
            goto("/login");
        }} class="rounded-md p-1 m-2 w-20 bg-gray-700">Login</button>
    </div>
</div>
