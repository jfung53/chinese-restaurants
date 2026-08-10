// First, load your data (assuming you've uploaded locales_df.csv to Observable)
// Or if you have it as a file reference:
// locales_df = FileAttachment("locales_df.csv").csv({typed: true})

// Sort by locale_code descending (most rural first)
plot_df = locales_df
  .sort((a, b) => b.locale_code - a.locale_code);

Plot.plot({
marginLeft: 150,
marginBottom: 48,
y: {
    label: null,
    domain: plot_df.map((d) => d.LOC_NAME),
    grid: null
},
x: {
    label: "Chinese restaurants per 100 Chinese people",
    labelAnchor: "center",
    grid: true
},
marks: [
    Plot.barX(plot_df, {
    y: "LOC_NAME",
    x: "restaurants_per_100chppl",
    fill: "deeppink",
    title: (d) => `Avg % Chinese: ${d.avg_ch_pct.toFixed(2)}%`
    })
],
width: 800,
height: 400
})

// vary opacity by distance: not using this one

Plot.plot({
marginLeft: 150,
marginBottom: 48,
y: { 
    label: null,
    domain: plot_df.map(d => d.LOC_NAME),
    grid: null
},
x: { 
    label: "Chinese restaurants per 100 Chinese people",
    labelAnchor: "center",
    grid: true
},
marks: [
    Plot.barX(plot_df, {
    y: "LOC_NAME",
    x: "restaurants_per_100chppl",
    fill: "deeppink",
    opacity: (() => {
        const min = Math.min(...plot_df.map(d => d.avg_distance));
        const max = Math.max(...plot_df.map(d => d.avg_distance));
        const range = max - min;
        return d => 1 - ((d.avg_distance - min) / range) * 0.7;
    })(),
    title: d => `Avg distance to Chinese restaurant\n${d.avg_distance.toFixed(1)} km`
    })
],
width: 800,
height: 400
})

// icons instead of bars and dots

// Load SVG icons
takeout = FileAttachment("takeout.svg").image();
carSide = FileAttachment("car-side@2.svg").image();
takeoutHalf = FileAttachment("takeout-half.svg").image()

// Expand data to create individual icon positions for takeout boxes
// Each icon represents 1 restaurant, positioned at 0.5, 1.5, 2.5, etc.
takeoutData = plot_df
  .map(function (d) {
    let icons = [];
    let value = d.rest_simplified;
    let fullCount = Math.floor(value);
    let partial = value - fullCount;
    let i;

    // Full icons - positioned at 0.5, 1.5, 2.5, etc.
    for (i = 0; i < fullCount; i++) {
      icons.push({
        LOC_NAME: d.LOC_NAME,
        rest_simplified: d.rest_simplified,
        avg_ch_pct: d.avg_ch_pct,
        avg_distance: d.avg_distance,
        iconX: i + 0.5,
        isPartial: false
      });
    }

    if (partial > 0) {
      icons.push({
        LOC_NAME: d.LOC_NAME,
        rest_simplified: d.rest_simplified,
        avg_ch_pct: d.avg_ch_pct,
        avg_distance: d.avg_distance,
        iconX: fullCount + 0.5,
        isPartial: true,
        partialRatio: partial
      });
    }

    return icons;
  })
  .reduce(function (acc, val) {
    return acc.concat(val);
  }, [])

// Plot with half-takeout icons

