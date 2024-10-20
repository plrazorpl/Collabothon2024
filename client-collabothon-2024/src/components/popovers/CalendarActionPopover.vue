<template>
    <div
        class="fixed inset-0 z-20 flex items-center justify-center bg-gray-800 bg-opacity-75"
        @click="closePopoverOnOutsideClick"
    >
        <div
            class="relative block lg:flex w-3/4 p-4 bg-white rounded-lg shadow-lg commerzbank-border"
            @click.stop
        >
            <!-- Close button (X) -->
            <button
                @click="closePopover"
                class="absolute text-3xl font-bold text-gray-500 top-2 right-2 hover:text-red-500"
            >
                &times;
            </button>

            <!-- Left side: CalendarAction Info -->
            <div class="w-full lg:w-2/3 p-4 border-r border-gray-300">
                <h3 class="my-2 text-xl font-bold">Title: {{ action?.title }}</h3>
                <span
                    v-for="tag in action.tags"
                    :key="tag"
                    class="px-4 py-1 mx-1 text-white rounded-full"
                    :style="{ backgroundColor: '#002d64' }"
                >
                    {{ tag.tag }}
                </span>

                <CalendarActionStatus class="mt-1" :action="action" />

                <p class="my-2 text-gray-600">Description: {{ action?.description }}</p>

                <div v-if="selectedEvent">
                    <div class="mb-4">
                        <p class="mb-2 text-gray-600">Client Employees:</p>
                        <div class="p-2">
                            <div
                                v-for="(employee, index) in selectedEvent.client_employees"
                                :key="index"
                                class="p-2 mb-2 border border-gray-300 rounded card"
                            >
                                <div class="font-bold">
                                    {{ employee.first_name }} {{ employee.last_name }}
                                </div>
                                <div>{{ employee.email }}</div>
                                <div>{{ employee.phone }}</div>
                                <div>
                                    Status:
                                    <span v-if="employee.accepted === 1">✔ Accepted</span>
                                    <span v-else-if="employee.accepted === 0">✖ Not Accepted</span>
                                    <span v-else>? No Decision Yet</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mb-4">
                        <p class="mb-2 text-gray-600">Bank Employees:</p>
                        <div class="p-2">
                            <div
                                v-for="(employee, index) in selectedEvent.bank_employees"
                                :key="index"
                                class="p-2 mb-2 border border-gray-300 rounded card"
                            >
                                <div class="font-bold">
                                    {{ employee.first_name }} {{ employee.last_name }}
                                </div>
                                <div>{{ employee.email }}</div>
                                <div>{{ employee.phone }}</div>
                                <div>
                                    Status:
                                    <span v-if="employee.accepted === 1">✔ Accepted</span>
                                    <span v-else-if="employee.accepted === 0">✖ Not Accepted</span>
                                    <span v-else>? No Decision Yet</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p class="text-gray-600">Select a date to schedule a meeting</p>
                </div>
            </div>

            <!-- Right side: List of Events -->
            <div class="w-full lg:w-1/3 p-4">
                <h3 class="mb-2 text-lg font-bold">Proposed Date</h3>
                <div class="overflow-x-hidden overflow-y-auto max-h-80">
                    <ul class="pl-5 text-gray-800 list-disc list-inside">
                        <li
                            v-for="event in copiedCalendarEvents.filter(
                                (evt) => !isApproversListIsEmpty(evt),
                            )"
                            :key="event.id"
                            class="flex items-center justify-between p-2 rounded"
                        >
                            <CalendarEvent @eventClicked="eventClicked" :event="event" />

                            <div class="flex space-x-2 text-4xl" v-if="isApprovedByCurrentUser(event)">
                                Approved <i class="fa-solid fa-circle-check"></i>
                            </div>
                            <div
                                class="flex space-x-2 text-4xl"
                                v-else-if="isDeclinedByAll(event)"
                            ></div>
                            <div
                                class="flex space-x-2 text-4xl"
                                v-else-if="isDeclinedByCurrentUser(event)"
                            >
                                Declined <i class="fa-solid fa-circle-check"></i>
                            </div>
                            <div class="flex space-x-2" v-else>
                                <button
                                    @click="acceptEvent(event)"
                                    class="px-2 py-1 text-green-500 transition duration-200 ease-in-out bg-transparent rounded-md hover:bg-green-100 hover:text-yellow-700"
                                >
                                    ✔
                                </button>
                                <button
                                    @click="rejectEvent(event)"
                                    class="px-2 py-1 text-red-500 transition duration-200 ease-in-out bg-transparent rounded-md hover:bg-red-100 hover:text-yellow-700"
                                >
                                    ✖
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
                <hr class="mb-4" />
                <NewCalendarEventForm
                    :action="action"
                    @reload-urgent-calendar-actions="emitNeedToReloadUrgentCalendarAction"
                />
            </div>
        </div>
    </div>
