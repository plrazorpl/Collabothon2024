<template>
    <div class="grid grid-cols-12 gap-4 p-8" v-if="loggedUser">
        <!-- Calendar Island in the first section -->
        <div
            class="col-span-12 p-6 bg-white border rounded-lg commerzbank-shadow lg:col-span-7 commerzbank-border"
        >
            <h2 class="mb-4 text-xl font-bold text-black">Calendar</h2>
            <CalendarComponent
                :events="allCalendarEvents"
                @calendar-event-click="handleCalendarEventClick"
                @calendar-view-range-change="handleCalendarViewRangeChange"
            />
        </div>

        <!-- Events Island with CalendarActions stacked in the same column -->
        <div class="flex flex-col col-span-12 space-y-4 lg:col-span-5">
            <!-- Schedule Consultations -->
            <ScheduleConsultations
                @show-schedule-consultations-popover="
                    showScheduleConsultationsPopover('consultation')
                "
            />

            <!-- Urgent CalendarActions Section with Filter -->
            <div
                class="flex-1 p-3 overflow-y-auto bg-white border rounded-lg commerzbank-shadow max-h-96 commerzbank-border"
            >
                <!-- Filter Bar -->
                <div class="flex items-center mb-4 space-x-2">
                    <!-- Status Filter -->
                    <div class="w-1/2">
                        <label for="statusFilter" class="block mb-1 text-sm font-bold text-gray-700"
                            >Filter by Status</label
                        >
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
                        >
                            <!-- Customize scoped slot -->
                            <template #option="{ option }">
                                <div class="flex items-center">
                                    <i
                                        v-if="option.name === 'CREATED'"
                                        class="text-yellow-500 fas fa-file-alt me-2"
                                    ></i>

                                    <i
                                        v-if="option.name === 'AWAITING'"
                                        class="text-blue-500 fas fa-hourglass-half me-2"
                                    ></i>

                                    <i
                                        v-if="option.name === 'COMPLETED'"
                                        class="text-green-500 fas fa-check-circle me-2"
                                    ></i>

                                    <i
                                        v-if="option.name === 'CANCELLED'"
                                        class="text-red-500 fas fa-times-circle me-2"
                                    ></i>
                                    <span>{{ option.name }}</span>
                                </div>
                            </template>

                            <!-- Customize the input -->
                            <template #singleLabel="{ option }">
                                <div class="flex items-center">
                                    <i
                                        v-if="option.name === 'CREATED'"
                                        class="text-yellow-500 fas fa-file-alt me-2"
                                    ></i>

                                    <i
                                        v-if="option.name === 'AWAITING'"
                                        class="text-blue-500 fas fa-hourglass-half me-2"
                                    ></i>

                                    <i
                                        v-if="option.name === 'COMPLETED'"
                                        class="text-green-500 fas fa-check-circle me-2"
                                    ></i>

                                    <i
                                        v-if="option.name === 'CANCELLED'"
                                        class="text-red-500 fas fa-times-circle me-2"
                                    ></i>
                                    <span>{{ option.name }}</span>
                                </div>
                            </template>
                        </Multiselect>
                    </div>

                    <!-- Tag Filter -->
                    <div class="w-1/2">
                        <label for="tagFilter" class="block mb-1 text-sm font-bold text-gray-700"
                            >Filter by Tags</label
                        >
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
                <div class="flex-1 overflow-y-auto">
                    <h2 class="mb-4 text-lg font-bold text-black">Urgent Actions</h2>
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

            <div
                v-if="
                    loggedUser.role.name == 'CEO' ||
                    loggedUser.role.name == 'Controller' ||
                    loggedUser.role.name == 'Commerzbank admin'
                "
            >
                <CalendarActionIdeaCarousel @onCreate="showScheduleConsultationsPopover" />
            </div>
        </div>

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
    </div>

    <DebugUtils v-if="loggedUser" />
</template>

