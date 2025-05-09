智慧商城项目大纲手册:

[智慧商城项目.zip](https://github.com/user-attachments/files/20122935/default.zip)

项目实现了一个网购商城基本的所有需求，以下是对项目的亮点模块进行展示。

1.首先制作了基本的展示页面，由分配一二级路由展示效果

首页：通过接口获取后台数据，渲染了首页内容。首页的商品以及搜索框都是可互动组件/
<img width="251" alt="36ccf3c4c69322161b8c00d63a65b06" src="https://github.com/user-attachments/assets/6116b03b-388e-424f-a202-4caa8ee6a2bb" />

分类页：展示功能的多样性，点击项目也可以跳转到对应的搜索界面
<img width="263" alt="45c638ef49ff27234d2971813e005d2" src="https://github.com/user-attachments/assets/7b86e9d1-14ee-48ff-a0ee-7d29ae679663" />

购物车：为后续的购买操作提供了准备
<img width="243" alt="d9959a47c0c8cef96957b966b771e5f" src="https://github.com/user-attachments/assets/89a96ef4-0652-46c6-99f4-824d72ec3bc8" />

个人主页：需要登录，登录后即可正常进入所有的页面，明：在未登录前，些许页面如支付页面，订单页面等是无法进入的。
<img width="249" alt="3a039f7201de3f66a0c32f24973324b" src="https://github.com/user-attachments/assets/24e6f7db-a3bb-4264-86f3-1801610ceee8" />

2.登录页面：许多页面的操作需要登录后才可以，所有同时触发事件后检测到未登录即弹窗前往登录

（加入购物车/立即购买 等组件）需要登录的提示弹窗，点击即可跳转登录页面：
<img width="247" alt="17fdf766622baa27f58cc8e6c2cdbc3" src="https://github.com/user-attachments/assets/27a7d24a-bdfe-417a-8276-0d5139e76560" />

登录页面：登录页面的图形验证码接口有问题，只要符合正则表达式（四位字母或数组）即可；短信验证码的接口并未封装，仅作为测试效果，验证码为246810（但也写了对获取验证码部分的代码，需要满足前两空的正确填写才能使用，利用正则表达式和组件库弹窗提示）
<img width="242" alt="aa23c8d03ed1b4fd6f8db2eac6bde6b" src="https://github.com/user-attachments/assets/4a38d310-439e-44c7-8adf-879199964e59" />

登录后的个人主页：
<img width="242" alt="4e539f2bbed629a223b3eb281d63d2e" src="https://github.com/user-attachments/assets/864c3e1d-d07b-4ff5-bd08-461c4707d843" />

3.搜索页面：通过首页点击搜索框即可进入

搜索页面：实现了历史记录，并且再次点击后会将关键词提前。
<img width="259" alt="3575460a6c37f9c69192f947139dce5" src="https://github.com/user-attachments/assets/bc8e7bc1-c651-4b70-addb-3e611832b337" />

搜索出来的效果，点击商品即可跳转到商品详情页。（同样在分类页点击也可以跳转到搜索页）
<img width="251" alt="c54e4d9b46be80a7de7bec65a0b2092" src="https://github.com/user-attachments/assets/3f8ec029-7ad2-464f-a74b-5b1981022b38" />

4.商品详情页：内容包含了商品所有的基本属性，基本内容的渲染，轮转图以及用户评价等。

详情页效果：
<img width="246" alt="e328c4b766e1d6ed6598d1d65bff865" src="https://github.com/user-attachments/assets/f9b391b4-d059-4d6e-8dc2-c3e49a85503b" />
<img width="239" alt="5464322dbab07974d531b2adbaad08c" src="https://github.com/user-attachments/assets/00d6b744-c383-4f6a-8c6b-f1b90cc8d841" />

点击加入购物车/立购买即可弹出处理框：（如果未登录状态下操作，就会出现上述弹框提示跳转登录的效果）（通过详情页的购物车即可跳转去查看，也可以在主页的下列表前往）
<img width="255" alt="08a095f42edc5958cc1a5e6b95f404d" src="https://github.com/user-attachments/assets/acdde17b-4410-4af8-bf6a-95ce27e6eff6" />

5.购物车：实现了数据的处理和渲染，以及不同选项选中后数据的渲染，全选按钮的实现以及编辑功能等，点击结算即可跳转到结算页面。
<img width="258" alt="905e24b939b3a0ea8f3458de192515b" src="https://github.com/user-attachments/assets/dbb89b32-33c8-4d22-a3db-3a26a70de4d9" />

6.结算页面：总而言之就是正常的软件的效果，基本的属性都实现了，没地址就提示地址，余额不足就提示余额不足等等，只有合理后才会进行下一步功能。
<img width="261" alt="6a021d2e9b19f9fa0277e35730dae33" src="https://github.com/user-attachments/assets/e6b4f02a-0948-4ccc-a1e4-2a1d49b43395" />

7.订单页：有很大问题，因为后端接口的问题，无法正常输出对应的渲染信息，理论上代码是没问题的，但是无法渲染，所以是接口问题，仅展示。
<img width="248" alt="9f7756b57afbf45431cde86816c5b0d" src="https://github.com/user-attachments/assets/591b2aa8-ed5b-4767-8870-e22d074a9ddb" />






