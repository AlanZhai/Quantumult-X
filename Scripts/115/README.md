注意：该脚本无破解离线功能,只是给新版115的App添加创建离线任务的方法。

使用方法：

方法一、远程重写订阅

1.直接在[rewrite_remote]分组下添加

# 115帮助与反馈改离线下载
https://raw.githubusercontent.com/AlanZhai/Quantumult-X/main/Scripts/115/115lx.conf, tag=115帮助与反馈改离线下载, update-interval=86400, opt-parser=true, enabled=true

方法二、本地重写
1.在[rewrite_local]分组下添加下面这行配置
^http:\/\/115\.com\/lx.*$ url script-response-body https://raw.githubusercontent.com/AlanZhai/Quantumult-X/main/Scripts/115/115lx.js

将帮助与反馈修改为离线下载
^https:\/\/q.115.com\/mapp\/\?c=feedback&m=index url 307 https://115.com/lx?taskdg=1

2.[MITM]分组添加hostname = *.115.com

3.在115Aapp中通过右上角菜单-帮助与反馈进入离线下载

4.通过快捷指令使115打开离线下载（http://115.com/lx?taskdg=1）
快捷指令: https://www.icloud.com/shortcuts/31e3a877cec340a48192aa081e25c05e