<script>
import CalendarComponent from "../components/CalendarComponent.vue";
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
        CalendarComponent,
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
            todoEvents: [],
            filteredUrgentCalendarActions: [],
            proposedEvents: [],
            allCalendarEvents: [],
            template: "consultation",
            loggedUser: null,

            roles: {
                "2rqkCplZPDNNibrXTAyA576IeOLu18ASBiuer0oqmXuCruwJ5WAaF2KvAa9pCRh2": "CEO",
                koP7tEvVel3gfG0gWOjG3bTgrzo1ubzbfsD5vKll2mjVM263aEGPHhIZSIMWNdy1: "Controller",
                Yk7lYm6LaZwpeDW4yJucFVJ5UaqfWbL9Hc9t5SjmgmZXs03HWZQnaBFErTANrFgm:
                    "Cash Management Specialist",
                BB4I3gN8OJZPFfVt4fWuYUYxhvnB0jS6feg0KQCx0u33EIl6aCgbx7qZ1VJOxsm0: "Accountant",
                s0G3UTt79wsL4wgIHHBea7ptulrXpCvxIOYRXBdM5rOIbIdasOhAaKRWSJQG1XrU:
                    "Commerzbank Admin",
            },
            isLoadingProposedActions: false,
            proposedActions: [],
            selectedEvent: null, // Track the selected event for CalendarAction
            selectedCalendarAction: null,
            calendarEventToCalendarActionMap: {}, // Map to store the relationship between calendar events and actions
            shouldDisplayScheduleConsultationsPopover: false,

            selectedTags: [],
            selectedStatus: null,

            statusOptions: [
                { name: "CREATED" },
                { name: "AWAITING" },
                { name: "COMPLETED" },
                { name: "CANCELLED" },
            ],

            tagOptions: [],

            selectedCalendarViewRangeStart: null,
            selectedCalendarViewRangeEnd: null,
        };
    },

    methods: {
        handleCalendarViewRangeChange(range) {
            if (!range || !range.start || !range.end) return;

            const newRange = { start: range.start, end: range.end };
            const currentRangeString = JSON.stringify(this.selectedCalendarViewRange);
            const newRangeString = JSON.stringify(newRange);

            if (currentRangeString === newRangeString) {
                return; // Do nothing if the range is the same
            }

            this.selectedCalendarViewRangeStart = range.start;
            this.selectedCalendarViewRangeEnd = range.end;

            this.filterUrgentCalendarActions();
        },

        filterUrgentCalendarActions() {
            console.log("Filtering urgent calendar actions...");

            let filtered = this.todoEvents;

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

            // Filter by the selected date range
            if (this.selectedCalendarViewRangeStart && this.selectedCalendarViewRangeEnd) {
                const start = this.selectedCalendarViewRangeStart;
                const end = this.selectedCalendarViewRangeEnd;

                filtered = filtered.filter((calendarAction) => {
                    const calendarEvents = calendarAction.calendar_events || [];

                    const isInRange = calendarEvents.some((event) => {
                        const eventStart = new Date(event.start_date);
                        const eventEnd = new Date(event.end_date);

                        // Check if the CalendarEvent falls within the selected range
                        return (
                            (eventStart >= start && eventStart <= end) ||
                            (eventEnd >= start && eventEnd <= end) ||
                            (eventStart <= start && eventEnd >= end) // The event covers the range
                        );
                    });

                    // Return true if any calendarEvent is in range or if there are no associated calendar_events
                    return isInRange || calendarEvents.length === 0;
                });
            }

            this.filteredUrgentCalendarActions = filtered;
            this.parseFullCalendarEvents();
        },

        parseFullCalendarEvents() {
            const events = [];

            this.filteredUrgentCalendarActions.forEach((calendarAction) => {
                if (calendarAction.calendar_events) {
                    calendarAction.calendar_events.forEach((calendarEvent) => {
                        events.push({
                            id: calendarEvent.uuid,
                            title: calendarAction.title + " - " + calendarEvent?.location,
                            start: calendarEvent.start_date,
                            end: calendarEvent.end_date,
                            extendedProps: {
                                tags: calendarEvent.tags || [],
                                originalEvent: calendarEvent,
                            },
                        });
                    });
                }
            });

            this.allCalendarEvents = events;
        },

        loadProposedActions() {
            this.isLoadingProposedActions = true;

            axios
                .get("/calendar-action-templates", {})
                .then((response) => {
                    this.proposedActions = response.data.data;
                })
                .catch((error) => {
                    console.error("Error loading proposed actions:", error);
                })
                .finally(() => {
                    this.isLoadingProposedActions = false;
                });
        },

        loadUrgentCalendarActions() {
            this.isLoadingUrgentCalendarActions = true;
            console.log("Loading urgent calendar actions...");

            axios
                .get("/calendar-actions", {})
                .then((response) => {
                    this.todoEvents = response.data.data;

                    this.buildCalendarEventToCalendarActionMap();
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

        handleCalendarEventClick(eventUuid) {
            const calendarAction = this.calendarEventToCalendarActionMap[eventUuid];

            if (calendarAction) {
                this.selectedCalendarAction = calendarAction.parentCalendarAction;
            } else {
                console.error("Event not found in the map!");
            }
        },

        handleCalendarActionClick(calendarActionUuid) {
            const calendarAction = this.todoEvents.find((todo) => todo.uuid === calendarActionUuid);

            if (calendarAction) {
                this.selectedCalendarAction = calendarAction;
            } else {
                const proposed = this.proposedActions.find(
                    (todo) => todo.uuid === calendarActionUuid,
                );

                this.showScheduleConsultationsPopover(proposed.title, proposed.tags);
            }
        },

        /**
         * Build a map of event IDs to CalendarAction objects.
         * This allows us to quickly look up the parent action and event type when an event is clicked.
         * The key is the event ID and the value is an object with the parent action and event type.
         * The parent action is the CalendarAction object that the event belongs to.
         */
        buildCalendarEventToCalendarActionMap() {
            this.todoEvents.forEach((todo) => {
                todo.calendar_events.forEach((event) => {
                    this.calendarEventToCalendarActionMap[event.uuid] = {
                        parentCalendarAction: todo,
                    };
                });
            });

            this.parseFullCalendarEvents();
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

        this.loadProposedActions();
        this.loadUrgentCalendarActions();
        this.loadAvailableTags();

        this.buildCalendarEventToCalendarActionMap();
    },
};
</script>

<style>
/* Custom transition for all popovers */
.fade-popover-enter-active,
.fade-popover-leave-active {
    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}
.fade-popover-enter, .fade-popover-leave-to /* .fade-popover-leave-active for <2.1.8 */ {
    opacity: 0;
    transform: translateY(-10px); /* Optional: adds a slight slide-up effect */
}
.fade-popover-leave-active {
    opacity: 0;
    transform: translateY(0);
}
</style>
