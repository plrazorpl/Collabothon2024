<template>
    <div
        class="p-6 text-white transition rounded-lg shadow-md button-container"
        :style="{ backgroundColor: '#00534e' }"
    >
        <button
            @click="handleScheduleConsultations"
            class="px-4 py-2 font-semibold transition bg-white rounded-lg shadow-md commerzbank-color hover:bg-yellow-100"
            :style="{color: '#768e96'}"
        >
            <i class="fa-solid fa-paper-plane me-2"></i>
            Schedule Consultation
        </button>
    </div>
</template>

<script>
export default {
    methods: {
        handleScheduleConsultations() {
            console.log("Show consultation scheduling popover form.");
            this.$emit("show-schedule-consultations-popover");
        },
    },
};
</script>

<style scoped>
.button-container {
    display: flex;
    justify-content: flex-end;
}
</style>