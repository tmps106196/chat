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



msg.style.visibility = 'hidden';

urlid.style.visibility = 'hidden';
useurl.style.visibility = 'hidden';
var url = location.href;
if(url.indexOf('?')!=-1)
{
    var ary1 = url.split('?');
    var ary2 = ary1[1].split('&');
    var ary3 = ary2[0].split('=');
    var idd = ary3[1];
    console.log(idd) ;
    urlid.style.visibility = 'visible';
    useurl.style.visibility = 'visible';
    urlid.innerHTML = "目前網址中包含ID: " + idd + " 是否直接連接? 是請按 使用連結 ，否請忽略"
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
    var url = location.href;
    var ary1 = url.split('?');
    var ary2 = ary1[1].split('&');
    var ary3 = ary2[0].split('=');
    var idd = ary3[1];
    console.log(idd) 
    inputlocalpeerid.style.visibility = 'hidden';
    useurl.style.visibility = 'hidden';
    urlid.style.visibility = 'hidden';
    qrcode.style.visibility = 'hidden';
    peercon.style.visibility = 'hidden';
    msg.style.visibility = 'visible';

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
    inputlocalpeerid.style.visibility = 'hidden';
    qrcode.style.visibility = 'hidden';
    peercon.innerHTML = "已配對!";
    call?.on("stream", stream => {
        const remote = document.getElementById("remote");
        remote.srcObject = stream;
        remote.onloadedmetadata = () => remote.play();
    });
});



