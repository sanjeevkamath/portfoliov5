(() => {
  const passage = document.querySelector(".passage");
  const sky = passage.querySelector(".sky");
  const about = document.querySelector(".about");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let frame = 0;
  let track = 1;
  let aboutStart = 1;
  let aboutHeight = 1;
  let pointerX = 0;
  let easedX = 0;
  let progress;
  let lastTime = 0;

  const clamp = (n) => Math.max(0, Math.min(1, n));
  const smooth = (from, to, n) => {
    const t = clamp((n - from) / (to - from));
    return t * t * (3 - 2 * t);
  };

  function update(time) {
    frame = 0;
    const reduce = reducedMotion.matches;
    const target = reduce ? 0 : clamp(window.scrollY / track);
    const elapsed = lastTime ? Math.min(time - lastTime, 50) : 1000 / 60;
    lastTime = time;
    progress ??= target;
    progress += (target - progress) * (1 - Math.exp(-elapsed / 85));
    if (reduce || Math.abs(target - progress) < .002) progress = target;
    const travelling = Math.max(target, progress) > .065;
    if (travelling !== sky.hasAttribute("data-in-passage")) {
      sky.toggleAttribute("data-in-passage", travelling);
      sky.dispatchEvent(new Event("cloudviewchange"));
    }

    const targetX = travelling || reduce ? 0 : pointerX;
    easedX += (targetX - easedX) * .08;
    if (Math.abs(targetX - easedX) < .05) easedX = targetX;

    sky.style.setProperty("--air-x", `${easedX.toFixed(2)}px`);
    sky.style.setProperty("--cloud-progress", (progress * .6).toFixed(4));
    sky.style.setProperty("--cloud-opacity", (1 - smooth(.64, .98, progress)).toFixed(3));
    sky.style.setProperty("--lift-name", `${(-36 * progress).toFixed(2)}%`);
    // Let the name disappear before the foreground bank moves past it.
    sky.style.setProperty("--title-opacity", (1 - smooth(.08, .36, progress)).toFixed(3));
    sky.style.setProperty("--mist-opacity", smooth(.34, .86, progress).toFixed(3));

    if (!reduce) {
      const arrival = clamp((innerHeight - (aboutStart - scrollY)) / aboutHeight);
      about.style.setProperty("--about-cloud-y", `${((1 - arrival) * 13).toFixed(2)}%`);
    }

    if (progress !== target || easedX !== targetX) schedule();
    else lastTime = 0;
  }

  function schedule() {
    if (!frame && !document.hidden) frame = requestAnimationFrame(update);
  }

  function measure() {
    aboutStart = passage.offsetHeight;
    track = Math.max(1, aboutStart - sky.offsetHeight);
    aboutHeight = Math.max(1, Math.min(innerHeight, about.offsetHeight));
    schedule();
  }

  function clearPointer() {
    pointerX = 0;
    schedule();
  }

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", measure);
  sky.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch" || reducedMotion.matches || sky.hasAttribute("data-in-passage")) return;
    pointerX = (clamp(event.clientX / innerWidth) * 2 - 1) * -16;
    schedule();
  }, { passive: true });
  sky.addEventListener("pointerleave", clearPointer);
  sky.addEventListener("pointercancel", clearPointer);
  window.addEventListener("blur", clearPointer);
  reducedMotion.addEventListener("change", () => {
    pointerX = easedX = 0;
    measure();
  });
  document.addEventListener("visibilitychange", clearPointer);

  measure();
})();
