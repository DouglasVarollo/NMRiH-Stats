import { Pagination } from './pagination.js'

const pagination = new Pagination()

const describe = document.querySelector('#describe')
const firstPageButton = document.querySelector('#first-page')
const inputName = document.querySelector('#name')
const lastPageButton = document.querySelector('#last-page')
const nextPageButton = document.querySelector('#next-page')
const prevPageButton = document.querySelector('#prev-page')
const tbody = document.querySelector('#rank tbody')

async function getStats() {
  try {
    const response = await fetch('../assets/stats.json')
    const data = await response.json()

    return data
  } catch (error) {
    console.error(error)

    return []
  }
}

async function main() {
  const stats = await getStats()

  firstPageButton.onclick = function () {
    pagination.firstPage()
    renderDocs()
  }

  inputName.oninput = function () {
    if (inputName.value === '') {
      pagination.setDocs(stats)
    }

    const filteredStats = stats.filter(function (stat) {
      return stat.name.toLowerCase().includes(inputName.value.toLowerCase())
    })

    pagination.setDocs(filteredStats)
    pagination.firstPage()

    renderDocs()
  }

  lastPageButton.onclick = function () {
    pagination.lastPage()
    renderDocs()
  }

  nextPageButton.onclick = function () {
    pagination.nextPage()
    renderDocs()
  }

  prevPageButton.onclick = function () {
    pagination.prevPage()
    renderDocs()
  }

  pagination.setDocs(stats)

  renderDocs()
}

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

function renderDocs() {
  removeChildNodes(tbody)

  const docs = pagination.getDocs()

  describe.innerText = pagination.describe()
  docs.forEach(function (doc) {
    const tr = document.createElement('tr')

    tr.innerHTML = `
      <td>${doc.rank}</td>
      <td>${doc.name}</td>
      <td>${doc.points}</td>
      <td>${doc.kills}</td>
      <td>${doc.deaths}</td>
    `

    tbody.appendChild(tr)
  })
}

main()
