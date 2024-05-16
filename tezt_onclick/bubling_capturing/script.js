let divs=document.getElementsByTagName('div');

for(let loe of divs){
    loe.addEventListener('clik',()=>{
        alert("ELEMENT "+loe.getAttribute('id').toUpperCase());
    },true);
   
}