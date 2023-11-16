import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    const obj = JSON.parse(this.data.get('obj'));
    const minus = this.data.get('minus');
    const plus = this.data.get('plus');
    console.log(obj)
    console.log(minus)
    console.log(plus)

    const salmon = document.getElementById('salmon');
    const resetButton = document.getElementById('reset');
    if (salmon && resetButton) {
      let fontSize = parseInt(window.getComputedStyle(salmon).fontSize.slice(0, -2));
      const defaultfontSize = fontSize;
      salmon.addEventListener('click', function() {
        if (salmon.textContent == 'love') {
          salmon.textContent = '❤️'
        } else {
          fontSize = fontSize + 8
          salmon.style.fontSize = fontSize + 'px'
        }
      });
      resetButton.addEventListener('click', function() {
        fontSize = defaultfontSize
        salmon.style.fontSize = fontSize + 'px'
        salmon.textContent = 'love'
      });
    }
  }
}