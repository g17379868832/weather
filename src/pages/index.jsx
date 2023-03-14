// 导入所需模块
import React from 'react'
import { useLocation } from 'react-router-dom'
import { Progress } from 'antd';
import { APPID, APPSECRET } from '../config/id';
import './index.less'
import axios from 'axios';
// 导入所需照片
import icon1 from '../assets/icon1.png'
import icon2 from '../assets/icon2.png'
import icon3 from '../assets/icon3.png'
import icon4 from '../assets/icon4.png'
import icon5 from '../assets/icon5.png'

import qwe from '../assets/qwe.png'
import qwe1 from '../assets/qwe1.png'
import qwe2 from '../assets/qwe2.png'
import qwe3 from '../assets/qwe3.png'
import qwe4 from '../assets/qwe4.png'
import qwe5 from '../assets/qwe5.png'
import qwe6 from '../assets/qwe6.png'



export default function Index() {
	let img = ''
	const { state } = useLocation()
	//判断气象显示图片
	function judgement(keyword) {
		switch (keyword) {
			case 'xue':
				img = 'https://img1.baidu.com/it/u=4090984324,3702608278&fm=253&fmt=auto&app=138&f=JPEG?w=356&h=200'
				break;
			case 'lei':
				img = 'https://img1.baidu.com/it/u=2047907144,3580810064&fm=253&fmt=auto&app=138&f=JPEG?w=756&h=500'
				break;
			case 'shachen':
				img = 'https://img1.baidu.com/it/u=1832260810,2558472021&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=450'
				break;
			case 'wu':
				img = 'https://img1.baidu.com/it/u=2840306360,4206450450&fm=253&fmt=auto&app=138&f=JPEG?w=728&h=500'
				break;
			case 'bingbao':
				img = 'https://img0.baidu.com/it/u=260727089,3407906039&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500'
				break;
			case 'yun':
				img = 'https://img2.baidu.com/it/u=3747818768,1215130092&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333'
				break;
			case 'yu':
				img = 'https://img2.baidu.com/it/u=1750796483,1321721993&fm=253&fmt=auto&app=120&f=JPEG?w=802&h=500'
				break;
			case 'yin':
				img = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201502%2F06%2F20150206142556_nUaUd.thumb.400_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1681274041&t=15dca6aba4be50b99304bda44f63e6da'
				break;
			case 'qing':
				img = 'https://5b0988e595225.cdn.sohucs.com/images/20180728/3494065a069d4d399372cf1efcfc108c.jpeg'
				break;
			default:
				img = 'https://img1.baidu.com/it/u=4090984324,3702608278&fm=253&fmt=auto&app=138&f=JPEG?w=356&h=200'
				break;
		}


	}
	// 封装照片
	function iconJudgement(keyword) {
		return (
			iconFun(keyword)
		)
	}
	function iconFun(keyword) {
		switch (keyword) {
			case 'xue':
				return icon1
			case 'lei':
				return icon2
			case 'shachen':
				return icon3
			case 'wu':
				return icon4
			case 'bingbao':
				return icon5
			case 'yun':
				return "	https://gips1.baidu.com/it/u=452146181,2959101173&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f84_84"
			case 'yu':
				return 'https://gips2.baidu.com/it/u=3385441121,2880448970&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f84_84'
			case 'yin':
				return 'https://gips3.baidu.com/it/u=2471441282,2172258151&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f84_84'
			case 'qing':
				return "https://gips3.baidu.com/it/u=2101432901,1526676003&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f84_84"
			default:
				return icon1
		}
	}
	judgement(state[0].wea_img)


	// 获取年月日
	let myDate = new Date()
	let myYear = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
	let myMonth = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
	let myToday = myDate.getDate(); //获取当前日(1-31)
	myMonth = myMonth > 9 ? myMonth : '0' + myMonth
	myToday = myToday > 9 ? myToday : '0' + myToday
	let nowDate = myYear + '-'+ myMonth + '-'+myToday

	// 获取明天
	let Tomorrow = myDate.getDate()+1
	let TomorrowDate = myYear + '-'+ myMonth + '-'+Tomorrow
	// 未来15天的天气情况
	axios.get(`https://v0.yiketianqi.com/api/worldchina?appid=${APPID}&appsecret=${APPSECRET}`).then(
		data => {
			console.log(data)
		}
	)

	// 截掉不需要的部分
	let wind = state[0].win_speed.split('级')
	let degree_centigrade = state[0].humidity.split('%')
	let km = state[0].visibility.split('km')

	return (
		<div>
			<div className="baseInfo">
				<div className="imgBox" style={{ backgroundImage: `url(${img})` }}>
					{/* 级联选择器 */}
					<div className="position">
						<span>{state[0].city}</span>
						{/* <AntdCascader/> */}
					</div>
					{/* 当前温度 */}
					<div className="tempInfo">
						<div className="temp">{state[0].tem}</div>
						<div>
							<span>℃</span>
						</div>
					</div>
				</div>
				{/* 一天的天气情况 */}
				<div className="hours">
					<div className='title_weather'>
						<div>{state[0].wea}</div>
						<div></div>
						<div>{state[0].win}{state[0].win_speed}</div>
					</div>
					<div className="p">
						<div className="itemBox">
							{state[0].hours.map((hour, index) => {
								return (
									<div className="item" key={index}>
										<span>{hour.hours}</span>
										<img src={iconJudgement(hour.wea_img)} alt="" />
										<span>{hour.tem}℃</span>
									</div>
								)
							})}
						</div>
					</div>
				</div>
				{/* 一周的天气情况 */}
				<div className="days">
					<ul>
						{
							state[1].data.map((item, index) => {
								return (
									<li key={index}>
										<div>{item.date == nowDate ? '今天':item.date == TomorrowDate ? '明天' : item.week}</div>
										<div><img src={iconJudgement(item.wea_img)} alt="" /></div>
										<div>{item.tem1}°/{item.tem2}°</div>
									</li>
								)
							})
						}
						<li className='future'>未来15日天气预报</li>
					</ul>
				</div>
				{/* 空气质量 */}
				<div className='air_quality'>
					<div className='title'>
						<div><img src={qwe} alt="" className='image' /></div>
						空气质量
					</div>
					<div>{state[0].air_level} {state[0].air}</div>
					<div>{state[0].air_tips}</div>
					<Progress percent={state[0].air} status="active" strokeColor={{ from: '#108ee9', to: '#87d068' }} />
				</div>
				{/* 气象信息 */}
				<div className='Weather_Information'>
					<span>气象信息</span>
					<div className='box'>
						<div className='img'><img src={qwe1} alt="" className='image' /></div>
						<div>体感温度</div>
						<div className='tem'>{state[0].tem2}°</div>
					</div>
					<div className='box'>
						<div className='img'><img src={qwe2} alt="" className='image' /></div>
						<div>{state[0].win}</div>
						<div className='tem'>{wind}
							<div className='hectopascal'>级</div>
						</div>
					</div>

					<div className='box'>
						<div className='img'><img src={qwe3} alt="" className='image' /></div>
						<div>湿度</div>
						<div className='tem'>{degree_centigrade}
							<div className='hectopascal'>%</div>
						</div>
					</div>
					<div className='box'>
						<div className='img'><img src={qwe4} alt="" className='image' /></div>
						<div>紫外线</div>
						<div className='tem'>{state[0].tem2}
						<div className='hectopascal'>弱</div>
						</div>
					</div>

					<div className='box'>
						<div className='img'><img src={qwe5} alt="" className='image' /></div>
						<div>能见度</div>
						<div className='tem'>{km}
						<div className='hectopascal'>千米</div>
						</div>
					</div>
					<div className='box'>
						<div className='img'><img src={qwe6} alt="" className='image' /></div>
						<div>气压</div>
						<div className='tem'>{state[0].pressure}
							<div className='hectopascal'>百帕</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
