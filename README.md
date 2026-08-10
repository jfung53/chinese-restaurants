# Mapping Every Chinese Restaurant Across the US
---

Please read the full story on my [ArcGIS Storymaps site](https://storymaps.arcgis.com/stories/73dfdb3d0b654a9aa9ce8b2bbb27495b)

## Hypothesis

Every time I'm on a road trip I’ve noticed that there always seems to be at least one Chinese restaurant in every city or town, no matter how small. This is interesting because although Chinese food is ubiquitous and popular across the country, Chinese people only make up 1.6% of the entire country. Many businesses that serve specific ethnicities tend to be spatially clustered in ethnic enclaves. Does that apply to Chinese restaurants, too? 

My null hypothesis is that Chinese restaurant locations are spatially random. Do small towns have higher Chinese-restaurant-to-Chinese-people ratios than big cities?  

While I was able to identify statistically significant Chinese population clusters in urban areas, but I'm still looking for the right tools to reject my null hypothesis. I probably also need to add some sort of control, like restaurants and populations of other ethnicities. 

---

## Workflow Notes

For this project I used a combination of ArcGIS, Python, R, and Observable Plot. These are the most useful files:  

### Restaurant Data

I used point-of-interest data from Foursquare Open Source Places on Hugging Face to get Chinese restaurants

Restaurant categories: [`fsq_categories.txt`](https://github.com/jfung53/chinese-restaurants/blob/main/fsq_categories.txt)  
Restaurant data processing: [`fsq_openplaces.ipynb`](https://github.com/jfung53/chinese-restaurants/blob/main/fsq_openplaces.ipynb)  
Chinese restaurant data prep: [`fsq_chinese_restaurants.ipynb`](https://github.com/jfung53/chinese-restaurants/blob/main/fsq_chinese_restaurants.ipynb)  
Exported restaurant data for GIS analysis: [`chinese_restaurants_cleaned.csv`](https://github.com/jfung53/chinese-restaurants/blob/main/chinese_restaurants_cleaned.csv)

### Census Data

I grabbed population data at the census tract level for general population numbers and Chinese populations (alone or in combination with any other ethnicity). 

R files and exports: [`census-data`](https://github.com/jfung53/chinese-restaurants/tree/main/census-data)

### Analysis

I exported a number of tables from ArcGIS for analysis and charting. 

Number of Chinese restaurants per census tract: [`restaurant_count_per_tract.csv`](https://github.com/jfung53/chinese-restaurants/blob/main/restaurant_count_per_tract.csv)  
Restaurant list with locale types assigned: [`us_restaurants_with_locales.csv`](https://github.com/jfung53/chinese-restaurants/blob/main/us_restaurants_with_locales.csv)  
Needs fixing: Population numbers per census tract: [`table_population.csv`](https://github.com/jfung53/chinese-restaurants/blob/main/table_population.csv)  
Exported cluster/outlier results joined with locale type: [`ClusterOutlier_with_locales_ExportTable.csv`](https://github.com/jfung53/chinese-restaurants/blob/main/ClusterOutlier_with_locales_ExportTable.csv)  
Grouped cluster/outlier analysis results: [`clusters_grouped.csv`](https://github.com/jfung53/chinese-restaurants/blob/main/clusters_grouped.csv)  

