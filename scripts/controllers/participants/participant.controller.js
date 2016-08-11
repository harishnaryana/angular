
    'use strict';
    
engagementCenterApp.controller("ParticipantController",['$location', '$http', '$modal', 'uiCalendarConfig', 'participantService',                function($location, $http, $modal, uiCalendarConfig, participantService) {
        /* jshint validthis:true */
        var vm = this;

        var GET_PARTICIPANT_URL = "/mock/participant.js";

        activate();

        function activate() { }

        vm.participant = {};
        vm.events = [];
        vm.calendarEvents = [];
        vm.eventsForSelectedDate = [];
        vm.selectedDate = new Date();
        vm.displayDetails = true;

        vm.dayClick = function (date, jsEvent, view) {
            /* date is a moment.js object, need to format it otherwise javascript will convert it to the local timezone. */
            vm.selectedDate = new Date(date.format('YYYY-MM-DD HH:mm:ss'));
            vm.selectedDate.setHours(0, 0, 0, 0);
            vm.eventsForSelectedDate = [];
            
            vm.eventsForSelectedDate = getEventsForDate(vm.selectedDate, vm.events);
        }

        vm.eventClick = function (calEvent, jsEvent, view) {
            vm.selectedDate = new Date(calEvent.start.format('YYYY-MM-DD HH:mm:ssZ'))
            vm.selectedDate.setHours(0, 0, 0, 0);
            vm.eventsForSelectedDate = [];

            vm.eventsForSelectedDate = getEventsForDate(vm.selectedDate, vm.events);

            var selectedEvent = {};
            selectedEvent.start = new Date(calEvent.start.format('YYYY-MM-DD HH:mm:ssZ'));
            selectedEvent.title = calEvent.title;
            selectedEvent.parameters = calEvent.parameters;

            vm.displayEvent('Edit', calEvent.title, selectedEvent);
        }

        vm.toggleShowDetails = function () {
            vm.displayDetails = !vm.displayDetails;
        }
        
        vm.calendarConfig = {
            calendar: {
                height: 400,
                editable: true,
                timezone: 'America/Chicago',
                dayClick: vm.dayClick,
                eventClick: vm.eventClick,
                droppable: true,
                drop: function (date, all_day) {
                    calendarEventDropped(date, all_day, this);
                }
            }
        };
        participantService.setBaseUrl(GET_PARTICIPANT_URL);
        participantService.getParticipantById(1)
        .then(function (response) {
            console.log('succcess', response);
            vm.participant = response.data;

            angular.forEach(vm.participant.events, getCalendarEvents);

            vm.eventsForSelectedDate = getEventsForDate(vm.selectedDate, vm.events);
               
        },
        function (response) {
            console.log('fail', response)
        }
      );

        vm.calendarEvents = [vm.events];

        function getCalendarEvents(value, key) {
            var event = {
                title: value.name,
                start: value.startOn,
                stick: true,
                parameters: value.parameters
            };

            //event.color = (value.status == "Error" ? "red" : value.status == "Complete" ? "green" : "blue");
            vm.events.push(event);
        };

        /* Handle an external event that has been dropped on the calendar */
        function external_event_dropped(date, all_day, external_event) {

            //Create vars
            var event_object;
            var copied_event_object;
            var duration = 60;
            var cost;

            //Retrive dropped elemetns stored event object
            event_object = $(external_event).data('eventObject');

            //Copy so that multiple events don't reference same object
            copied_event_object = $.extend({}, event_object);

            //Assign reported start and end dates
            copied_event_object.start = date;
            copied_event_object.end = new Date(date.getTime() + duration * 60000);
            copied_event_object.allDay = all_day;

            //Render event on calendar
            uiCalendarConfig.calendars.participantCalendar('renderEvent', copied_event_object, true);
        };

    
    
    
    
        vm.displayEvent = function(viewEventMode, eventType, eventData) {
            
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: "ec/app/events/bp-journal.html",
                controller: "BPJournalController as vm",
                resolve: {
                    eventData: function () {
                        return eventData;
                    },
                    viewMode: function () {
                        return viewEventMode;
                    },
                    eventType: function () {
                        return eventType;
                    }
                }
            });

            modalInstance.result.then(function (eventData) {
                if (eventData.viewMode === 'Add') {
                    vm.events.push({
                        title: "BP Journal",
                        start: eventData.start,
                        stick: true
                    });
                }          

            }, function () {
                console.log('Modal dismissed.');
            });
        }

        function getEventsForDate(date, events) {
            var eventsForDate = [];
            var forDate = new Date(date);
            forDate.setHours(0, 0, 0, 0);
            for (var eventIndex = 0; eventIndex < events.length; eventIndex++) {
                var startDate = new Date(events[eventIndex].start);
                startDate.setHours(0, 0, 0, 0);

                if (startDate.getTime() === forDate.getTime()) {
                    eventsForDate.push(events[eventIndex]);
                }
            }

           
            return eventsForDate;
        }
    }
    /* # ParticipantController */


]);
