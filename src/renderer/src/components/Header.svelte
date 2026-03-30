<script lang=ts>
    let {children}: {children: any} = $props()
</script>

<section class="header-external -mt-4 -mx-4">
<div class="header-internal w-full h-full p-16 min-h-36">

    {@render children()}
</div>
</section>