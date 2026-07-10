class MyCard extends HTMLElement {
  connectedCallback() {
    // HTML 태그의 속성(attribute)을 읽어온다. 없으면 빈 문자열.
    const title = this.getAttribute("title") ?? "";
    const desc = this.getAttribute("desc") ?? "";

    // 카드 내부를 그린다 (light DOM → 외부 MyCard.css가 그대로 적용됨).
    this.innerHTML = `
      <div class="card">
        <div class="card-header">
          <h2>${title}</h2>
        </div>
        <div class="card-body">
          <p>${desc}</p>
          <button class="card-button">♥좋아요 <span class="like-count">0</span></button>
          <p class="hint">↑클릭하면 숫자 증가</p>
        </div>
      </div>
    `;

    // 방금 그린 요소들을 잡아온다.
    const button = this.querySelector(".card-button");
    const likeCount = this.querySelector(".like-count");

    // 좋아요 카운터
    let count = 0;
    button.addEventListener("click", () => {
      count++;
      likeCount.textContent = count;
    });
  }
}

customElements.define("my-card", MyCard);
