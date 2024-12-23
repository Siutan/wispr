<script lang="ts">
    import "../app.postcss";
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
</script>



<div class="flex justify-center items-center w-screen h-screen dashed-grid-paper bg-base-200 ">
    {@render children?.()}
</div>

<style>
    .dashed-grid-paper {

        --grid-size: 60px;
        --dot-size: 1px;
        --dot-color: #9f7fd5;

        background-size: var(--grid-size) var(--grid-size);
        background-image:
          radial-gradient(circle, var(--dot-color) var(--dot-size), transparent var(--dot-size));
        background-repeat: repeat;
    }
</style>