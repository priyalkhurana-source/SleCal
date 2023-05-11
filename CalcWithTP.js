import * as TimePicker from "./TimePicker.js";

const SLEEP_CYCLES = [1, 2, 3, 4, 5, 6];

// Get the button and the time pickable element
const calcBtn = document.querySelector(".calculate-bedtime-preset");
const timePickable = document.querySelector(".time-pickable");

 function calcWithTP() {
  // Get the chosen time from the TimePicker
  const chosenTime = TimePicker.getTimeStringFromPicker(
    TimePicker.buildPicker(timePickable)
  );

  // Create a new Date object with the chosen time
  const chosenDate = new Date();
  chosenDate.setHours(0);
  chosenDate.setMinutes(0);
  const [chosenHours, chosenMinutes] = chosenTime.split(":").map((num) => parseInt(num));
  chosenDate.setHours(chosenHours);
  chosenDate.setMinutes(chosenMinutes);

  // Subtract 15 minutes from the chosen time
  const fifteenMinutesInMs = 15 * 60 * 1000;
  const adjustedTimeMs = chosenDate.getTime() - fifteenMinutesInMs;
  const adjustedDate = new Date(adjustedTimeMs);

  // Format the adjusted time as a string in the format "hh:mm AM/PM"
  const adjustedTimeString = adjustedDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  
  // Loop through each sleep cycle duration and calculate the corresponding bedtime
  const cycles = [];
  for (let i = SLEEP_CYCLES.length - 1; i >= 0; i--) {
    const cycleDurationMinutes = SLEEP_CYCLES[i] * 90;

    // Create a new Date object with the adjusted time
    const bedtimeDate = new Date(adjustedTimeMs - cycleDurationMinutes * 60 * 1000);

    // Format the bedtime as a string in the format "hh:mm AM/PM"
    const bedtime = bedtimeDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

    // Add the bedtime to the cycles array
    cycles.push(bedtime);
    
    
    
    // Display the calculated bedtime for the current sleep cycle
    const cycleElements = document.querySelectorAll('.cycles-preset');
    cycleElements[i].textContent =  bedtime;
  }   

   // display doesnt fit schedule line 
    const schedulePresetElement = document.querySelector('#doesnt-fit-schedule'); 
   schedulePresetElement.textContent = "If this doesn't fit you schedule, you can sleep at: "
  // Display the last two cycles as suggested time
  const suggestedPresetElement = document.querySelector('.suggested-time-preset');
  suggestedPresetElement.textContent = `Suggested:  ${cycles[0]} or ${cycles[1]}`;
   
}

calcBtn.addEventListener("click", calcWithTP);

