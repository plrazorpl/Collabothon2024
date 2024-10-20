<template>
    <div class="p-4 mx-auto max-w-1/4 lg:w-1/4 md:w-2/3 sm:w-full" v-if="loggedUser">
        <!-- Schedule Consultations Section -->
        <div class="mb-6">
            <ScheduleConsultations
                class="w-full"
                @show-schedule-consultations-popover="
                    showScheduleConsultationsPopover('consultation')
                "
            />
        </div>

        <!-- Urgent CalendarActions Section with Filter -->
        <div class="p-6 bg-white border rounded-lg commerzbank-shadow commerzbank-border">
            <!-- Filter Bar -->
            <div class="flex flex-col mb-6 lg:flex-row lg:space-x-4">
                <!-- Status Filter -->
                <div class="w-full mb-4 lg:w-1/2 lg:mb-0">
                    <label for="statusFilter" class="block mb-2 text-sm font-bold text-gray-700">
                        Filter by Status
                    </label>
                    <Multiselect
                        v-model="selectedStatus"
                        :options="statusOptions"
                        placeholder="Select Status"
                        label="name"
                        track-by="name"
                        class="w-full"
                        :close-on-select="true"
                        :clear-on-select="true"
                        :allow-empty="true"
                    />
                </div>

                <!-- Tag Filter -->
                <div class="w-full lg:w-1/2">
                    <label for="tagFilter" class="block mb-2 text-sm font-bold text-gray-700">
                        Filter by Tags
                    </label>
                    <Multiselect
                        v-model="selectedTags"
                        :options="tagOptions"
                        placeholder="Select Tags"
                        label="tag"
                        track-by="uuid"
                        multiple
                        class="w-full"
                        :close-on-select="false"
                        :clear-on-select="false"
                        hide-selected
                        :allow-empty="true"
                        tag-placeholder="Add this as a tag"
                    />
                </div>
            </div>

            <!-- Urgent CalendarActions List -->
            <div class="overflow-y-auto max-h-64">
                <h2 class="mb-4 text-lg font-bold text-gray-900">Urgent Actions</h2>
                <template v-if="filteredUrgentCalendarActions.length === 0">
                    <p class="text-gray-500">No urgent actions available.</p>
                </template>
                <CalendarActionList
                    v-for="todo in filteredUrgentCalendarActions"
                    :key="todo.uuid"
                    @calendar-action-click="handleCalendarActionClick"
                    :action="todo"
                />
            </div>
        </div>

        <!-- CEO or Admin Section -->
        <div
            v-if="
                loggedUser.role.name == 'CEO' ||
                loggedUser.role.name == 'Controller' ||
                loggedUser.role.name == 'Commerzbank admin'
            "
        >
            <div class="rounded-lg">
                <CalendarActionIdeaCarousel @onCreate="showScheduleConsultationsPopover" />
            </div>
        </div>

                <!-- Popover for displaying SchedulingConsultation -->
                <Transition name="fade-popover">
            <ScheduleConsultationsPopover
                v-if="shouldDisplayScheduleConsultationsPopover"
                :template="template"
                :tags="tags"
                @emailSubmitted="loadUrgentCalendarActions"
                @close="closePopover"
            />
        </Transition>

        <!-- Popover for displaying selected CalendarAction -->
        <Transition name="fade-popover">
            <CalendarActionPopover
                v-if="selectedCalendarAction"
                :action="selectedCalendarAction"
                @eventAccepted="handleEventAccepted"
                @reload-urgent-calendar-actions="loadUrgentCalendarActions"
                @close="closePopover"
            />
        </Transition>
    </div>

    <DebugUtils v-if="loggedUser" />
</template>

<script>
import ScheduleConsultations from "../components/ScheduleConsultations.vue";
import CalendarActionList from "../components/CalendarActionListComponent.vue";
import CalendarActionPopover from "../components/popovers/CalendarActionPopover.vue";
import ScheduleConsultationsPopover from "../components/popovers/ScheduleConsultationsPopover.vue";
import CalendarActionIdeaCarousel from "../components/CalendarActionIdeaCarousel.vue";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import DebugUtils from "../components/DebugUtils.vue";

