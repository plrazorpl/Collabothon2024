<template>
    <div class="popover">
        <div class="popover-content">
            <h3 class="text-lg font-bold">{{ action.title }}</h3>
            <p>Tags: {{ action.tags.join(", ") }}</p>
            <h4 class="mt-4">Event Details:</h4>
            <ul>
                <li v-for="event in action.events" :key="event.id">
                    <strong>{{ event.title }}</strong
                    >: {{ event.start }} - {{ event.end }}
                </li>
            </ul>
            <button @click="$emit('close')" class="mt-4 btn btn-secondary">Close</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        action: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style scoped>
.popover {
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000; /* Make sure it's above other content */
}
</style>
