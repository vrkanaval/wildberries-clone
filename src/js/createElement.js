export function createElement(tag, props = {}, children = []) {
  const el = document.createElement(tag);

  Object.entries(props).forEach(([key, value]) => {
    if (key === 'class') el.className = value;
    else if (key === 'textContent') el.textContent = value;
    else if (key === 'html') el.innerHTML = value;
    else el[key] = value;
  });

  if (!Array.isArray(children)) children = [children];
  children.forEach(child => {
    if (child) el.appendChild(child);
  });

  return el;
}