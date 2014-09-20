casper.test.begin "Widget: Panel", ->
  casper.notebook_test ->
    @then ->
      @execute_cell @append_cell """
        from IPython.display import display
        from ipbs.widgets import Panel
        panel = Panel(value="2000-01-01")""",
        "code"
  
    @wait_for_idle()

    @then ->
      @test.assertEval(
        -> IPython.WidgetManager._view_types.PanelView != null
        "...registered"
      )
      @test.assertExists "link[href*='PanelView.css']",
        "...style loaded"
  
    @then ->
      @execute_cell @append_cell "display(panel)", "code"

    @wait_for_idle()

    @then ->
      @test.assertEval(
        -> $(".widget-subarea input").val() == "2000-01-01"
        "...initialized with value"
      )

    @wait_for_idle()

    @thenEvaluate ->
      $(".widget-subarea input").val("1999-09-09").trigger("input")

    @wait_for_idle()

    @then ->
      @execute_cell @append_cell "panel.value", "code"

    @wait_for_output 2

    @then ->
      @test.assertEquals "1999-09-09", @get_output_cell(2),
        "...changes backend value"