const form = document.querySelector("#filter")

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const filterData = new FormData(form) // Grab inputs in a certain format
  console.log(filterData)

  const filters = Object.fromEntries(filterData.entries()) // Turn to key-value pairs
  console.log(filters)

})
