# Week 10, Assignment — Interactive CartoDB mapping

After completing lab 1, you should have a map that is styled as you
would like and which is ready to be used in an external application.
`index.html` currently illustrates the simplest way to use CartoDB for
serving map tiles. Replace `layerUrl`'s current value with the URL
received when publishing your map.

You should add a few pieces to make the application more complete
(useful resources listed below each requirement):
1. Add interactivity which changes the SQL used to grab data. (The
   interactivity can be fairly trivial or uninteresting, just
demonstrate *some* ability to interact via CartoDB's SQL):
  - [Layer methods](http://docs.cartodb.com/cartodb-platform/cartodb-js/api-methods/#cartodbcartodblayer) (`getSubLayer`, in particular)
  - [SubLayer methods](http://docs.cartodb.com/cartodb-platform/cartodb-js/api-methods/#cartodbcartodbsublayer) (`setSQL`, in particular)
2. Customize a popup window which neatly displays a few pieces of
   information and uses at least one bootstrap class. Two strategies for
   doing this
  - Writing the HTML for your info window in the cartodb web application
  - [custom interaction through JS](http://docs.cartodb.com/tutorials/custom_interactivity/)

