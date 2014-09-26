casper.test.begin "Grid", ->
  casper.notebook_test ->
    @then ->
      @viewport 1024, 768
      @execute_cell @append_cell """
        from IPython.html import widgets
        from ipbs.widgets import (
            Container,
            Row,
            Column,
            Label
        )
        from ipbs import bootstrap as bs
        contexts = list(bs.Context)
        
        cols = [
            Column(
                Label(context),
                context=context
            )
            for i in range(12)
            for context in [contexts[i % len(contexts)]]
        ]
        row = Row(*cols)
        grid = Container(row)
        """, "code"
  
    @wait_for_idle()

    @then -> @execute_cell @append_cell "grid", "code"
    @wait_for_idle()

    @then ->
      @test.assertExists ".widget-area .container-fluid .row .col-md-1",
        "populated"
    
    @then -> @capturePadded "docs/img/Grid.png",
      ".widget-area .container-fluid"
