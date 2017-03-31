# Week 11

## Class Outline

### Introduction
- SQL with CartoDB
  - Torque for time series
  - SQL for persistent data changes

### PostgreSQL & PostGIS Resources

#### SQL Related
> Good
[postgresql FAQ](https://wiki.postgresql.org/wiki/FAQ)
[postgresql.org documentation](https://www.postgresql.org/docs/9.5/static/)
[Stack overflow](http://stackoverflow.com/)

> OK, not great
[tutorialspoint.com](http://www.tutorialspoint.com/postgresql/)
[w3 schools](https://www.w3schools.com/sql/)


#### GIS Extension Related
> Good
[PostGIS special function
index](https://postgis.net/docs/PostGIS_Special_Functions_Index.html)
[PostGIS reference docs](http://postgis.net/docs/reference.html)
[Stack exchange's GIS-specific subdomain](gis.stackexchange.com/)

#### Examples

[CartoDB Torque](./examples/torque/)
Torque.js is an open source library for creating dynamic visualizations for
your time series data on top of Leaflet (and with the help of CartoDB).
If you're dealing with time and space, Torque can build compelling
visualizations ranging over both dimensions.


[CartoDB SQL Updates](.examples/writing-data/)
> Keeping API keys in client applications is NOT a safe practice.
> Do NOT use the techniques practiced in this lab in the wild.

It is possible to persist data with CartoDB. We'll take a look at how
it can be done and practice building an application which manages user
input.



