
    'use strict';    
    engagementCenterApp.controller("BPJournalController",['$modalInstance', 'eventData', 'viewMode', 'eventType',       
    function ($modalInstance, eventData, viewMode, eventType) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'bp_journal';

        activate();

        function activate() { }

        if (eventData === null) {
            vm.eventData = {};
        } else {
            vm.eventData = eventData;
        }
        
        vm.viewMode = viewMode;
        vm.eventType = eventType;

        vm.ok = function () {

            if (vm.viewMode === 'Add') {
                var startDate = new Date(startOn.value + 'T' + startTime.value + ':00-05:00');
                vm.eventData.start = startDate;
            }
            
            vm.eventData.viewMode = vm.viewMode;
            $modalInstance.close(vm.eventData);
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        vm.times = [];
        for (var hour = 8; hour < 17; hour++) {
            vm.times.push(pad(hour, 2, '0') + ':00');
            vm.times.push(pad(hour, 2, '0') + ':30');
        }

        function pad(stringToPad, width, padChar) {
            padChar = padChar || '0';
            stringToPad = stringToPad + '';

            return stringToPad.length >= width ? stringToPad : new Array(width - stringToPad.length + 1).join(padChar) + stringToPad;
        }

        // Date picker
        vm.today = function () {
            vm.dt = new Date();
        };
 

        vm.clear = function () {
            vm.dt = null;
        };

        vm.toggleMin = function () {
            vm.minDate = vm.minDate ? null : new Date();
        };
        vm.toggleMin();
        vm.maxDate = new Date(2020, 5, 22);

        vm.open = function ($event) {
            vm.status.opened = true;
        };

        vm.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        vm.format = vm.formats[0];

        vm.status = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 2);
        vm.events =
          [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
          ];

        vm.getDayClass = function (date, mode) {
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < vm.events.length; i++) {
                    var currentDay = new Date(vm.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return vm.events[i].status;
                    }
                }
            }

            return '';
        };

        // Internal functions
        if (vm.eventData != null && vm.eventData.start != null) {
            vm.dt = vm.eventData.start;
        } else {
            vm.today();
        }

        vm.getFriendlyParamName = function (param) {
            switch (param) {
                case "systolicMin":
                    return "Systolic Minimum";
                    break;
                case "systolicMax":
                    return "Systolic Maximum";
                    break;
                case "diastolicMin":
                    return "Diastolic Minimum";
                    break;
                case "diastolicMax":
                    return "Diastolic Maximum";
                    break;
                default:
                    return param;
            }
        }
    }
]);
