let root = document.documentElement,
  rootStyle = getComputedStyle(root),
  indicatorSlider = document.querySelector(`.svg-pi-indicator-slider`),
  svgPiSizeSlider = document.querySelector(`.svg-pi-size-slider`),
  svgPiTrackSizeSlider = document.querySelector(`.svg-pi-track-size-slider`),
  svgPiTrackPaddingSlider = document.querySelector(
    `.svg-pi-track-padding-slider`
  ),
  svgPiTrackColorPicker = document.querySelector(`.svg-pi-track-color-picker`),
  svgPiIndicatorColorPicker = document.querySelector(
    `.svg-pi-indicator-color-picker`
  );

const injectSliderValue = (el, val) =>
  el.parentNode.insertAdjacentHTML(
    `afterbegin`,
    `<span class="svg-pi-controls-val">${val}</span>`
  );

const updateSliderValue = (events, el, prop, label, cb) => {
  el &&
    events.forEach((event) => {
      el.addEventListener(event, (e) => {
        root.style.setProperty(prop, el.value);
        el.parentNode.querySelector(
          `.svg-pi-controls-val`
        ).innerText = `${rootStyle.getPropertyValue(prop)}${label}`;
        if (typeof cb === "function") cb();
      });
    });
};

indicatorSlider &&
  injectSliderValue(
    indicatorSlider,
    `${rootStyle.getPropertyValue(`--svg-pi-progress`)}% progress`
  );

svgPiSizeSlider &&
  injectSliderValue(
    svgPiSizeSlider,
    `${rootStyle.getPropertyValue(`--svg-pi-size`)}px size`
  );

svgPiTrackSizeSlider &&
  injectSliderValue(
    svgPiTrackSizeSlider,
    `${rootStyle.getPropertyValue(`--svg-pi-track-size`)}px track-size`
  );

svgPiTrackPaddingSlider &&
  injectSliderValue(
    svgPiTrackPaddingSlider,
    `${svgPiTrackPaddingSlider.value}px track-padding`
  );

svgPiTrackColorPicker &&
  injectSliderValue(svgPiTrackColorPicker, `${svgPiTrackColorPicker.value}`);

svgPiIndicatorColorPicker &&
  injectSliderValue(
    svgPiIndicatorColorPicker,
    `${svgPiIndicatorColorPicker.value}`
  );

updateSliderValue(
  [`input`, `change`],
  indicatorSlider,
  `--svg-pi-progress`,
  `% progress`
);
updateSliderValue(
  [`input`, `change`],
  svgPiSizeSlider,
  `--svg-pi-size`,
  `px size`
);
updateSliderValue(
  [`input`, `change`],
  svgPiTrackSizeSlider,
  `--svg-pi-track-size`,
  `px track-size`
);
updateSliderValue(
  [`input`, `change`],
  svgPiTrackPaddingSlider,
  `--svg-pi-indicator-size`,
  `px indicator-size`,
  () => {
    let trackSize = rootStyle.getPropertyValue(`--svg-pi-track-size`),
      indicatorSize = rootStyle.getPropertyValue(`--svg-pi-indicator-size`),
      svgPiSize = rootStyle.getPropertyValue(`--svg-pi-size`);
    if (indicatorSize > trackSize) {
      root.style.setProperty(`--svg-pi-radius`, svgPiSize / 2 - indicatorSize);
    } else {
      root.style.setProperty(`--svg-pi-radius`, svgPiSize / 2 - trackSize);
    }
  }
);
updateSliderValue(
  [`input`, `change`],
  svgPiTrackColorPicker,
  `--svg-pi-track-color`,
  ``
);
updateSliderValue(
  [`input`, `change`],
  svgPiIndicatorColorPicker,
  `--svg-pi-indicator-color`,
  ``
);
