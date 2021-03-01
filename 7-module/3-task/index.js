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
    this.setSlider(value);
  }
  setSlider(value) {
    let position = '';
    position = value * 100 / (this.steps - 1) + '%';
    //console.log(position);
    //debugger;
    this.elem.querySelector('.slider__thumb').style.left = position;
    this.elem.querySelector('.slider__value').textContent = value;
    this.elem.querySelector('.slider__progress').style.width = position;
    let steps = this.elem.querySelectorAll('.slider__steps span');
    for (let item of steps) {
      item.className = '';
    }
    steps[value].className = 'slider__step-active';
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
}
