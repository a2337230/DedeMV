
      $text="@me";
      preg_match("'alt=(.+)title'",$text,$array);
      @me=preg_replace("/'/",'', $array[1]);
      