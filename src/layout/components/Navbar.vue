<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown
        class="avatar-container"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img
            src="@/assets/images/c.gif"
            class="user-avatar"
          >
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu
          slot="dropdown"
          class="user-dropdown"
        >
          <span @click="logout">
            <el-dropdown-item>
              <span style="display:block;">退出</span>
            </el-dropdown-item>
          </span>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="right-menu name-item"> {{ USER_INFO.posts }} - {{ USER_INFO.name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { removeToken } from '@/utils/auth'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      USER_INFO: JSON.parse(localStorage.getItem('USER_INFO'))
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      removeToken()
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 40px;
  overflow: hidden;
  position: relative;
  background: rgb(50, 130, 219);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 40px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 32px;
          height: 32px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
  .name-item {
    font-size: 14px;
    color: #fff;
    margin: 0 15px;
  }
}
</style>
