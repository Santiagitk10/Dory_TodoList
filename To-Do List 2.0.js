let buttonRow = document.querySelector('#btnCont');
let list = document.querySelector('ul');
let input = document.querySelector('input');
let clearAll = document.querySelector('#clear');
let mybutton = document.getElementById("myBtn");
let dragging = null;

buttonRow.addEventListener('click', function(e){
	let todo = input.value;

	if (e.target.id === 'add1' || e.target.id === 'add2') {

		if (todo !== '') {
			let msg = '<span>'+todo+'</span>' + ' <div><button id="edit" class="libot btn-secondary">Edit</button><button id="butDel" class="libot btn-secondary">Dele</button> <button id="butDon" class="libot btn-secondary">Done</button></div>';
			let newEl = document.createElement('li');
			newEl.setAttribute('draggable','true')
			newEl.innerHTML = msg;

			if (e.target.id === 'add1') {
				list.insertBefore(newEl, list.firstChild);
			} else {
				list.appendChild(newEl);
			}

			input.value = '';
		}
	}
}, false);



list.addEventListener('click', function(e){
	let target = e.target;
	let elParent = target.parentNode;
	let elGrandParent = target.parentNode.parentNode;
	let elGrandGrandParent = target.parentNode.parentNode.parentNode;

	
	if(target.id === 'butDon' && !elGrandParent.firstChild.hasAttribute('class')){
		elGrandParent.firstChild.setAttribute('class' , 'checked');
	} else if (target.id === 'butDon' && elGrandParent.firstChild.hasAttribute('class')){
		elGrandParent.firstChild.removeAttribute('class');
	}

	
	if (target.id === 'edit') {

		let txtVal = target.parentNode.parentNode.firstChild.textContent;

		let msg = '<p class="editInpt"><input type="text"> <button class="libot btn-secondary save">Save</button><button class="libot btn-secondary cancel">Cancel</button></p>'
		let newEl = document.createElement('div');
		newEl.innerHTML = msg;
		newEl.setAttribute('class', 'confMsg');
		newEl.firstChild.firstChild.setAttribute('value', txtVal);
		document.body.appendChild(newEl);


		let paragraph = document.querySelector('.editInpt');

		paragraph.addEventListener('click', function(e){
			let target = e.target;
			if(target.classList[2] === 'save'){
				if (target.previousSibling.value !== '') {
					elGrandParent.firstChild.textContent = target.previousSibling.previousSibling.value;
				}
				document.body.removeChild(newEl);
			} else if (target.classList[2] === 'cancel'){
				document.body.removeChild(newEl);
			}
		}, false);

	}


	if (target.id === 'butDel') {

		let msg = '<p class="delMessage">Entonces... confirmado que deseas eliminarlo?<button class="libot btn-secondary elimSi">Si</button><button class="libot btn-secondary elimNo">No</button></p>';
		let newEl = document.createElement('div');
		newEl.innerHTML = msg;
		newEl.setAttribute('class', 'confMsg');
		document.body.appendChild(newEl);

		let paragraph = document.querySelector('.delMessage');

		paragraph.addEventListener('click', function(e){
			let target = e.target;
			if(target.classList[2] === 'elimSi'){

				document.body.removeChild(newEl);
				elGrandGrandParent.removeChild(elGrandParent);
			} else if (target.classList[2] === 'elimNo'){
				document.body.removeChild(newEl);
			}
		}, false);

	}

	
	
}, false);


clearAll.addEventListener('click', function(e){
		let elements = document.querySelectorAll('li');
		if (elements.length > 0) {
			let msg = '<p class="delMessage">Entonces...borramos todo?<button class="libot btn-secondary elimSi">Si</button><button class="libot btn-secondary elimNo">No</button></p>';
		let newEl = document.createElement('div');
		newEl.innerHTML = msg;
		newEl.setAttribute('class', 'confMsg');
		document.body.appendChild(newEl);

		let paragraph = document.querySelector('.delMessage');

		paragraph.addEventListener('click', function(e){
			let target = e.target;
			if(target.classList[2] === 'elimSi'){

				document.body.removeChild(newEl);
				
				for(let i = 0; i < elements.length; i++){
					list.removeChild(elements.item(i));
				}
			} else if (target.classList[2] === 'elimNo'){
				document.body.removeChild(newEl);
			}
		}, false);
		}
		
}, false);



mybutton.addEventListener('click', function(){
	topFunction();
}, false);

window.addEventListener('scroll', function(){
	scrollFunction()
}, false);




//ITEM DRAGGING FUNCTIONALITY
list.addEventListener('dragstart', function(event){
	let target = event.target;
	dragging = target;
    event.dataTransfer.setData('text/plain', null);
    // event.dataTransfer.setDragImage(self.dragging,0,0);
}, false)


list.addEventListener('dragover', function(event) {
    event.preventDefault();
    let target = event.target;
    let bounding = target.getBoundingClientRect()
    let offset = bounding.y + (bounding.height/2);
    if ( target.localName === 'li' && event.clientY - offset > 0 ) {
        target.style.borderBottom = 'solid 4px gray';
        target.style.borderTop = '';
    } else if(target.localName === 'li' && event.clientY - offset < 0) {
        target.style.borderTop = 'solid 4px gray';
        target.style.borderBottom = '';
    }
});

list.addEventListener('dragleave', function(event) {
    let target = event.target;
    target.style['border-bottom'] = '';
    target.style['border-top'] = '';
});

list.addEventListener('drop', function(event) {
    event.preventDefault();
    let target = event.target;
    if (target.localName === 'li' && target.style['border-bottom'] !== '' ) {
        target.style['border-bottom'] = '';
        target.parentNode.insertBefore(dragging, event.target.nextSibling);
    } else if (target.localName === 'li' && target.style['border-bottom'] === '') {
        target.style['border-top'] = '';
        target.parentNode.insertBefore(dragging, event.target);
    }
});

//NO IMPLEMENTADO. PROTOTIPO FUNCION PARA OBTENER EL LI
// function getLi(target){
// 	if (target.nodeName.toLowerCase() === 'ul') {
// 		return false;
// 	} else if (target.nodeName.toLowerCase() === 'span' || target.nodeName.toLowerCase() === 'div'){

// 	}
// }

function scrollFunction() {
  if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}







//LEARNING

// Back to top button

// mybutton.addEventListener('click', function(){
// 	topFunction();
// }, false);

// window.addEventListener('scroll', function(){
// 	scrollFunction()
// }, false);

// function scrollFunction() {
//   if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
//     mybutton.style.display = "block";
//   } else {
//     mybutton.style.display = "none";
//   }
// }

// // When the user clicks on the button, scroll to the top of the document
// function topFunction() {
//   document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
// }