# ARDSU MENU API
The API allows you to fetch the ****ARDSU CANTEEN**** from the [online PDF](https://www.dsu.toscana.it/i-menu). 
The API retrieves the menu and returns it in a structured JSON format, making it easy to integrate into your own applications.

## Installation
To install locally run:
```console
npm install
```
No external package required

## Usage
The API has 5 enpoints, perform a GET request to one of these URL in order to get the JSON response:
- / (returns the menu of the current week)
- /lunch (returns the lunch menu of the current week)
- /dinner ( returns the dinner menu of the current week )
- /today/lunch (returns the lunch menu for the current day)
- /today/dinner (returns the dinner menu for the current day)

## Google calendar
Copy paste the script [/Google/calendar-script.js](/Google/calendar-script.js) in a new project on [Google Apps Script](https://script.google.com)
In order to make it working modify the following parameters:
1. Set the Calendar ID of your Google calendar
   ```javascript
   const CALENDAR_ID = "GOOGLE_CALENDAR_ID";
   ```
   The id should have this format: ```ALPHA_NUMERIC_ID@group.calendar.google.com```

2. Set the days and meals you want to display on the calendar
   ```javascript
   const requiredDays = [ [DAY_INDEX, OPTION], [DAY_INDEX, OPTION] ];
   ```
   ### DAY INDEX
   Select the required day by specifying the day index
   | index | day |
   |--------|------- |
   | 0     | Sunday |
   | 1     | Monday |
   | 2     | Tuesday |
   | 3     | Wednesday |
   | 4     | Thursday |
   | 5     | Friday |
   | 6     | Saturday |
   
   ### OPTION
   Specify the required meal for the selected day using the keys ```lunch``` or ```dinner``` (*you can use both*)
