const form = document.querySelector("#filter")
const reset = document.querySelector('#reset')
const timeline = document.querySelector('#timeline')

// ***********-***********-***********-***********
// ----------- HELPERS!!! ----------- //
// ***********-***********-***********-***********

// ----------- FETCHING ----------- 
async function fetchMissions(queryString) {
  try {
    const response = await fetch(queryString ? `/missions?${queryString}` : '/missions')
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const missions = await response.json()
    console.log(missions)
    render(missions)

  } catch (error) {
    console.error(error.message)
  }
}

// ----------- LOAD FROM URL ----------- 
function loadFromURL() {
  const params = new URLSearchParams(location.search)
  form.reset()

  for (const [key, value] of params) {
    if (form.elements[key]) { form.elements[key].value = value }
  }

  fetchMissions(params.toString())
}

// ----------- RENDER MISSIONS  ----------- 
function render(missions) {
  timeline.innerHTML = missions.map(mission => (
    `<div class="mission-card">
      <a href=${mission.link} target="_blank">
        <h1>${mission.name}</h1>
        <span class="block h-[2px] w-full bg-gray-300 rounded my-1"></span>
        <p><strong>Launch Date:</strong> ${mission.launch_display}</p>
        <p><strong>Objective:</strong> ${mission.objective}</p>
      </a>

      <div class="mission-modal">
        <section class='mission-overview'>
          <h2>Overview</h2>
          <p>${mission.description}</p>
        </section>

        <section class='mission-details'>
          <h2>Mission Details</h2>
          <p><strong>Type:</strong> ${mission.type}</p>
          <p><strong>Target:</strong> ${mission.target}</p>
        </section>

        <section class='mission-time-location'>
          <h2>Time & Location</h2>
          <p><strong>Status:</strong> ${mission.status}</p>
          <p><strong>Launch Date:</strong> ${mission.launch_display}</p>
          <p><strong>Concluded:</strong> ${mission.concluded_display ?? '-'}</p>
          <p><strong>Launch/Research Site:</strong> ${mission.site}</p>
        </section>

        <a href=${mission.link} target="_blank">Click Here to Nasa Mission Page</a>
      </div>
    </div>`
  )).join('')
}

// ***********-***********-***********-***********
// ----------- LISTENERS!!! ----------- //
// ***********-***********-***********-***********

// ----------- APPLY FILTERS ----------- 
form.addEventListener('submit', (e) => {
  e.preventDefault()                                                    // Refresh no change the inputs

  // -- GETTING ENTRIES
  const filterData = new FormData(form)                                 // Grab inputs in a certain format, all strings - even date unless file or the like
  const filters = Object.fromEntries(                                   // Turn to key-value pairs
    [...filterData.entries()].filter(entry => entry[1].trim() !== '')   // Iterate through and exclude if value has no entry
  )

  // -- SETTING PAGE URL AND APIURL
  const queryString = new URLSearchParams(filters).toString()           // Turn object to query string
  history.pushState({}, '', queryString ? `/?${queryString}` : '')     // Set URL else will just render / even when filters working

  fetchMissions(queryString)
})

// ----------- RESET FILTERS ----------- 
reset.addEventListener('click', (e) => {
  e.preventDefault()
  form.reset()
  history.pushState({}, '', '')
  fetchMissions()
})

// ----------- BOOKMARKS & BACK ----------- 
window.addEventListener('popstate', loadFromURL)    // back/forward buttons
loadFromURL()                                       // initial page load / bookmark


// ---- HORIZONTAL SCROLL WITH WHEEL | NOT WORKING ----
// timeline.addEventListener('wheel', (e) => {
//   if (e.deltaY !== 0) {                         // AI: If the user is scrolling vertically, redirect it horizontally
//     e.preventDefault();                         // AI: Prevent standard vertical page scrolling
//     container.scrollLeft += e.deltaY;
//   }
// });