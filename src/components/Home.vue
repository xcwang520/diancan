<template>
	<el-row class="container">
		<el-col :span="24" class="header" ref="homeHeader" v-if="showHeader">
			<el-col :span="4" class="logo">
				{{sysName}}
			</el-col>
			<el-col :span="18" class="topnav">
				<el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal">
				  <el-menu-item index="/orders" v-if="admin"><a href="#/orders">点餐列表</a></el-menu-item>
				  <el-menu-item index="/dishes"><a href="#/dishes">菜单</a></el-menu-item>
				  <el-menu-item index="/history"><a href="#/history">历史点餐</a></el-menu-item>
					<el-menu-item index="/settings"><a href="#/settings">设置</a></el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="2" class="userinfo">
				<el-dropdown>
					<span class="el-dropdown-link userinfo-inner">{{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item><a href="#/login">退出</a></el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="content-wrapper">
						<transition>
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				showHeader: true,
				sysName:'dc',
				sysUserName: ''
			}
		},
		computed: {
			admin() {
				let user = JSON.parse(localStorage.getItem('user'));
				return user.admin == 1;
			}
		},
		methods: {

		},
		mounted() {
			var user = localStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.name || '';
			}

		}
	}

</script>

<style scoped lang="scss">
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: #20a0ff;//#20a0ff
			color:#fff;
			.topnav ul {
				background: #20a0ff;//#20a0ff
				float: right;
				li {
					&.is-active {
						border-bottom: 5px solid #18c79c;
						font-weight: bold;
						background: rgb(238, 246, 246);
					}
				}
			}
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				//width:230px;
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:230px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
				}
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>
