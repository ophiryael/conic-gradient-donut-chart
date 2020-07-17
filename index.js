const SLICE_COLORS = ['#7cb5ec', '#f45a5b', '#2d908f', '#e4d354', '#8085ea', '#f7a35c', '#8fed7d'];

const formEl = document.querySelector('form');
formEl.addEventListener('submit', updateChart);

const addSliceBtnEl = document.querySelector('.add-slice-btn');
addSliceBtnEl.addEventListener('click', addSliceInput);

const chartEl = document.querySelector('.chart');

function updateChart(event) {
  event.preventDefault();
  const slices = calcSlices(event);
  const gradientValues = slices.map(s => `${s.color} ${s.fromPct}% ${s.toPct}%`);
  chartEl.style.background = `conic-gradient(${gradientValues.join()})`;
}

function calcSlices(event) {
  const inputElements = event.target.elements['slice-pct'];
  return [...inputElements].reduce((slices, inputEl, i) => {
    const slice = {
      fromPct: i === 0 ? 0 : slices[i - 1].toPct,
      toPct: i === 0 ? +inputEl.value : +inputEl.value + slices[i - 1].toPct,
      color: SLICE_COLORS[i % SLICE_COLORS.length],
    };
    return [...slices, slice];
  }, []);
}

const inputElementHtml = `
  <label>
    Slice percentage:
    <input type="number" name="slice-pct" min="1" max="100" /> %
  </label>
`;

function addSliceInput() {
  addSliceBtnEl.insertAdjacentHTML('beforebegin', inputElementHtml);
}
