let calculator = {
  // ваш код
  read(a, b) {
    this.a = a;
    this.b = b;
    return this; // возвращаем this чтобы можно было написать calculator.read(4, 6).sum();
  },
  sum() {
    return this.a + this.b;
  },
  mul() {
    return this.a * this.b;
  },
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
