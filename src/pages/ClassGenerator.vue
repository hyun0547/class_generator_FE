<template>
  <div class="md-layout">
    <div class="md-layout-item">

    
    <form action="http://localhost:8080/" method="POST">
      <div class="md-card md-theme-default">
        <div class="md-card-header" data-background-color="green">
          <h4 class="title">클래스 생성</h4>
          <p class="category">필드를 추가하고 값을 입력하세요</p>
        </div>
        <div class="md-card-content">
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
                  name="fieldType"
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
                  name="fieldValue"
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
            <button type="submit" class="md-button md-raised md-success md-theme-default">
              <div class="md-ripple">
                <div class="md-button-content">생성</div> 
              </div>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    }
  }
};
</script>