</template>

<script>
import CalendarActionStatus from "../CalendarActionStatus.vue";
import CalendarEvent from "../CalendarEventComponent.vue";
import { all } from "axios";
import NewCalendarEventForm from "../forms/NewCalendarEventForm.vue";

const isApprovedByCurrentUser = (event) => {
    const allApprovals = [...event.bank_employees, ...event.client_employees];

    console.log("approvals", allApprovals);

    return allApprovals.some((person) => person.accepted === 1).length > 1;
};

const isDeclinedByCurrentUser = (event) => {
    const allApprovals = [...event.bank_employees, ...event.client_employees];

    return allApprovals.some((person) => person.accepted === 1).length > 1;
};

const isDeclinedByAll = (event) => {
    const allApprovals = [...event.bank_employees, ...event.client_employees];

    return allApprovals.some((person) => person.accepted === 1).length === allApprovals.length;
};

const isApproversListIsEmpty = (event) => {
    const allApprovals = [...event.bank_employees, ...event.client_employees];

    return allApprovals.length === 0;
};

export default {
    props: {
        action: {
            type: Object,
            required: true,
        },
    },
    components: {
        NewCalendarEventForm,
        CalendarEvent,
        CalendarActionStatus,
    },
    data() {
        return {
            selectedEvent: null,
            copiedCalendarEvents: [],
        };
    },
    methods: {
        acceptEvent(event) {
            axios
                .post(`/calendar-event-accept/${event.uuid}`)
                .then((response) => {
                    console.debug("[Calendar event] Accepted event with id", response);

                    this.emitNeedToReloadUrgentCalendarAction();

                    swal({
                        title: "Event Accepted!",
                        text: "The event has been successfully accepted.",
                        icon: "success",
                        confirmButtonText: "OK",
                        timer: 2000,
                        timerProgressBar: true,
                    }).then(() => {
                        this.closePopover();
                    });
                })
                .catch((error) => {
                    console.error("Error accepting the event:", error);
                });
            console.log(`Accepted meeting date: ${event.date}`, event);
            this.$emit("eventAccepted", event);
        },
        rejectEvent(event) {
            axios
                .post(`/calendar-event-decline/${event.uuid}`)
                .then((response) => {
                    console.debug("[Calendar event] Declined event with id", response);

                    this.emitNeedToReloadUrgentCalendarAction();
                    
                    this.copiedCalendarEvents = this.copiedCalendarEvents.filter((evt) => evt.uuid !== event.uuid);

                    swal({
                        title: "Event declined!",
                        text: "The event has been declined.",
                        icon: "success",
                        confirmButtonText: "OK",
                        timer: 2000,
                        timerProgressBar: true,
                    })
                })
                .catch((error) => {
                    console.error("Error accepting the event:", error);
                });
            console.log(`Rejected meeting date: ${event.date}`);
            this.$emit("eventRejected", event);
        },

        emitNeedToReloadUrgentCalendarAction() {
            this.$emit("reload-urgent-calendar-actions");
        },

        closePopover() {
            this.$emit("close");
        },
        closePopoverOnOutsideClick(event) {
            if (event.target === this.$el) {
                this.closePopover();
            }
        },
        eventClicked(event) {
            this.selectedEvent = event;
        },
        isApprovedByCurrentUser,
        isDeclinedByCurrentUser,
        isDeclinedByAll,
        isApproversListIsEmpty,
    },

    mounted() {
        this.copiedCalendarEvents = this.action.calendar_events;
    }
};
</script>
