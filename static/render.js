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
        <span class="block h-[2px] w-full bg-blue-400 rounded my-1"></span>
        <p class='inline-block px-[4px] font-semibold text-2xl bg-[#e2eaf4] rounded'>${mission.launch_year}</p>
        <p><strong>Status:</strong> ${mission.status}</p>
        <p><strong>Objective:</strong> ${mission.objective}</p>
      </a>

      <div class="mission-modal">
        <section>
          <p class='text-2xl font-semibold'>Overview</p>
          <p><strong>Mission:</strong> ${mission.name}</p>
          <p>${mission.description}</p>
        </section>

        <section>
          <p class='text-xl font-semibold'>Mission Details</p>
          <p><strong>Status:</strong> ${mission.status}</p>
          <p><strong>Type:</strong> ${mission.type}</p>
          <p><strong>Target:</strong> ${mission.target}</p>
        </section>

        <section>
          <p class='text-xl font-semibold'>Dates & Location</p>
          <p><strong>Launch Date:</strong> ${mission.launch_display}</p>
          <p><strong>Concluded:</strong> ${mission.concluded_display ?? '-'}</p>
          <p><strong>Launch/Research Site:</strong> ${mission.site}</p>
        </section>

        <a href=${mission.link} target="_blank"
          class='block text-center text-black bg-white hover:underline px-[6px] rounded'> 
          ᯓ➤ Click here to the mission's NASA page
        </a>
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
  history.pushState({}, '', queryString ? `/?${queryString}` : '/')     // Set URL else will just render / even when filters working

  fetchMissions(queryString)
})

// ----------- RESET FILTERS ----------- 
reset.addEventListener('click', (e) => {
  e.preventDefault()
  form.reset()
  history.pushState({}, '', '/')
  fetchMissions()
})

// ----------- BOOKMARKS & BACK ----------- 
window.addEventListener('popstate', loadFromURL)    // back/forward buttons
loadFromURL()                                       // initial page load / bookmark