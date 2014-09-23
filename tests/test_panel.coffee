casper.test.begin "Widget: Panel", ->
  casper.notebook_test ->
    @then ->
      @execute_cell @append_cell """
        from IPython.display import display
        from ipbs.widgets import Panel
        panel = Panel(body="foo")""",
        "code"
  
    @wait_for_idle()

    @then ->
      @test.assertEval(
        -> IPython.WidgetManager._view_types.PanelView != null
        "...registered"
      )
  
    @then ->
      @execute_cell @append_cell "display(panel)", "code"

    @wait_for_idle()

    @then ->
      @test.assertExists ".widget-subarea .panel", "...initialized with value"