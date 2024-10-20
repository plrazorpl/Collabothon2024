<template>
    <div class="fixed bottom-0 left-0 z-40 w-full bg-gray-100 bg-opacity-50 shadow-md">
        <hr />

        <div class="px-8">
            <div class="flex items-center justify-between col-span-2 px-4 py-1">
                <p class="font-bold">{{ $root.loggedUser.role.name }}</p>
                <button @click="toggleCollapse" class="px-2 py-1 text-xs font-bold text-white bg-gray-500 rounded hover:bg-gray-700">
                    {{ isCollapsed ? 'Up' : 'Down' }}
                </button>
            </div>

            <div v-if="!isCollapsed">
                <div class="grid w-1/2 grid-cols-5 gap-4 mb-4">
                    <button
                        v-on:click="switchToCEO"
                        class="px-4 py-2 text-xs font-bold text-white rounded"
                        :class="{
                            'bg-blue-700 hover:bg-blue-700': $root.loggedUser.role.name === 'CEO',
                            'bg-gray-500 hover:bg-gray-700': $root.loggedUser.role.name !== 'CEO',
                        }"
                    >
                        CEO
                    </button>

                    <button
                        v-on:click="switchToController"
                        class="px-4 py-2 text-xs font-bold text-white"
                        :class="{
                            'bg-blue-700 hover:bg-blue-700': $root.loggedUser.role.name === 'Controller',
                            'bg-gray-500 hover:bg-gray-700': $root.loggedUser.role.name !== 'Controller',
                        }"
                    >
                        Controller
                    </button>

                    <button
                        v-on:click="switchToCashManagementSpecialist"
                        class="px-4 py-2 text-xs font-bold text-white"
                        :class="{
                            'bg-blue-700 hover:bg-blue-700': $root.loggedUser.role.name === 'Cash management specialist',
                            'bg-gray-500 hover:bg-gray-700': $root.loggedUser.role.name !== 'Cash management specialist',
                        }"
                    >
                        Cash Management Specialist
                    </button>

                    <button
                        v-on:click="switchToAccountant"
                        class="px-4 py-2 text-xs font-bold text-white"
                        :class="{
                            'bg-blue-700 hover:bg-blue-700': $root.loggedUser.role.name === 'Accountant',
                            'bg-gray-500 hover:bg-gray-700': $root.loggedUser.role.name !== 'Accountant',
                        }"
                    >
                        Accountant
                    </button>

                    <button
                        v-on:click="switchToCommerzbankAdmin"
                        class="px-4 py-2 text-xs font-bold text-white"
                        :class="{
                            'bg-blue-700 hover:bg-blue-700': $root.loggedUser.role.name === 'Commerzbank admin',
                            'bg-gray-500 hover:bg-gray-700': $root.loggedUser.role.name !== 'Commerzbank admin',
                        }"
                    >
                        Commerzbank Admin
                    </button>
                </div>

                <div class="flex px-4 pb-4 space-x-4">
                    <RouterLink v-if="$route.path != '/'"
                        class="px-4 py-2 text-xs font-bold text-white bg-gray-500 hover:bg-gray-700"
                        to="/"
                    >
                        Show extra widget
                    </RouterLink>

                    <RouterLink v-if="$route.path != '/widget'"
                        class="px-4 py-2 text-xs font-bold text-white bg-gray-500 hover:bg-gray-700"
                        to="/widget"
                    >
                        Show minified widget
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
    components: {
        RouterLink,
    },
    data() {
        return {
            isCollapsed: false,
        };
    },
    methods: {
        toggleCollapse() {
            this.isCollapsed = !this.isCollapsed;
        },
        switchToCEO() {
            let token = "2rqkCplZPDNNibrXTAyA576IeOLu18ASBiuer0oqmXuCruwJ5WAaF2KvAa9pCRh2";
            window.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            localStorage.setItem("bearer_token", token);
            window.location.reload();
        },
        switchToController() {
            let token = "koP7tEvVel3gfG0gWOjG3bTgrzo1ubzbfsD5vKll2mjVM263aEGPHhIZSIMWNdy1";
            window.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            localStorage.setItem("bearer_token", token);
            window.location.reload();
        },
        switchToCashManagementSpecialist() {
            let token = "Yk7lYm6LaZwpeDW4yJucFVJ5UaqfWbL9Hc9t5SjmgmZXs03HWZQnaBFErTANrFgm";
            window.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            localStorage.setItem("bearer_token", token);
            window.location.reload();
        },
        switchToAccountant() {
            let token = "BB4I3gN8OJZPFfVt4fWuYUYxhvnB0jS6feg0KQCx0u33EIl6aCgbx7qZ1VJOxsm0";
            window.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            localStorage.setItem("bearer_token", token);
            window.location.reload();
        },
        switchToCommerzbankAdmin() {
            let token = "s0G3UTt79wsL4wgIHHBea7ptulrXpCvxIOYRXBdM5rOIbIdasOhAaKRWSJQG1XrU";
            window.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            localStorage.setItem("bearer_token", token);
            window.location.reload();
        },
    },
}
</script>

<style scoped>
.fixed {
    position: fixed;
}
.bottom-0 {
    bottom: 0;
}
.left-0 {
    left: 0;
}
.w-full {
    width: 100%;
}
.bg-white {
    background-color: white;
}
.shadow-md {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>