const form = document.querySelector("#filter")
const reset = document.querySelector('#reset')

// ----------- FILTERING ----------- ----------- ----------- -----------
form.addEventListener('submit', async (e) => {
  e.preventDefault()                                                    // Refresh no change the inputs

  // ---- GETTING ENTRIES -----------
  const filterData = new FormData(form)                                 // Grab inputs in a certain format, all strings even date unless file or the like
  const filters = Object.fromEntries(                                   // Turn to key-value pairs
    [...filterData.entries()].filter(entry => entry[1].trim() !== '')   // Iterate through and exclude if value has no entry
  )

  // ---- SETTING PAGE URL AND APIURL -----------
  const queryString = new URLSearchParams(filters).toString()           // Turn object to query string

  const pageURL = queryString ? `/?${queryString}` : "/"                // Set URL else will just render / even when filters working
  history.pushState({}, '', pageURL)                                    // Is the code that sets the url

  const apiURL = queryString                                            // Append to Flask endpoint
    ? `/missions?${queryString}`
    : '/missions'

  // ---- FETCHING -----------
  try {
    const response = await fetch(apiURL)                                 // reminder: fetch gives promise
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json()
    console.log(result)

  } catch (error) {
    console.error(error.message)
  }
})

// ----------- RESET ----------- ----------- ----------- ----------- -----------
reset.addEventListener('click', async (e) => {
  e.preventDefault()
  // ---- RESET FORM -----------
  form.reset()

  // ---- SETTING PAGEURL -----------
  history.pushState({}, '', '/')

  // ---- FETCHING -----------
  try {
    const response = await fetch('/missions')
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const missions = await response.json()
    console.log(missions)
  } catch (error) {
    console.error(error.message)
  }
})


