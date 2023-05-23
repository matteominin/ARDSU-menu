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
   [How to find Google calendar id](https://xfanatical.com/blog/how-to-find-your-google-calendar-id/)

2. Set the days and meals you want to display on the calendar
   ```javascript
   const REQUIRED_DAYS = [ [DAY_INDEX, OPTION], [DAY_INDEX, OPTION] ];
   ```
   **DAY_INDEX**
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
   
   **OPTION**
   Specify the required meal for the selected day using the keys `lunch` or `dinner` (*you can use both*)
   
```const REQUIRED_DAYS = [ [0, "lunch"], [3, "lunch", "dinner"], [4, "dinner"] ]```

This `REQUIRED_DAYS` settings will display only lunch on Sunday, Wednesday and dinner on Wednesday, Thursday 

3. Change the `BASE_API_URL` with your api url

4. Set in Apps Script an [activator](https://developers.google.com/apps-script/guides/triggers/installable?hl=it#time-driven_triggers) that runs the script every Monday Morning (To be fixed the issues that comes when the canteen doesn't upload the menu on time :skull:)

