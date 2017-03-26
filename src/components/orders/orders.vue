<template lang="html">
  <div>
    <el-row>
      <el-button type="primary" @click="print" v-if="showPrint">打印</el-button>
    </el-row>
    <div style="width: 50%;" ref="table">
      <div class="orders">
        <el-row class="header">
          <el-col :span="4">姓名</el-col>
          <el-col :span="15">菜品</el-col>
          <el-col :span="5">点餐时间</el-col>
        </el-row>
        <el-row v-for="item in tableData" class="content">
          <el-col :span="4">{{item.name}}</el-col>
          <el-col :span="15">{{item.dishesName}}</el-col>
          <el-col :span="5">{{item.ordertime}}</el-col>
        </el-row>
      </div>

      <br/>
      <el-row>
        <el-col :span="12">菜品</el-col>
        <el-col :span="4">数量</el-col>
      </el-row>
      <el-row v-for="item in countData">
        <el-col :span="12">{{item.name}}</el-col>
        <el-col :span="4">{{item.count}}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { findToday, findDishesCount } from '../../api/api'
export default {
  data() {
    return {
      tableData: [],
      countData: [],
      showPrint: true
    }
  },
  methods: {
    findDatas() {
      findToday().then(data => {
        this.tableData = data;
      });
      findDishesCount().then(data => {
        this.countData = data;
      });
    },
    print() {
      this.$parent.$parent.$parent.$parent.showHeader = false;
      this.showPrint = false;
      this.$refs.table.style.width = "100%";
      this.$nextTick(() => {
        window.print();
        this.showPrint = true;
        this.$parent.$parent.$parent.$parent.showHeader = true;
        this.$refs.table.style.width = "50%";
      });
    }
  },
  mounted() {
    this.findDatas();
  }
}
</script>

<style lang="scss">
.orders {
  .header {
    background: #EEF1F6;
  }
  .content {
    border-bottom: #EEF1F6 1px solid;
  }
}
</style>
