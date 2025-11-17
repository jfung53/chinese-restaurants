setwd("/Users/jocelyn/Documents/Pratt/612-advanced-gis/chinese-restaurants/census-data")
library(tidyverse)
library(tidycensus)
library(dplyr)
library(stringr)
library(sf)

census_api_key("e765fd46add9ecff24174462fb36873559ba91e7")

# set up variables to grab

# race variables
race <- c(
  pop = "B02001_001E",
  asian = "B03002_006",
  black = "B03002_004",
  hispanic = "B03002_012",
  white = "B03002_003")

# ethnicity variables
# fb = foreign born place of birth
# combo = more than one ethnicity
# for later maybe: B06004 - place of birth in the united states by race
ethnicity <- c(
  pop = "B02001_001E",
  asian_alone = "B02015_001E", # B02015 asian alone by selected groups
  chinese = "B02015_002E",
  taiwanese = "B02015_008E",
  combo_asian = "B02018_001E", # B02018 asian alone or in any combination with one or more other races
  combo_chinese = "B02018_002E")

place_of_birth_foreignborn <- c(
  fb_asian = "B05006_047E", # B05006 place of birth for the foreign-born population
  fb_eastasian = "B05006_048E",
  fb_china = "B05006_049E",
  fb_china_exclHKTaiwan = "B05006_050E",
  fb_hongkong = "B05006_051E",
  fb_taiwan = "B05006_052E")


# variable that includes all the states plus DC and Puerto Rico (PR is included in the US Foursquare data)
all_states <- c(state.abb, "DC", "PR")

# get data from 2023 ACS 5-year estimates
data_race <- get_acs(geography = "county",
                     geometry = TRUE,
                     variables = race,
                     #state = all_states,
                     year = 2023,
                     output = "wide")

data_ethnicity <- get_acs(geography = "county",
                     geometry = TRUE,
                     variables = ethnicity, 
                     #state = all_states,
                     year = 2023,
                     output = "wide")

# need to check if there's a variable that cross-references this with race or ethnicity
data_pob_foreignborn <- get_acs(geography = "tract",
                                geometry = TRUE,
                                variables = place_of_birth_foreignborn,
                                year = 2023,
                                output = "wide")

ls(data_race)
ls(data_ethnicity)
ls(data_pob_foreignborn)

# removing the columns i don't need
# removing margin of error variables
data_race <- data_race %>% select(c(
  GEOID,
  pop,
  asianE,
  blackE,
  hispanicE,
  whiteE,
  geometry))

data_ethnicity <- data_ethnicity %>% select(c(
  GEOID,
  pop,
  asian_alone,
  combo_asian,
  chinese,
  combo_chinese,
  taiwanese))

data_pob_foreignborn <- data_pob_foreignborn %>% select(-c(B05006_047M, B05006_048M, B05006_049M, B05006_050M, B05006_051M, B05006_052M))

# exports to bring into ArcGIS
write.csv(data_race, "acs2023_race_by_tract.csv", row.names=FALSE)
write.csv(data_ethnicity, "acs2023_ethnicity_by_tract.csv", row.names=FALSE)
write.csv(data_pob_foreignborn, "aces2023_pob_foreignborn.csv", row.names=FALSE)

st_write(data_race, "acs2023_race_by_county.shp")
st_write(data_ethnicity, "acs2023_ethnicity_by_county.shp")
st_write(data_pob_foreignborn, "acs2023_pob_foreignborn.shp")
