/* MODIFY CALENDAR_ID, BASE_API_URL and set your preferences for lunch or dinner for each day */

const CALENDAR_ID = "CALENDAR_ID";
const REQUIRED_DAYS = [[3, "lunch"], [4, "lunch"], [5, "lunch"]]; // [[day, meal], [day, meal], ...]
const BASE_API_URL = "API_URL"

function main() {
  const meals = getMeals();
  meals.lunch.forEach(meal => createEvent(meal, "lunch"));
  meals.dinner.forEach(meal => createEvent(meal, "dinner"));
}

//fetch api
function getMeals() {
  const lunchRes = UrlFetchApp.fetch(BASE_API_URL + "/lunch");
  const dinnerRes = UrlFetchApp.fetch(BASE_API_URL + "/dinner");
  return {lunch: JSON.parse(lunchRes.getContentText()), dinner: JSON.parse(dinnerRes.getContentText())};
}

function createEvent(meal, typeMeal) {
  const day = new Date(meal.date).getDay();
  let requiredDay = false;

  //display only required days (lunch or dinner)
  REQUIRED_DAYS.forEach(elem => {
    if(elem[0] == day && elem.includes(typeMeal))
      requiredDay = true;
  })
  // TODO: check if the user required lunch or dinner for that day
  if(requiredDay){
    let calendar = CalendarApp.getCalendarById(CALENDAR_ID);

    //set event time
    let startEvent = new Date(meal.date)
    let endEvent = new Date(meal.date)
    if(meal.meal == "lunch"){
      startEvent = startEvent.setHours(13);
      startEvent = new Date(startEvent).setMinutes(15);
      endEvent = endEvent.setHours(14);
    } else {
      startEvent = startEvent.setHours(19);
      startEvent = new Date(startEvent).setMinutes(15);
      endEvent = endEvent.setHours(20);
    }

    //create event description
    let description = "Primi piatti:\n";
    meal.first_course.forEach(dish => description += dish + " - ")
    description = description.slice(0,-3);
    description += "\n\nSecondi piatti:\n"

    meal.second_course.forEach(dish => description += dish + " - ")
    description = description.slice(0,-3);
    description += "\n\nContorni:\n"

    meal.side_dish.forEach(dish => description += dish + " - ")
    description = description.slice(0,-3);

    //push event
    let event = calendar.createEvent("MENU ARDSU", new Date(startEvent), new Date(endEvent), {description: description});
  }
}