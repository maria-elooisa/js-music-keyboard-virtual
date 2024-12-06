const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input");

let mapedKeys = [];
const furEliseSequence = [
  'e', 'd', 'e', 'd', 'e', 'd', 'e', 'a', // Primeira frase
  'e', 'd', 'e', 'd', 'e', 'a', 's', 'd', // Conclusão da primeira frase
  'e', 'd', 'e', 'd', 'e', 'd', 'e', 'a', // Segunda frase
  's', 'd', 'e', 'd' // Fechamento
];


let audio = new Audio("src/tunes/a.wav");

const playTune = (key) => {
  audio.src = `src/tunes/${key}.wav`;
  audio.play();

  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  clickedKey.classList.add("active");
  setTimeout(() => {
    clickedKey.classList.remove("active");
  }, 150);
};

// Mapear teclas no piano
pianoKeys.forEach((key) => {
  key.addEventListener("click", () => playTune(key.dataset.key));
  mapedKeys.push(key.dataset.key);
});

// Teclado físico
document.addEventListener("keydown", (e) => {
  if (mapedKeys.includes(e.key)) {
    playTune(e.key);
  }
});

// Controle de volume
const handleVolume = (e) => {
  audio.volume = e.target.value;
};

// Mostrar ou ocultar nomes das teclas
const showHideKeys = () => {
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

volumeSlider.addEventListener("input", handleVolume);

keysCheck.addEventListener("click", showHideKeys);

// Função para tocar a música com feedback
function takemusic(letterMusic) {
  const musicTextElement = document.querySelector('.music p'); // Seleciona o elemento de texto
  let currentIndex = 0;

  // Exibir a primeira tecla ao carregar a página
  musicTextElement.textContent = `Toque: ${letterMusic[currentIndex]}`;
  musicTextElement.style.color = 'black';
  musicTextElement.style.fontSize = '30px';


  document.addEventListener('keydown', (event) => {
    const pressedKey = event.key.toLowerCase(); // Captura a tecla pressionada
    const expectedKey = letterMusic[currentIndex]; // Letra esperada

    if (pressedKey === expectedKey) {
      // Acertou
      currentIndex++;
      if (currentIndex < letterMusic.length) {
        musicTextElement.textContent = `Toque: ${letterMusic[currentIndex]}`;
        musicTextElement.style.color = 'green';
      } else {
        // Final da música
        musicTextElement.textContent = 'Parabéns!';
        musicTextElement.style.color = '#42037a';
        musicTextElement.style.fontWeight = 'bold'; // Define o texto como negr
    return;
      }
    } else {
      musicTextElement.style.color = 'red';
    }
  });
}

// Inicializar a lógica da música
takemusic(furEliseSequence);
