const menus = [
  {
    title: "ABOUT",
    items: [
      { text: "호텔소개", href: "" },
      { text: "오시는길", href: "" },
    ],
  },
  {
    title: "ROOM",
    items: [
      { text: "ROOM1", href: "" },
      { text: "ROOM2", href: "" },
      { text: "ROOM3", href: "" },
    ],
  },
  {
    title: "RESERVATION",
    items: [
      { text: "예약안내", href: "RESERVATION1.html" },
      { text: "실시간예약", href: "RESERVATION2.html" },
    ],
  },
  {
    title: "COMMUNITY",
    items: [
      { text: "공지사항", href: "" },
      { text: "이벤트", href: "" },
      { text: "FAQ", href: "" },
    ],
  },
];

class MyHeader extends HTMLElement {
  connectedCallback() {
    const header = document.createElement("header");

    const h1 = document.createElement("h1");

    const logo = document.createElement("a");
    logo.href = "HOME.html"; // 홈으로 이동
    logo.textContent = "H";
    logo.className = "logo";

    h1.appendChild(logo);

    const nav = document.createElement("nav");

    menus.forEach((menuData) => {
      const menu = document.createElement("div");
      menu.className = "menu";

      const title = document.createElement("a");
      title.href = "#";
      title.textContent = menuData.title;

      const submenu = document.createElement("div");
      submenu.className = "submenu";

      menuData.items.forEach((item) => {
        const a = document.createElement("a");
        a.href = item.href;
        a.textContent = item.text;
        submenu.appendChild(a);
      });

      menu.append(title, submenu);
      nav.appendChild(menu);
    });

    header.append(h1, nav);
    this.appendChild(header);
  }
}

customElements.define("my-header", MyHeader);
