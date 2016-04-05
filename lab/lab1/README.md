# Week 10, Lab 1 — the CartoDB interface

"Premature optimization is the root of all evil" -Donald Knuth

So far in this class, we've written web applications without the
assistance of servers on the backend doing complex data analysis for us.
These days, you can get pretty far with such a configuration - two weeks
ago, we saw that you can even do complex spatial analysis and joins
without needing to add the complexity of a server. Two or three years
ago, this would have been impossible.
There remain limits to this approach however - as some in the course have
no doubt discovered in their attempts to use large datasets. The browser
is just not performant enough to work with tens of thousands of points.
It is fair to ask, then, whether the front-end-only approach is best for
learning to build spatial applications on the web. Ultimately, we chose
this path because
1. it is simple (both pedagogically and technologically)
2. the tools (like turf.js and leaflet.js) are mature and battle-tested
3. there are hosted tools which obviate the need for writing a server if
   all you need is a database

CartoDB is the answer to our third problem. It is free (up to a point
and for most features), hosted for us, and extremely simple (insofar as a
tool of this complexity could be). The tasks in this lab can all be done
from within your CartoDB account and require no writing of code.


## Task 1 - loading datasets

Load two datasets into your CartoDB account which have some spatially
meaningful relationship to one another. Come up with a question that you
would like to answer about one of the datasets in terms of the other.
e.g. "How many airports exist in each country?"

You can use any datasets you like, but be sure to explore the `Data Library`
(located at: {your-username}.cartodb.com/dashboard/datasets/library).
You can also find datasets that others have created or used through
CartoDB's gallery.

Note: Most likely, one of the datasets should contain polygons so that a spatial
join can meaningfully be carried out.


## Task 2 - creating a spatially joined dataset

Now that you've got two tables, we need to merge them together. Use the
CartoDB web interface to carry out the spatial join (called a 'merge' in
CartoDB's terminology).

Note: Make sure that your datasets contain a `the_geom` field. CartoDB
is fairly smart, so this was likely added for you. If not, you can
specify it manually.


## Task 3 - testing SQL in the browser

By default, `select * from {tablename};` is loaded into the SQL panel.
This tells CartoDB (through its underlying Postgres SQL database) which
pieces of data to return. Nearly all the functionality of a SQL database
is at your disposal here: from queries which run through the data and return
summary statistics to queries which return (and map!) a subset of data according to
the SQL filter (a `WHERE` clause) you provide.

Your task is to find two queries which reveal something interesting
about your data or answer a question someone might have. For example, if
I wanted to see where thefts are occurring, I might use the following:
```sql
SELECT * FROM crimes_table WHERE crime_type = 'theft';
```
Write your queries down - we'll be using them later.  

- [CartoDB SQL query
docs](http://academy.cartodb.com/courses/sql-postgis/intro-to-sql-and-postgis/)
- [Third party SQL WHERE docs](http://www.w3schools.com/sql/sql_where.asp)
- [PostGIS reference](http://postgis.net/docs/reference.html) (advanced)


## Task 4 - filters interface

Above, we produced some filters directly in the SQL statement that
CartoDB uses to grab data. There is also a helpful user interface for
filters if they're not too complex. Construct interesting filters and
take a look at the SQL produced by those filters - this is a handy
first step in searching for meaningful ways to cut data.


## Task 5 - styling your maps

In addition to managing data for you, CartoDB provides tools for
styling the presentation of that data. This is useful if your goal is to
merely present some data with the help of CartoDB but also if you intend
to use CartoDB to serve tiles for your application (which we'll cover
in lab 2).

In the map view, use the 'wizard' interface to visualize the spatial join
you carried out in step 1. For instance, if I joined airport point
data onto country polygons so as to produce a count of airports within
each country, a choropleth coloring the various quantiles could quickly
convey differences between the countries. Try to make this meaningful -
categorical colorings are often more useful than choropleth so think
about what your data can meaningfully tell you.


## Task 6 - playing with CartoCSS

Under the covers, CartoDB uses a variant of the CSS that we're already
familiar with from styling HTML. In the previous task, we changed the
map's style with the help of an interface. Take a look at the CSS tab to
see the code it generated.

Manually change the values to get a sense of how the map responds to
differences in CartoCSS.


# Task 7 - change interaction

In the map interface, click on one of the geometries you've added.
There, you can customize which fields are presented when that geometry
is clicked on. Select at least one field to be displayed when your
geometry is clicked.


# Task 8 - publish your map

At this point, we should have a fully functional map ready to be
published to the web. Click `Publish` in the top right, and grab the
CartoDB.js link for later use in the assignment.


