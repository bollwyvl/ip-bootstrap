casper.test.begin "Widget: Button", ->
  casper.notebook_test ->
    @then ->
      @viewport 1024, 768
      @execute_cell @append_cell """
        from IPython.display import display
        from ipbs.widgets import Button
        btn = Button(body="Label")
        """,
        "code"
  
    @wait_for_idle()

    @then ->
      @test.assertEval(
        -> IPython.WidgetManager._view_types["ipbs/ButtonView"] != null
        "...registered"
      )
  
    @then ->
      @execute_cell @append_cell "display(btn)", "code"

    @wait_for_idle()

    @then ->
      @test.assertExists ".widget-subarea .btn", "...initialized with value"
    
    @then ->
      @capturePadded "../docs/img/Button.png", ".widget-area .btn"