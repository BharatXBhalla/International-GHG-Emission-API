# International-GHG-Emission-API

Api is build around International-GHG-Emission Dataset https://www.kaggle.com/abhijittripathy/ghg-emission-analysis/data

Open API Specs : https://app.swaggerhub.com/apis-docs/bharat295/international-ghg_api/1.0.0


## Goal
Goal is to build api for following endpoints:

 - /countries - get all countries in the dataset (names, ids and their possible values for startYear and endYear)
- /country/id?queries=explained-below
---- temporal queries - startYear | endYear
---- parameters queries - one or parameters (e.g, CO2 or CO2 and NO2)
---- should return all values for the selected parameters between startYear and endYear
- Add appropriate checks for queries and erroneous values
- Bonus Features:
---- Add caching
-  Clean this dataset as per the needs mentioned above and store it in any database of your choice

