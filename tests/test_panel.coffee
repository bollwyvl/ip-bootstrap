casper.test.begin "Widget: Panel", ->
  casper.notebook_test ->
    @then ->
      @viewport 1024, 768
      @execute_cell @append_cell """
        from IPython.display import display
        from ipbs.widgets import Panel
        panel = Panel(
          title="Title",
          body="Body",
          footer="Footer"
        )""",
        "code"
  
    @wait_for_idle()

    @then ->
      @test.assertEval(
        -> IPython.WidgetManager._view_types["ipbs/PanelView"] != null
        "...registered"
      )
  
    @then ->
      @execute_cell @append_cell "display(panel)", "code"

    @wait_for_idle()

    @then ->
      @test.assertExists ".widget-subarea .panel", "...initialized with value"
    
    @then ->
      @capturePadded "../docs/img/Panel.png", ".widget-area .panel"