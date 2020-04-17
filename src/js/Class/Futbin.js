class FutbinHelper {
  constructor() {
    this.path = 'https://futbin-helper.herokuapp.com'
  }

  ping = () => fetch(this.path)

  searchPlayer = (name) => {
    return fetch(`${this.path}/v1/searchPlayer?name=${name}`)
      .then(res => res.json())
      .then(res => res)
  }
}
export default FutbinHelper