<template lang="html">
  <section class="content-wrap">
    <div class="orderTip-wrap">
      <el-row id="orderTip">
        <el-col :span="4">
          <el-select v-model="sortValue" placeholder="请选择" style="margin-left: 20px">
            <el-option
              v-for="item in sorts"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          今日点餐:
        </el-col>
        <el-col :span="12">
          {{order.name || '你还没有点餐'}}
        </el-col>
        <el-col :span="4">
          <el-button v-if="order.id" type="primary" :disabled="orderButton" @click.native="cancelSelect">取消</el-button>
          <el-button v-if="!order.id" type="primary" :disabled="orderButton" @click.native="randSelect">随机点一个</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row v-for="index in dishesRows" class="dishes-row">
      <el-col :span="24/rowcounts" v-for="item in dishesOn.slice((index-1)*rowcounts, (index)*rowcounts)" class="dishes-col">
        <el-card :body-style="{ padding: '0px' }" class="dishes-card" v-if="item.id">
          <img :src="item.img || 'http://element.eleme.io/static/hamburger.50e4091.png'" class="image">
          <div style="padding: 14px;">
            <span>{{ item.name }}</span>
            <div class="clearfix hot">
              <el-row>
                <el-col :span="4">辣度:</el-col>
                <el-col :span="12">
                  <el-rate
                    v-model="item.hot"
                    disabled
                    text-color="#ff9900">
                  </el-rate>
                </el-col>
                <el-col :span="4">
                  <i class="fa fa-thumbs-o-up active thumbs" @click="thumbs(1, item)" aria-hidden="true"></i> {{item.top}}
                </el-col>
                <el-col :span="4">
                  <i class="fa fa-thumbs-o-down thumbs" @click="thumbs(-1, item)" aria-hidden="true"></i> {{item.step}}
                </el-col>
              </el-row>
            </div>
            <div class="bottom clearfix">
              <!-- <time class="time">{{ item.created.replace("T", "").replace(".000Z", "") }}</time> -->
              <el-button type="primary" @click.native="addOrder(item)" :disabled="orderButton">点餐</el-button>
              <el-button type="primary" @click.native="removeDish(item)" v-if="admin">下架</el-button>
            </div>
          </div>
        </el-card>
        <el-card :body-style="{ padding: '0px' }" v-if="admin && item.type">
          <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="0px" class="demo-form login-container">
            <el-form-item prop="name">
              <el-input type="text" v-model="form.name" auto-complete="off" placeholder="菜名"></el-input>
            </el-form-item>
            <el-form-item prop="hot">
              <el-row>
                <el-col :span="4">辣度:</el-col>
                <el-col :span="20"><el-rate v-model="form.hot"></el-rate></el-col>
              </el-row>
            </el-form-item>
            <el-form-item prop="price">
              <el-row>
                <el-col :span="4">价格:</el-col>
                <el-col :span="20">
                  <el-input-number v-model="form.price" :min="1" :max="50" auto-complete="off" placeholder="价格"></el-input-number>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item prop="img">
              <el-input type="text" v-model="form.img" auto-complete="off" placeholder="图片地址"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
              <el-button type="primary" style="width:100%;" @click.native="addDishes">添加菜品</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>


    <el-collapse v-if="admin">
      <el-collapse-item title="已下架菜品列表" name="1">
        <ul>
          <li>已下架菜品列表</li>
          <li v-for="dishes in dishesOff" style="line-height: 60px;">
            {{ dishes.name }} <el-button type="info" @click="readdDishes(dishes)">重新上架</el-button>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </section>
</template>

