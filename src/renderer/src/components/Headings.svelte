<script lang="ts" module>
	export { Heading1, Heading2  };
</script>

{#snippet Heading1(text: String)}
    <h1 class="text-center text-primary font-bold text-3xl">{text}</h1>
{/snippet}

{#snippet Heading2(text: String)}
    <h2 class="text-center text-primary font-bold text-xl">{text}</h2>
{/snippet}