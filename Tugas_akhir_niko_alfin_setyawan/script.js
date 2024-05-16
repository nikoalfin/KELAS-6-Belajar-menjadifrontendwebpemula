let submitForm=document.getElementById('inputBook');

document.addEventListener('DOMContentLoaded',function(){
    submitForm.addEventListener('submit',function(event){
        event.preventDefault();
        addData()
    })

    if(browserCek()){
        cekDataLocalStorage();
    }
})

let arrData=[];
const RENDER_EVENT = 'render-todo';
// function cek browser mendukung web storage atau tidak
const SAVE_EVENT='save-data';
const TODO_APPS='data_apps';


// function addData/save data dari form
function addData(){

    let judulBuku=document.getElementById('inputBookTitle').value;
    let penulisBuku=document.getElementById('inputBookAuthor').value;
    let tahunBuku=Number(document.getElementById('inputBookYear').value);
    let checkList=document.getElementById('inputBookIsComplete');
    let iscomplete=checkList.checked;

    // rumus cari id random
    let idRandom= +new Date();

    let dataBuku={
        id : idRandom,
        judul : judulBuku,
        penulis : penulisBuku,
        tahun : tahunBuku,
        iscomplete,
        checkList
    }
    arrData.push(dataBuku);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveDatatoLocal()
}

// menampilkan ke page browser
document.addEventListener(RENDER_EVENT,function(){
    let belumBaca=document.getElementById('incompleteBookshelfList');
    belumBaca.innerHTML='';

    let sudahBaca=document.getElementById('completeBookshelfList');
    sudahBaca.innerHTML='';

    for(let data of arrData){
    if (data.iscomplete) {
        sudahBaca.append(makeElement(data))
    }else{
        belumBaca.append(makeElement(data))
    }
    }
    
})

// buat element list
function makeElement(ad){
    let heading1=document.createElement('h2');
    heading1.innerText=ad.judul;

    let paragraf1=document.createElement('p');
    paragraf1.innerText=`penulis : ${ad.penulis}`;

    let paragraf2=document.createElement('p');
    paragraf2.innerText=`tahun : ${ad.tahun}`;

    // pindah buku lewat klik button
    let selesaiBaca=document.createElement('button');
    selesaiBaca.classList.add('cekListSukses');

    // kondisi jk teks button di hal sebelum & sesudah membaca 
    if(!ad.iscomplete) selesaiBaca.innerText='Selesai dibaca';
    else selesaiBaca.innerText='Belum selesai baca';

    document.getElementsByClassName('cekListSukses');

     // button hapus buku 
     let hapusBuku=document.createElement('button');
     hapusBuku.innerText='Hapus Buku';
     hapusBuku.classList.add('delete');

     let addElement=document.createElement('div');
     addElement.classList.add('item1');
     addElement.append(heading1,paragraf1,paragraf2,selesaiBaca,hapusBuku);
 
     let container=document.createElement('div');
     container.classList.add('list-item', 'shadow');
     container.style.marginTop='35px';
     container.append(addElement);
     container.setAttribute('id',`todo ${ad.id}`);

    // hapus data 
    hapusBuku.addEventListener('click',function(){
        removeBuku(ad.id);  
    })

    // pindah data
    if(!ad.iscomplete){
        selesaiBaca.addEventListener('click',function(){
            ad.iscomplete = true;
            document.dispatchEvent(new Event(RENDER_EVENT));
            saveDatatoLocal();
        })
    }
    else{
        selesaiBaca.addEventListener('click',function(){
            ad.iscomplete = false;
            document.dispatchEvent(new Event(RENDER_EVENT));
            saveDatatoLocal();
        })
    }
    

    return container;
}

// function hapus buku
function removeBuku(idlist){
arrData.splice(arrData.findIndex(o => o.id === idlist), 1);
document.dispatchEvent(new Event(RENDER_EVENT));
saveDatatoLocal()
}

function browserCek(){
    if(typeof(Storage)===undefined){
        alert('maaf browser anda tidak mendukung local storage')
        return false
    }
    return true
}

// function save to local storage
function saveDatatoLocal(){
    if(browserCek()){
        let parsed=JSON.stringify(arrData);
        localStorage.setItem(TODO_APPS,parsed);
        document.dispatchEvent(new Event(SAVE_EVENT));
    }
}

// tampilkan lewat console.log
document.addEventListener(SAVE_EVENT,function(){
    console.log(localStorage.getItem(TODO_APPS));
});

// save data dilocal storage walaupun habis refresh
function cekDataLocalStorage(){
    let dataLokal=localStorage.getItem(TODO_APPS);
    let dat=JSON.parse(dataLokal);

    if(dat !==null){
        for(const todo of dat){
            arrData.push(todo)
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}
