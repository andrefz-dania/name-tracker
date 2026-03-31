<script lang="ts">

type Props = {
    min: number,
    max: number,
    value?: number
}

    let {min, max, value = $bindable()}: Props = $props()



    let percentage = $derived((value - min) / (max - min)  * 100)

</script>


<div class="my-4 relative">
    <div class="w-full bg-layer1 h-8 rounded-full border border-primary hover:bg-layer2 px-2 -mb-8">
    <div class="h-full items-center flex flex-row">

        <div style={`width: ${percentage}%`} class="h-2 bg-primary rounded-full"></div>
        <div class="w-6 h-10 -mx-3 rounded-full bg-primary corner-bevel"></div>
    </div>
    </div>
    <input type="range" min={min} max={max} bind:value={value} class="w-full h-8 z-10 opacity-0">
    <p>{percentage}%</p>
</div>