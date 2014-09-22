# IPython Bootstrap Widgets
The standard IPython Notebok [widgets][] are enough to get the job done for most 
quick layouts. If you are building richer applications, it's pretty nice to have 
access to all of the lovely Twitter Bootstrap baseline CSS and components. You 
could hack in some additional features with `add_class`, but this is cumbersome 
for one-off widgets, and limiting for more complex ones.

This library extends existing widgets, like enhanced versions of `Button`, while
adding new containers, typographic elements and layouts. See the [roadmap][] to
get an idea of what is done and what is left to do.

[roadmap]: #roadmap
[widgets]: http://nbviewer.ipython.org/github/ipython/ipython/blob/master/examples/Interactive%20Widgets/Index.ipynb

# Installation/Development
While still in development, the best way to try this out would be:

```bash
pip install -e git+https://github.com/bollwyvl/ip-bootstrap.git#egg=IPythonBootstrap
```

# Usage Example
```python
from ipbs.widgets import Panel, Label, Button, Icon
from ipbs.bootstrap import Context
from ipbs.icons import FontAwesome
fa = FontAwesome()

fro = Button(body=[Icon(fa.empire * 2), Label("Fro")], context=Context.danger)
boz = Button(body=[Icon(fa.rebel * 2), Label("Boz")], context=Context.primary)
Panel(
    title="Frobnosticator",
    body=[fro, boz],
    footer="Millions and millions of frobs bozzed",
    context=Context.success
)
```
![example panel](https://raw.githubusercontent.com/bollwyvl/ip-bootstrap/master/docs/img/Panel.README.png)

Check the example notebooks in the [docs][], or on [nbviewer][].

[docs]: https://github.com/bollwyvl/ip-bootstrap/tree/master/docs
[nbviewer]: http://nbviewer.ipython.org/github/bollwyvl/ip-bootstrap/tree/master/docs/

# Roadmap 
> not neccessarily in order!
See something else that makes sense to add?
[Suggest a change!](./edit/master/README.md)

- CSS
  - [ ] Grid
  - [ ] Table
  - [ ] Forms 
  - [X] Button
  - Typography
    - [X] Lead
    - [X] Transform 3.2?
    - [X] Alignment 3.2?
- Components
  - [ ] Glyphs (Glyphicons)
    - needed?
  - [ ] Input Group
  - [ ] Navbar
  - [ ] Badges
  - [ ] Alert
  - [ ] Wells
  - [X] Button Group
  - [X] Button Toolbar
  - [X] Panel
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
  - [X] FontAwesome
  - [ ] [bootstrap-datepicker](https://github.com/eternicode/bootstrap-datepicker)
  - [ ] [bootstrap-colorpicker](https://github.com/mjolnic/bootstrap-colorpicker)
