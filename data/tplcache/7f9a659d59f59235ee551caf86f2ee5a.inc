<a href="[field:arcurl/]">
              <li [field:global name='autoindex'runphp='yes']if(@me==1){@me='class="current rec-item"';}else{@me='class=rec-item';}[/field:global]>
                <span class="rec-num">[field:global runphp='yes' name=autoindex][/field:global].</span>
                <div class="item-container">
                  <div class="rec-left">
                    <img src="[field:litpic/]" alt="[field:title/]">
                  </div>
                  <div class="rec-right">
                    <h3>[field:title/]</h3>
                    <div class="rec-info">
                      <a href="[field:typeurl/]"><i class="iconfont icon-zixunlanmu"></i>[field:typename/]</a>
                      <span><i class="iconfont icon-dianjiliang"></i>[field:click/]</span>
                    </div>
                  </div>
                </div>
              </li>
            </a>