Plot.plot({
    width: 280,
    height: 500,
    marginLeft: 110,
  marginBottom: 50,
    padding: 0,
    insetBottom: -5,
    y: { 
      label: null, 
      tickSize: 0,
      tickFormat: (code) => {
        const localeMap = new Map(clusters.map(d => [d.Loc_CODE, d.LOC_NAME]));
        return localeMap.get(code) || code;
      }
    },
    x: { label: "Cluster/Outlier type", tickSize: 0, labelOffset: 35 },
    color: { legend: true, zero: true, label: "restaurant-to-chinese ratios" },
    marks: [
      Plot.cell(
        clusters,
        Plot.group(
          { fill: "first" },
          { x: "COType", y: "Loc_CODE", fill: "percentage", inset: 0.8 }
        )
      )
    ]
  })