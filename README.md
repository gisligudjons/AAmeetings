# AAmeetings

Hello all!

My submission for this final projects is twofold: One live site using a local json file as the datasource, and the progress if my map using the live SQL database as the source. Reasons for that are multiple, mainly because of geographical limitations (I think?) as soon as I got to Iceland everything pretty much stopped working for some reason in AWS, tried making another account (a root account, against AWS wishes), but still It wouldn't budge. My submission therefore lies somewhere in between the subbmission options of "where you are located" and "live demo"

## The Project

The purpose of this project was to develop a workable webmap depicting the locations and information of Alcoholics Anonymous meetings in Manhattan from data supplied in archived webpages. A sample page of the original data may be seen on the website linked here: gisligudjons.github.io/AAmeetings

When I first considered the design of the project, I imagined the site would be expansive in design and features. Displaying to the user the meetings that were scheduled for that day. I also imagined buttons that would allow a user to turn on and off the selected meeting days. The user could also filter through options and the site would look more like Airbnb or a similar map based application

In the live demo the design features are the day selection along with a table of the meetings.  

## Work

First I started by parseing and passing the data to the SQL database again in a better way than before. That can be seen in the "Parse" folder in the directory. I leave out the password, just in case. This I do so It might be easier to query the data effectively.

