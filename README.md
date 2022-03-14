
# 简介

这是一款支持 Figma 全文搜索的工具，同时也支持聚合搜索 Notion 中的信息。

![https://jiangzilong-image.oss-cn-beijing.aliyuncs.com/uPic/Company/20220314194633.png](https://jiangzilong-image.oss-cn-beijing.aliyuncs.com/uPic/Company/20220314194633.png)

# 价值

## 支持 Figma 全文搜索

Figma 目前尚未提供文件内搜索的功能，并且搜索插件也只支持编辑者使用。对于编辑者或阅读者，**都缺乏一种较好的文件内搜索功能的支持**。

这对于设计系统来说会更加不友好，因为设计系统的信息量相比普通文件要多的多，对于搜索的依赖更强。

## 支持搜索多平台的内容

团队内拥有视觉、动画、UI、UX 等多种类型的设计师，大家的习惯与需求不同，导致使用不同的平台组织设计规范。

此工具通过聚合不同平台的规范，让阅读者对设计系统有一个全局的认识。

# 如何使用

## 用户

在搜索框中直接输入关键字即可进行搜索；点击支持定位到对应的页面/图层。

## 开发者

首先要解决数据源的问题。

`get_data.py` 通过 Figma 的 [API](https://www.figma.com/developers/api#files) 遍历文件内的所有文本图层，并将图层的字符、ID、所在页面等信息保存为 json 格式。

Notion 方面同样利用 [API](https://developers.notion.com/reference/intro) 获取文本信息。

上述两组数据用同样的结构存入 JSON。

```json
{
    "data":[
        {
            "type":"notion",
            "file_key":"",
            "file_name":"file_name",
            "page_name":"page_name",
            "node_id":"xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
            "characters":""
        },
				{
            "type":"figma",
            "file_key":"xxxxxxxxxx",
            "file_name":"file_name",
            "page_name":"page_name",
            "node_id":"96:7397",
            "characters":"characters"
        }
				……
    ]
}
```

如果你有更广的搜索范围需求，完全可以遍历**团队内所有 figma 文件的文本信息**，或接入其他平台的数据。

其次是前端交互界面，使用 [React](https://zh-hans.reactjs.org/) + [Ant Design](https://ant.design/index-cn) 组件搭建。

# 为什么要做这个工具

除了希望解决现存问题，更重要的是基于这样一个方法论：

我们的生产工作中，涉及到工具和方法论这两个要素；方法论决定了工具的设计，而工具也会影响方法论。

![https://jiangzilong-image.oss-cn-beijing.aliyuncs.com/uPic/Company/20220314193938.png](https://jiangzilong-image.oss-cn-beijing.aliyuncs.com/uPic/Company/20220314193938.png)

以周期性复盘为例，每隔一段时间系统的对项目进行复盘，并总结项目外的收获与计划，基于此方法论，我在 Notion 这一工具中建立了对应的模板（方法论指导工具），而模板的建立与不断优化使得复盘变得更加系统和高效（工具影响方法论）

![https://jiangzilong-image.oss-cn-beijing.aliyuncs.com/uPic/Company/20220314193644.png](https://jiangzilong-image.oss-cn-beijing.aliyuncs.com/uPic/Company/20220314193644.png)

此工具蕴含着这样一个方法论：不止考虑自身的工作还要考虑上下游的对接，**需要全局思考。**

通过聚合视觉、动画、交互等多维度的规范信息，**帮助用户建立全局思考的意识**。
