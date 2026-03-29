<script lang=ts>
    let {children}: {children: any} = $props()
</script>

<section class="header-external -mx-4 -mt-4">
<div class="header-internal w-full h-full p-8 min-h-36">

    {@render children()}
</div>
</section>