import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    const admin_mailer = document.querySelector('.admin-mailer')
    const mailers = document.querySelectorAll('.mail')
    admin_mailer.addEventListener('click', (e) => {
      e.preventDefault()
      if (mailers[0].style.display == 'block') {
        mailers.forEach((mailer) => {
          mailer.style.display = 'none'
        })
      } else {
        mailers.forEach((mailer) => {
          mailer.style.display = 'block'
        })
      }
    })
  }
}