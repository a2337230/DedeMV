<li>
          <a href="[field:arcurl/]" title="[field:title/]">
            <img src="[field:litpic/]" alt="[field:shorttitle/]">
          </a>
          <div class="colum-info">
            <h3><a href="[field:arcurl/]" title="[field:title /]">[field:title /]</a></h3>
          </div>
          [field:id runphp=yes]
          $tsql = new DedeSql(false);
          $tags = '';
          $tsql->SetQuery("Select i.tagname From xkzzz_tag_list t left join xkzzz_tag_index i on i.id=t.tid where t.aid='@me'");
          $tsql->Execute('t');
          while($row = $tsql->GetArray('t',MYSQL_ASSOC)){
          $tags .= "".$row['tagname']."";
          }
          @me=$tags;
          [/field:id] 
        </li>