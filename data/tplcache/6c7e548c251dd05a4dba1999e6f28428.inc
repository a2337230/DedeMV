
<div class="hot mt1">
<dl class="tbox light">
<dt class='light'><strong>[field:tag /]</strong></dt>
<dd class='light'>
<ul class="c1 ico2">
[field:tag runphp=yes]
global $dsql,$aid;
$i = 1;
$taga = @me;
$arow = $dsql->GetOne("Select * From `dede_tagindex` where tid like '$taga'");
$tid = $arow['id'];
if($tid!='')
{
$tagsql = "Select aid From `dede_taglist` where tid = $tid And arcrank > -1 group by aid order by aid desc";
$dsql->SetQuery($tagsql);
$dsql->Execute('t');
$result = '';
while($arow = $dsql->GetArray('t'))
{
$ids[] = $arow['aid'];
}
}
if(count($ids) > 0)
{
$idsStr = join(',', $ids);

$query = "Select arc.*,tp.typedir,tp.typename,tp.corank,tp.isdefault,tp.defaultname,tp.namerule,

tp.namerule2,tp.ispart,tp.moresite,tp.siteurl,tp.sitepath
from `dede_archives` arc left join `dede_arctype` tp on arc.typeid=tp.id
where arc.arcrank>-1 and arc.id in($idsStr) And arc.id<>$aid order by arc.id desc";
}
$dsql->SetQuery($query);
$dsql->Execute('t');
$result = '';
$totalRow = $dsql->GetTotalRow();
while($row = $dsql->GetArray('t'))
{
$arcurl = GetOneArchive($row['id']);
$result .= "<li><a href=\"{$arcurl['arcurl']}\">{$row['title']}</a></li>";
}
if($result=='') $result = "<p style='color:#f00;'>　该TAG标签没有相关文章</p>";
@me = $result;
[/field:tag]
</ul>
</dd>
</dl>
</div>
