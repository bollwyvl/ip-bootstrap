casper.notebook_test ->
  @then ->
    @viewport 1024, 768
    @execute_cell @append_cell """
      from ipbs.widgets import (
          Button,
          ButtonGroup,
          ButtonToolbar,
      )
      import ipbs.bootstrap as bs
      
      groups = [
          ButtonGroup(children=[
              Button(description=x) for x in ["foo", "bar", "baz"]
          ]) for g in range(3)
          ]
      bar = ButtonToolbar(children=groups)
      """, "code"
  
  @wait_for_idle()

  @then -> @execute_cell @append_cell "bar", "code"

  @wait_for_idle()

  selector = ".widget-area .ipbs.ButtonToolbarView"

  @then -> @test.assertExists selector, "created"
  @then -> @capturePadded "docs/img/ButtonToolbar.png", selector
