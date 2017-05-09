class CanvasView {
  constructor(canvasWidth=100, canvasHeight=100) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.dragging = false;
    this.filling = false;
  }

  init() {
    this.initDomReferences();
    this.renderTable();
    this.attachEventListeners();
    this.renderFillMode();
  }

  initDomReferences() {
    this.tableEl = document.getElementById('canvas');
    this.toggleButtonEl = document.getElementById('btn-toggle-fill');
    this.fillColorEl = document.getElementById('fill-color');
    this.fillModeLabelEl = document.getElementById('fill-mode');
  }

  attachEventListeners() {
    this.toggleButtonEl.addEventListener('click', this.handleToggleFillClick.bind(this));

    this.tableEl.addEventListener('mousedown', function(evt) {
      this.dragging = true;
    }.bind(this));

    this.tableEl.addEventListener('mouseup', function(evt) {
      this.dragging = false;
    }.bind(this));

    this.tableEl.addEventListener('click', this.handleFill.bind(this));

    this.tableEl.addEventListener('mouseover', this.handleDraw.bind(this));
  }

  handleToggleFillClick(evt) {
    this.filling = !this.filling;
    this.renderFillMode();
  }

  handleDraw(evt) {
    if (!this.filling && this.dragging && evt.target.tagName === 'TD') {
      evt.target.style.backgroundColor = 'black';
    }
  }

  handleFill(evt) {
    if (this.filling && evt.target.tagName === 'TD') {
      let [col, row] = evt.target.id.split(':').map(val => parseInt(val, 10));
      const replaceColor = evt.target.style.backgroundColor;
      const fillColor = this.fillColorEl.value;
      fill(col, row, replaceColor, fillColor);
      this.filling = false;
      this.renderFillMode();
    }
  }

  renderTable() {
    for (let row=0; row < this.canvasHeight; row++) {
      const tr = document.createElement('tr');
      for (let col=0; col < this.canvasWidth; col++) {
        const td = document.createElement('td');
        td.id = `${col}:${row}`;
        td.style.backgroundColor = '#fff';
        tr.appendChild(td);
      }
      this.tableEl.appendChild(tr);
    }
  }

  renderFillMode() {
    this.fillModeLabelEl.textContent = this.filling ? 'ON' : 'OFF';
  };

}

const canvasView = new CanvasView();
canvasView.init();
