const BASE_API_URL = "BASE_API_URL" //CHANGE WITH YOUR API URL
let meal = new Date().getHours() < 15 ? "lunch" : "dinner";
let data = new Request(BASE_API_URL + "/today/" + meal)
data = await data.loadJSON()

//create event description
let description = "Primi piatti:\n";
data.first_course.forEach(dish => description += dish + " - ")
description = description.slice(0,-3);
description += "\n\nSecondi piatti:\n"

data.second_course.forEach(dish => description += dish + " - ")
description = description.slice(0,-3);
description += "\n\nContorni:\n"

data.side_dish.forEach(dish => description += dish + " - ")
description = description.slice(0,-3);

let banner = new Notification();
banner.title = "MENU ARDSU";
banner.body = description;
banner.schedule()