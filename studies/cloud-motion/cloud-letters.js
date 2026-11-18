(() => {
  const sky = document.querySelector(".sky");
  const wordmark = sky.querySelector(".wordmark");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

  const letters = [...wordmark.querySelectorAll(".letter")].map((element, index) => {
    element.style.setProperty("--float-period", `${7.6 + (index * 1.27) % 4.8}s`);
    element.style.setProperty("--float-phase", `-${0.4 + (index * 2.63) % 7.4}s`);
    const direction = index % 2 ? -1 : 1;
    element.style.setProperty("--float-x", `${direction * (4.2 + index % 3)}px`);
    element.style.setProperty("--float-y", `-${3.2 + (index % 4) * 0.7}px`);
    element.style.setProperty("--float-tilt", `${direction * (2.2 + (index % 4) * .5)}deg`);
    return { element, index, x: 0, y: 0, vx: 0, vy: 0, centerX: 0, centerY: 0, reachX: 1, reachY: 1 };
  });

  let pointer = null;
  let drag = null;
  let frame = 0;
  let previousTime = 0;
  let bounds;
  let hoverOffset = 36;
  let driftOffset = 9;

  function schedule() {
    if (!frame && !reducedMotion.matches && !document.hidden) {
      frame = requestAnimationFrame(update);
    }
  }

  function measure() {
    bounds = wordmark.getBoundingClientRect();
    const { left: originX, top: originY, width } = bounds;
    hoverOffset = Math.max(14, Math.min(52, width * 0.045));
    driftOffset = hoverOffset * 0.33;

    // Measure rest positions. The animated boxes would create a feedback loop.
    for (const letter of letters) {
      const { element } = letter;
      letter.centerX = originX + element.offsetLeft + element.offsetWidth / 2;
      letter.centerY = originY + element.offsetTop + element.offsetHeight / 2;
      letter.reachX = element.offsetWidth * 1.38;
      letter.reachY = element.offsetHeight * 1.28;
    }
    if (pointer) schedule();
  }

  function targetOffset(letter, driftX, driftY) {
    if (!pointer) return { x: 0, y: 0 };

    const dx = letter.centerX - pointer.x;
    const dy = letter.centerY - pointer.y;
    const radius = Math.min(1, Math.hypot(dx / letter.reachX, dy / letter.reachY));
    const proximity = 1 - radius * radius * (3 - 2 * radius);

    // At the exact center, buoyancy gives the spring a continuous upward bias.
    const centerLift = 1 - Math.min(1, Math.hypot(dx, dy) / 18);
    const lift = dy - centerLift * 10;
    const length = Math.max(8, Math.hypot(dx, lift));
    const displacement = proximity * hoverOffset;
    const depth = 0.8 + (letter.index % 4) * 0.13;
    return {
      x: driftX * depth + dx / length * displacement,
      y: driftY * depth + lift / length * displacement,
    };
  }

  function paint(letter) {
    const { x, y, element } = letter;
    const tiltX = Math.max(-1, Math.min(1, x / hoverOffset));
    const tiltY = Math.max(-1, Math.min(1, y / hoverOffset));
    const pitch = -tiltY * 13;
    const yaw = tiltX * 15;
    const roll = (tiltX - tiltY * 0.4) * 8;
    element.style.transform = `perspective(700px) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotateX(${pitch.toFixed(2)}deg) rotateY(${yaw.toFixed(2)}deg) rotateZ(${roll.toFixed(2)}deg)`;
  }

  function update(time) {
    frame = 0;
    const elapsed = previousTime ? Math.min(0.048, (time - previousTime) / 1000) : 1 / 60;
    previousTime = time;
    const steps = Math.max(1, Math.ceil(elapsed * 120));
    const dt = elapsed / steps;
    let moving = false;
    if (pointer && (pointer.x < bounds.left || pointer.x > bounds.right ||
                    pointer.y < bounds.top || pointer.y > bounds.bottom)) {
      pointer = null;
    }

    // The whole name follows the pointer at different depths. Each letter also yields locally.
    const driftX = pointer ? (2 * (pointer.x - bounds.left) / bounds.width - 1) * driftOffset : 0;
    const driftY = pointer ? (2 * (pointer.y - bounds.top) / bounds.height - 1) * driftOffset : 0;

    for (const letter of letters) {
      if (drag?.letter === letter) {
        letter.x = drag.x;
        letter.y = drag.y;
        letter.vx = letter.vy = 0;
        paint(letter);
        continue;
      }
      const target = targetOffset(letter, driftX, driftY);
      // Damped Hooke's law, integrated in short steps to stay stable across frame rates.
      const stiffness = 52 + (letter.index % 4) * 3;
      const damping = 12.5;
      for (let step = 0; step < steps; step++) {
        letter.vx += (stiffness * (target.x - letter.x) - damping * letter.vx) * dt;
        letter.vy += (stiffness * (target.y - letter.y) - damping * letter.vy) * dt;
        letter.x += letter.vx * dt;
        letter.y += letter.vy * dt;
      }

      if (Math.hypot(letter.x - target.x, letter.y - target.y) < 0.04 &&
          Math.hypot(letter.vx, letter.vy) < 0.09) {
        letter.x = target.x;
        letter.y = target.y;
        letter.vx = letter.vy = 0;
      } else {
        moving = true;
      }

      paint(letter);
    }

    if (moving) schedule();
    else previousTime = 0;
  }

  function release() {
    if (!pointer) return;
    pointer = null;
    schedule();
  }

  function endDrag() {
    if (!drag) return;
    const { letter, id, x, y } = drag;
    drag = null;
    letter.x = x;
    letter.y = y;
    letter.element.removeAttribute("data-dragging");
    if (sky.hasPointerCapture(id)) sky.releasePointerCapture(id);
    schedule();
  }

  function resetInteraction() {
    endDrag();
    release();
  }

  function updatePreference() {
    sky.dataset.letterMotion = String(!reducedMotion.matches && !document.hidden);
    if (!reducedMotion.matches && !document.hidden) {
      schedule();
      return;
    }

    resetInteraction();
    cancelAnimationFrame(frame);
    frame = previousTime = 0;
    for (const letter of letters) {
      letter.x = letter.y = letter.vx = letter.vy = 0;
      letter.element.style.removeProperty("transform");
    }
  }

  sky.addEventListener("pointerdown", (event) => {
    if (drag || event.button !== 0 || event.pointerType === "touch" ||
        reducedMotion.matches || sky.hasAttribute("data-in-passage")) return;
    const letter = letters.find(({ element }) => element.contains(event.target));
    if (!letter) return;

    sky.setPointerCapture(event.pointerId);
    pointer = null;
    letter.vx = letter.vy = 0;
    drag = {
      letter, id: event.pointerId, x: letter.x, y: letter.y,
      grabX: event.clientX - letter.x, grabY: event.clientY - letter.y,
    };
    letter.element.setAttribute("data-dragging", "");
    schedule();
  });
  sky.addEventListener("pointermove", (event) => {
    if (drag) {
      if (event.pointerId !== drag.id) return;
      drag.x = event.clientX - drag.grabX;
      drag.y = event.clientY - drag.grabY;
      schedule();
      return;
    }
    if (reducedMotion.matches || event.pointerType === "touch" || sky.hasAttribute("data-in-passage")) return;
    pointer = { x: event.clientX, y: event.clientY };
    schedule();
  }, { passive: true });
  for (const type of ["pointerup", "pointercancel", "lostpointercapture"]) {
    sky.addEventListener(type, (event) => {
      if (event.pointerId === drag?.id) endDrag();
      else if (type === "pointercancel") release();
    });
  }
  sky.addEventListener("pointerleave", release);
  sky.addEventListener("cloudviewchange", resetInteraction);
  window.addEventListener("blur", resetInteraction);
  new ResizeObserver(measure).observe(sky);
  reducedMotion.addEventListener("change", updatePreference);
  document.addEventListener("visibilitychange", updatePreference);

  measure();
  updatePreference();
})();
