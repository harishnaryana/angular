{
    "externalId": "00984354",
    "firstName": "Jonas",
    "lastName": "Brooke",
    "phoneNumber": "4027161000",
    "timeZone": "America/Chicago",
    "dateOfBirth": "1985-10-15",
    "ssnLastFour": "6521",
    "address": "1000 Milky Way, Omaha Ne, 68154",
    "preferredLanguage": "English",
    "emailAddress" : "jbrooke@example.com",
    "coordinators " : [ { "phoneNumber": "800-555-1212" , "contactOrder" : "1"},
                        { "phoneNumber": "800-555-9999" , "contactOrder" : "2"}
    ],
    "pathways":
    [
        {
            "name": "chronic disease managament",
            "startOn": "2015-09-20",
            "endOn": "2015-09-28"
        },
        {
            "name": "routine care",
            "startOn": "2015-09-10",
            "endOn": "2015-10-10"
        }
    ],
    "events":
    [
        {
            "pathway": "chronic disease managament",
            "name": "BP Journal",
            "startOn": "2015-09-21T15:00:00-05:00",
            "status": "Complete",
            "parameters":
            [
              {
                  "name": "systolicMin",
                  "value": "40"
              },
              {
                  "name": "systolicMax",
                  "value": "200"
              },
              {
                  "name": "diastolicMin",
                  "value": "50"
              },
              {
                  "name": "diastolicMax",
                  "value": "180"
              }
            ]
        },
      {
          "pathway": "chronic disease managament",
          "name": "BP Journal",
          "startOn": "2015-09-25T15:00:00-05:00",
          "status": "Error",
          "parameters":
          [
            {
                "name": "systolicMin",
                "value": "40"
            },
            {
                "name": "systolicMax",
                "value": "200"
            },
            {
                "name": "diastolicMin",
                "value": "50"
            },
            {
                "name": "diastolicMax",
                "value": "180"
            }
          ]
      },
      {
          "pathway": "chronic disease managament",
          "name": "BP Journal",
          "startOn": "2015-09-28T15:00:00-05:00",
          "status": "Pending",
          "parameters":
          [
            {
                "name": "systolicMin",
                "value": "40"
            },
            {
                "name": "systolicMax",
                "value": "200"
            },
            {
                "name": "diastolicMin",
                "value": "50"
            },
            {
                "name": "diastolicMax",
                "value": "180"
            }
          ]
      }
    ]
}