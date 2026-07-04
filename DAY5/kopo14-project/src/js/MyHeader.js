class MyHeader extends HTMLElement {
  connectedCallback() {
    const header = document.createElement("header");
    const h1 = document.createElement("h1");
    h1.textContent = "전재용 포트폴리오";
    const nav = document.createElement("nav");
    const links = [
      { text: "소개", href: "./portfolio.html" },
      { text: "할 일", href: "./todo.html" },
    ];
    links.forEach(function (link) {
      const a = document.createElement("a");
      a.textContent = link.text;
      a.href = link.href;
      nav.appendChild(a);
    });
    header.appendChild(h1);
    header.appendChild(nav);
    this.appendChild(header); // 컴포넌트에 붙임
  }
}
customElements.define("my-header", MyHeader);
