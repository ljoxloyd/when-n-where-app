//this is a registration file
//without it custom elements will use HTMLUnknownElement interface

import React from "react"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // 'custom-element': React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>, HTMLInputElement>
      "dialog-anchor": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      "dialog-bounds": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}

window.customElements.define("dialog-anchor", class extends HTMLElement {
})
window.customElements.define("dialog-content", class extends HTMLElement {
})
window.customElements.define("dialog-bounds", class extends HTMLElement {
})