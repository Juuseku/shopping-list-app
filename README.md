# shopping-list-app

IMPORTANT! The database that the app uses will not be accessible from 06.12.2023
onwards. After that, the app can only be used locally. All the JS code for the
app can be found from the folder 'shopping-lists'.

Shared shopping list

The name of the application is "Shared shopping list". It can be used to track
and manage lists and the contents of the lists. Every list is its own entity
that can be accessed and deactivated when necessary.

User creates and names individual lists and is then able to access the list and
add contents to it. Contents can be then added to the list by typing into a
textbox and clicking the submit -button. The items are then visible for the user
and can be marked as "collected" by a press of a button. Marking items collected
is visible by thename being striked through. When all the necessary items are
collected and the list has done its job, the list can be deactivated by going
back and deactivating the list.

NOTE: Opening the app through the link can take a while, the database is on warm
standby Online deployment can be found from:
https://juuse-shared-shopping-lists.onrender.com

Running locally is also possible. All you have to do, is navigate to the folder
'project_I' and use the command 'docker-compose up'. This creates all necessary
containers you need. Just use your own browser and access to
http://localhost:7777/
