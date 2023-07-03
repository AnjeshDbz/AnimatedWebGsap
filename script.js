// Page 1 Section start

function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
loco();

// Page 1 Section end

// Page 2 Section start
var clutter = "";

document
  .querySelector("#page2>h1")
  .textContent.split("")
  .forEach(function (dest) {
    clutter += `<span>${dest}</span>`;

    document.querySelector("#page2>h1").innerHTML = clutter;
  });

gsap.to("#page2 h1 span", {
  scrollTrigger: {
    trigger: `#page2 h1 span`,
    start: `top bottom`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: 0.5,
  },
  stagger: 0.2,
  color: `#fff`,
});

// Page 2 Section end


// Page 3 Section start
function canvas(){
  const canvas = document.querySelector("#page3>canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
render();
});

function files(index) {
var data = `
./images/canvasImg/frames00007.png
./images/canvasImg/frames00010.png
./images/canvasImg/frames00013.png
./images/canvasImg/frames00016.png
./images/canvasImg/frames00019.png
./images/canvasImg/frames00022.png
./images/canvasImg/frames00025.png
./images/canvasImg/frames00028.png
./images/canvasImg/frames00031.png
./images/canvasImg/frames00034.png
./images/canvasImg/frames00037.png
./images/canvasImg/frames00040.png
./images/canvasImg/frames00043.png
./images/canvasImg/frames00046.png
./images/canvasImg/frames00049.png
./images/canvasImg/frames00052.png
./images/canvasImg/frames00055.png
./images/canvasImg/frames00058.png
./images/canvasImg/frames00061.png
./images/canvasImg/frames00064.png
./images/canvasImg/frames00067.png
./images/canvasImg/frames00070.png
./images/canvasImg/frames00073.png
./images/canvasImg/frames00076.png
./images/canvasImg/frames00079.png
./images/canvasImg/frames00082.png
./images/canvasImg/frames00085.png
./images/canvasImg/frames00088.png
./images/canvasImg/frames00091.png
./images/canvasImg/frames00094.png
./images/canvasImg/frames00097.png
./images/canvasImg/frames00100.png
./images/canvasImg/frames00103.png
./images/canvasImg/frames00106.png
./images/canvasImg/frames00109.png
./images/canvasImg/frames00112.png
./images/canvasImg/frames00115.png
./images/canvasImg/frames00118.png
./images/canvasImg/frames00121.png
./images/canvasImg/frames00124.png
./images/canvasImg/frames00127.png
./images/canvasImg/frames00130.png
./images/canvasImg/frames00133.png
./images/canvasImg/frames00136.png
./images/canvasImg/frames00139.png
./images/canvasImg/frames00142.png
./images/canvasImg/frames00145.png
./images/canvasImg/frames00148.png
./images/canvasImg/frames00151.png
./images/canvasImg/frames00154.png
./images/canvasImg/frames00157.png
./images/canvasImg/frames00160.png
./images/canvasImg/frames00163.png
./images/canvasImg/frames00166.png
./images/canvasImg/frames00169.png
./images/canvasImg/frames00172.png
./images/canvasImg/frames00175.png
./images/canvasImg/frames00178.png
./images/canvasImg/frames00181.png
./images/canvasImg/frames00184.png
./images/canvasImg/frames00187.png
./images/canvasImg/frames00190.png
./images/canvasImg/frames00193.png
./images/canvasImg/frames00196.png
./images/canvasImg/frames00199.png
./images/canvasImg/frames00202.png
`;
return data.split("\n")[index];
}

const frameCount = 67;

const images = [];
const imageSeq = {
frame: 1,
};

for (let i = 0; i < frameCount; i++) {
const img = new Image();
img.src = files(i);
images.push(img);
}

gsap.to(imageSeq, {
frame: frameCount - 1,
snap: "frame",
ease: `none`,
scrollTrigger: {
  scrub: .5,
  trigger: `#page3`,
  start: `top top`,
  end: `250% top`,
  scroller: `#main`,
},
onUpdate: render,
});

images[1].onload = render;

function render() {
scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
var canvas = ctx.canvas;
var hRatio = canvas.width / img.width;
var vRatio = canvas.height / img.height;
var ratio = Math.max(hRatio, vRatio);
var centerShift_x = (canvas.width - img.width * ratio) / 2;
var centerShift_y = (canvas.height - img.height * ratio) / 2;
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(
  img,
  0,
  0,
  img.width,
  img.height,
  centerShift_x,
  centerShift_y,
  img.width * ratio,
  img.height * ratio
);
}
ScrollTrigger.create({

trigger: "#page3",
pin: true,
scroller: `#main`,
start: `top top`,
end: `250% top`,
});
}
canvas()

// Page 3 Section end


// Page 4 Section start

var clutter = "";

document.querySelector("#page4 h1").textContent.split("").forEach(function(dets){
  clutter += `<span>${dets}</span>`

  document.querySelector("#page4>h1").innerHTML = clutter;
})