Plot.plot({
    marginLeft: 130,
    marginBottom: 48,
    insetLeft: 12,
    y: {
        label: null,
        domain: plot_df.map((d) => d.LOC_NAME),
        grid: null,
        ticks: null,
        tickSize: 0,
        dy: -2
    },
    x: {
        label: "Chinese restaurants per 100 Chinese people",
        labelAnchor: "center",
        grid: true
    },
    marks: [
        // Full takeout box icons for restaurants
        Plot.image(takeoutData.filter(d => !d.isPartial), {
            x: "iconX",
            y: "LOC_NAME",
            src: () => takeout.src || takeout,
            width: 20,
            height: 24,
            title: d => `Avg % Chinese: ${d.avg_ch_pct.toFixed(2)}%`
        }),
        // Half takeout box icons for partial restaurants
        Plot.image(takeoutData.filter(d => d.isPartial), {
            x: "iconX",
            y: "LOC_NAME",
            src: () => takeoutHalf.src || takeoutHalf,
            width: 20,
            height: 24,
            title: d => `Avg % Chinese: ${d.avg_ch_pct.toFixed(2)}%`
        }),
        // Car icons for average distance  
        Plot.image(plot_df, {
            x: "avg_distance",
            y: "LOC_NAME",
            src: () => carSide.src || carSide,
            width: 16,
            height: 16,
            title: d => `Avg distance: ${d.avg_distance.toFixed(1)} km`
        })
    ],
    width: 800,
    height: 400
    })

// cars and bars 

plotLocales_cars = Plot.plot({
  marginLeft: 150,
  marginBottom: 48,
  y: {
    label: null,
    domain: plot_df.map((d) => d.LOC_NAME),
    grid: null,
    tickSize: 0
  },
  x: {
    label: null,
    grid: true
  },
  marks: [
    Plot.barX(plot_df, {
      y: "LOC_NAME",
      x: "restaurants_per_100chppl",
      fill: "deeppink",
      title: (d) => `Avg % Chinese: ${d.avg_ch_pct.toFixed(2)}%`
    }),
    Plot.image(plot_df, {
      x: "avg_distance",
      y: "LOC_NAME",
      src: () => carSide.src || carSide,
      width: 20,
      height: 18,
      title: (d) => `Avg distance: ${d.avg_distance.toFixed(1)} km`
    }),
    Plot.tip(plot_df, {
      x: "restaurants_per_100chppl",
      y: "LOC_NAME",
      title: (d) => `${d.LOC_NAME}
Chinese restaurants per 100 Chinese people: ${d.restaurants_per_100chppl.toFixed(2)}
Avg distance: ${d.avg_distance.toFixed(1)} km
Avg % Chinese: ${d.avg_ch_pct.toFixed(2)}%`
    })
  ],
  width: 800,
  height: 400
})

legend = html`
  <div style="display: flex; gap: 20px; margin-top: 10px; font-size: 12px; justify-content: center;">
    <div style="display: flex; align-items: center; gap: 8px;">
      <div style="width: 20px; height: 12px; background: deeppink;"></div>
      <span>Chinese restaurants per 100 Chinese people</span>
    </div>
    <div style="display: flex; align-items: center; gap: 8px;">
      <img src=${carSide.src || carSide} width="20" height="18" style="object-fit: contain;">
      <span>Avg distance to Chinese restaurant</span>
    </div>
  </div>
`

html`<div>${plotLocales_cars}${legend}</div>`


plotLocales_cars = Plot.plot({
  marginLeft: 150,
  marginBottom: 48,
  y: {
    label: null,
    domain: plot_df.map((d) => d.LOC_NAME),
    grid: null,
    tickSize: 0
  },
  x: {
    label: null,
    grid: true
  },
  marks: [
    Plot.barX(plot_df, {
      y: "LOC_NAME",
      x: "restaurants_per_100chppl",
      fill: "deeppink"
    }),
    Plot.image(plot_df, {
      x: "avg_distance",
      y: "LOC_NAME",
      src: () => carSide.src || carSide,
      width: 20,
      height: 18
    }),
    Plot.tip(plot_df, Plot.pointer({
      x: "avg_distance",
      y: "LOC_NAME",
      title: (d) =>
        `${d.LOC_NAME}
Avg % Chinese people: ${d.avg_ch_pct.toFixed(2)}%
Avg distance: ${d.avg_distance.toFixed(1)}km`
    }))
  ],
  width: 800,
  height: 400
})





