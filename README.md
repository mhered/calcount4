# calcount4
A simple calorie counter app made using the [Atri framework](https://github.com/Atri-Labs/atrilabs-engine) for Hacktoberfest'22

Select food items from the Dropdown menu and click the Add button to add them to the table. The app updates the table with the content of calories and nutrients of the foods consumed during the day and also updates the graph with the total intake of nutrients and calories during the last 7 days. 

![calories](assets/images/calories.gif)

See the [Demo in github pages](https://mhered.github.io/calcount4/)

Sources: 
* Nutritional data of selected foods from https://www.webmd.com/diet/healthtool-food-calorie-counter
* Estimated calories for the different nutrients from https://www.wikihow.com/Calculate-Food-Calories
* Target daily intake of calories and nutrients estimated freely using inputs from https://www.menshealth.com/nutrition/a19537348/how-much-fat-and-carbs-should-you-eat/ and https://www.healthline.com/nutrition/how-many-calories-per-day#calculator 

Note: there seems to be some issue with the conda installed in my system, the environment keeps activating itself when I issue `pipenv shell` :

```
(base)$ mkdir calcount4 && cd calcount4
(base)$ conda deactivate
$ pipenv install atri
$ pipenv shell
(calcount4)(base)$ conda deactivate
(calcount4)$ atri start
```



## Build and deploy app
Update the [demo app](https://mhered.github.io/calcount4/) after `git commit` and `git push` of new source code

Note: atri commands must run from source directory and inside the pipenv environment, so if neeced do:
```bash
$ cd calcount4
$ pipenv shell
(calcount4)(base)$ conda deactivate
(calcount4)calcount4$
```
The first time, add `organizationName` and `projectName`  [./atri_app/atri-server-info.json](./atri_app/atri-server-info.json)

Following times just build and deploy with:

```bash
$ atri build ssg
$ GIT_USER=<username> atri deploy ssg --gh-pages
```
