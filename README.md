# ARDSU MENU API
The API allows you to fetch the ****ARDSU CANTEEN**** from the [online PDF](https://www.dsu.toscana.it/i-menu). 
The API retrieves the menu and returns it in a structured JSON format, making it easy to integrate into your own applications.

## Installation
To install locally run:
```console
npm install
```

## Usage
The API has 5 enpoints, perform a GET request to one of these URL in order to get the JSON response:
- / (returns the menu of the current week)
- /lunch (returns the lunch menu of the current week)
- /dinner ( returns the dinner menu of the current week )
- /today/lunch (returns the lunch menu for the current day)
- /today/dinner (returns the dinner menu for the current day)
