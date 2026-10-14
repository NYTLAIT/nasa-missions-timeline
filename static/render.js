const form = document.querySelector("#filter")

form.addEventListener('submit', async (e) => {
  e.preventDefault() // Refresh no change the inputs

  const filterData = new FormData(form)                                 // Grab inputs in a certain format, all strings even date unless file or the like
  const filters = Object.fromEntries(                                   // Turn to key-value pairs
    [...filterData.entries()].filter(entry => entry[1].trim() !== '')   // Iterate through and exclude if value has no entry
  )

  const queryString = new URLSearchParams(filters).toString() // Turn object to query string
  const url = `/filter?${queryString}` // Append to Flask endpoint

  fetch(url)
})
