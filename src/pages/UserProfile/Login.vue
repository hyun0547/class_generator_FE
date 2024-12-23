<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-33 mx-auto">
      <div class="md-card md-theme-default">
        <div class="md-card-header" data-background-color="green">
          <h4 class="title">로그인</h4>
          <p class="category">계정 정보를 입력하세요</p>
        </div>
        <div class="md-card-content">
          <form @submit.prevent="submitLogin">
            <div class="md-layout-item md-small-size-100 md-size-50 mx-auto">
              <div class="md-field md-theme-default">
                <label :for="'username'"></label>
                <input
                  id="username"
                  type="text"
                  class="md-input"
                  placeholder="사용자 이름"
                  v-model="username"
                  required
                />
              </div>
            </div>

            <div class="md-layout-item md-small-size-100 md-size-50 mx-auto">
              <div class="md-field md-theme-default">
                <label :for="'password'"></label>
                <input
                  id="password"
                  type="password"
                  class="md-input"
                  placeholder="비밀번호"
                  v-model="password"
                  required
                />
              </div>
            </div>

            <div class="md-layout-item text-right">
              <button
                type="submit"
                class="md-button md-raised md-success md-theme-default"
              >
                <div class="md-ripple">
                  <div class="md-button-content">로그인</div>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

  
  <script>
  export default {
    data() {
      return {
        username: "",
        password: "",
      };
    },
    methods: {
      submitLogin() {
        console.log("Username:", this.username);
        console.log("Password:", this.password);
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .mx-auto {
    margin-left: auto !important;
    margin-right: auto !important;
  }
  
  .md-card {
    margin-top: 50px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-actions {
    text-align: center;
  }
  </style>