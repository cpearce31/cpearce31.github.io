function main () {
  function resizeResponse () {
    width = window.innerWidth;

    // Move photo in about section next to header
    if (width < 800) {
      headWrapper.appendChild(headshot);
    } else {
      aboutMain.appendChild(headshot);
    }

    // Collapse skills into one column
    if (width <= 900) {
      for (let i = 0; i < childrenArr.length; i++) {
        skillsColumn1.appendChild(childrenArr[i]);
      }
      if (skills2) {
        skills2.remove();
      }
    } else {
      skillsWrapper.appendChild(skills2);
      for (let i = 0; i < childrenArr.length; i++) {
        skills2.appendChild(childrenArr[i]);
      }
    }
  }

  window.addEventListener('resize', resizeThrottler, false);

  let resizeTimeout;
  function resizeThrottler () {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function () {
        resizeTimeout = null;
        resizeResponse();
      }, 66);
    }
  }

  let width = window.innerWidth;
  let height = window.innerHeight;

  let down1 = document.getElementById('about-down');
  let down2 = document.getElementById('skills-down');
  let down3 = document.getElementById('projects-down');
  let navbarHeight = 50;
  let sectionHeights = {
    about: 0,
    skills: height - navbarHeight,
    projects: 2 * height - 2 * navbarHeight,
    contact: 3 * height - 3 * navbarHeight
  };

  down1.addEventListener('click', () => {
    window.scrollTo(0, sectionHeights.skills);
  });
  down2.addEventListener('click', () => {
    window.scrollTo(0, sectionHeights.projects);
  });
  down3.addEventListener('click', () => {
    window.scrollTo(0, sectionHeights.contact);
  });

  let aboutLink = document.getElementById('nav-about');
  let skillsLink = document.getElementById('nav-skills');
  let projectsLink = document.getElementById('nav-projects');
  let contactLink = document.getElementById('nav-contact');

  aboutLink.addEventListener('click', () => {
    event.preventDefault();
    window.scrollTo(0, sectionHeights.about);
  });
  skillsLink.addEventListener('click', () => {
    event.preventDefault();
    window.scrollTo(0, sectionHeights.skills);
  });
  projectsLink.addEventListener('click', () => {
    event.preventDefault();
    window.scrollTo(0, sectionHeights.projects);
  });
  contactLink.addEventListener('click', () => {
    event.preventDefault();
    window.scrollTo(0, sectionHeights.contact);
  });

  let headshot = document.getElementById('headshot');
  let headWrapper = document.getElementById('about-head-wrapper');
  let aboutMain = document.getElementById('about-main');

  let skillsColumn1 = document.getElementById('skills1');
  let column2Children = document.getElementById('skills2').children;
  let childrenArr = [].slice.call(column2Children);
  let skills2 = document.getElementById('skills2');
  let skillsWrapper = document.getElementById('skills-wrapper');

  resizeResponse();

  var AUTOSCROLL = false; // Change to true to enable autoscrolling
  var PERIOD = 5000;  // Time spent on each slide in milliseconds

  // If touch events are detected, disable autoscrolling
  var touchDevice = false;
  window.addEventListener('touchstart', function () {
    touchDevice = true;
  });

  var slides = document.querySelectorAll('.carousel-slide');
  var left = document.querySelector('#carousel-btn-left');
  var right = document.querySelector('#carousel-btn-right');
  var indicator = document.querySelector('#carousel-scroll-indicator');
  var wrapper = document.querySelector('#carousel-wrapper');

  // Add bullets to the scoll indicator section for each slide
  for (var i = 0; i < slides.length; i++) {
    var pip = document.createElement('i');
    pip.className = 'carousel-pip fa fa-square';
    pip.toggle = function () {
      this.classList.toggle('carousel-pip-active');
    };
    indicator.appendChild(pip);
  }

  var index = 0;
  var pips = document.querySelectorAll('.carousel-pip');
  pips[0].toggle();

  // Wrap-around handling for scroll-idicators (pips!)
  function changePip (direction) {
    pips[index].toggle();
    if (direction === 'right') {
      if (index === pips.length - 1) {
        index = 0;
      } else {
        index++;
      }
    } else if (direction === 'left') {
      if (index === 0) {
        index = pips.length - 1;
      } else {
        index--;
      }
    }
    pips[index].toggle();
  }

  // Remove last slide and insert it at the begining of the list,
  // in case the first move is to the left
  slides[slides.length - 1].remove();
  setPosition(slides[slides.length - 1], 'left');
  wrapper.insertBefore(slides[slides.length - 1], slides[0]);
  slides = document.querySelectorAll('.carousel-slide');

  function setPosition (slide, pos) {
    if (pos === 'right') {
      slide.className = 'carousel-slide carousel-slide-right';
    } else if (pos === 'left') {
      slide.className = 'carousel-slide carousel-slide-left';
    } else {
      slide.className = 'carousel-slide carousel-slide-active';
    }
  }

  function move (direction) {
    if (direction === 'right') {
      setPosition(slides[1], 'left');
      setPosition(slides[2]);
      slides[0].remove();
      setPosition(slides[0], 'right');
      wrapper.appendChild(slides[0]);
      slides = document.querySelectorAll('.carousel-slide');
    } else if (direction === 'left') {
      setPosition(slides[0]);
      setPosition(slides[1], 'right');
      slides[slides.length - 1].remove();
      setPosition(slides[slides.length - 1], 'left');
      wrapper.insertBefore(slides[slides.length - 1], slides[0]);
      slides = document.querySelectorAll('.carousel-slide');
    }
    changePip(direction);
  }

  right.addEventListener('click', function () {
    move('right');
  });

  left.addEventListener('click', function () {
    move('left');
  });

  function startAutoScroll () {
    if (AUTOSCROLL && !touchDevice) {
      interval = setInterval(function () {
        move('right');
      }, PERIOD);
    }
  }

  wrapper.addEventListener('mouseover', function () {
    if (interval) {
      clearInterval(interval);
    }
  });

  wrapper.addEventListener('mouseout', function () {
    startAutoScroll();
  });

  var interval;
  startAutoScroll();

  let navs = document.querySelectorAll('.navbar-btn');

  function navReset () {
    for (let i = 0; i < navs.length; i++) {
      navs[i].className = 'navbar-btn';
    }
  }

  window.addEventListener('scroll', function () {
    let offset = height * 0.4;
    let y = document.body.scrollTop;
    if (y < sectionHeights.skills - offset) {
      navReset();
      navs[0].classList.toggle('navbar-btn-active');
    } else if (y < sectionHeights.projects - offset) {
      navReset();
      navs[1].classList.toggle('navbar-btn-active');
      console.log(navs);
    } else if (y < sectionHeights.contact - offset) {
      navReset();
      navs[2].classList.toggle('navbar-btn-active');
    } else {
      navReset();
      navs[3].classList.toggle('navbar-btn-active');
    }
  });
}

window.addEventListener('load', main, false);
