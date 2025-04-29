class MyFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
        <p>&copy; 2025 My WebApp. All rights reserved.</p>
      </footer>
    `;
  }
}
customElements.define("my-footer", MyFooter);
