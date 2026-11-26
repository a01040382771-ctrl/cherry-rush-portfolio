const chapterIndex = document.querySelector(".index");
const indexToggle = chapterIndex.querySelector("summary");
const chapterLinks = [...chapterIndex.querySelectorAll("nav a")];

chapterLinks.forEach((link) => link.addEventListener("click", () => {
  chapterIndex.open = false;
  const section = document.querySelector(link.hash);
  section.tabIndex = -1;
  section.focus({ preventScroll: true });
}));
document.addEventListener("click", (event) => {
  if (!chapterIndex.contains(event.target)) chapterIndex.open = false;
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && chapterIndex.open) {
    chapterIndex.open = false;
    indexToggle.focus();
  }
});

const loupe = document.querySelector("#loupe");
if (typeof loupe.showModal === "function") {
  const title = document.querySelector("#loupe-title");
  const stage = loupe.querySelector(".loupe-stage");
  document.querySelectorAll("figure").forEach((plate) => {
    const caption = plate.querySelector("figcaption");
    const label = caption.querySelector("small").textContent + " · " + caption.querySelector("span").textContent;
    const source = plate.querySelector("img");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "view-plate";
    button.setAttribute("aria-label", label + " 확대 보기");
    button.title = "이미지 확대 보기";
    button.innerHTML = '<svg aria-hidden="true"><use href="#expand"></use></svg>';
    caption.append(button);
    button.addEventListener("click", () => {
      const image = new Image();
      image.alt = source.alt;
      image.src = source.currentSrc || source.src;
      title.textContent = label;
      stage.replaceChildren(image);
      loupe.showModal();
    });
  });
  document.querySelector("#loupe-close").addEventListener("click", () => loupe.close());
  loupe.addEventListener("click", (event) => {
    if (event.target !== loupe) return;
    const bounds = loupe.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) loupe.close();
  });
  loupe.addEventListener("close", () => stage.replaceChildren());
}
