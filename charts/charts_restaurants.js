restaurants = FileAttachment("restaurants_by_tract.csv").csv({typed: true})

filteredLocales = restaurants.filter(d => 
  d.LOC_NAME === "Fringe Town" || 
  d.LOC_NAME === "Distant Town" || 
  d.LOC_NAME === "Remote Town"
)

normalizedLocales = filteredLocales.map(d => ({
  ...d,
  normalizedCount: d.Join_Count / d.population
}))

Plot.plot({
    inset: 8,
    grid: true,
  y: {
    domain: [0, 120]
  },
    color: {
      legend: true,
    },
    marks: [
      Plot.dot(restaurants, {x: "whiteE", y: "Join_Count", stroke: "LOC_NAME"})
    ]
  })

  restaurantsByLocale = Array.from(
    d3.group(restaurants, d => d.LOC_NAME),
    ([LOC_NAME, values]) => ({
      LOC_NAME,
      Join_Count: d3.sum(values, d => d.Join_Count)
    })
  ).sort((a, b) => a.Join_Count - b.Join_Count)

  Plot.plot({
    inset: 8,
    grid: true,
    y: {
      domain: restaurantsByLocale.map(d => d.LOC_NAME)
    },
    marks: [
      Plot.barX(restaurantsByLocale, {y: "LOC_NAME", x: "Join_Count", fill: "LOC_NAME"})
    ]
  })

  restaurants = FileAttachment("us_restaurants_with_locales.csv").csv({typed: true})

  filteredRestaurants = restaurants.filter(d => 
    d.LOC_NAME === "Fringe Town" || 
    d.LOC_NAME === "Distant Town" || 
    d.LOC_NAME === "Remote Town"
  )

  restaurantsByState = Object.entries(
    filteredRestaurants.reduce((acc, d) => {
      acc[d.region] = (acc[d.region] || 0) + 1;
      return acc;
    }, {})
  ).map(([region, count]) => ({ region, count }))
   .sort((a, b) => b.count - a.count)
   .slice(0, 10)

// states with the most restaurants in small towns
Plot.plot({
    marginLeft: 100,
    inset: 8,
    grid: true,
    y: {
      domain: restaurantsByState.map(d => d.region)
    },
    marks: [
      Plot.barX(restaurantsByState, {y: "region", x: "count"})
    ]
  })

  takeout = FileAttachment("takeout.svg").image()

  takeoutData2 = restaurantsByState
    .map(function (d) {
      let icons = [];
      let iconCount = Math.floor(d.count / 10);
      let i;

      for (i = 0; i < iconCount; i++) {
        icons.push({
          region: d.region,
          iconX: (i + 0.5) * 10,
          count: d.count
        });
      }
      return icons;
    })
    .reduce(function (acc, val) {
      return acc.concat(val);
    }, [])

takeoutChart = Plot.plot({
  inset: 8,
  grid: true,
  marginLeft: 100,
  y: {
    domain: restaurantsByState.map((d) => d.region),
    tickSize: 0,
    grid: null,
    label: null
  },
  x: { 
    label: null,
    tickSize: 0,
    domain: [0, Math.max(...restaurantsByState.map(d => d.count))]
  },
  marks: [
    Plot.image(takeoutData2, { 
      x: "iconX", 
      y: "region", 
      src: () => takeout.src || takeout, 
      width: 15, 
      height: 15,
      title: d => `${d.count} restaurants in small towns`
    })
  ]
})

legend = html`
  <div style="display: flex; align-items: center; gap: 8px; margin-top: 10px; font-size: 12px; justify-content: center;">
    <img src=${takeout.src || takeout} width="15" height="15" style="object-fit: contain;">
    <span>1 container = 10 restaurants</span>
  </div>
`

html`<div>${takeoutChart}${legend}</div>`