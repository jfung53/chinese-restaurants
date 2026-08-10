setwd("/Users/jocelyn/Documents/Pratt/612-advanced-gis/chinese-restaurants/")

library(dplyr)

data <- read.csv("chinese_restaurants_cleaned.csv")
dim(data)
head(data)
ls(data)

restaurants_table <- table(data$region[data$country == "US"])

# examining rows where region is NA, empty, or whitespace only
no_state <- data %>% filter(is.na(region) | trimws(region) == "")

# restaurants per state
cr_per_state <- as.data.frame(restaurants_table)

# export to csv
write.csv(cr_per_state, "ch_restaurants_per_state.csv", row.names = FALSE)
