/* TODO: inserite il codice JavaScript necessario a completare il MHW! */


let risposte = {
  prima: null, 
  seconda: null,
  terza: null

} // mettendola dentro non mi restituisce le risposte alle combinazioni delle scelte ecco perchè è fuori
  



function checked(event)
{
 

  
  let scelta;
  const image = event.currentTarget;
  image.dataset.questionId;

for(let i of images)
  if(image.dataset.questionId==i.dataset.questionId){
  const e=i.querySelector('.checkbox');
  e.src='images/unchecked.png';
  i.classList.remove('overlay');
    
  }
  
  const h=image.querySelector('.checkbox');
  h.src='images/checked.png';
  image.classList.add('overlay');

  
  
  
  if (image.dataset.questionId=="one") risposte.prima = image.dataset.choiceId;

  else if(image.dataset.questionId=="two") risposte.seconda = image.dataset.choiceId;

  else if(image.dataset.questionId=="three") risposte.terza = image.dataset.choiceId;

  if(risposte.prima!=null&&risposte.seconda!=null&&risposte.terza!=null){
    for(let image of images){

      image.removeEventListener('click', checked);
      
      }
      if(risposte.prima==risposte.seconda || risposte.prima==risposte.terza) scelta=risposte.prima;
      else if(risposte.seconda==risposte.terza) scelta=risposte.terza;
      else if(risposte.prima!=risposte.seconda && risposte.prima!=risposte.terza && risposte.seconda!=risposte.terza) scelta=risposte.prima;

      let newTitle=document.createTextNode(RESULTS_MAP[scelta].title);

      document.getElementById("Title").innerHTML=" ";

    document.getElementById("Title").appendChild(newTitle);

    let newConts=document.createTextNode(RESULTS_MAP[scelta].contents);
    
    document.getElementById("Contents").innerHTML=" ";

    document.getElementById("Contents").appendChild(newConts);

    const H=document.querySelector('.hidden');
    H.classList.remove('hidden');
  }

  
}

function RicominciaQuiz(event){
  const I1= document.querySelector('#risposta');
  I1.classList.add('hidden');

for(let I2 of images){
  I2.classList.remove('overlay');
  let uchk=I2.querySelector('.checkbox');
  uchk.src="images/unchecked.png";
}

for(let I3 of images){
  I3.addEventListener('click', checked)
}


risposte.prima=null;
risposte.seconda=null;
risposte.terza=null;


}

const B = document.querySelector('button');
B.addEventListener('click', RicominciaQuiz);

  


const images =  document.querySelectorAll('.choice-grid div');

for(let image of images){

image.addEventListener('click', checked);

}

