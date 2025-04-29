class MyHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <h1><a href="index.html">Logo</a></h1> 

        <nav>
          <ul class="logged-in">
            <li><a href="admin.html">Admin</a></li>
            <li><a href="chart.html">Chart</a></li>
            <li><a href="#" class="btnOut">Logout</a></li>   
            <li></li>       
          </ul>

          <ul class="logged-out">
            <li><a href="join.html">Join</a></li>
            <li><a href="login.html">Login</a></li>
          </ul>          
        </nav>
      </header>
    `;
  }
}
customElements.define("my-header", MyHeader);
