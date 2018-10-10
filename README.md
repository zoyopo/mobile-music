
### 运行

```
 git clone git@github.com:godlikedeveloper/mobile-music.git

 npm install

 npm run dev

```
### 项目介绍:blush:

> 网易云音乐接口+vue全家桶开发一款移动端音乐webApp

> 项目还在develop中，感兴趣想要参与的小伙伴可以私我

效果图：


<div style="width:100px;margin:0 auto;">骨架屏</div>
<div style="width:200px;margin:0 auto;"><img src="https://github.com/godlikedeveloper/mobile-music/blob/master/static/rstImg/skeleton.png" width="25%" height="25%" /></div>




<div style="width:100px;margin:0 auto;">首页</div>
<div style="width:200px;margin:0 auto;"><img src="https://github.com/godlikedeveloper/mobile-music/blob/master/static/rstImg/index.png" width="25%" height="25%" /></div>




<div style="width:100px;margin:0 auto;"> 侧边栏</div>
<div style="width:200px;margin:0 auto;"><img src="https://github.com/godlikedeveloper/mobile-music/blob/master/static/rstImg/nav.png" width="25%" height="25%" /></div>




<div style="width:100px;margin:0 auto;">每日推荐</div>
<div style="width:200px;margin:0 auto;"><img src="https://github.com/godlikedeveloper/mobile-music/blob/master/static/rstImg/recommend.png" width="25%" height="25%" /></div>



<div style="width:100px;margin:0 auto;">歌单</div>
<div style="width:200px;margin:0 auto;"><img src="https://github.com/godlikedeveloper/mobile-music/blob/master/static/rstImg/songsheet.png" width="25%" height="25%" /></div>



<div style="width:100px;margin:0 auto;">播放器（小）</div>
<div style="width:200px;margin:0 auto;"><img src="https://github.com/godlikedeveloper/mobile-music/blob/master/static/rstImg/miniplayer.png" width="25%" height="25%" /></div>



<div style="width:100px;margin:0 auto;">播放器（大）</div>
<div style="width:200px;margin:0 auto;"><img src="https://github.com/godlikedeveloper/mobile-music/blob/master/static/rstImg/normalplayer.png" width="25%" height="25%" /></div>

### 问题

#### 骨架屏移除未渲染完全问题

描述： 2018-09-13  骨架屏被移除之后，客户端渲染还没有完成，故将骨架屏作为占位放入客户端还没渲染完成的内容中

解决：将骨架屏封装成一个子组件，在需要的父组件里引用，在每一个渲染数据页面的`updated`钩子里，`this.$nextTick`里将骨架屏幕的隐藏，原页面内容显示，由于用到的页面现在且将来可能比较普遍，就直接用注册全局mixin 来实现这个逻辑。

#### 主页面首次加载时，会出现loading时主页面划过的情况

描述： 2018-10-10  App.vue中"<transition name="slide">" vue在创建created时期,DOM从生产的时候带有slide的效果属性

解决：  通过animate.css中enter-active-class的属性进行设置,created时DOM的class为空,mounted时期添加效果

#### 主页面滚动之后，需要点击两次才会进入歌单详情

描述： 2018-10-10  添加 better-scroll 后, 通过回弹动画延迟时间加长,发现回弹时click为无效(即使click: true也无效)

解决：  better-scroll设置中的bounceTime减少回弹的时间


### 详细信息

> <a href='http://u-to-world.com:8080/static/index.html#/' style="text-decoration: underline;">测试地址</a>



### 开发总结


#### 项目结构

 vue-cli搭建

 新增目录如下：

   ```
     ---src
     ------api        // 放置api的目录
     ---------base.js // 放置axios的一些配置，接口域名地址，以及公共参数配置，与后台约定跨域的配置，全局loading配置等
     ---------urls.js // 放置接口url
     ---------api.js  // 放置封装的promise请求
     ------base       // 放置一些基础组件
     ------common
     ---------js      // 公共js
     ---------sass    // 公共样式
  ```

#### 类库使用

 * fastclick解决移动端300ms延迟

 * vux 快速构建一些常规页面

 * vue-lazyLoad 对图片进行懒加载处理

 * better-scroll 轮播图

 * NeteaseCloudMusicApi  wy音乐接口，node封装转发，部署在自己服务器上



 #### 路由按需加载

   ```
    const view = (path, name) => () => import(`@/components/${path}${name}`)// 路由按需加载
    //这边用的是vue异步组件的方式实现路由的按需加载
    new Vue({
      // ...
      components: {
        'my-component': () => import('./my-async-component')
      }
    })

   ```
  * 路由加载时用了transition动画组件添加了一个切换动画
  * 注意如果你希望在 Vue Router 的路由组件中使用上述语法的话，你必须使用 Vue Router 2.4.0+ 版本。

#### 播放器组件

大小播放器分别写了`MiniPlayer.vue`和`NormalPlayer.vue`两个组件，因为想要职责单一，就没有放在一起

* 隐藏显示 通过vuex进行管理

* 动画

   1. 头部下坠和底部的上浮


      ```
       <transition name="example">

      </transition>

      /*css 样式*/
      // 给 transition下第一个元素显示或隐藏时添加的样式
       //这两个类名都是定义开始到结束的持续时间 方式 以及延迟
      .example-enter-active{
        transition:all 0.4s linear  对所有属性执行0.4s的动画 匀速
      }
      .example-leave-active{
        transition:all 0.4s linear  对所有属性执行0.4s的动画 匀速
      }
      // 进入过度的开始状态 触发时机 元素被插入前 插入后下一帧移除
      .example-enter{


      }
      // 离开过度的结束状态 触发时机 example-leave下一帧  动画过度完成被移除
      .example-leave-to{


      }

       可以使用碟中谍6中的halo跳伞来理解

       .example-enter-active就是从飞机上离开到开伞的时间

       .example-enter 下坠前在飞机上的最后一刻

       .example-enter-to  开始下坠，具备加速度的那一刻

       .example-leave-active 开伞到着陆的时间

       .example-leave 开伞命令发出时

       .example-leave-to 伞开下一刻
      ```

   2. 播放器的cd的位移及缩放

       先计算出小播放器图片离最终大播放器cd的x,y轴上的距离

       使用 `create-keyframe-animation` 进行一个`css3`动画状态的注册

       再利用transition的动画方法钩子

       在`enter`时`run`动画,`afterEnter`时清除动画 `leave`同理

   3. 播放器的旋转

       定义一个旋转的`css`动画，在一个`class`中进行调用，在`play`的状态下给它`addClss`,`pause`时加上`animation-play-state: paused`


 #### audio的使用

  使用`html5`的 `audio`结合`vuex`来进行播放器功能的实现，包括进度条，播放，暂停，上一曲，下一曲，播放模式等

 #### 布局

   * 绝大多数使用了flex  webpack中配置低版本安卓，ios加前缀

   * 考虑到fixed元素的移动端问题，在这种场景下，使用100%高度+absolute方案更适合

   * 使用媒体查询，兼容一下某些样式在768px以上的样式变形

   * 使用rem 在vue实例的`mounted`的钩子里注册`resize`和`onload`监听，进行最外层rem基准的计算

   * 使用骨架屏进行加载资源白屏时填充，待优化至完全的主页面服务端渲染




### 感谢:blush:

  * vue

  * vuex

  * vue-router

  * vux

  * vue-lazyLoad

  * NeteaseCloudMusicApi

