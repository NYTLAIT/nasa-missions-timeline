const form = document.querySelector("#filter")
const reset = document.querySelector('#reset')

const timeline = document.querySelector('#timeline')

// ----------- RENDER ----------- ----------- ----------- ----------- //
function render(missions) {
  timeline.innerHTML = missions.map(mission => (
    `<div class="mission-card">
      <a href=${mission.link} target="_blank">
        <h1>${mission.name}</h1>
        <p>Launch: ${mission.launch}</p>
        <p>Objective: ${mission.objective}</p>
      </a>

      <div class="mission-modal">
        <section class='mission-overview'>
          <h2>Overview</h2>
          <p>${mission.description}</p>
        </section>

        <section class='mission-details'>
          <h2>Mission Details</h2>
          <p><strong>Type:</strong>${mission.type}</p>
          <p><strong>Target:</strong>${mission.target}</p>
        </section>

        <section class='mission-time-location'>
          <h2>Time & Location</h2>
          <p><strong>Status:</strong>${mission.status}</p>
          <p><strong>Launch Date:</strong>${mission.launch}</p>
          <p><strong>Conclusion:</strong>${mission.concluded ? mission.concluded : '-'}</p>
          <p><strong>Launch Site or Main Research Location:</strong>${mission.site}</p>
        </section>

        <a href=${mission.link} target="_blank">Click Here to Nasa Mission Page</a>
      </div>
    </div>`
  )).join('')
}

// ----------- FILTERING ----------- ----------- ----------- ----------- //
form.addEventListener('submit', async (e) => {
  e.preventDefault()                                                    // Refresh no change the inputs

  // ---- GETTING ENTRIES=
  const filterData = new FormData(form)                                 // Grab inputs in a certain format, all strings even date unless file or the like
  const filters = Object.fromEntries(                                   // Turn to key-value pairs
    [...filterData.entries()].filter(entry => entry[1].trim() !== '')   // Iterate through and exclude if value has no entry
  )

  // ---- SETTING PAGE URL AND APIURL =
  const queryString = new URLSearchParams(filters).toString()           // Turn object to query string

  const pageURL = queryString ? `/?${queryString}` : "/"                // Set URL else will just render / even when filters working
  history.pushState({}, '', pageURL)                                    // Is the code that sets the url

  const apiURL = queryString                                            // Append to Flask endpoint
    ? `/missions?${queryString}`
    : '/missions'

  // ---- FETCHING
  try {
    const response = await fetch(apiURL)                                 // reminder: fetch gives promise
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    // -- RENDER
    const missions = await response.json()
    console.log(missions)
    render(missions)

  } catch (error) {
    console.error(error.message)
  }
})

// ----------- RESET FILTERS----------- ----------- ----------- ----------- //
reset.addEventListener('click', async (e) => {
  e.preventDefault()
  // ---- RESET FORM 
  form.reset()

  // ---- SETTING PAGEURL 
  history.pushState({}, '', '/')

  // ---- FETCHING 
  try {
    const response = await fetch('/missions')
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    // -- RENDER
    const missions = await response.json()
    console.log(missions)
    render(missions)

  } catch (error) {
    console.error(error.message)
  }
})


