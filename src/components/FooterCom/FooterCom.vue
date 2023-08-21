<template>
  <div class="footer-box">
    <ul>
      <li>
        <svg-icon icon-name="icon-hezuo" class-name="bilibili"></svg-icon>
        <el-popover trigger="hover" :width="200" placement="top" teleported>
          <template #reference>
            <a href="JavaScript: void(0)" rel="noopener noreferrer">商务合作</a>
          </template>
          <!-- 内容 -->
          <div class="vx-box">
            <div class="vx-title">
              <h1>添加微信</h1>
              <p>备注: 商务合作</p>
            </div>
            <div class="vx-img">
              <img src="@/assets/images/vx.png" class="bgc-img" alt="" />
            </div>
          </div>
        </el-popover>
      </li>
      <div class="lines"></div>
      <li>
        <svg-icon
          icon-name="bilibili-copy"
          class-name="bilibili"
        ></svg-icon>
        <a href="http://wei-z.top" target="_blank" rel="noopener noreferrer">Aurora' Blog</a
        >
      </li>
      <div class="lines"></div>
      <!-- 备案号 -->
      <li>
        <a
          href="https://beian.miit.gov.cn"
          target="_blank"
          rel="noopener noreferrer"
          >陕ICP备xxxx号-x</a
        >
      </li>
      <div class="lines"></div>
      <!-- 公安备案号 -->
      <li>
        <img src="@/assets/images/beian-icon.png" alt="" srcset="" />
        <a
          target="_blank"
          href="http://www.beian.gov.cn/"
          style="
            display: inline-block;
            text-decoration: none;
            height: 20px;
            line-height: 20px;
          "
          >陕公网安备 xxxxx号</a
        >
      </li>
    </ul>
  </div>
</template>

<script steup lang="ts">
</script>

<style lang="scss" scoped>
.footer-box {
  width: 100%;
  height: 100px;
  background-color: #242529;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;

    li {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: rgb(236, 235, 235);
      padding: 0 10px;
      height: 20px;

      .bilibili {
        font-size: 18px;
      }

      .juejin {
        font-size: 24px;
      }

      .zhihu {
        font-size: 20px;
      }

      a {
        color: inherit;
        text-decoration: none;
        letter-spacing: 2px;
        transition: all 0.3s;
        margin-left: 10px;

        &:hover {
          color: rgb(123, 238, 123);
        }
      }
    }

    .lines {
      height: 15px;
      width: 1px;
      background-color: #838799;
    }
  }

  .visit {
    color: rgb(201, 181, 181);
    font-size: 14px;
    letter-spacing: 3px;
  }
}

.vx-box {
  .vx-title {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      font-size: 14px;
    }

    p {
      font-size: 12px;
      color: rgb(105, 105, 105);
      margin: 6px 0;
    }
  }

  .vx-img {
    width: 100%;
    overflow: hidden;

    .bgc-img {
      width: 100%;
    }
  }
}
</style>
