# IPython Bootstrap Widgets
The standard IPython widgets are enough to get the job done for most quick 
layouts. If you are building richer applications, it's pretty nice to have 
access to all of the lovely Twitter Bootstrap baseline CSS and components. You 
can hack in some additional features with `add_class`, but this is annoying for
one-off widgets.

This library extends existing widgets, like enhanced versions of `Button`, 
`Dropdown` and others, while adding new containers and display options for 
others.



# Roadmap (not neccessarily in order!)
- CSS
  - [ ] Grid
  - [ ] Table
  - [ ] Forms 
  - [X] Button
    - Allows more content than just `description`, colors, sizes, etc.
- Components
  - [ ] Glyphs (Glyphicons)
    - [ ] FontAwesome
  - [X] Button Group
  - [X] Button Toolbar
  - [ ] Input Group
  - [ ] Navbar
  - [X] Panel
  - [ ] Badges
  - [ ] Alert
  - [ ] Wells
- JavaScript
  - [ ] Tooltip
  - [ ] Popover
  - [ ] Alert
  - Button
    - [ ] Single Toggle
    - [ ] Checkbox
    - [ ] Radio
  - [ ] Carousel
  - [ ] Affix
- Third-Party
  - [ ] [bootstrap-datepicker](https://github.com/eternicode/bootstrap-datepicker)
  - [] [bootstrap-colorpicker](https://github.com/mjolnic/bootstrap-colorpicker)