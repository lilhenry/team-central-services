# PRINCE GEORGE’S COUNTY CENTRAL SERVICES EXPENDITURES BUDGET BREAKDOWN
## Arion Askins, Joelle Everettt, Lillian Henry<br>
[App Link, here!](https://team-central-services.herokuapp.com/)

## Information Problem
Most residents of Prince George's County don't have easy access to how county money is being used. For many citizens, the central services expenditures specifically is not a very well known or clarified part of the county budget. This leaves thousands of people in the dark about where their tax payer money is going and how it is being used. Limited access to this information makes it almost impossible for residents to discern whether the best solutions and decisions are being made for the county and their communities.

## Identified Stakeholders/Target Browsers
* **Prince George's County Government**
The Prince George's County government would obviously be a stakeholder in this project because we would hope that the government has an interest in the success of this project and wants to see their citizens more informed and involved.

* **Residents of Prince George's County**
The residents of Prince George's County  are stakeholders because they are being directly impacted by the outcome of our application. Should our project be successful they would be able to access and understand their local government spending and how their tax money is being utilized. 

## Data You Chose to Work With

We are working with budget data from PG county; specifically, a dataset of fiscal year spending information by payment disclosure.

## Chosen Strategies/Solutions

We chose to create an app that provides two ways in which a user can view the data: a bar chart and a search bar.

Including these two functionalities allows for interaction with both aggregate data (in the bar chart) and pinpointed queries (in the search bar). These are easy to use and provide multiple attributes with which a user can analyze specific aspects of county expenditures. For example, if someone is interested in the primary purposes of Prince George's County's expenditures, they may choose to generate a bar chart based on the agency to see where relative proportions of money are going. Or, if they want to confirm whether the county has a contract with a certain company, they can use the search bar to find transactions with specific payees.

## Technical System Decision Rationale
We chose to use Bulma for a plethora of reasons. First, Bulma is responsive. It will look great on both mobile and desktop, and based on flexbox, our favorite! Second, it's modular.. Bulma allowed us to pick and choose relevant elements such as tabs, navigation bar, dropdown (and more!). Lastly, it's aesthetic was appealing. Bulma builds beautiful minimalist pages that will make our app look modern.

## How Our Final System Adressess the Problem

## Challenges Faced and Impact on Final Design
* One of our first challenges was realizing retrieval was limited to 1000 records at a time. Our initial solution to part of this issue would be use of a token, but we did not have enough time to implement one for a greater volume of data intake
* Another challenge we faced was having to reduce our bar chart options. A closer look at the data revealed values for two columns were nearly always the same. We decided columns with no distinguishable categories were useless for drawing conclusions and eliminated them from our options
* Functions inside event listeners inside functions inside event listeners. Complicated script was difficult to debug and data ended up getting lost or passed incorrectly. To resolve this we implemented a main thread that eliminated nesting and was able to handle all event listeners and functions.

## Next Steps

If we were to continue developing this application, our main focus would be on more rigorous preprocessing of the data and on improving the matching of the search function.

First, since the process of creating a bar chart category/bar relies upon finding exact matches for the column of interest and grouping them together, we have found that misspellings or slight differences in data entry can cause individual elements that convey the same information to be categorized into different bars. Thus we would attempt to incorporate preprocessing to catch entries that have essentially identical category values and resolve the small differences in the elements of data such that the bar chart accurately displays each bar, without duplicates.

Second, our search bar currently only searches based on exact matches, and we think that being able to match using a sort of regular expression concept and/or a similarity measure could greatly expand the usefulness of this function. Giving the query some flexibility could return a much more well-rounded result set, as being able to add other dimensions of the data to the face value of the exact query could provide new insights. For example, if someone searched a city name in an area they are interested in, the search function could also provide results based on the zip code that corresponds to that city, to offer some help and expand the possible results.<br>
<br>[link to final doc/manual](/docs/final.md)
=======
## PRINCE GEORGE’S COUNTY CENTRAL SERVICES EXPENDITURES BUDGET BREAKDOWN
#### Arion Askins, Joelle Everettt, Lillian Henry

## App Description

[External link to our App!](https://team-central-services.herokuapp.com/)

* Designed for mobile and desktop platforms!

[Full Developer Manual accessible here!](docs/final.md)