gsap.to("#page4 h1 span",{
scrollTrigger:{
    trigger:`#page4>h1>span`,
    start:`top bottom`,
    end:`bottom top`,
    scroller:`#main`,
    scrub:.5,
},
stagger:.2,
color:`#fff`
})
// Page 4 Section end

// Page 5 Section start
function canvas1(){
  const canvas = document.querySelector("#page5 canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
render();
});

function files(index) {
var data = `
./images/canvasImg/bridges00004.png
./images/canvasImg/bridges00007.png
./images/canvasImg/bridges00010.png
./images/canvasImg/bridges00013.png
./images/canvasImg/bridges00016.png
./images/canvasImg/bridges00019.png
./images/canvasImg/bridges00022.png
./images/canvasImg/bridges00025.png
./images/canvasImg/bridges00028.png
./images/canvasImg/bridges00031.png
./images/canvasImg/bridges00034.png
./images/canvasImg/bridges00037.png
./images/canvasImg/bridges00040.png
./images/canvasImg/bridges00043.png
./images/canvasImg/bridges00046.png
./images/canvasImg/bridges00049.png
./images/canvasImg/bridges00052.png
./images/canvasImg/bridges00055.png
./images/canvasImg/bridges00058.png
./images/canvasImg/bridges00061.png
./images/canvasImg/bridges00064.png
./images/canvasImg/bridges00067.png
./images/canvasImg/bridges00070.png
./images/canvasImg/bridges00073.png
./images/canvasImg/bridges00076.png
./images/canvasImg/bridges00079.png
./images/canvasImg/bridges00082.png
./images/canvasImg/bridges00085.png
./images/canvasImg/bridges00088.png
./images/canvasImg/bridges00091.png
./images/canvasImg/bridges00094.png
./images/canvasImg/bridges00097.png
./images/canvasImg/bridges00100.png
./images/canvasImg/bridges00103.png
./images/canvasImg/bridges00106.png
./images/canvasImg/bridges00109.png
./images/canvasImg/bridges00112.png
./images/canvasImg/bridges00115.png
./images/canvasImg/bridges00118.png
./images/canvasImg/bridges00121.png
./images/canvasImg/bridges00124.png
./images/canvasImg/bridges00127.png
./images/canvasImg/bridges00130.png
./images/canvasImg/bridges00133.png
./images/canvasImg/bridges00136.png
./images/canvasImg/bridges00139.png
./images/canvasImg/bridges00142.png
./images/canvasImg/bridges00145.png
./images/canvasImg/bridges00148.png
./images/canvasImg/bridges00151.png
./images/canvasImg/bridges00154.png
./images/canvasImg/bridges00157.png
./images/canvasImg/bridges00160.png
./images/canvasImg/bridges00163.png
./images/canvasImg/bridges00166.png
./images/canvasImg/bridges00169.png
./images/canvasImg/bridges00172.png
./images/canvasImg/bridges00175.png
./images/canvasImg/bridges00178.png
./images/canvasImg/bridges00181.png
./images/canvasImg/bridges00184.png
./images/canvasImg/bridges00187.png
./images/canvasImg/bridges00190.png
./images/canvasImg/bridges00193.png
./images/canvasImg/bridges00196.png
./images/canvasImg/bridges00199.png
./images/canvasImg/bridges00202.png
`;
return data.split("\n")[index];
}

const frameCount = 67;

const images = [];
const imageSeq = {
frame: 1,
};

for (let i = 0; i < frameCount; i++) {
const img = new Image();
img.src = files(i);
images.push(img);
}

gsap.to(imageSeq, {
frame: frameCount - 1,
snap: "frame",
ease: `none`,
scrollTrigger: {
  scrub: .5,
  trigger: `#page5`,
  start: `top top`,
  end: `250% top`,
  scroller: `#main`,
},
onUpdate: render,
});

images[1].onload = render;

function render() {
scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
var canvas = ctx.canvas;
var hRatio = canvas.width / img.width;
var vRatio = canvas.height / img.height;
var ratio = Math.max(hRatio, vRatio);
var centerShift_x = (canvas.width - img.width * ratio) / 2;
var centerShift_y = (canvas.height - img.height * ratio) / 2;
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(
  img,
  0,
  0,
  img.width,
  img.height,
  centerShift_x,
  centerShift_y,
  img.width * ratio,
  img.height * ratio
);
}
ScrollTrigger.create({

trigger: "#page5",
pin: true,
scroller: `#main`,
start: `top top`,
end: `250% top`,
});
}
canvas1()

// Page 5 Section end


// Page 6 Section start

var clutter = "";

document.querySelector("#page6 h1").textContent.split("").forEach(function(dets){
  clutter += `<span>${dets}</span>`

  document.querySelector("#page6 h1").innerHTML = clutter;
})

gsap.to("#page6 h1 span",{
scrollTrigger:{
    trigger:`#page6 h1 span`,
    start:`top bottom`,
    end:`bottom top`,
    scroller:`#main`,
    scrub:.5,
},
stagger:.2,
color:`#fff`
})
// Page 6 Section end