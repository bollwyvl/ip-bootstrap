casper.test.begin "Button Group", ->
  casper.notebook_test ->
    @then ->
      @viewport 1024, 768
      @execute_cell @append_cell """
        from IPython.html import widgets
        from ipbs.widgets import (
            Button,
            ButtonGroup
        )
        import ipbs.bootstrap as bs
      
        group = ButtonGroup(children=[
          Button(description=x) for x in ["foo", "bar", "baz"]
        ])
        """, "code"
  
    @wait_for_idle()

    @then -> @execute_cell @append_cell "group", "code"

    @wait_for_idle()

    selector = ".widget-area .ipbs.ButtonGroupView"

    @then -> @test.assertExists selector, "created"
    @then -> @capturePadded "docs/img/ButtonGroup.png", selector
