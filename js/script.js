var peer = new Peer();

let localStream;

var string = "";



const inputlocalpeerid = document.getElementById("localpeerid")
const urlid = document.getElementById("urlid")
const num = document.getElementById("num")
const useurl = document.getElementById("useurl")
const test = document.getElementById("test")
const msg = document.getElementById("msg1")
const qrcode = document.getElementById("qrcode")
const peercon = document.getElementById("peercon")
const button = document.getElementById("button")
const urltest = document.querySelector(".urltest")
const errormsg = document.getElementById("errormsg")

msg.style.visibility = 'hidden';

var url = location.href;
if(url.indexOf('?')!=-1)
{
    var ary1 = url.split('?');
    var ary2 = ary1[1].split('&');
    var ary3 = ary2[0].split('=');
    var idd = ary3[1];
    idd = idd.replace("#","");
    console.log(idd) ;
    urltest.style.display = "flex";
    urlid.innerHTML = idd
};

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        localStream = stream;
        const viedoElement = document.getElementById("local");
        viedoElement.srcObject = localStream;
        viedoElement.onloadedmetadata = () => viedoElement.play();
})

peer.on("open", id => {
    var url = window.location.protocol + "//" + window.location.host + location.pathname + "?id=" + id
    inputlocalpeerid.innerHTML = "配對連結: " + url;
    qrcode.src = "https://chart.googleapis.com/chart?cht=qr&chl=" + url + "&chs=256x256";
});

useurl.addEventListener("click", function() {
    console.log(idd) 
    peercon.style.visibility = 'hidden';
    msg.style.visibility = 'visible';
    document.querySelector(".urltest").style.display = "none";
    button.style.display = "none";

    const remotepeerid = idd;
    const call = peer.call(remotepeerid, localStream);
    call.on("stream", stream => {
        const remote = document.getElementById("remote");
        remote.srcObject = stream;
        remote.onloadedmetadata = () => remote.play();
    });
});

peer.on("call", call =>{
    call?.answer(localStream)
    msg1.style.visibility = "visible";
    document.querySelector(".popup").style.display = "none";
    document.querySelector(".urltest").style.display = "none";
    button.style.display = "none";
    peercon.innerHTML = "已配對!";
    call?.on("stream", stream => {
        const remote = document.getElementById("remote");
        remote.srcObject = stream;
        remote.onloadedmetadata = () => remote.play();
    });
});

peer.on('error', function (err) {
    errormsg.innerHTML = "錯誤資訊: " + err;
    document.querySelector(".error").style.display = "flex";
    msg.style.visibility = "hidden";
    button.style.display = "flex";
    document.querySelector(".urltest").style.display = "flex";
    console.log(err);
});

document.getElementById("button").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "flex";
})

document.querySelector(".close").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "none";
})

document.querySelector(".close2").addEventListener("click", function(){
    document.querySelector(".urltest").style.display = "none";
})

document.querySelector(".close3").addEventListener("click", function(){
    document.querySelector(".error").style.display = "none";
})

document.querySelector(".ok").addEventListener("click", function(){
    document.querySelector(".error").style.display = "none";
})
