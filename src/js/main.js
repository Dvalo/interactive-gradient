import { gsap } from 'gsap/all';

window.addEventListener('load', () => {
  // Cursor elements
  const cursor = document.querySelector('.cursor');
  const cursorBlob = document.querySelector('.cursor__blob');
  const cursorOverlay = document.querySelector('.cursor__overlay');

  const mm = gsap.matchMedia();

  let rotateAnim;
  let filterAnim;

  mm.add('(hover: hover) and (pointer: fine) and (min-width: 1024px)', () => {
    // Blob rotation/scale animation
    rotateAnim = gsap.to(cursorBlob, {
      rotation: 180,
      scale: 1.4,
      yoyo: true,
      repeat: -1,
      duration: 20,
      paused: true,
    });

    // Backdrop filter animation for the cursor overlay
    filterAnim = gsap.fromTo(
      cursorOverlay,
      {
        backdropFilter: 'hue-rotate(200deg) blur(65px)',
      },
      {
        backdropFilter: 'hue-rotate(360deg) blur(65px)',
        yoyo: true,
        repeat: -1,
        duration: 30,
        paused: true,
      }
    );
  });

  // Update cursor blob position on mousemove
  window.addEventListener('mousemove', (event) => {
    mm.add('(hover: hover) and (pointer: fine) and (min-width: 1024px)', () => {
      gsap.to(cursorBlob, {
        x: event.clientX - 250,
        y: event.clientY - 250,
        ease: 'power4.out',
        delay: 0.05,
        duration: 3,
      });
    });
  });

  // Pause animations & Hide cursor when mouse leaves browser window.
  document.addEventListener('mouseleave', () => {
    if (cursor.classList.contains('cursor--active')) {
      cursor.classList.remove('cursor--active');
      rotateAnim.paused(true);
      filterAnim.paused(true);
    }
  });

  // Resume animations & show cursor when mouse leaves browser window.
  document.addEventListener('mouseenter', () => {
    if (!cursor.classList.contains('cursor--active')) {
      cursor.classList.add('cursor--active');
      rotateAnim.paused(false);
      filterAnim.paused(false);
    }
  });
});
