<li><a href="[field:id runphp='yes'] $id=@me;@me='';$url=GetOneArchive($id);@me=$url['arcurl'];[/field:id]" title="[field:title/]"><img src="[field:litpic/]" alt="">[field:title/]</a></li>
  <div class="column">
    <h2 class="column-title">{dede:type typeid='2'}[field:typename/]<a href="[field:typelink/]">更多></a> {/dede:type}</h2>
    <ul class="colun-menu">
      {dede:arclist titlelen='55' row='10' orderby='rand' typeid='2'}
      <li>
        <a href="[field:id runphp='yes'] $id=@me;@me='';$url=GetOneArchive($id);@me=$url['arcurl'];[/field:id]" title="[field:title/]">
          <img src="[field:litpic/]" alt="[field:shorttitle/]">
        </a>
        <h3><a href="[field:arcurl/]" title="[field:title /]">[field:title /]</a></h3>
      </li>
      {/dede:arclist}
    </ul>
  </div>