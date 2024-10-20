<script>

const toIsoFormat = (dateLikeString) => {
  const dateObj = new Date(dateLikeString);

  return dateObj.getFullYear() + '-' +
      String(dateObj.getMonth() + 1).padStart(2, '0') + '-' +
      String(dateObj.getDate()).padStart(2, '0') + ' ' +
      String(dateObj.getHours()).padStart(2, '0') + ':' +
      String(dateObj.getMinutes()).padStart(2, '0') + ':' +
      String(dateObj.getSeconds()).padStart(2, '0');
}

export default {
  name: "NewCalendarEventForm",
  props: {
    action: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updateContent(event) {
      this.location = event.target.value;
    },
    createNewDate(actionUuid) {
      const calendarForm = this.$refs.createNewCalendarEventForm || null;
      if (calendarForm && !calendarForm.checkValidity()) {
        calendarForm.reportValidity();
        return false;
      }

      axios.post(`/calendar-event-create/${actionUuid}`, {
        start_date: toIsoFormat(document.getElementById('calendar_event_start_date').value.replace('T', ' ')) || '',
        end_date: toIsoFormat(document.getElementById('calendar_event_end_date').value.replace('T', ' ')) || '',
        location: this.location || "ONLINE"
      })
          .then((response) => {
            console.debug('[Calendar event] New date created', response);

            this.$emit("reload-urgent-calendar-actions");

            swal({
                title: "New Event Created!",
                text: "The event has been successfully created.",
                icon: "success",
                confirmButtonText: "OK",
                timer: 2000,
                timerProgressBar: true,
            })

          })
          .catch((error) => {
              console.error("Error accepting the event:", error);
          });
    },
    onCheckOnline(event) {
      this.location = event.target.checked ? 'ONLINE' : '';
    }
  },
  data() {
    return {
      location: 'ONLINE',
    };
  }
}
</script>

<template>
  <form ref="createNewCalendarEventForm">
    <div class="mb-2 md:flex md:items-center">
      <div class="md:w-1/3">
        <label class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0">
          Location:
        </label>
      </div>
      <div class="md:w-2/3">
        <div class="flex items-center border border-gray-200 rounded ps-4 dark:border-gray-700">
          <input @change="onCheckOnline($event)" checked id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
          <label for="bordered-checkbox-2" class="w-full py-4 text-sm font-medium text-gray-900 ms-2 dark:text-gray-500">Online</label>
        </div>
        <input @input="updateContent($event)" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mt-2" ref="location" id="calendar_event_location" type="text" placeholder="Enter meeting location" v-if="location !== 'ONLINE'">
      </div>
    </div>
    <div class="flex flex-wrap mb-2 -mx-3">
      <div class="w-full px-3 mb-6 md:w-1/2 md:mb-0">
        <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700">
          From:
        </label>
        <input class="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500" ref="from_date" id="calendar_event_start_date" type="datetime-local" placeholder="From date" required>
      </div>
      <div class="w-full px-3 md:w-1/2">
        <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700">
          To:
        </label>
        <input class="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500" ref="to_date" id="calendar_event_end_date" type="datetime-local" placeholder="To date" required>
      </div>
    </div>
    <button
        @click="createNewDate(action.uuid)"
        class="w-full p-2 mt-4 text-white rounded"
        :style="{ backgroundColor: '#002d64' }"
    >
      Create New Date
    </button>
  </form>
</template>

<style scoped>

</style>