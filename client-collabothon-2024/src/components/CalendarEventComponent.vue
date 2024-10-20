<template>
    <div class="py-2 px-4 hover:bg-gray-100 hover:cursor-pointer" @click="handleClick" @mouseover="isHovered = true" @mouseleave="isHovered = false">
        <span class="font-semibold">{{ event.location }}</span>
        <div>
            <span class="text-sm text-gray-600">{{ formattedDate }}</span>
            <span class="text-sm text-gray-600"> - {{ formattedInterval }}</span>
        </div>
        <div v-if="event.accepted" class="text-green-500">Accepted</div>
        <div v-else-if="event.selectionRequired" class="text-yellow-500">Selection Required</div>
    </div>
</template>

<script>
export default {
    props: {
        event: {
            type: Object,
            required: true,
        },
    },
    emits: ["eventClicked"],
    data() {
        return {
            isHovered: false,
        };
    },
    computed: {
        formattedDate() {
            const options = { weekday: 'long' };
            return new Date(this.event.start_date).toDateString(undefined, options);
        },
        formattedInterval() {
            const start = new Date(this.event.start_date);
            const end = new Date(this.event.end_date);
            
            const startTime = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const endTime = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            return `${startTime} - ${endTime}`;
        },
    },
    methods: {
        handleClick() {
            this.$emit("eventClicked", this.event);
        },
    },
};
</script>

<style scoped></style>