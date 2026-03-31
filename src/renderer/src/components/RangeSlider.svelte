<script lang="ts">

type Props = {
    min: number,
    max: number,
    value?: number
}

    let {min, max, value = $bindable()}: Props = $props()



    let percentage = $derived((value - min) / (max - min)  * 100)

</script>


<div class="mt-14 mb-2 relative px-4 group w-full">
<div class="w-1 rounded-full bg-primary absolute h-8 -top-3"></div>
<div class="w-1 rounded-full bg-primary absolute h-8 -top-3 right-4"></div>
<p class="absolute left-1 -top-10 text-primary font-bold">{min}</p>
<p class="absolute right-0 -top-10 text-primary font-bold">{max}</p>
    <div class="w-full bg-layer1 h-2 rounded-full  group-hover:bg-layer2 -mb-8">
    <div class="h-full items-center flex flex-row">

        <div style={`width: ${percentage}%`} class="h-2 bg-layer1 group-hover:bg-layer2 rounded-full"></div>
        <div class="w-10 h-10 -mx-5 flex gap-4 flex-col items-center place-content-center relative">
            <!-- <div class="w-4 h-2 bg-primary corner-bevel rounded-b-full rounded-sm scale-y-200"></div>
            <div class="w-4 h-2 bg-primary corner-bevel rounded-t-full rounded-sm scale-y-200"></div> -->
            <div class="w-2 h-8 bg-primary rounded-full"></div>

            <p class="absolute top-10 text-primary font-bold">{value}</p>
        </div>
    </div>
    </div>
    <input type="range" min={min} max={max} bind:value={value} class="w-full h-14 z-10 opacity-0">
    <!-- <p class="mt-10">{percentage}%</p> -->
</div>