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
function canvas() {
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
      scrub: 0.5,
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
canvas();

// Page 3 Section end

// Page 4 Section start

var clutter = "";

document
  .querySelector("#page4 h1")
  .textContent.split("")
  .forEach(function (dets) {
    clutter += `<span>${dets}</span>`;

    document.querySelector("#page4>h1").innerHTML = clutter;
  });

gsap.to("#page4 h1 span", {
  scrollTrigger: {
    trigger: `#page4>h1>span`,
    start: `top bottom`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: 0.5,
  },
  stagger: 0.2,
  color: `#fff`,
});
// Page 4 Section end

// Page 5 Section start
function canvas1() {
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
      scrub: 0.5,
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
canvas1();

// Page 5 Section end

// Page 6 Section start

var clutter = "";

document
  .querySelector("#page6 h1")
  .textContent.split("")
  .forEach(function (dets) {
    clutter += `<span>${dets}</span>`;

    document.querySelector("#page6 h1").innerHTML = clutter;
  });

gsap.to("#page6 h1 span", {
  scrollTrigger: {
    trigger: `#page6 h1 span`,
    start: `top bottom`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: 0.5,
  },
  stagger: 0.2,
  color: `#fff`,
});
// Page 6 Section end

// Page 7 Section start

function canvas2() {
  const canvas = document.querySelector("#page7 canvas");
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
https://thisismagma.com/assets/home/lore/seq/1.webp?2
https://thisismagma.com/assets/home/lore/seq/2.webp?2
https://thisismagma.com/assets/home/lore/seq/3.webp?2
https://thisismagma.com/assets/home/lore/seq/4.webp?2
https://thisismagma.com/assets/home/lore/seq/5.webp?2
https://thisismagma.com/assets/home/lore/seq/6.webp?2
https://thisismagma.com/assets/home/lore/seq/7.webp?2
https://thisismagma.com/assets/home/lore/seq/8.webp?2
https://thisismagma.com/assets/home/lore/seq/9.webp?2
https://thisismagma.com/assets/home/lore/seq/10.webp?2
https://thisismagma.com/assets/home/lore/seq/11.webp?2
https://thisismagma.com/assets/home/lore/seq/12.webp?2
https://thisismagma.com/assets/home/lore/seq/13.webp?2
https://thisismagma.com/assets/home/lore/seq/14.webp?2
https://thisismagma.com/assets/home/lore/seq/15.webp?2
https://thisismagma.com/assets/home/lore/seq/16.webp?2
https://thisismagma.com/assets/home/lore/seq/17.webp?2
https://thisismagma.com/assets/home/lore/seq/18.webp?2
https://thisismagma.com/assets/home/lore/seq/19.webp?2
https://thisismagma.com/assets/home/lore/seq/20.webp?2
https://thisismagma.com/assets/home/lore/seq/21.webp?2
https://thisismagma.com/assets/home/lore/seq/22.webp?2
https://thisismagma.com/assets/home/lore/seq/23.webp?2
https://thisismagma.com/assets/home/lore/seq/24.webp?2
https://thisismagma.com/assets/home/lore/seq/25.webp?2
https://thisismagma.com/assets/home/lore/seq/26.webp?2
https://thisismagma.com/assets/home/lore/seq/27.webp?2
https://thisismagma.com/assets/home/lore/seq/28.webp?2
https://thisismagma.com/assets/home/lore/seq/29.webp?2
https://thisismagma.com/assets/home/lore/seq/30.webp?2
https://thisismagma.com/assets/home/lore/seq/31.webp?2
https://thisismagma.com/assets/home/lore/seq/32.webp?2
https://thisismagma.com/assets/home/lore/seq/33.webp?2
https://thisismagma.com/assets/home/lore/seq/34.webp?2
https://thisismagma.com/assets/home/lore/seq/35.webp?2
https://thisismagma.com/assets/home/lore/seq/36.webp?2
https://thisismagma.com/assets/home/lore/seq/37.webp?2
https://thisismagma.com/assets/home/lore/seq/38.webp?2
https://thisismagma.com/assets/home/lore/seq/39.webp?2
https://thisismagma.com/assets/home/lore/seq/40.webp?2
https://thisismagma.com/assets/home/lore/seq/41.webp?2
https://thisismagma.com/assets/home/lore/seq/42.webp?2
https://thisismagma.com/assets/home/lore/seq/43.webp?2
https://thisismagma.com/assets/home/lore/seq/44.webp?2
https://thisismagma.com/assets/home/lore/seq/45.webp?2
https://thisismagma.com/assets/home/lore/seq/46.webp?2
https://thisismagma.com/assets/home/lore/seq/47.webp?2
https://thisismagma.com/assets/home/lore/seq/48.webp?2
https://thisismagma.com/assets/home/lore/seq/49.webp?2
https://thisismagma.com/assets/home/lore/seq/50.webp?2
https://thisismagma.com/assets/home/lore/seq/51.webp?2
https://thisismagma.com/assets/home/lore/seq/52.webp?2
https://thisismagma.com/assets/home/lore/seq/53.webp?2
https://thisismagma.com/assets/home/lore/seq/54.webp?2
https://thisismagma.com/assets/home/lore/seq/55.webp?2
https://thisismagma.com/assets/home/lore/seq/56.webp?2
https://thisismagma.com/assets/home/lore/seq/57.webp?2
https://thisismagma.com/assets/home/lore/seq/58.webp?2
https://thisismagma.com/assets/home/lore/seq/59.webp?2
https://thisismagma.com/assets/home/lore/seq/60.webp?2
https://thisismagma.com/assets/home/lore/seq/61.webp?2
https://thisismagma.com/assets/home/lore/seq/62.webp?2
https://thisismagma.com/assets/home/lore/seq/63.webp?2
https://thisismagma.com/assets/home/lore/seq/64.webp?2
https://thisismagma.com/assets/home/lore/seq/65.webp?2
https://thisismagma.com/assets/home/lore/seq/66.webp?2
https://thisismagma.com/assets/home/lore/seq/67.webp?2
https://thisismagma.com/assets/home/lore/seq/68.webp?2
https://thisismagma.com/assets/home/lore/seq/69.webp?2
https://thisismagma.com/assets/home/lore/seq/70.webp?2
https://thisismagma.com/assets/home/lore/seq/71.webp?2
https://thisismagma.com/assets/home/lore/seq/72.webp?2
https://thisismagma.com/assets/home/lore/seq/73.webp?2
https://thisismagma.com/assets/home/lore/seq/74.webp?2
https://thisismagma.com/assets/home/lore/seq/75.webp?2
https://thisismagma.com/assets/home/lore/seq/76.webp?2
https://thisismagma.com/assets/home/lore/seq/77.webp?2
https://thisismagma.com/assets/home/lore/seq/78.webp?2
https://thisismagma.com/assets/home/lore/seq/79.webp?2
https://thisismagma.com/assets/home/lore/seq/80.webp?2
https://thisismagma.com/assets/home/lore/seq/81.webp?2
https://thisismagma.com/assets/home/lore/seq/82.webp?2
https://thisismagma.com/assets/home/lore/seq/83.webp?2
https://thisismagma.com/assets/home/lore/seq/84.webp?2
https://thisismagma.com/assets/home/lore/seq/85.webp?2
https://thisismagma.com/assets/home/lore/seq/86.webp?2
https://thisismagma.com/assets/home/lore/seq/87.webp?2
https://thisismagma.com/assets/home/lore/seq/88.webp?2
https://thisismagma.com/assets/home/lore/seq/89.webp?2
https://thisismagma.com/assets/home/lore/seq/90.webp?2
https://thisismagma.com/assets/home/lore/seq/91.webp?2
https://thisismagma.com/assets/home/lore/seq/92.webp?2
https://thisismagma.com/assets/home/lore/seq/93.webp?2
https://thisismagma.com/assets/home/lore/seq/94.webp?2
https://thisismagma.com/assets/home/lore/seq/95.webp?2
https://thisismagma.com/assets/home/lore/seq/96.webp?2
https://thisismagma.com/assets/home/lore/seq/97.webp?2
https://thisismagma.com/assets/home/lore/seq/98.webp?2
https://thisismagma.com/assets/home/lore/seq/99.webp?2
https://thisismagma.com/assets/home/lore/seq/100.webp?2
https://thisismagma.com/assets/home/lore/seq/101.webp?2
https://thisismagma.com/assets/home/lore/seq/102.webp?2
https://thisismagma.com/assets/home/lore/seq/103.webp?2
https://thisismagma.com/assets/home/lore/seq/104.webp?2
https://thisismagma.com/assets/home/lore/seq/105.webp?2
https://thisismagma.com/assets/home/lore/seq/106.webp?2
https://thisismagma.com/assets/home/lore/seq/107.webp?2
https://thisismagma.com/assets/home/lore/seq/108.webp?2
https://thisismagma.com/assets/home/lore/seq/109.webp?2
https://thisismagma.com/assets/home/lore/seq/110.webp?2
https://thisismagma.com/assets/home/lore/seq/111.webp?2
https://thisismagma.com/assets/home/lore/seq/112.webp?2
https://thisismagma.com/assets/home/lore/seq/113.webp?2
https://thisismagma.com/assets/home/lore/seq/114.webp?2
https://thisismagma.com/assets/home/lore/seq/115.webp?2
https://thisismagma.com/assets/home/lore/seq/116.webp?2
https://thisismagma.com/assets/home/lore/seq/117.webp?2
https://thisismagma.com/assets/home/lore/seq/118.webp?2
https://thisismagma.com/assets/home/lore/seq/119.webp?2
https://thisismagma.com/assets/home/lore/seq/120.webp?2
https://thisismagma.com/assets/home/lore/seq/121.webp?2
https://thisismagma.com/assets/home/lore/seq/122.webp?2
https://thisismagma.com/assets/home/lore/seq/123.webp?2
https://thisismagma.com/assets/home/lore/seq/124.webp?2
https://thisismagma.com/assets/home/lore/seq/125.webp?2
https://thisismagma.com/assets/home/lore/seq/126.webp?2
https://thisismagma.com/assets/home/lore/seq/127.webp?2
https://thisismagma.com/assets/home/lore/seq/128.webp?2
https://thisismagma.com/assets/home/lore/seq/129.webp?2
https://thisismagma.com/assets/home/lore/seq/130.webp?2
https://thisismagma.com/assets/home/lore/seq/131.webp?2
https://thisismagma.com/assets/home/lore/seq/132.webp?2
https://thisismagma.com/assets/home/lore/seq/133.webp?2
https://thisismagma.com/assets/home/lore/seq/134.webp?2
https://thisismagma.com/assets/home/lore/seq/135.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
`;
    return data.split("\n")[index];
  }

  const frameCount = 136;

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
      scrub: 0.5,
      trigger: `#page7`,
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
    trigger: "#page7",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
canvas2();

gsap.to(".page7-cir", {
  scrollTrigger: {
    trigger: ".page7-cir",
    start: "top center",
    end: "bottom start",
    // markers: true,
    scroller: "#main",
    scrub: 0.5,
  },
  // backgroundColor: "0a3bce91",
  scale: 1.5,
});

gsap.to(".page7-cir-inner", {
  scrollTrigger: {
    trigger: ".page7-cir-inner",
    start: "top center",
    end: "bottom start",
    scroller: "#main",
    scrub: 0.5,
  },
  backgroundColor: "#0a3bce91",
});

// Page 7 Section end



// Page 5 Section start
function canvas3() {
  const canvas = document.querySelector("#page12 canvas");
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
./images/c3dImg/ezgif-frame-001.jpg
./images/c3dImg/ezgif-frame-002.jpg
./images/c3dImg/ezgif-frame-003.jpg
./images/c3dImg/ezgif-frame-004.jpg
./images/c3dImg/ezgif-frame-005.jpg
./images/c3dImg/ezgif-frame-006.jpg
./images/c3dImg/ezgif-frame-007.jpg
./images/c3dImg/ezgif-frame-008.jpg
./images/c3dImg/ezgif-frame-009.jpg
./images/c3dImg/ezgif-frame-010.jpg
./images/c3dImg/ezgif-frame-011.jpg
./images/c3dImg/ezgif-frame-012.jpg
./images/c3dImg/ezgif-frame-013.jpg
./images/c3dImg/ezgif-frame-014.jpg
./images/c3dImg/ezgif-frame-015.jpg
./images/c3dImg/ezgif-frame-016.jpg
./images/c3dImg/ezgif-frame-017.jpg
./images/c3dImg/ezgif-frame-018.jpg
./images/c3dImg/ezgif-frame-019.jpg
./images/c3dImg/ezgif-frame-020.jpg
./images/c3dImg/ezgif-frame-021.jpg
./images/c3dImg/ezgif-frame-022.jpg
./images/c3dImg/ezgif-frame-023.jpg
./images/c3dImg/ezgif-frame-024.jpg
./images/c3dImg/ezgif-frame-025.jpg
./images/c3dImg/ezgif-frame-026.jpg
./images/c3dImg/ezgif-frame-027.jpg
./images/c3dImg/ezgif-frame-028.jpg
./images/c3dImg/ezgif-frame-029.jpg
./images/c3dImg/ezgif-frame-030.jpg
./images/c3dImg/ezgif-frame-031.jpg
./images/c3dImg/ezgif-frame-032.jpg

`;
    return data.split("\n")[index];
  }

  const frameCount = 32;

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
      scrub: 0.5,
      trigger: `#page12`,
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
    trigger: "#page12",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
canvas3();

// Page 12 Section end