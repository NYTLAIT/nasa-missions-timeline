const form = document.querySelector("#filter")

form.addEventListener('submit', async (e) => {
  e.preventDefault() // Refresh no change the inputs

  const filterData = new FormData(form) // Grab inputs in a certain format
  const filters = Object.fromEntries(filterData.entries()) // Turn to key-value pairs

  const queryString = new URLSearchParams(filters).toString() // Turn object to query string
  const url = `/filter?${queryString}` // Append to Flask endpoint

  fetch(url)
})
