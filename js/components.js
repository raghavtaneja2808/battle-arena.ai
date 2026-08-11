function createUnoCard(color, value) {
  const card = document.createElement("div");
  card.classList.add("uno-card", "uno-" + color);
  card.textContent = value;
  return card;
}
