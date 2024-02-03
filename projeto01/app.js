const btnContainer = document.getElementById('button-container');
const audio = document.querySelector('audio');
const btnPlayPause = document.getElementById('play-pause');
const divCap = document.getElementById('chapter') 

const getAudioInfo = () => {
   const currentChapter = Number(audio.dataset.chapter);
   const minLimit = Number(audio.dataset.minLimit);
   const maxLimit = Number(audio.dataset.maxLimit);
   return { currentChapter, minLimit, maxLimit };
};

const setChapter = (chapter) => {
   audio.src = `./books/dom-casmurro/${chapter}.mp3`;
   audio.dataset.chapter = chapter;
};

const updateChapter = (delta) => {
   const { currentChapter, minLimit, maxLimit } = getAudioInfo();
   const newChapter = currentChapter + delta;
   const isWithinLimits = newChapter >= minLimit && newChapter <= maxLimit;
   const updatedChapter = isWithinLimits ? newChapter : delta > 0 ? minLimit : maxLimit;
   setChapter(updatedChapter);
   divCap.innerHTML = `Capítulo ${updatedChapter}`
   playAndPause();
};

const previousChapter = () => updateChapter(-1);
const nextChapter = () => updateChapter(1);

const setCssClass = (cssClass) => {
   btnPlayPause.children[0].setAttribute('class', cssClass);
};

const playAndPause = () => {
   if (audio.paused) {
      audio.play();
      setCssClass('bi bi-pause-circle');
      return;
   }
   audio.pause();
   setCssClass('bi bi-play-circle');
};

const checkIdFormat = (idString) => {
   const isHyphenIncluded = idString.includes('-');
   if (isHyphenIncluded) {
      const [playString, pauseString] = idString.split('-');
      idString = `${playString}${pauseString.replace('p', 'P')}`;
      return idString;
   }
   return idString;
};

const handleClick = ({ target }) => {
   const element = target.tagName === 'I' ? target.parentNode : target;
   let elementId = element.id;

   elementId = checkIdFormat(elementId);

   const options = {
      previous: previousChapter,
      next: nextChapter,
      playPause: playAndPause
   };

   const executeAction = options[elementId];
   executeAction();
};

btnContainer.addEventListener('click', handleClick);








