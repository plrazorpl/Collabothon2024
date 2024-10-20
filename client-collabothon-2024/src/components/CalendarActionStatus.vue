<template>
    <div>
        <i
            v-if="action.status.name === 'CREATED'"
            class="text-yellow-500 fas fa-file-alt"
        ></i>

        <i
            v-if="action.status.name === 'AWAITING'"
            class="text-blue-500 fas fa-hourglass-half"
        ></i>

        <i
            v-if="action.status.name === 'COMPLETED'"
            class="text-green-500 fas fa-check-circle"
        ></i>

        <i
            v-if="action.status.name === 'CANCELLED'"
            class="text-red-500 fas fa-times-circle"
        ></i>

        <span class="ml-2 text-sm text-gray-500">{{ action.status?.name }}</span>
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
}
</script>