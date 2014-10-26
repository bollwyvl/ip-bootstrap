casper.notebook_test ->
  @then ->
    @viewport 1024, 768
    @execute_cell @append_cell """
      from ipbs.widgets import Panel
      panel = Panel(
        title="Title",
        body="Body",
        footer="Footer"
      )
      """, "code"
  
  @wait_for_idle()

  @then -> @execute_cell @append_cell "panel", "code"

  @wait_for_idle()

  @then ->
    @test.assertSelectorHasText(
      ".widget-area #{selector}", text, "... populated with #{text}"
    ) for text, selector of{
      Title: ".panel-title"
      Body: ".panel-body"
      Footer: ".panel-footer"
    }
    
  @then -> @capturePadded "docs/img/Panel.png", ".widget-area .panel"