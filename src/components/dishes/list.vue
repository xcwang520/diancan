<template lang="html">
  <section class="content-wrap">
    <div class="orderTip-wrap">
      <el-row id="orderTip">
        <el-col :span="4">
          今日点餐:
        </el-col>
        <el-col :span="16">
          {{order.name || '你还没有点餐'}}
        </el-col>
        <el-col :span="4">
          <el-button v-if="order.id" type="primary" @click.native="cancelSelect">取消</el-button>
          <el-button v-if="!order.id" type="primary" @click.native="randSelect">随机点一个</el-button>
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
              <el-button type="primary" @click.native="removeOrder(item)">下架</el-button>
            </div>
          </div>
        </el-card>
        <el-card :body-style="{ padding: '0px' }" v-if="admin && item.type">
          <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="0px" class="demo-form login-container">
            <el-form-item prop="name">
              <el-input type="text" v-model="form.name" auto-complete="off" placeholder="菜名"></el-input>
            </el-form-item>
            <el-form-item prop="price">
              <el-input type="text" v-model="form.price" auto-complete="off" placeholder="价格"></el-input>
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
  </section>
</template>

<script>
import { getDishes } from '../../api/api'
export default {
  data() {
    return {
      rowcounts: 4,
      order: {},
      dishesOn: [{type: 1}],
      dishesOff: [],
      form: {
        name: "",
        price: 0,
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
      let user = JSON.parse(sessionStorage.getItem('user'));
      return user.admin == 1;
    }
  },
  methods: {
    thumbs(step, item) {
      let sThumbs = JSON.parse(localStorage.getItem("thumbs") || "{}");
      if(step == 1) {
        if(sThumbs["top"+item.id] == new Date().getDate()) return;
        item.top++;
        sThumbs["top"+item.id] = new Date().getDate();
      } else {
        if(sThumbs["step"+item.id] == new Date().getDate()) return;
        item.step++;
        sThumbs["step"+item.id] = new Date().getDate();
      }
      localStorage.setItem("thumbs", JSON.stringify(sThumbs));
    },
    addOrder(item) {
      //TODO
      console.log(item);
      this.order = item;
    },
    removeOrder(item) {
      //TODO
      this.dishesOn.splice(this.dishesOn.indexOf(item), 1);
    },
    cancelSelect() {
      //TODO
      this.order = {};
    },
    randSelect() {
      //TODO
      this.order = this.dishesOn[Math.floor(Math.random()*this.dishesOn.length)];
    },
    addDishes() {
      //TODO
      console.log("addDishes");
      if(!this.form.name) return;
      this.form.id = "1111";
      this.dishesOn[this.dishesOn.length - 1] = Object.assign({}, this.form);
      this.dishesOn.push({type: 1});
    },
    initDishes() {
      getDishes().then(data => {
        this.dishesOn = data;
        this.dishesOn.push({type: 1});
      });
      getDishes({status: 1}).then(data => {
        this.dishesOff = data;
      });
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
