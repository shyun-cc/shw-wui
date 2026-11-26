# ShwDetailDrawer

modelValue/title，size默认640px，loading为内容加载，error可展示并触发retry，submitting阻止关闭，dirty触发未保存确认。default/header/footer插槽，destroy-on-close，emit update:modelValue/closed/retry。公开 requestClose():Promise<boolean> 供路由离开复用；取消/提交中返回false，真正关闭true。详情内容由父层在打开时按ID加载，关闭/ID变化由父层取消在途，不得用列表行数据冒充详情。
