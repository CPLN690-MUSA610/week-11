# Week 10, Assignment — Interactive CartoDB mapping

After completing lab 1, you should have a map that is styled as you
would like and which is ready to be used in an external application.
Feel free to use code from the provided example to get started. If you
do copy code over from the example directory, be sure to test any analogous
uses one piece at a time.


Your map should tell a simple story. In this sense, it should similar to
a slide from the midterm (though perhaps more complex).

Your application must  have the pieces to of functionality below
(useful resources listed below the requirement where necessary) -
feel free to expand beyond the minimal case.

1. Add interactivity which changes the SQL used to grab data. (The
   interactivity can be fairly trivial [not boring], just demonstrate
   the ability to interact via CartoDB's SQL. Don't just copy the
   example's SQL!):
  - [Layer methods](http://docs.cartodb.com/cartodb-platform/cartodb-js/api-methods/#cartodbcartodblayer) (`getSubLayer`, in particular)
  - [SubLayer methods](http://docs.cartodb.com/cartodb-platform/cartodb-js/api-methods/#cartodbcartodbsublayer) (`setSQL`, in particular)

2. Customize a popup window which neatly displays a few pieces of
   information and uses at least one bootstrap class. There are
   two strategies for doing this:
  1. Writing the HTML for your info window in the cartodb web application
  OR
  2. [custom interaction through JS](http://docs.cartodb.com/tutorials/custom_interactivity/)

3. Add some style to your map which makes the data it represents clear

4. Add a legend which illustrates the meaning of your map's colors

5. Add a means of getting data from your CartoDB account to the sidebar
   (refer to the example for one such case).

