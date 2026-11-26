# ShwLoadState

loading/error/empty/filtered控制展示；loading且无内容时骨架，其余加载保留已有slot内容，error提示+retry，empty区分暂无数据和无查询结果；default slot正文。组件不发请求，父层管理结果及重试，错误和空态不混在一起。Table自身也提供filtered/emptyText来区分查询空态。
