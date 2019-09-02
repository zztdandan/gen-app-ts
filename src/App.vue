<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    name: 'App',
    components: {},
})
export default class extends Vue {}
</script>
<style>
#app {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
