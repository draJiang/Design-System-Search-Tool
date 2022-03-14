import json
from tokenize import Token
import requests
import time

TOKEN = 'xxxxx-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
FILE_KEY = 'xxxxxxxxxxxxxx'
NOTION_TOKEN = 'secret_xxxxxxxxxxxxxxxxxxxxxx'

my_json = {'data':[]}

def get_text_info(layer):
    '''
    获取 figma 中的文本信息
    '''

    # 如果图层是文本图层 type
    if(layer['type']=='TEXT'):

        # 字符长度小于 5 则忽略
        if(len(layer['characters'])<5):
            pass
        else:
            print(layer['name'])
            print(layer['type'])
            # 文件 key
            file_key = FILE_KEY
            # 节点 id
            node_id = layer['id']
            # 文本信息
            characters = layer['characters']
            global page_name,file_name

            dataTemp = {'type':'figma','file_key':file_key,'file_name':file_name,'page_name':page_name,'node_id':node_id,'characters':characters}
            my_json['data'].append(dataTemp)
    else:
        # 如不是文本图层，则判断是否存在子图层
        if('children' in layer):
            # 如果存在子图层，则递归一下遍历子图层获取文本图层
            for item in layer['children']:
                get_text_info(item)
        else:
            return

def get_notion_blcok(block_id):
    print(block_id)

    url = 'https://api.notion.com/v1/blocks/'+block_id+'/children'
    h={
        # 设置机器人令牌
        "Content-Type": "application/json",
        "Authorization":'Bearer ' + NOTION_TOKEN,
        # 设置 Notion 版本
        "Notion-Version": "2022-02-22"
    }

    payload = {
        
    }

    req = requests.get(url=url,headers=h,params=payload)
    req_json = json.loads(req.text)
    
    children = req_json['results']

    for item in children:
        # 判断是否为页面节点
        if(item['type']=='child_page'):
            # 文件 key
            file_key = FILE_KEY
            # 节点 id
            node_id = item['id']
            # 文本信息
            characters = ''
            page_name = item['child_page']['title']
            file_name = '视觉、动画规范'

            dataTemp = {'type':'notion','file_key':'','file_name':file_name,'page_name':page_name,'node_id':node_id,'characters':characters}
            my_json['data'].append(dataTemp)

        # 判断是否存在子节点
        if(item['has_children']):
            time.sleep(0.2)
            get_notion_blcok(item['id'])

# 获取 notion 数据
block_id = 'xxxxxxxxxxxxxxxxxx'
get_notion_blcok(block_id)


# 获取 fimga 信息
url = 'https://api.figma.com/v1/files/'+FILE_KEY

header = {
    'X-Figma-Token':TOKEN
}

req = requests.get(url=url,headers=header)
req_json = json.loads(req.text)

figma_document = req_json['document']['children']

# 遍历 figma 文档
file_name = req_json['name']
page_name = ''
for index in range(len(figma_document)):
    page_name = figma_document[index]['name']
    get_text_info(figma_document[index])



# 将数据保存到 json 文件中
with open('my_json.json','w',encoding='utf-8') as f:
    json.dump(my_json,f,ensure_ascii=False)