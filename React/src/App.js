import React, { useRef, useEffect, useState } from "react";

import "./App.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { LinkOutlined } from "@ant-design/icons";
import { Empty, Image, Tag } from "antd";

import { Input, Space, List } from "antd";
import { AudioOutlined } from "@ant-design/icons";
const { Search } = Input;

class Main extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      keyword: "",
      data: [],
    };
  }

  componentDidMount() {
    // 获取 json 数据
    fetch("http://xxxxxx.com/my_json.json")
      .then((req) => req.json())
      .then((req_json) => {
        this.setState({
          data: req_json["data"],
        });
      });
  }

  onSearch = (value) => {
    if (value == "") {
    } else {

      document.documentElement.scrollTop = 0

      this.setState({
        keyword: value,
      });
    }
  };

  render() {
    let listItems = [];
    console.log("render:");

    // 存储待查数据
    let my_data = [];
    my_data = this.state.data;

    let characters_Temp = "";
    let pageName_Temp = "";

    let tagColor = ""

    // 关键字
    let kw = this.state.keyword;
    kw = kw.toString();
    let my_html = "";
    let link = "";

    if (kw == "") {
      return (
        <div>
          <div className="SearchBox">
            <div>
              <Search placeholder="搜索活动相关的交互、视觉、动画规范" onSearch={this.onSearch.bind()} enterButton />
            </div>
          </div>

          <ul className="details logoBox">
            <Image
              preview={false}
              width={200}
              src="http://cc.fp.ps.netease.com/file/622584f7370860322c8c0e32OUC3KxfL04"
            />
          </ul>
        </div>
      );
    }

    my_data.forEach((item, index) => {
      if (item.characters == undefined) {
        item.characters = item;
      }

      if (item.characters.indexOf(kw) > -1 || (item.type == "notion" && item.page_name.indexOf(kw) > -1)) {
        console.log(item);

        // 添加样式
        characters_Temp = item.characters.replace(
          new RegExp(kw, "g"),
          "<b style=color:#fff;background:#F66375;>" + kw + "</b>"
        );
        pageName_Temp = item.page_name.replace(
          new RegExp(kw, "g"),
          "<b style=color:#fff;background:#F66375;>" + kw + "</b>"
        );

        if (item.type == "figma") {
          link = "https://www.figma.com/file/" + item.file_key + "/" + "?node-id=" + item.node_id;
          tagColor = "geekblue"
        } else if (item.type == "notion") {
          link = "https://www.notion.so/" + item.node_id.replace(new RegExp("-", "g"), "");
          tagColor = "purple"
        }

        my_html = (
          <li>
            <div className="header">
              <Tag color={tagColor}>{item.file_name}</Tag>
              {/* <span className="file_name">{item.file_name}</span> */}
              <span> - </span>
              <span className="page_name" dangerouslySetInnerHTML={{ __html: pageName_Temp }}></span>
              <a target="_Blank" href={link}>
                <LinkOutlined />
              </a>
            </div>

            <div className="list_content" key={index} dangerouslySetInnerHTML={{ __html: characters_Temp }}></div>
          </li>
        );
        listItems.push(my_html);
      }
    });

    console.log("listItems.length:");
    console.log(listItems.length);

    let req;

    if (listItems.length > 0) {
      req = <ul className="details">{listItems}</ul>;
    } else {
      req = (
        <ul className="details">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </ul>
      );
    }

    return (
      <div>
        <div className="SearchBox">
          <div>
            <Search placeholder="搜索活动相关的交互、视觉、动画规范" onSearch={this.onSearch.bind()} enterButton />
          </div>
        </div>

        {req}
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
