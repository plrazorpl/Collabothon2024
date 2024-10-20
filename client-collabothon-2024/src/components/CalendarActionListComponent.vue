<template>
    <div @click="handleEventClick" class="p-4 cursor-pointer hover:bg-gray-200">
        <div class="flex items-center justify-between">
            <h4 class="text-lg font-semibold">{{ action.title }}</h4>

            <div v-if="action.status">
                <CalendarActionStatus :action="action" />
            </div>
        </div>
        <p class="mt-1 text-gray-600">{{ action.description }}</p>

        <!-- Tags with icons -->
        <div class="flex flex-wrap mt-2">
            <span
                v-for="tag in action.tags"
                :key="tag.uuid"
                class="flex items-center text-xs px-2 py-1 mr-1 text-white rounded-full"
                :style="{ backgroundColor: '#002d64' }"
            >
                <i class="mr-1 fas fa-tag"></i>
                {{ tag.tag }}
            </span>
        </div>

        <div class="flex items-center mt-2 text-sm text-gray-500">
            <span>View Details</span>
            <i class="ml-2 fas fa-chevron-right"></i>
        </div>
    </div>
</template>

<script>
import CalendarActionStatus from "./CalendarActionStatus.vue";

export default {
    components: {
        CalendarActionStatus,
    },
    props: {
        action: {
            type: Object,
            required: true,
        },
    },
    methods: {
        handleEventClick() {
            // Emit the action's ID when the action is clicked
            this.$emit("calendar-action-click", this.action.uuid);
        },
    },
};
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
