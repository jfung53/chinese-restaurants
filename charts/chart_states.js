plotStates2 = Plot.plot({
  height: 400,
  r: {
    range: [0, 30]
  },
  x: {
    grid: null,
    tickSize: 0,
    label: null,
    axis: null
  },
  y: {
    grid: null,
    tickSize: 0,
    label: null,
    padding: 1
  },
  marks: [
    Plot.dot(chinesePeople, {
      x: 0,
      y: "state",
      r: "population",
      fill: "deeppink",
      sort: { y: "r", reverse: true },
      tip: true,
      title: (d) => d.population
    })
  ]
})