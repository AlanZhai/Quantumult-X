/*
使用方法：
注意：该脚本无破解离线功能,只是给新版115的App添加创建离线任务的方法。
1.在[rewrite_local]分组下添加下面这行配置
^http:\/\/115\.com\/lx.*$ url script-response-body https://raw.githubusercontent.com/AlanZhai/Quantumult-X/main/Scripts/115/115lx.js
将帮助与反馈修改为离线下载
^https:\/\/q.115.com\/mapp\/\?c=feedback&m=index url 307 https://115.com/lx?taskdg=1
3.在115Aapp中通过右上角菜单-帮助与反馈进入离线下载
4.通过快捷指令使115打开离线下载（http://115.com/lx?taskdg=1）
快捷指令: https://www.icloud.com/shortcuts/31e3a877cec340a48192aa081e25c05e
*/
var body = $response.body;
if ($request.url.indexOf('/user/check_sign') != -1) {
    let json = JSON.parse(body);
    json.data.is_new_sign = false;
    body = JSON.stringify(json);
} else {
    body = body.replace("UDown", 'XXXXXXXXX'); // 使重定向判断条件失效
    let clearJS = `<script type="text/javascript">
    $(function(){
        function actionSheetAction(index) {
            if (index == 4) { return; }
            $.ajax({
                url: '/web/lixian/?ct=lixian&ac=task_clear',
                dataType: 'json',
                data: {flag: index},
                type: 'POST',
                cache: false,
                success: function (r) {
                    window.location.reload();
                },
                error: function(){
                    console.log('清空失败');
                }
            });
        }
        function clearAction() { 
            OOFJS.common.actionSheet('选择清空的操作', ['清空已完成任务', '清空全部任务', '清空失败任务', '清空进行中任务'], actionSheetAction);
        }
        setTimeout(function(){OOFJS.common.addRightBarItem('清空', clearAction);}, 200);
    });
    </script>`
    body = body.replace("</body>", clearJS + '\n</body>'); // 注入清空任务相关JS
}
$done({body});
