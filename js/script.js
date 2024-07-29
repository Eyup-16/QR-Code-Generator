document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('generate-form');
    const qr = document.getElementById('qrcode');

    function onGenerateSubmit(e) {
        e.preventDefault();
        const url = document.getElementById('url').value;
        const size = document.getElementById('size').value;
        if(url === ''){
            alert('Please enter URL!');
        }else if(size === 'Please choose a Size'){
            alert('Please choose a Size!')
        }
        else{
            showSpinner()
            setTimeout(()=>{
                hideSpinner()
                generateQRCode(url,size)
                setTimeout(()=>{
                    const saveUrl = document.querySelector('img').src
                    createSaveBtn(saveUrl)

                })
            },1000)

        }
    }

    const generateQRCode = (url,size) => {
       clearUI() // clear any existing qrCode.
        const qrcode=new QRCode(qr,{
            text: url,
            width: size,
            height: size,
            colorDark: '#0EC7A2',
            colorLight:'#ffffff',

        })
    }
    const createSaveBtn = (saveUrl)=> {
        const link = document.createElement('a')
        link.id = 'save-link'
        link.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w1/3 m-auto my-5'
        link.href =saveUrl
        link.download = 'qr'
        link.innerHTML= 'Save Image'
        document.getElementById('generated').appendChild(link)
    }
    const showSpinner =()=>{document.getElementById('spinner').style.display ='block'} ;
    const hideSpinner =()=> {document.getElementById('spinner').style.display ='none'};
    const clearUI= ()=>{
        qr.innerHTML =''
        const saveBtn = document.getElementById('save-link')
        if (saveBtn){
            saveBtn.remove()
        }
    }
    form.addEventListener('submit', onGenerateSubmit);
});
