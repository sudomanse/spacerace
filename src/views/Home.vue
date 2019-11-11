<template>
    <div class="home">
        <ShipDemo msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
    import ShipDemo from '@/components/ShipDemo.vue';

    export default {
        name: 'home',
        components: {
            ShipDemo
        },
    };
</script>
