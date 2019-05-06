const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false})
        .then((videostream) => {
            console.log(videostream);
            video.srcObject = videostream;
            video.onloadedmetadata = function(e) { 
                video.play();
            };
        })
        .catch((error) => {
            console.error('OH, Don\'t have permission to use your local cam!', error);
        });
}

function printToCanvas() {
    const { videoWidth: width, videoHeight: height} = video;
    canvas.height = height;
    canvas.width = width;
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);

        let imagedata = ctx.getImageData(0, 0, width, height);

        // imagedata = redEffect(imagedata);
        imagedata = rgbsplit(imagedata);
        // ctx.globalAlpha = 0.2;

        // imagedata = greenScreen(imagedata);

        ctx.putImageData(imagedata, 0, 0);
    }, 16);
}

function redEffect(imagedata) {
    for (let i = 0; i < imagedata.data.length; i += 4) {
        imagedata.data[i + 0] += 200; // red
        imagedata.data[i + 1] -= 50; // green
        imagedata.data[i + 2] *= 0.5; // blue
    }
    return imagedata;
}

function rgbsplit(imagedata) {
    for(let i = 0; i < imagedata.data.length; i += 4){
        imagedata.data[i - 100] = imagedata.data[i + 0]; // red
        imagedata.data[i + 150] = imagedata.data[i + 1]; // green
        imagedata.data[i - 150] = imagedata.data[i + 2]; // blue
    }
    return imagedata;
}

function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });

    for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (red >= levels.rmin
        && green >= levels.gmin
        && blue >= levels.bmin
        && red <= levels.rmax
        && green <= levels.gmax
        && blue <= levels.bmax) {
            pixels.data[i + 3] = 0;
        }
    }

    return pixels;
}

getVideo();
video.addEventListener('canplay', printToCanvas);

function takePhoto() {
    snap.currentTime = 0;
    snap.play();

    let data = canvas.toDataURL('image/jpeg');
    let link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src=${data} alt=handsome>`;
    strip.insertBefore(link, strip.firstChild);
}
