<?php
$z[0]=Array("arcurl","",25,40);
$z[0][4]=array();
$z[1]=Array("title","",49,63);
$z[1][4]=array();
$z[2]=Array("litpic","",89,104);
$z[2][4]=array();
$z[3]=Array("shorttitle","",111,130);
$z[3][4]=array();
$z[4]=Array("arcurl","",211,226);
$z[4][4]=array();
$z[5]=Array("title","",235,250);
$z[5][4]=array();
$z[6]=Array("title","",252,267);
$z[6][4]=array();
$z[7]=Array("id","\r\n          \$tsql = new DedeSql(false);\r\n          \$tags = '';\r\n          \$tsql->SetQuery(\"Select i.tagname From xkzzz_tag_list t left join xkzzz_tag_index i on i.id=t.tid where t.aid='@me'\");\r\n          \$tsql->Execute('t');\r\n          while(\$row = \$tsql->GetArray('t',MYSQL_ASSOC)){\r\n          \$tags .= \"\".\$row['tagname'].\"\";\r\n          }\r\n          @me=\$tags;\r\n          ",306,711);
$z[7][4]=array();
$z[7][4]['runphp']="yes";

?>