export default {
    components: {
        ScheduleConsultations,
        CalendarActionList,
        CalendarActionPopover,
        ScheduleConsultationsPopover,
        CalendarActionIdeaCarousel,
        Multiselect,
        DebugUtils,
    },
    data() {
        return {
            selectedStatus: null,
            selectedTags: [],
            statusOptions: [
                { name: "CREATED" },
                { name: "AWAITING" },
                { name: "COMPLETED" },
                { name: "CANCELLED" },
            ],
            tagOptions: [],
            loggedUser: null,
            shouldDisplayScheduleConsultationsPopover: false,

            selectedCalendarAction: null,
            allUrgentCalendarActions: [],
            filteredUrgentCalendarActions: [],
            template: "consultation",
        };
    },

    computed: {
        currentRole() {
            const token = localStorage.getItem("bearer_token");

            return this.roles[token] || "Unknown";
        },
    },

    methods: {
        filterUrgentCalendarActions() {
            let filtered = this.allUrgentCalendarActions;

            if (this.selectedStatus && this.selectedStatus.name) {
                filtered = filtered.filter(
                    (event) => event.status.name === this.selectedStatus.name,
                );
            }

            if (this.selectedTags.length > 0) {
                filtered = filtered.filter((event) =>
                    this.selectedTags.every((selectedTag) =>
                        event.tags.some((tag) => tag.tag === selectedTag.tag),
                    ),
                );
            }

            this.filteredUrgentCalendarActions = filtered;
        },

        loadUrgentCalendarActions() {
            this.isLoadingUrgentCalendarActions = true;

            axios
                .get("/calendar-actions", {})
                .then((response) => {
                    this.allUrgentCalendarActions = response.data.data;

                    this.filterUrgentCalendarActions();
                })
                .catch((error) => {
                    console.error("Error loading proposed actions:", error);
                })
                .finally(() => {
                    this.isLoadingUrgentCalendarActions = false;
                });
        },

        loadAvailableTags() {
            axios
                .get("/calendar-action-tags", {})
                .then((response) => {
                    this.tagOptions = response.data.data;
                })
                .catch((error) => {
                    console.error("Error loading CalendarAction Tags:", error);
                });
        },

        handleCalendarActionClick(calendarActionUuid) {
            const calendarAction = this.allUrgentCalendarActions.find(
                (todo) => todo.uuid === calendarActionUuid,
            );

            if (calendarAction) {
                this.selectedCalendarAction = calendarAction;
            } else {
                const proposed = this.proposedActions.find(
                    (todo) => todo.uuid === calendarActionUuid,
                );

                this.showScheduleConsultationsPopover(proposed.title, proposed.tags);
            }
        },

        closePopover() {
            this.selectedCalendarAction = null;
            this.shouldDisplayScheduleConsultationsPopover = false;
        },

        showScheduleConsultationsPopover(template, tags = []) {
            this.template = template.title;
            this.tags = template.tags;

            this.shouldDisplayScheduleConsultationsPopover = true;
        },

        getLoggedUser() {
            axios
                .get("/user", {})
                .then((response) => {
                    this.loggedUser = response.data.data;
                    this.$root.loggedUser = response.data.data;
                })
                .catch((error) => {
                    console.error("Error loading logged user:", error);
                });
        },

        switchToCEO() {
            let token = "2rqkCplZPDNNibrXTAyA576IeOLu18ASBiuer0oqmXuCruwJ5WAaF2KvAa9pCRh2";
            window.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            localStorage.setItem("bearer_token", token);
            window.location.reload();
        },
    },

    watch: {
        selectedStatus: "filterUrgentCalendarActions",
        selectedTags: "filterUrgentCalendarActions",
    },

    mounted() {
        if (localStorage.getItem("bearer_token")) {
            window.axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
                "bearer_token",
            )}`;
        } else {
            let token = "2rqkCplZPDNNibrXTAyA576IeOLu18ASBiuer0oqmXuCruwJ5WAaF2KvAa9pCRh2";
            window.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            localStorage.setItem("bearer_token", token);
        }

        this.getLoggedUser();

        this.loadUrgentCalendarActions();
        this.loadAvailableTags();
    },
};
</script>
