const element = document.getElementById('wel1');
let increasing = true;
let opacity = 0.1; // Initial opacity value

function animateOpacity() {
  if (increasing) {
    opacity += 0.1;
    if (opacity >= 1) {
      increasing = false;
    }
  } else {
    opacity -= 0.1;
    if (opacity <= 0) {
      increasing = true;
    }
  }

  element.style.opacity = opacity;
  requestAnimationFrame(animateOpacity);
}

animateOpacity();
