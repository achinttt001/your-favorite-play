import { fetchPlayData } from './play-module.js';

document.addEventListener('DOMContentLoaded', () => {
   const playList = document.getElementById('playList');
   const actList = document.getElementById('actList');
   const sceneList = document.getElementById('sceneList');
   const playerList = document.getElementById('playerList');
   const txtHighlight = document.getElementById('txtHighlight');

  
   fetchPlayData().then(data => {
      data.forEach(play => {
         const option = document.createElement('option');
         option.value = play.id;
         option.textContent = play.title;
         playList.appendChild(option);
      });
   });

   
   playList.addEventListener('change', async () => {
      const playId = playList.value;
      const playData = await fetchPlayData(playId);
      const play = new Play(playData);

   
      play.acts.forEach(act => {
         const option = document.createElement('option');
         option.value = act.id;
         option.textContent = act.title;
         actList.appendChild(option);
      });

      play.acts[0].scenes[0].speeches.forEach(speech => {
         const option = document.createElement('option');
         option.value = speech.player;
         option.textContent = speech.player;
         playerList.appendChild(option);
      });

      
      const firstAct = play.acts[0];
      const firstScene = firstAct.scenes[0];
      displayScene(firstAct, firstScene);
   });

   actList.addEventListener('change', () => {
      const actId = actList.value;
      const act = play.acts.find(act => act.id === actId);
      displayScene(act, act.scenes[0]);
   });

   sceneList.addEventListener('change', () => {
      const sceneId = sceneList.value;
      const scene = play.acts[0].scenes.find(scene => scene.id === sceneId);
      displayScene(play.acts[0], scene);
   });


   document.getElementById('filterBtn').addEventListener('click', () => {
      const player = playerList.value;
      const text = txtHighlight.value;
      const speeches = play.acts[0].scenes[0].speeches;
xt
      const filteredSpeeches = speeches.filter(speech => speech.player === player && speech.text.includes(text));

      const speechContainer = document.getElementById('speechHere');
      speechContainer.innerHTML = '';
      filteredSpeeches.forEach(speech => {
         const div = document.createElement('div');
         div.textContent = speech.text;
         if (speech.text.includes(text)) {
            const b = document.createElement('b');
            b.textContent = text;
            div.appendChild(b);
         }
         speechContainer.appendChild(div);
      });
   });
});

class Play {
   constructor(data) {
      this.id = data.id;
      this.title = data.title;
      this.acts = data.acts.map(act => new Act(act));
   }
}

class Act {
   constructor(data) {
      this.id = data.id;
      this.title = data.title;
      this.scenes = data.scenes.map(scene => new Scene(scene));
   }
}

class Scene {
   constructor(data) {
      this.id = data.id;
      this.title = data.title;
      this.speeches = data.speeches;
   }
}

function displayScene(act, scene) {
   const actTitle = document.getElementById('act Title') }
