<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <div class="md-card md-theme-default">
        <div class="md-card-header" data-background-color="green">
          <h4 class="title">클래스 생성</h4>
          <p class="category">필드를 추가하고 값을 입력하세요</p>
        </div>
        <div class="md-card-content">
          <!-- DB 설정 입력 필드들 -->
          <!-- <div class="md-layout-item md-small-size-100 md-size-50">
            <div class="md-field md-theme-default">
              <label :for="'db-type'"></label>
              <input
                id="db-type"
                type="text"
                class="md-input"
                placeholder="DB 종류 (ex: MySQL, PostgreSQL)"
                v-model="dbType"
                required
              />
            </div>
          </div> -->

          <div class="md-layout-item md-small-size-100 md-size-50">
            <div class="md-field md-theme-default">
              <label :for="'host'"></label>
              <input
                id="host"
                type="text"
                class="md-input"
                placeholder="DB 호스트"
                v-model="host"
                required
              />
            </div>
            
          </div>

          <div class="md-layout-item md-small-size-100 md-size-50">
            <div class="md-field md-theme-default">
              <label :for="'port'"></label>
              <input
                id="port"
                type="number"
                class="md-input"
                placeholder="DB 포트 (기본 3306)"
                v-model="port"
                required
              />
            </div>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-50">
            <div class="md-field md-theme-default">
              <label :for="'database-name'"></label>
              <input
                id="database-name"
                type="text"
                class="md-input"
                placeholder="데이터베이스 이름"
                v-model="databaseName"
                required
              />
            </div>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-50">
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

          <div class="md-layout-item md-small-size-100 md-size-50">
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
          <!-- 클래스 이름 입력 -->
          <div class="md-layout-item md-small-size-100 md-size-33">
            <div class="md-field md-theme-default">
              <label :for="'model-name'"></label>
              <input
                id="model-name"
                type="text"
                class="md-input"
                placeholder="클래스 이름"
                v-model="modelName"
                required
              />
            </div>
          </div>
          <div v-for="(field, index) in fields" :key="index" class="md-layout">
            <!-- Select Box -->
            <div class="md-layout-item md-small-size-100 md-size-33">
              <div class="md-field md-theme-default">
                <label :for="'select-' + index"></label>
                <select
                  :id="'select-' + index"
                  v-model="field.selectedType"
                  class="md-input"
                  @change="enableInput(index)"
                  required
                >
                  <option value="" disabled>자료형을 선택하세요</option>
                  <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
                </select>
              </div>
            </div>
            <!-- Input Field -->
            <div class="md-layout-item md-small-size-100 md-size-33">
              <div class="md-field md-theme-default">
                <label :for="'input-' + index"></label>
                <input
                  :id="'input-' + index"
                  type="text"
                  class="md-input"
                  :disabled="!field.isInputEnabled"
                  v-model="field.value"
                  :placeholder="field.isInputEnabled ? `값을 입력하세요.` : `자료형을 선택해주세요.`"
                  required
                />
              </div>
            </div>
            <!-- Remove Button -->
            <div class="md-layout-item text-right">
              <button type="button" class="md-button md-raised md-danger md-theme-default" @click="removeField(index)" :disabled="fields.length === 1">
                <div class="md-ripple">
                  <div class="md-button-content">삭제</div>
                </div>
              </button>
            </div>
          </div>
          <!-- Add Button -->
          <div class="md-layout-item text-right">
            <button type="button" class="md-button md-raised md-info md-theme-default" @click="addField">
              <div class="md-ripple">
                <div class="md-button-content">필드 추가</div>
              </div>
            </button>
          </div>
          <!-- Submit Button -->
          <div class="md-layout-item">
            <button type="button" class="md-button md-raised md-success md-theme-default" @click="submitForm">
              <div class="md-ripple">
                <div class="md-button-content">생성</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "@/config/config.js";

export default {
  data() {
    return {
      modelName: "", // 클래스 이름
      dbType: "",     // DB 종류
      host: "",       // DB 호스트
      port: "",       // DB 포트
      databaseName: "", // DB 이름
      username: "",   // 사용자 이름
      password: "",   // 비밀번호
      types: ["String", "Integer", "Double", "Boolean", "Long", "Short", "Byte", "Character"],
      fields: [
        { selectedType: "", value: "", isInputEnabled: false }
      ]
    };
  },
  methods: {
    enableInput(index) {
      this.fields[index].isInputEnabled = !!this.fields[index].selectedType;
    },
    addField() {
      this.fields.push({ selectedType: "", value: "", isInputEnabled: false });
    },
    removeField(index) {
      if (this.fields.length > 1) {
        this.fields.splice(index, 1);
      }
    },
    async submitForm() {
      try {
        let result = {};

        this.fields.forEach(field => {
          result[field.value] = field.selectedType;
        });

        const payload = {
          modelName: this.modelName,fields: result,
          dbType: this.dbType,
          host: this.host,
          port: this.port,
          databaseName: this.databaseName,
          username: this.username,
          password: this.password
        };

        const response = await axios.post(API_BASE_URL, payload, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          responseType: 'arraybuffer'
        });

        const blob = new Blob([response.data], { type: 'application/octet-stream' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${this.modelName}.java`;
        link.click();
        alert("생성 완료");
      } catch (error) {
        alert("error");
      }
    }
  }
};
</script>