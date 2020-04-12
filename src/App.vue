<template>
    <article class="container">
        <transition>
            <router-view></router-view>
        </transition>
        <notifications group="foo" />
    </article>
</template>

<script>
export default {
    name: "app"
};
</script>