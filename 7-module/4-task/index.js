export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.elem = document.createElement('div');
    this.elem.className = 'slider';
//    this.value = value;
    this.steps = steps;
    this.template = `
          <!--Ползунок слайдера с активным значением-->
          <div class="slider__thumb" style="left: 50%;">
            <span class="slider__value">2</span>
          </div>

          <!--Заполненная часть слайдера-->
          <div class="slider__progress" style="width: 50%;"></div>

          <!--Шаги слайдера-->
          <div class="slider__steps">
          </div>`;
    this.elem.insertAdjacentHTML('afterbegin', this.template);
    for (let i = 0; i < steps; i++) {
      this.elem.querySelector('.slider__steps').insertAdjacentHTML('beforeend', `<span></span>`);
    }
    this.elem.addEventListener('click', this.sliderClick);
    this.thumb = this.elem.querySelector('.slider__thumb');
    this.value = this.elem.querySelector('.slider__value');
    this.progress = this.elem.querySelector('.slider__progress');
    this.stepsElems = this.elem.querySelectorAll('.slider__steps span');
    this.thumb.ondragstart = () => false;
    this.value.ondragstart = () => false;
    // https://prnt.sc/zw3kqz
    this.thumb.addEventListener('pointerdown', this.dragStart);
    //debugger;
    this.setSlider(value);
  }
  setSlider(value) {
    let position = '';
    position = value * 100 / (this.steps - 1) + '%';
    //console.log(position);
    //debugger;
    this.thumb.style.left = position;
    this.value.textContent = value;
    this.progress.style.width = position;    
    for (let item of this.stepsElems) {
      item.className = '';
    }
    this.stepsElems[value].className = 'slider__step-active';
    this.elem.dispatchEvent(new CustomEvent('slider-change', { detail: value, bubbles: true}));
  }
  sliderClick = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    this.setSlider(value);
  }
  dragStart = (event) => {
    //console.log('dragstart');
    this.elem.classList.add('slider_dragging');
    document.addEventListener('pointermove', this.dragMoving);
    document.addEventListener('pointerup', this.dragEnd);
    document.addEventListener('selectstart', this.selectStart);
  }
  selectStart = (event) => {
    event.preventDefault();
    //console.log('select');
  }
  dragMoving = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let position = leftRelative * 100 + '%';

    this.thumb.style.left = position;
    this.elem.querySelector('.slider__progress').style.width = position;

    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);

    for (let item of this.stepsElems) {
      item.className = '';
    }

    this.stepsElems[value].className = 'slider__step-active';
    this.value.textContent = value;
  }
  dragEnd = (event) => {
    document.removeEventListener('pointermove', this.dragMoving);
    document.removeEventListener('pointerup', this.dragEnd);
    document.removeEventListener('selectstart', this.selectStart);
    this.elem.classList.remove('slider_dragging');
    this.setSlider(+this.value.textContent);
  }
}
