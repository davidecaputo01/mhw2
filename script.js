const selezionata ="./images2/checked.png" ;
const non_selezionata = "./images2/unchecked.png";


function seleziona(event){
   console.log("cliccato");
   const box = event.currentTarget; 
   const checkedBox=box.querySelector('.checkbox');
   checkedBox.src= selezionata;
   box.classList.add('selected');
   const genitore=box.parentNode.querySelectorAll('.choice-grid div');
   for(const elemento of genitore){
     if(elemento!=event.currentTarget){
       const unchecked=elemento.querySelector('.checkbox');
       unchecked.src=non_selezionata;
       elemento.classList.add('unselected');
       elemento.classList.remove('selected');
     } else {
      box.classList.remove('unselected');
      }
   }associa(box.dataset.questionId,box.dataset.choiceId);

  }

 /*function termina(event){             //rende definitiva ogni risposta
   const box = event.currentTarget; 
   const checkedBox=box.querySelector('.checkbox');
   const genitore=box.parentNode.querySelectorAll('.choice-grid div');

   for(const elemento of genitore){
   if(checkedBox.src !== selezionata){
     elemento.removeEventListener('click',seleziona);
   }
  }
  }*/

  const scelta = [];    //creo un array di 3 valori null che ci serviranno in seguito
for (let i=0; i<3; i++ ){
  scelta[i]=null;
}  


function associa (questionid,choiceid){ //associo le risposte a ciascun elemento dell'array
  if(questionid === "one"){
    scelta[0]=choiceid;
    }
  else if(questionid === "two"){
    scelta[1]=choiceid;
    }
  else {scelta[2]=choiceid}
 termina();
}

function termina (){   // se non ci sono elementi null, il quiz termina e fornisce una risposta
  if(scelta[0] !== null && scelta[1] !== null && scelta[2] !== null){
     const caselle=document.querySelectorAll('.choice-grid div');
     for(const box of caselle){
      box.removeEventListener('click',seleziona);
     }
   risposta();
}
}


function risposta(){
  if(scelta[0]===scelta[1] || scelta[0]===scelta[2] || scelta[0]!== scelta[1] && scelta[1]!==scelta[2]){
   testo(scelta[0]);
 } else { testo(scelta[1]);}
}

function testo(scelta){
  const documento=document.querySelector('article');
  const personalità = document.createElement('div');
  personalità.setAttribute('id','testoRisp');

  const titolo = document.createElement('h1');
  titolo.textContent = RESULTS_MAP[scelta].title;
  titolo.setAttribute('id','titoloRisp');

  const contenuto = document.createElement('p');
  contenuto.textContent= RESULTS_MAP[scelta].contents;
  contenuto.setAttribute('id','contenutoRisp');

  const ricomincia = document.createElement('button');
  ricomincia.textContent = 'Ricomincia il Quiz';
  ricomincia.setAttribute('id','tastoReset');
  ricomincia.addEventListener('click',reset);


  documento.appendChild(personalità);
  personalità.appendChild(titolo);
  personalità.appendChild(contenuto);
  personalità.appendChild(ricomincia);
}
function reset(){

  const genitore=document.querySelectorAll('.choice-grid div');
   for(const elemento of genitore){
       const cella=elemento.querySelector('.checkbox');
       cella.src=non_selezionata;
       elemento.classList.remove('unselected');
       elemento.classList.remove('selected');
       elemento.addEventListener('click',seleziona);
       } 

      for(let i=0; i<3; i++){
      scelta[i] = null;   
      }
      const invisibile = document.querySelector('#testoRisp'); 
      //invisibile.classList.add('hidden'); //è ridondante
      invisibile.remove();
      window.scrollTo({top: 0, behavior: 'smooth'});
  }
const caselle = document.querySelectorAll('.choice-grid div');
for(const box of caselle){
box.addEventListener('click',seleziona);
}