<script>
import { getDishes, addDish, updateDish, addOrder, deleteOrder, findOrder, addTop, addStep } from '../../api/api'
export default {
  data() {
    return {
      sortValue: 0,
      sorts: [
        {
          value: 0,
          label: '上架时间升序'
        },
        {
          value: 1,
          label: '上架时间降序'
        },
        {
          value: 2,
          label: '点击率降序'
        },
        {
          value: 3,
          label: '好评降序'
        }
      ],
      rowcounts: 4,
      order: {},
      dishesOn: [{type: 1}],
      dishesOff: [],
      form: {
        name: "",
        hot: 1,
        price: "",
        img: ""
      },
      rules: {
        name: [
          { required: true, message: '请输入菜名', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    dishesRows() {
      return Math.ceil(this.dishesOn.length/this.rowcounts);
    },
    orderButton() {
      let date1 = new Date();
       date1.setHours(17);
       date1.setMinutes(0);
      let date2 = new Date();
      return date2>date1?false:true;
    },
    admin() {
      let user = JSON.parse(localStorage.getItem('user'));
      return user.admin == 1;
    }
  },
  methods: {
    thumbs(step, item) {
      let sThumbs = JSON.parse(localStorage.getItem("thumbs") || "{}");
      let date = new Date();
      let today = ""+date.getFullYear()+date.getMonth()+date.getDate();
      if(sThumbs[item.id] == today) return;
      sThumbs[item.id] = today;
      if(step == 1) {
        addTop({id: item.id}).then(data => {
          item.top++;
          localStorage.setItem("thumbs", JSON.stringify(sThumbs));
        });
      } else {
        addStep({id: item.id}).then(data => {
          item.step++;
          localStorage.setItem("thumbs", JSON.stringify(sThumbs));
        });
      }
    },
    addOrder(item) {
      deleteOrder().then(data => {
        if(data.code == 200) {
          this.order = {};
          this.orderSelect(item);
        }
      });
    },
    orderSelect(item) {
      addOrder({dishesId: item.id}).then(data => {
        if(data.code == 200) {
          this.order = item;
        }
      });
    },
    cancelSelect() {
      deleteOrder().then(data => {
        if(data.code == 200) {
          this.order = {};
        }
      });
    },
    randSelect() {
      let item = this.dishesOn[Math.floor(Math.random()*this.dishesOn.length)];
      this.addOrder(item);
    },
    removeDish(item) {
      updateDish({status: 1, id: item.id}).then(data => {
        if(data.code == 200) {
          this.dishesOn.splice(this.dishesOn.indexOf(item), 1);
          item.status = 1;
          this.dishesOff.push(item);
        }
      });
    },
    readdDishes(item) {
      updateDish({status: 0, id: item.id}).then(data => {
        if(data.code == 200) {
          this.dishesOff.splice(this.dishesOff.indexOf(item), 1);
          item.status = 0;
          this.dishesOn[this.dishesOn.length - 1] = item;
          this.dishesOn.push({type: 1});
        }
      });
    },
    addDishes() {
      if(!this.form.name) return;
      let param = {
        name: this.form.name,
        hot: this.form.hot,
        price: this.form.price || 0,
        img: this.form.img || "http://element.eleme.io/static/hamburger.50e4091.png",
      }

      addDish(param).then(data => {
        this.form.id = data.id;
        this.dishesOn[this.dishesOn.length - 1] = Object.assign({}, this.form);
        this.dishesOn.push({type: 1});
      });

      this.form = {
        id: null,
        name: "",
        price: "",
        hot: 1,
        img: ""
      }
    },
    initDishes() {
      findOrder().then(data => {
        if(data && data.length) {
          this.order = data[0];
        }
      });
      getDishes().then(data => {
        this.dishesOn = data;
        this.dishesOn.push({type: 1});
      });
      if(this.admin) {
        getDishes({status: 1}).then(data => {
          this.dishesOff = data;
        });
      }
    }
  },
  mounted() {
    this.initDishes();
  }
}
</script>

<style lang="scss">
.content-wrap {
  margin-top: 50px;
  .orderTip-wrap {
    position: fixed;
    top: 60px;
    width: 100%;
    z-index: 2;
    right: 0;
    padding-top: 10px;
    background: white;
    #orderTip {
      background: #D3DCE6;
      line-height: 60px;
      text-align: center;
      border-radius: 10px;
      font-size: 22px;
      margin: 0 45px 0 30px;
    }
  }
  .dishes-row {
    .dishes-col {
      padding: 10px;
      .dishes-card {
        .image {
          width: 100%;
          max-height: 250px;
        }
        .hot {
          .el-icon-hot-on {

          }
          .el-icon-hot-off {

          }
        }
        .thumbs {
          cursor: pointer;
          color: red;
        }
      }
    }
  }
}
</style>
