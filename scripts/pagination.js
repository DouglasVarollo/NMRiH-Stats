export class Pagination {
  constructor(options = {}) {
    this.docs = []
    this.page = 1
    this.pages = []
    this.per_page = options.per_page || 10
    this.total_pages = 0
  }

  describe() {
    return `Página ${this.page} de ${this.total_pages}`
  }

  firstPage() {
    this.goToPage(1)
  }

  generatePages() {
    for (let page = 0; page < this.total_pages; page++) {
      const start = this.per_page * page
      const take = this.per_page * (page + 1)

      this.pages[page] = this.docs.slice(start, take)
    }
  }

  getDocs() {
    const docs = this.pages[this.page - 1] || []

    return docs
  }

  goToPage(page) {
    if (page <= 0 || page > this.total_pages) {
      return undefined
    }

    this.page = page
  }

  lastPage() {
    this.goToPage(this.total_pages)
  }

  nextPage() {
    this.goToPage(this.page + 1)
  }

  prevPage() {
    this.goToPage(this.page - 1)
  }

  setDocs(docs) {
    this.docs = Array.isArray(docs) ? docs : []
    this.total_pages = Math.ceil(docs.length / this.per_page)

    this.generatePages()
  }
}
