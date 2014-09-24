casper.test.begin "Widget: Button...", ->
  casper.notebook_test ->
    @then ->
      @viewport 1024, 768
      @execute_cell @append_cell """
        from IPython.display import display
        from ipbs.widgets import Button
        btn = Button(body="Text Label!")
        """,
        "code"
  
    @wait_for_idle()

    @then ->
      @test.assertEval(
        -> "ipbs/ButtonView" of IPython.WidgetManager._view_types
        "... registered"
      )
  
    @then ->
      @execute_cell @append_cell "display(btn)", "code"

    @wait_for_idle()

    @then ->
      @test.assertSelectorHasText ".widget-subarea .btn", "Text Label!",
        "... populated with label"
    
    @then ->
      @capturePadded "docs/img/Button.png", ".widget-area .btn"