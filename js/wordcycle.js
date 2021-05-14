// A modified template for creating rolling text
function dataWord () {

    $("[data-words]").attr("data-words", function(i, d){
      var $self  = $(this),
          $words = d.split("|"),
          tot    = $words.length,
          c      = 0; 
  
      // CREATE SPANS INSIDE SPAN
      for(var i=0; i<tot; i++) $self.append($('<span/>',{text:$words[i]}));
  
      // COLLECT WORDS AND HIDE
      $words = $self.find("span").hide();
  
      // ANIMATE AND LOOP
      (function loop(){
        $self.animate({ width: $words.eq( c ).width() });
        $words.stop().fadeOut().eq(c).fadeIn().delay(2500).show(0, loop);
        c = ++c % tot;
      }());
      
    });
  
  }
  
  $(window).on("load", dataWord);