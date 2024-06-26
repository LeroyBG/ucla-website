
<!-- Straight-up copy/pasted from my skeleton project-->
<script>
    export let layersLeft;
    export let totalLayers;
    export let marginSize;
    export let defaultColor;
    export let parent; /*   whether this is the outermost border whose logic
                            should control the rest of the rest of the strips.
                            should always be set to true by the user but false
                            inside component implementation */
    export let active; /*   whether the entire component should be active. For
                            example, if there is a button that causes the
                            borders to light up, that event would cause this to
                            be true. */
    export let ticker;
    export let period;
    export let reversed;
    export let colorful;

    // Set up ticker
    let interval = -1;

    // Calculate actual displayed color
    let rainbow = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]
    $: displayedColor = colorful ? rainbow[Math.floor(Math.random() * rainbow.length)] : defaultColor

    // When should we light up?
    // If we're layer 2 (meaning second layer from the outermost, we should light up second)
    // If we're layer 1, we should light up first.
    $: layerNumber = layersLeft + 1
    $: litStrip = (ticker % totalLayers) + 1
    $: litStrips = [
        litStrip,
        (litStrip + 4) % totalLayers,
        (litStrip + 8) % totalLayers,
        (litStrip + 12) % totalLayers,
        // (litStrip + 12) % totalLayers,
    ]
    $: lit = active && (litStrips.find((v) => v === layerNumber))
    

    $: litStyle = `outline: ${colorful ? "1.5" : "1.3"}px solid ${displayedColor}; margin: ${marginSize}; overflow-x: hidden;`
    $: normalStyle = `margin: ${marginSize}; overflow-x: hidden;`
    $: style = lit ? litStyle : normalStyle

    let stripPeriod = ( period / totalLayers ) // Amount of time between strip light-ups
    // console.log(`${period} / ${totalLayers} = ${(period /totalLayers)}`)
    
    // console.log('strip period:', stripPeriod)

    $: if (parent) { // in controlling node
        if (active) { // and the light up thingy should be active
            // console.log('we active, interval:', interval)
            if (interval === -1) { // and there is no set interval
                // console.log('setting that interval')
                interval = setInterval(() => {
                    reversed ? 
                        (ticker == 0) ? (ticker += totalLayers) : ticker --
                        : ticker++
                }, stripPeriod);
            }
        } else { // light up thing shouldn't be active
            if (interval !== -1) { // light up thingy is active
                clearInterval(interval)
                interval = -1
                ticker = 0
            }
        }
    }

</script>

<div style={style}>
{#if layersLeft > 0}
    <svelte:self 
    layersLeft={layersLeft - 1} 
    totalLayers={totalLayers} 
    marginSize={marginSize} 
    defaultColor={defaultColor} 
    parent={false} 
    active={active}
    ticker={ticker} 
    period={period}
    reversed={reversed}
    colorful={colorful}>
        <slot />
    </svelte:self>
{:else}
    <slot />
{/if}
</div>

<style>
</style>
