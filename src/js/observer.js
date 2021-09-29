import refs from './refs';
const { list } = refs;
const options = {
    // root: list,
    rootMargin: '0px',
    threshold: 0.5,
};

const observer = new IntersectionObserver(callback, options);
function callback(entries) {
  entries.forEach(entry => {
    entry.isIntersecting
      ? entry.target.classList.add('observe')
      : entry.target.classList.remove('observe')
  })
}
const items = [...list.children]
items.forEach((item) => observer.observe(item))