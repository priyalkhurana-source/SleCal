const SLEEP_CYCLE_NUMS = 6
const SLEEP_CYCLE_TIME_EACH =  90
const TIME_TAKEN_TO_FALL_ASLEEP = 15


//absoFUCKINlutely works 

function sleCal() {
  const now = new Date(); // create a new Date object representing the current date and time
  const newTime = new Date(now.getTime() + TIME_TAKEN_TO_FALL_ASLEEP * 60 * 1000); // add 15 minutes to the current time

  const timeOptions = {hour12: true, hourCycle: 'h12', hour: 'numeric', minute:'numeric'}; // create an options object for formatting the time string

  const cycles = [];
  for (let i = 1; i <= SLEEP_CYCLE_NUMS; i++) {
     // create a new Date object with 90 minutes added to the previous cycle time
    const cycleTime = new Date(newTime.getTime() + i * SLEEP_CYCLE_TIME_EACH  * 60000);
     // get the cycle time string using the toLocaleTimeString method and the options object
    const cycleTimeString = cycleTime.toLocaleTimeString([], timeOptions)
                            .replace(/(\d{1,2}):(\d{2})/, (_, hour, minute) => `${hour.padStart(2, '0')}:${minute}`); // add leading zeros to the hour if necessary
    cycles.push(cycleTimeString); // add the cycle time string to the cycles array
  }


   // display the current time 
  // const currentTimeElement = document.getElementById("current-time"); // get the #current-time div element
  // currentTimeElement.textContent = `Current time: ${now.toLocaleTimeString([], timeOptions).replace(/(\d{1,2}):(\d{2})/, (_, hour, minute) => `${hour.padStart(2, '0')}:${minute}`)}`;

  
   //display the 15 min added ~~time~~ 
  // const fifteenTimeElement = document.getElementById("15min-time"); // get the #new-time div element
  // fifteenTimeElement.textContent = `15 minute time: ${newTime.toLocaleTimeString([], timeOptions).replace(/(\d{1,2}):(\d{2})/, (_, hour, minute) => `${hour.padStart(2, '0')}:${minute}`)}`; 


  // show the suggestion of last two cycles
    const suggestedElementCurrent = document.getElementById("suggested-time-for-current");
   suggestedElementCurrent.textContent = `Suggested: ${cycles[cycles.length - 1]}  or ${cycles[cycles.length - 2]} `
  // show the 15 min ~line~
  const fifteenLineElementCurrent = document.getElementById("fifteenMinLineCurrent");
  fifteenLineElementCurrent.textContent = "The average human takes 15 minutes to fall asleep."
  
  

  const cycleElementsCurrent = document.getElementsByClassName("cycle-time-current"); // get all elements with the class "cycle-time"
  for (let i = 0; i < cycleElementsCurrent.length; i++) {
    cycleElementsCurrent[i].textContent = cycles[i]; // update the content of each cycle element with the corresponding cycle time string
  }
}

// add event listener to the Calculate button
document.getElementById("calculateButtonCurrent").addEventListener("click", sleCal);
