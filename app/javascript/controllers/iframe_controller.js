import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    const iframe = document.querySelector('iframe'); 
    iframe.width = window.innerWidth;
    iframe.height = window.innerHeight;

    window.addEventListener('resize', () => {
      iframe.width = window.innerWidth;
      iframe.height = window.innerHeight;
    });

    const id = this.data.get('id')
    const mailers = document.querySelectorAll('.mail')
    if (id) {
      mailers.forEach((mailer) => {
        mailer.style.display = 'block'
      })
    }
  }
}