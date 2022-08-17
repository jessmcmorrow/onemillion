const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`;

function randomColour(){
    var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);
    var rgba = "rgba(" + r + "," + g + "," + b + ",0.5)";
    
    return rgba;
    }

function homepage(){

[].slice.call(document.getElementById('records').getElementsByTagName('a'))
.forEach(x=>{
    x.onclick = (e) => {
        e.preventDefault();
        
        fetch(x.href + "?" + Math.random())
        .then((response) => response.text())
        .then((data)=>{
            document.getElementById('record-modal-inner').innerHTML=data; 
            document.getElementById('record-modal').style.display = 'block';
            document.body.style.overflowY='hidden';
            initAudio();
            window.history.pushState("", "", x.href);

        })
    }
})

document.getElementById('close-record-modal').onclick = ()=>{
    document.getElementById('record-modal').style.display = 'none';
    document.body.style.overflowY='scroll';
    window.history.pushState("", "", "");
}


var binaryGenerateInterval = null;

function binaryGenerator(){
document.getElementById('infinite-idea-bottom').innerHTML = "<img src='media/binary/1.png'>";
binaryGenerateInterval = setInterval(function(){
binaryGenerate()
},0.1)
}


window.onload = ()=>{
document.getElementById("ideas-list").style.filter = `drop-shadow(${Math.round(Math.random()*30)}px ${Math.round(Math.random()*10)}px ${Math.round(Math.random()*4)}px ${backgroundColor})`
document.body.style.backgroundColor = backgroundColor;
document.getElementById('records').style.borderColor = backgroundColor;

fetch('gallery.html')
        .then((response) => response.text())
        .then((data)=>{
            document.getElementById('gallery').innerHTML=data;
var imgs = [].slice.call(document.querySelectorAll('img[data-lazy-img-src]'));
imgs.forEach(function (x) {
    x.style.filter = "blur(2px) invert(1)";
    x.style.rotate = `${Math.random()>0.5?"-":""}${Math.random()*45}deg`;
    var lazyImageObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var url = x.dataset.lazyImgSrc;
                    var newImage = new Image();
                    newImage.src = url;
                    newImage.onload = function () {
                        x.srcset = newImage.src;
                        x.style.filter = null;
                    }
                lazyImageObserver.unobserve(x);
            }
        });
    });
    lazyImageObserver.observe(x);
});
        })

}

var backgroundColor =  rgba2hex(randomColour());

function binaryGenerate(){
var newImg = document.createElement('img');
newImg.style.backgroundColor = `${randomColour()}`;
newImg.src = "media/binary/" + Math.ceil(6 * Math.random()) + ".png";

var existingImgs = [].slice.call(document.getElementById('infinite-idea-bottom').getElementsByTagName('img'));
var randomImgIndex = Math.floor(existingImgs.length * Math.random());
document.getElementById('infinite-idea-bottom').insertBefore(newImg,existingImgs[randomImgIndex])

if(Math.random()*25 > 24 && (existingImgs.length+1)%17==0){
clearInterval(binaryGenerateInterval);
var binaryColorsInterval = setInterval(function(){
binaryColors();
},0.1)

setTimeout(function(){
clearInterval(binaryColorsInterval);
},10000)
}



}



function binaryColors(){

var existingImgs = [].slice.call(document.getElementById('infinite-idea-bottom').getElementsByTagName('img'));

var randomImgIndex = Math.floor(existingImgs.length * Math.random());

existingImgs[randomImgIndex].style.backgroundColor = `${randomColour()}`;

existingImgs.forEach((x,i)=>{
if(((i+1)%17==0)){
x.style.backgroundColor = 'inherit';
}
})

}



document.getElementById('toggle-records').onclick = ()=>{
var recordsEl = document.getElementById('records');
var toggleRecordsEl = document.getElementById('toggle-records');
if(toggleRecordsEl.classList.contains('active')){
toggleRecordsEl.classList.remove('active');
recordsEl.style.maxHeight='0px';
}else{
recordsEl.style.maxHeight='500px';
toggleRecordsEl.classList.add('active');
}
}

window.onscroll = (ev)=> { 
if (window.pageYOffset == 0 && !document.getElementById('toggle-records').classList.contains('active')) { 
document.getElementById('toggle-records').click() 
}
if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !document.getElementById('toggle-gallery').classList.contains('active')) {
document.getElementById('toggle-gallery').click();
} 
}

document.getElementById('toggle-gallery').onclick = ()=>{
var galleryEl = document.getElementById('gallery');
var toggleGalleryEl = document.getElementById('toggle-gallery');
if(toggleGalleryEl.classList.contains('active')){
toggleGalleryEl.classList.remove('active');
galleryEl.style.maxHeight='0px';
}else{
galleryEl.style.maxHeight='10000px';
toggleGalleryEl.classList.add('active');
}
}

binaryGenerator();
}

function initAudio(){
    [].slice.call(document.querySelectorAll('#tracks li')).forEach((x,i,arr)=>{
        x.onclick = ()=>{
            arr.forEach((li)=>li.className='');
            x.className = 'active';
            document.getElementById('audio-player').src = x.dataset.track;
            document.getElementById('audio-player').play();
            document.getElementById('audio-player').style.opacity = 1;
            document.getElementById('audio-player').onended = ()=>{
                if(i!=arr.length-1){
                    arr[i+1].click();
                }
            }
        }
    })
    }
