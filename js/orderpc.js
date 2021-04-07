$(function() {


    if(!localStorage.getItem('Acount')){
    	location.href='../login.html'
    }
	window.alert = function(name) {
		var iframe = document.createElement("IFRAME");
		iframe.style.display = "none";
		iframe.setAttribute("src", 'data:text/plain,');
		document.documentElement.appendChild(iframe);
		window.frames[0].window.alert(name);
		iframe.parentNode.removeChild(iframe);
	}
    let obj= JSON.parse(localStorage.getItem('myNumobj'))
    let mynum=obj.AccountNumber
    //增值服务确定
	var valueaddArr=[]
	var corderboxs = [];
	var arrsize = [];
	localStorage.setItem('state', 'show')
	var _account = localStorage.getItem('Acount');
	var _tel = localStorage.getItem('Telphone');
	localStorage.removeItem('Inmain')
	var _openid = localStorage.getItem('zdtqopenid');
        $.ajax({
    	type:"post",
    	url:"http://out.ccsc58.cc/DATA_PORT_WECHAT_1.03/Clinical_add_service.php",
    	async:true,
    	data:{
    		username:_account,
    		state:'itemlist'
    	},
    	dataType:'json',
    	success:function(res){
    		console.log(res)
    		$('.valueaddType .valueaddTypebox').html('')
    		if(res.code==200){
	    		$.each(res.data, function(index,val) {
	    			let str=''
	    			str=`<span class="ni">${val.ItemName}</span>`;
	    			$('.valueaddType .valueaddTypebox').append(str)
	    		});
    		}else{
    			alert(res.message)
    		}
    		
    	},
    	error:function(err){
    		console.log(err)
    	}
    });
    	var wdqj = [];
	$.ajax({
		type: "post",
		url: "http://out.ccsc58.cc/DATA_PORT_WECHAT_1.03/Clinical_Wdqj.php",
		async: false,
		data: {
			state: 'wdqj',
			AccountNumber:mynum
		},
		dataType: 'JSON',
		success: function(res) {
			$('.choosewenqu .pcwenqu').html("");
			$('.choosewenqu .pcwenqu').prepend("<option  value='请选择温区'>请选择温区</option>"); //添加第一个option值
			$.each(res.data, function(index, val) {
				wdqj.push(val.WDQJ);
				$('.choosewenqu .pcwenqu').append('<option value="'+val.WDQJ+'">'+val.WDQJ+'</option>')
			});
//			$.each(res.data, function(index, val) {
//				
//			});

		},
		error: function(err) {

		}
	});
	$("#goodname").blur(function(){
	  let curval=$(this).val()
     let obj = JSON.parse(localStorage.getItem('order'))==null?{}:JSON.parse(localStorage.getItem('order'));;
      obj.CargoName=curval
      localStorage.setItem("order", JSON.stringify(obj));
	});
	
	if(localStorage.getItem('order')) {
		var hisorder = JSON.parse(localStorage.getItem('order'));
		console.log(hisorder)
		console.log(hisorder.BusinessType)
		if(hisorder.BusinessType!=undefined){
			$("#Goodstypes").text(hisorder.BusinessType);
		}
		if(hisorder.CargoName!=undefined){
			$("#goodname").val(hisorder.CargoName);
		}
		if(hisorder.XMNO!=undefined){
			$("#xmbh").val(hisorder.XMNO);
		}
		if(hisorder.AddService!=undefined){
			let arrstr=hisorder.AddService.join(',')
			$("#Valueadd").text(arrstr);
		}
		if(hisorder.WDQJ!=undefined){
			$(".pcwenqu").val(hisorder.WDQJ)
		}
		if(hisorder.AddService!=undefined){
			 valueaddArr=hisorder.AddService
			$("#Valueadd").text(hisorder.AddService)
		}
		
//		$(".pcwenqu option[text='2℃~8℃']").attr("selected", "selected"); 
		if(hisorder.Name4 == "使用") {
			$("#usewdj").attr("src", "../img/wenduji.png");
			$("#usewdj").attr("isuse", "1");
		} else {
			$("#usewdj").attr("src", "../img/bushiyong.png");
			$("#usewdj").attr("isuse", "0");
		}
        if(hisorder.SafeItem!=undefined){
			if(hisorder.SafeItem == "投保") {
				$("#clicktoubao").attr("src", "../img/baojiafanliguanli.png");
				$("#clicktoubao").attr("istoubao", "1");
				$("#clicktoubao").parent().next().find('span').css("color", "#1c84c6");
				$("#clicktoubao").parent().next().find('input').css("color", "#1c84c6");
				$("#clicktoubao").parent().next().find('input').attr("readonly", false);
				$("#clicktoubao").parent().next().find('input').val(hisorder.SafePay);
			} else {
				$("#clicktoubao").attr("src", "../img/butoubao.png");
				$("#clicktoubao").attr("istoubao", "0");
				$("#clicktoubao").parent().next().find('span').css("color", "#999999");
				$("#clicktoubao").parent().next().find('input').css("color", "#999999");
				$("#clicktoubao").parent().next().find('input').attr("readonly", true);
				$("#clicktoubao").parent().next().find('input').val(hisorder.SafePay);
			}
		}
		if(hisorder.Box!=undefined){
			corderboxs=hisorder.Box
		}
		
//		console.log(corderboxs)
		if(corderboxs!=undefined){
			$(corderboxs).each(function(index, value) {
				let str = '';
				if(index == (corderboxs.length - 1)) {
					str = `<li class="childbox orderbox li">
							<div class='d1'>
								<img src="../img/box.png" class="img_temp view"  />
							</div>
							<div class="choosewenqu">
								<label class="clickbox boxinput Cchildbox" size='${value.PackageSize}'>${value.PackageName}</label>
								<span class='boxinputsize'>${value.PackageSize}</span>
								<img src="../img/xiala.png" class="xiala" />
								<p class="gw_num">
									<img src="../img/reduce.png" class="jian" />
									<input type="text" value='${value.Num}' disabled="disabled"  class="num" readonly="readonly" />
									<img src="../img/addbox.png" class="add" />
								</p>
							</div>
						</li>`;
				} else {
					str = `<li class="childbox orderbox li">
							<div>
								<img src="../img/box.png" class="img_temp" />
							</div>
							<div class="choosewenqu">
								<label class="clickbox boxinput Cchildbox" size='${value.PackageSize}'>${value.PackageName}</label>
								<span class='boxinputsize'>${value.PackageSize}</span>
								<img src="../img/delbox.png" class="delbox" />
								<p class="gw_num">
									<img src="../img/reduce.png" class="jian" />
									<input type="text" value='${value.Num}' disabled="disabled"  class="num" readonly="readonly" />
									<img src="../img/addbox.png" class="add" />
								</p>
							</div>
						</li>`;
				}
				$('.CTemporSize').after(str);
			});
			}
		$("#ChooseTimes").text(hisorder.OrderTime);
		$(".note .time-right textarea").val(hisorder.Note);
		$('.btndiv button').removeAttr("disabled");
		$(".btndiv button").css('background', '#12599B');
		check();
	}
   
	//check();
	function check() {
		$.ajax({
			url: "http://out.ccsc58.cc/DATA_PORT_WECHAT_1.03/OrderShow.php",
			type: "post",
			async: true,
			data: {
				Telephone: _tel,
				AccountNumber: _account
			},
			dataType: "json",
			success: function(res) {
//				console.log(res.code);
				localStorage.removeItem('SendaddData');

				if(res.code == '300') {

					var r = confirm("请先进行寄件信息录入")
					if(r == true) {
						location.href = 'InfoInput.html'
					} else {
						console.log(res)
					}
				} else if(res.code == "200") {
					$('#send_username').text(res.data.Name);
					$('#send_tel').text(res.data.Telephone);
					$('#send_address').text(res.data.Depart + " " + res.data.City + " " + res.data.Area + " " + res.data.Address);
					var addData = {
						addressname: res.data.Name,
						addresstel: res.data.Telephone,
						address: res.data.Depart + " " + res.data.City + " " + res.data.Area + " " + res.data.Address,
						addressaccount: res.data.AccountNumber,
						company: res.data.Company
					};

					localStorage.setItem('SendaddData', JSON.stringify(addData));
					//location.reload();

					//					setTimeout(function() {
					//                    window.location.href="order.html?r="+Math.ceil(Math.random()*10); 
					//					}, "1000");

				} else {
					console.log("123")
				}
			},
			error: function(err) {
				console.log(err)
			}
		})
	}
//	if(_account == null) {
//		window.location.href = '../OldLogin.html?openid=' + _openid;
//		return false;
//	}

	if(JSON.parse(localStorage.getItem('wxobject'))) {
		var wxobject = JSON.parse(localStorage.getItem('wxobject'));
		var touxiangImg = wxobject.touxing;
		var nickname = wxobject.nickname;
	}

	if(touxiangImg != '' || touxiangImg != null) {
		$('.menu_footer .touxiang').attr('src', touxiangImg)
	}
	
	if(nickname != '' || nickname != null) {
		let _account=localStorage.getItem('Telphone');
		$('.menu_footer .turename').text(_account)
		$('.menu_footer .turetel').text('正大天晴')
	}
	var b = (JSON.stringify(objboxsize) == "{}");
	
	var cobjbox = {};
	if($('#Goodstypes').text() == '请选择货物类型' && $('#Tempqu').text() == '请选择温区' && $('#ChooseTimes').text() == '预约取件时间') {
		$('.btndiv button').attr('disabled', "disabled");
	} else {
		if(corderboxs!=undefined){
			
		
		if(corderboxs.length > 1 || !b) {
			$('.btndiv button').removeAttr('disabled');
		} else if(corderboxs.length > 1 || b) {
			$('.btndiv button').removeAttr('disabled');
		} else if(corderboxs.length == 0 || !b) {
			$('.btndiv button').removeAttr('disabled');
		} else {
			$('.btndiv button').attr('disabled', "disabled");
		}
		}
		//$('.btndiv button').attr('disabled', false);
	}

	$('header label .acount').text(_tel);

	//新增账号
//	$('.acountlist .send button').on("click", function() {
//		sessionStorage.setItem('Acount', _account);
//		sessionStorage.setItem('yemian', "order");
//		localStorage.setItem('state', 'xinzeng');
//		location.href = '../MobileBind.html?openid=' + _openid
//	})
	//点击账号切换
	$('body').on("click", ".acountlist .send li", function() {
		console.log($(this).text());
		localStorage.setItem('Acount', $(this).text());
		localStorage.removeItem('SendaddData');

		$.ajax({
			url: "http://out.ccsc58.cc/DATA_PORT_WECHAT_1.03/OrderShow.php",
			type: "post",
			data: {
				Telephone: _tel,
				AccountNumber: $(this).text()
			},
			dataType: "json",
			success: function(res) {
				if(res.code == '300') {

					location.reload();
					//					}
				} else if(res.code == "200") {

					var addData = {
						id: res.data.ID,
						addressname: res.data.Name,
						addresstel: res.data.Telephone,
						address: res.data.Depart + " " + res.data.City + " " + res.data.Area + " " + res.data.Address,
						addressaccount: res.data.AccountNumber,
						company: res.data.Company
					};

					localStorage.setItem('SendaddData', JSON.stringify(addData));
					window.location.href = "order.html?r=" + Math.ceil(Math.random() * 10);
				} else {
					console.log("123")
				}
			},
			error: function(err) {
				console.log(err)
			}
		})

	})

	function GetDateStr(AddDayCount) {
		var dd = new Date();
		dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
		var y = dd.getFullYear();
		var m = dd.getMonth() + 1; //获取当前月份的日期
		var d = dd.getDate();
		return y + "-" + m + "-" + d;
	}
	var date = [GetDateStr(0), GetDateStr(1), GetDateStr(2)];

	var telephone = localStorage.getItem('Telephone');
	if(JSON.parse(localStorage.getItem('SendaddData'))) {
		var _ChoseaddData = JSON.parse(localStorage.getItem('SendaddData'));
		var _ChaddreType = localStorage.getItem('ChaddreType');
		$(".Noexistsend").hide();
		$(".existsend").show();
		$('#send_username').text(_ChoseaddData.addressname);
		$('#send_tel').text(_ChoseaddData.addresstel);
		$('#send_address').text(_ChoseaddData.address);
	} else {
		$.ajax({
			url: "http://out.ccsc58.cc/DATA_PORT_WECHAT_1.03/OrderShow.php",
			type: "post",
			async: true,
			data: {
				Telephone: _tel,
				AccountNumber: _account
			},
			dataType: "json",
			success: function(res) {
				console.log(res.code);
				localStorage.removeItem('SendaddData');

				if(res.code == '300') {

					//					var r = confirm("请先进行寄件信息录入")
					//					if(r == true) {
					//						location.href = 'InfoInput.html'
					//					} else {
					console.log(res)
					//					}
				} else if(res.code == "200") {
					console.log("12");
					$(".Noexistsend").hide();
					$(".existsend").show();
					$('#send_username').text(res.data.Name);
					$('#send_tel').text(res.data.Telephone);
					$('#send_address').text(res.data.Depart + " " + res.data.City + " " + res.data.Area + " " + res.data.Address);
					var addData = {
						id: res.data.ID,
						addressname: res.data.Name,
						addresstel: res.data.Telephone,
						address: res.data.Depart + " " + res.data.City + " " + res.data.Area + " " + res.data.Address,
						addressaccount: res.data.AccountNumber,
						company: res.data.Company
					};
					localStorage.setItem('SendaddData', JSON.stringify(addData));
				} else {
					console.log("123")
				}
			},
			error: function(err) {
				console.log(err)
			}
		})
	}
	if(JSON.parse(localStorage.getItem('getaddData'))) {
		var _ChosogaddData = JSON.parse(localStorage.getItem('getaddData'));
		var _ChaddreType = localStorage.getItem('ChaddreType');
		$(".Noexistget").hide();
		$(".existget").show();
		$('#get_username').text(_ChosogaddData.addressname);
		$('#get_tel').text(_ChosogaddData.addresstel);
		$('#get_address').text(_ChosogaddData.address);
	}
	$('.clear').on('click', function() {
		sessionStorage.removeItem('order');
		location.reload();
	})
	//寄件人地址薄选择
	$(".sendaddress").on("click", function() {
		var _ChaddreType = 'send';
		localStorage.setItem('ChaddreType', _ChaddreType);
		localStorage.removeItem('Inmain');
		location.href = 'addressbook.html';

	})
	//寄件人地址编辑
	$(".existsend").on("click", function() {
		var _ChoseaddData = JSON.parse(localStorage.getItem('SendaddData'));
		var _ChaddreType = 'send';
		localStorage.setItem('ChaddreType', _ChaddreType);
		localStorage.setItem('Inmain', "Insendinfo");
		localStorage.removeItem('mystate');
		location.href = 'InfoInput.html?id=' + _ChoseaddData.id;

	})
	//收件人地址编辑
	$(".existget").on("click", function() {
		var _ChoseaddData = JSON.parse(localStorage.getItem('getaddData'));
		var _ChaddreType = 'get';
		localStorage.setItem('ChaddreType', _ChaddreType);
		localStorage.removeItem('mystate')
		localStorage.setItem('Inmain', "Ingetinfo");
		location.href = 'InfoInput.html?id=' + _ChoseaddData.id;
	})
	//收件人地址薄选择
	$(".getaddress").on("click", function() {
		var _ChaddreType = 'get';
		localStorage.removeItem('Inmain');
		localStorage.setItem('ChaddreType', _ChaddreType);
		location.href = 'addressbook.html';
	})

	//新增寄件人地址
	$(".Noexistsend").on("click", function() {
		var _ChaddreType = 'send';
		localStorage.setItem('ChaddreType', _ChaddreType);
		localStorage.setItem('Inmain', "Insendinfo");
		localStorage.removeItem('mystate')
		location.href = 'Addsendress.html';
	})
	//新增收件人地址
	$(".Noexistget").on("click", function() {
		var _ChaddreType = 'get';
		localStorage.setItem('ChaddreType', _ChaddreType);
		localStorage.removeItem('mystate')
		localStorage.setItem('Inmain', "Ingetinfo");
		location.href = 'Addgetaddress.html';
	})


	$(".yin").on('click', function() {
		$(".setbg").hide();
		$('body,html').animate({
			scrollTop: 0
		}, 0);
	})

	$(".closewindow").on('click', function() {
		$(".setbg").hide();
		$('body,html').animate({
			scrollTop: 0
		}, 0);
	})



	//点击货物类型
	$(".cgoodtype").on('click', function() {
		$('.acountlist').hide();
		$(".setbg").show();
		$(".goodsType").show();
		$(".Temparea").hide();
		$(".BoxType").hide();
		$(".TimeType").hide();
		$(".valueaddType").hide();
		$(".BoxSize").hide();
		if($('#Goodstypes').text() == '请选择货物类型' && $('.choosewenqu .pcwenqu').val() == '请选择温区' && $('#BoxType').text() == '请选择箱型' && $('#ChooseTimes').text() == '预约取件时间') {
			$('.btndiv button').attr('disabled', true);
		} else {
			$('.btndiv button').removeAttr("disabled");
			$(".btndiv button").css('background', '#12599B');
		}

	})
	//点击增值服务
	$(".cvalueadd").on('click', function() {
		$('.acountlist').hide();
		$(".setbg").show();
		$(".goodsType").hide();
		$(".Temparea").hide();
		$(".BoxType").hide();
		$(".TimeType").hide();
		$(".BoxSize").hide();
		$(".valueaddType").show();
		if($('#Goodstypes').text() == '请选择货物类型' && $('.choosewenqu .pcwenqu').val() == '请选择温区' && $('#BoxType').text() == '请选择箱型' && $('#ChooseTimes').text() == '预约取件时间') {
			$('.btndiv button').attr('disabled', true);
		} else {
			$('.btndiv button').removeAttr("disabled");
			$(".btndiv button").css('background', '#12599B');
		}

	})

	//点击预约时间
	var mytime = '';
	$(".clickTime").on('click', function() {
		$("#popup").show()
		this.isShow = true;

	})
	$(".bar.bar-1 img").on("click", function() {
		$("#popup").hide()
	})
	//货物类型选择
	$(".Temparea-Ways .Tempareac .ni").on('click', function() {
		$(this).parents('.Temparea-Ways').find('.ni').removeClass('spanActive');
		$(this).addClass('spanActive');
		if($(this).parent().attr("class").indexOf("Dryice") != -1) {
			$('.BoxTypef1 .ni').removeClass('disable');
			$('.BoxTypef2').hide();
			$('.BoxTypef1').show();
			$('.BoxTypef2 .ni').addClass('disable');
			$('.BoxTypef2 .ni').removeClass('spanActive');
		} else {
			$('.BoxTypef1').hide();
			$('.BoxTypef2').show();
			$('.BoxTypef1 .ni').addClass('disable');
			$('.BoxTypef2 .ni').removeClass('disable');
			$('.BoxTypef1 .ni').removeClass('spanActive');
		}

	});
	//增值服务选择
	$("body").on('click','.valueaddType .valueaddTypebox .ni', function() {
//		$(this).parents('.valueaddTypebox').find('.ni').removeClass('spanActive');
			$(this).toggleClass('spanActive');
		
		
		

	});
	var arrCbox = [];
	$(".BoxType .ni").on('click', function() {
		if($(this).attr('class').indexOf("spanActive") != -1) {
			$(this).removeClass('spanActive')
		} else {
			$(this).addClass('spanActive');
		}
	});

	var arrcBoxTxts = [];
	//点击时间日期
	$(".TimeType-Ways .TimeType-day .ni").on('click', function() {
		$(this).siblings().removeClass('spanActive');
		$(this).addClass('spanActive');
		$(this).find('img').show();
		$(this).siblings().find('img').hide();
		if($(this).find('.ri').text() == '明日' || $(this).find('.ri').text() == '后日') {
			$('.TimeType-datetime').empty();
			let currtime = ['8:30-10:30', '10:30-12:30', '12:30-14:30', '14:30-16:30', '16:30-17:30']
			$(currtime).each(function(key, index) {
				let str = '<span class="ni">';
				str += index;
				str += '</span>';
				$('.TimeType-datetime').append(str);
			});
		} else {
			let currhour = d.getHours();
			$('.TimeType-datetime').empty();
			if(currhour < 0 || currhour > 24) {
				currtime = ['无效时间']
			} else if(currhour >= 6 && currhour < 17) {
				currtime = ['2小时上门', '8:30-10:30', '10:30-12:30', '12:30-14:30', '14:30-16:30', '16:30-17:30']
			} else {
				currtime = ['非正常预约时间'];
			}
			$(currtime).each(function(key, index) {
				let str = '';
				if(currhour <= 8) {
					str = '<span class="ni">';
					str += index;
					str += '</span>';
				} else if(currhour >= 10 && currhour < 12) {
					if(key == 1) {
						str = '<span class="ni disable">';
						str += index;
						str += '</span>';
					} else {
						str = '<span class="ni">';
						str += index;
						str += '</span>';
					}
				} else if(currhour >= 12 && currhour < 14) {
					if(key == 1 || key == 2) {
						str = '<span class="ni disable">';
						str += index;
						str += '</span>';
					} else {
						str = '<span class="ni">';
						str += index;
						str += '</span>';
					}
				} else if(currhour >= 14 && currhour < 16) {
					if(key >= 1 && key <= 3) {
						str = '<span class="ni disable">';
						str += index;
						str += '</span>';
					} else {
						str = '<span class="ni">';
						str += index;
						str += '</span>';
					}
				} else {
					str = '<span class="ni disable">';
					str += index;
					str += '</span>';
				}
				$('.TimeType-datetime').append(str);
			});
		}
	});
	//监听备注录入
	$(".note .time-right textarea").bind("input propertychange", function(event) {
		if($('#Goodstypes').text() == '请选择货物类型' &&$('.choosewenqu .pcwenqu').val() == '请选择温区' && $('#BoxType').text() == '请选择箱型' && $('#ChooseTimes').text() == '预约取件时间') {
			$('.btndiv button').attr('disabled', true);
		} else {
			$('.btndiv button').removeAttr("disabled");
			$(".btndiv button").css('background', '#12599B');
		}
	});
	//点击小时
	$('body').on('click', ".TimeType-Ways .TimeType-datetime .ni", function() {
		$(this).siblings().removeClass('spanActive');
		$(this).addClass('spanActive');
	});

	$(".Temparea-btn").on('click', function() {
		var chooseTempTxt = $('.Temparea .spanActive').text();
		if(chooseTempTxt == '') {
			alert("请选择温度区间");
			$("#Tempqu").removeClass('chooseTemp');
			$(".fatherbox .choosewenqu .gw_num").removeClass('hide');
		} else {
			$("#Tempqu").text(chooseTempTxt);
			$("#Tempqu").addClass('chooseTemp');
			$("#BoxType").text('请选择箱型');
			$('.BoxType .BoxType-Ways .ni').removeClass('spanActive');
			$(".fatherbox .choosewenqu p").addClass('hide');
			$('.childbox').remove();
			arrcBoxTxts = [];
			$('.choosewenqu .gw_num input').val('1');
			$(".setbg").hide();
			$(".setbg").hide();
		}
	});

	//货物类型确定
	$(".Goodstype-btn").on('click', function() {
		var chooseGoodtypeTxt = $('.goodsType  .Tempareac .spanActive').text();
		if(chooseGoodtypeTxt == '') {
			alert("请选择货物类型");
		} else {
			$("#Goodstypes").text(chooseGoodtypeTxt);
			$("#Goodstypes").addClass('Cgoods');
            let curval=chooseGoodtypeTxt
           let obj = JSON.parse(localStorage.getItem('order'))==null?{}:JSON.parse(localStorage.getItem('order'));;
            obj.BusinessType=curval
				
            localStorage.setItem("order", JSON.stringify(obj));
			$(".setbg").hide();
		}
	});
	
	$(".valueadd-btn").on('click', function() {
		valueaddArr=[]
		$('#Valueadd').text('请选择增值服务')
		$.each($('.valueaddType .valueaddTypebox .spanActive'), function() {
			valueaddArr.push($(this).text())
			let cur=$('#Valueadd').text()=='请选择增值服务'?'':$('#Valueadd').text()
			$("#Valueadd").text(cur+$(this).text()+",")
		});
		let curval=valueaddArr
       let obj = JSON.parse(localStorage.getItem('order'))==null?{}:JSON.parse(localStorage.getItem('order'));;
        obj.AddService=curval
        localStorage.setItem("order", JSON.stringify(obj));
//		var choosevalueaddTxt = .text();
		
//		$("#Valueadd").text(choosevalueaddTxt);
		$("#Valueadd").addClass('Cgoods');
		$(".setbg").hide();
//		
	});

	$(".time-btn").on('click', function() {
		var chooseDay = $('.TimeType-day .spanActive .qi').text();
		var chooseTimeTxt = $('.TimeType-datetime .spanActive').text();
		$("#ChooseTimes").text(chooseDay + ' ' + chooseTimeTxt);
		$(".time .time-right label").addClass("chooseTimes");
		$(".setbg").hide();
	});
	$('aside.slide-wrapper').on('touchstart', 'li', function(e) {
		$(this).addClass('current').siblings('li').removeClass('current');
	});

	$('a.slide-menu').on('click', function(e) {
		var wh = $('div.wrapper').height();
		$('div.slide-mask').css('height', '100%').show();
		$('aside.slide-wrapper').css('height', '100%').addClass('moved');
	});

	$('div.slide-mask').on('click', function() {
		$('div.slide-mask').hide();
		$('aside.slide-wrapper').removeClass('moved');
	});
	$('.menu_top img').on('click', function() {
		$('div.slide-mask').hide();
		$('aside.slide-wrapper').removeClass('moved');
	});
	//提取汉字
	function  GetChinese(strValue)  {     
		if(strValue !=  null  &&  strValue !=  "") {         
			var  reg  =  /[\u4e00-\u9fa5]/g;          
			return  strValue.match(reg).join("");      
		}      
		else   
			return  "";  
	} 
	//去掉汉字
	function  RemoveChinese(strValue)  {     
		if(strValue !=  null  &&  strValue  !=  "") {         
			var  reg  =  /[\u4e00-\u9fa5]/g;         
			return  strValue.replace(reg, "");      
		}      
		else 
			return  "";  
	} 
	function trimstart(v) { //去除字符串尾空白
		if(typeof v == 'string') return v.replace(/^\s+/, '')
		return v;
	}

	function replacepos(text, start, stop, replacetext) {
		mystr = text.substring(0, stop - 1) + replacetext + text.substring(stop + 1);
		return mystr;
	}

	function getNowFormatDate() {
		var date = new Date();
		var seperator1 = "-";
		var seperator2 = ":";
		var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
		var strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
		var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
			" " + date.getHours() + seperator2 + date.getMinutes() +
			seperator2 + date.getSeconds();
		return currentdate;
	}
	$('.money').blur(function() {
        let curval=$(this).val()
        let obj = JSON.parse(localStorage.getItem('order'))==null?{}:JSON.parse(localStorage.getItem('order'));;
        obj.SafePay=curval
        localStorage.setItem("order", JSON.stringify(obj));
	})
	$('textarea').blur(function() {
        let curval=$(this).val()
       let obj = JSON.parse(localStorage.getItem('order'))==null?{}:JSON.parse(localStorage.getItem('order'));;
        obj.Note=curval
        localStorage.setItem("order", JSON.stringify(obj));
	})
//	$('.high,.money').blur(function() {
//		$('body,html').animate({
//			scrollTop: 0
//		}, 0);
//	})
//	$('textarea').blur(function() {
//		$('body,html').animate({
//			scrollTop: 0
//		}, 0);
//	})

	$("body").on("click", ".fatherboxsize .gw_num .add", function() {
		var n = $(this).prev().val();
		var num = parseInt(n) + 1;
		if(num == 0) {
			return;
		}
		$(this).prev().val(num);
		objboxsize['nums'] = num;
		console.log(objboxsize)

	});
	//减的效果
	$("body").on("click", ".fatherboxsize .gw_num .jian", function() {
		var n = $(this).next().val();
		var num = parseInt(n) - 1;
		if(num == 0) {
			for(var key in objboxsize) {
				delete objboxsize[key];
			}
			console.log(objboxsize);
			$(".fatherboxsize").hide();
			$('.CTemporSize .goodsize').removeClass('activeexist');

		}

		if(num != 0) {
			$(this).next().val(num);
			objboxsize['nums'] = num;

		}
		console.log(objboxsize)
	});

	//点击头像跳转
	$(".menu_footer").on("click", function() {
		location.href = 'person.html';
	})

	$(".alldizhi").on("click", function(res) {
		location.href = 'Alladdressbook.html';
		console.log("123");
		localStorage.setItem('state', 'all');
		localStorage.setItem('ChaddreType', 'all');
	})
	$(".CTemporSize span").on("click", function() {
		$(this).addClass('active');
		if($(this).text() == '货物尺寸') {
			if($("#Tempqu").text() == '请选择温区') {
				alert("请选择温度区间");
				return false;
			}
			$(".setbg").show();
			$(".BoxSize").show();
			$(".goodsType").hide();
			$(".Temparea").hide();
			$(".BoxType").hide();
			$(".TimeType").hide();
			$(".valueaddType").hide();

		} else {

			if($("#Tempqu").text() == '请选择温区') {
				alert("请选择温度区间");
				return false;
			} else {
				$('.acountlist').hide();
				$(".setbg").show();
				$(".goodsType").hide();
				$(".Temparea").hide();
				$(".TimeType").hide();
				$(".BoxSize").hide();
				$(".valueaddType").hide();
				if(corderboxs.length >= 1) {
					$(".BoxType").show();
					var temd = $("#Tempqu").text();
					tempboxtype(temd);
				} else {
					var temd = $("#Tempqu").text();
					tempboxtype(temd);
					$(".BoxType").show();
				}

			}
			if($('#Goodstypes').text() == '请选择货物类型' && $('#Tempqu').text() == '请选择温区' && $('#ChooseTimes').text() == '预约取件时间') {

				$('.btndiv button').attr('disabled', true);
			} else {

				$('.btndiv button').removeAttr("disabled");
				$(".btndiv button").css('background', '#12599B');
			}
		}

	})

	//根据温区查找箱型
	function tempboxtype(wdqj) {
        let obj= JSON.parse(localStorage.getItem('myNumobj'))
        let mynum=obj.AccountNumber
//		$('body,html').animate({
//			scrollTop: 0
//		}, 0);
		var _wdqj = $('.pcwenqu').val();
		$.ajax({
			type: "post",
			url: "http://out.ccsc58.cc/DATA_PORT_WECHAT_1.03/Clinical_Wdqj.php",
			data: {
				state: "box",
				WDQJ: _wdqj,
				AccountNumber:mynum
			},
			dataType: "JSON",
			success: function(res) {

				if(res.code == '200') {
					$('.BoxType .BoxType-Ways').html("");
					if(corderboxs.length > 0) {
						var boxstrs = '';
						var boxstrs2 = {};
						corderboxs.forEach(function(index2, item2) {
							boxstrs2[index2.PackageName] = index2.Num;
						})
						//						    console.log(boxstrs2) 
						res.data.forEach(function(index, item) {
							boxstrs = `<div class='boxone'><p class='mydesc'><span class="TboxType">${index.PackageType}</span><span class="TboxTypeSize">${index.NSize}</span></p>`;
							if(boxstrs2[index.PackageType] > 0) {
								boxstrs += `<p class="gw_num">
														<img src="../img/reduce.png" class="jian">
														<input type="text"  class="num" value='${boxstrs2[index.PackageType]}' disabled="disabled"  readonly="readonly">
														<img src="../img/addbox.png" class="add">
														</p>`;
							} else {
								boxstrs += `<p class="gw_num">
															<img src="../img/reduce.png" class="jian" style="display: none;">
															<input type="text"  class="num" style="display: none;" disabled="disabled"  readonly="readonly">
															<img src="../img/addbox.png" class="add">
															</p>`;
							}
							boxstrs += `</div>`;
							$('.BoxType .BoxType-Ways').append(boxstrs);
						});
					} else {
						var boxstrs = '';
						$.each(res.data, function(index, item) {

							boxstrs = `<div class='boxone'> 
									<p class='mydesc'><span class="TboxType">${item.PackageType}</span><span class="TboxTypeSize">${item.NSize}</span></p>
									<p class="gw_num">
										<img src="../img/reduce.png" class="jian" style="display: none;">
										<input type="text"  class="num" style="display: none;" readonly="readonly">
										<img src="../img/addbox.png" class="add">
									</p>
								    </div>`;
							$('.BoxType .BoxType-Ways').append(boxstrs);

						});
					}
				}
			},
			error: function(err) {
				console.log(err)
			}
		});
	}

	//点击使用温度计
	var togglewdj = true;
	$("#usewdj").click(function() {
		if(togglewdj) {
			$(this).attr("src", "../img/wenduji.png");
			$(this).attr("isuse", "1");
			togglewdj = false;
			let curval='使用'
           let obj = JSON.parse(localStorage.getItem('order'))==null?{}:JSON.parse(localStorage.getItem('order'));;
            obj.Name4=curval
            localStorage.setItem("order", JSON.stringify(obj));
		} else {
			$(this).attr("src", "../img/bushiyong.png");
			$(this).attr("isuse", "0");
			togglewdj = true;
			let curval='不使用'
           let obj = JSON.parse(localStorage.getItem('order'))==null?{}:JSON.parse(localStorage.getItem('order'));;
            obj.Name4=curval
				
            localStorage.setItem("order", JSON.stringify(obj));
		}
	});
	//点击投保
	var toggletoubao = true;
	$("#clicktoubao").click(function() {
		if(toggletoubao) {
			$(this).attr("src", "../img/baojiafanliguanli.png");
			$(this).attr("istoubao", "1");
			$(this).parent().next().find('span').css("color", "#1c84c6");
			$(this).parent().next().find('input').css("color", "#1c84c6");
			$(this).parent().next().find('input').attr("readonly", false);
			$(this).parent().next().find('input').val("");
			toggletoubao = false;
			let curval='投保'
           let obj = JSON.parse(localStorage.getItem('order'))==null?{}:JSON.parse(localStorage.getItem('order'));;
            obj.SafeItem=curval
            localStorage.setItem("order", JSON.stringify(obj));
		} else {
			$(this).attr("src", "../img/butoubao.png");
			$(this).attr("istoubao", "0");
			$(this).parent().next().find('span').css("color", "#999999");
			$(this).parent().next().find('input').css("color", "#999999");
			$(this).parent().next().find('input').attr("readonly", true);
			$(this).parent().next().find('input').val("2000");
			toggletoubao = true;
			let curval='不投保'
           let obj = JSON.parse(localStorage.getItem('order'))==null?{}:JSON.parse(localStorage.getItem('order'));;
            obj.SafeItem=curval
            localStorage.setItem("order", JSON.stringify(obj));
		}
	});
	//正在选箱型添加
	$('body').on("click", ".BoxType .boxone .add", function() {
		var cboxnum = $(this).parent().find('input').val();

		if(cboxnum == '') {
			$(this).parent().find('input').show();
			$(this).parent().find('.jian').show();
			$(this).parent().find('input').val("1");
		} else {
			cboxnum = parseInt(cboxnum) + 1;
			$(this).parent().find('input').val(cboxnum);
		}

	})
	//选好的箱型添加
	$('body').on("click", ".orderbox .gw_num .add", function() {
		var chooseboxnum = $(this).parent().find('input').val();
		var chooseboxnames = $(this).parents('.choosewenqu').find('.Cchildbox').text();
		if(chooseboxnum == '') {
			$(this).parent().find('input').show();
			$(this).parent().find('.jian').show();
			$(this).parent().find('input').val("1");
		} else {
			chooseboxnum = parseInt(chooseboxnum) + 1;
			$(this).parent().find('input').val(chooseboxnum);
			for(var i = 0; i < corderboxs.length; i++) {
				if(corderboxs[i].PackageName == chooseboxnames) {
					corderboxs[i].Num = chooseboxnum;
				}

			}
		}
	})
	//箱型减少
	$('body').on("click", ".BoxType .boxone .jian", function() {
		var cboxnum = $(this).parent().find('input').val();
		cboxnum = parseInt(cboxnum) - 1;
		if(cboxnum == 0) {
			$(this).parent().find('input').hide();
			$(this).parent().find('.jian').hide();
			$(this).parent().find('input').val("");
		} else {
			$(this).parent().find('input').val(cboxnum);
		}

	})
	//选好的箱型减少

	$('body').on("click", ".orderbox .gw_num .jian", function() {
		var reducenum = $(this).parent().find('input').val();
		var cboxnumnames = $(this).parents('.choosewenqu').find('.Cchildbox').text();
		reducenum = parseInt(reducenum) - 1;

		if(reducenum == 0) {
			if(corderboxs.length == 0) {
				$('.CTemporSize .tempbox').removeClass('activeexist');
			}
			$(this).parents('ul').find('.orderbox').first().addClass('view');
			for(var i = 0; i < corderboxs.length; i++) {
				if(corderboxs[i].PackageName == cboxnumnames) {
					corderboxs.splice(i, 1);
				}

			}
			if(corderboxs.length == 0) {
				$('.CTemporSize .tempbox').removeClass('activeexist');
			}
			console.log(corderboxs)
			$(".orderbox").remove();
			$(corderboxs).each(function(index, value) {
				let str = '';
				if(index == (corderboxs.length - 1)) {
					str = `<li class="childbox orderbox li">
							<div class='d1'>
								<img src="../img/box.png" class="img_temp view"  />
							</div>
							<div class="choosewenqu">
								<label class="clickbox boxinput Cchildbox">${value.PackageName}</label>
								<span class="boxinputsize">${value.PackageSize}</span>
								<img src="../img/xiala.png" class="xiala" />
								<p class="gw_num">
									<img src="../img/reduce.png" class="jian" />
									<input type="text" value='${value.Num}' class="num" disabled="disabled"  readonly="readonly" />
									<img src="../img/addbox.png" class="add" />
								</p>
							</div>
						</li>`;

				} else {
					str = `<li class="childbox orderbox li">
							<div>
								<img src="../img/box.png" class="img_temp" />
							</div>
							<div class="choosewenqu">
								<label class="clickbox boxinput Cchildbox">${value.PackageName}</label>
								<span class="boxinputsize">${value.PackageSize}</span>
								<img src="../img/delbox.png" class="delbox" />
								<p class="gw_num">
									<img src="../img/reduce.png" class="jian" />
									<input type="text" value='${value.Num}' class="num" readonly="readonly" />
									<img src="../img/addbox.png" class="add" />
								</p>
							</div>
						</li>`;
				}

				$('.CTemporSize').after(str);

			});

		} else {
			for(var i = 0; i < corderboxs.length; i++) {
				if(corderboxs[i].PackageName == cboxnumnames) {
					corderboxs[i].Num = reducenum;
				}

			}
			$(this).parent().find('input').val(reducenum);

		}

	})
	//		var orderboxs = [];
	//		var objbox = {};
	//		$('.orderbox').each(function(i) {
	//			var cbox = $(this).find('.boxinput').text().replace(/\s/g, "");
	//			var cboxnum = $(this).find('.num').val();
	//			objbox = {
	//				"PackageName": cbox,
	//				"Num": cboxnum
	//			}
	//			orderboxs.push(objbox);
	//		});

	var boxsize = [];
	var objboxsize = {};
	//确定尺寸
	$(".BoxSize-btn").on("click", function() {
		var lang = $('.lang').val();
		var wide = $('.wide').val();
		var high = $('.high').val();
		if(lang == '' && wide == '' && high == '') {
			for(var key in objboxsize) {
				delete objboxsize[key];

			}
			$('.fatherboxsize').hide();
			$('.fatherboxsize #BoxType').text('');
			$('.fatherboxsize .gw_num .num').val("1");
			$(".setbg").hide();
			$(".goodsType").hide();
			$(".Temparea").hide();
			$(".valueaddType").hide();
			$(".BoxType").hide();
			$(".TimeType").hide();
			$(".BoxSize").hide();
			$('.CTemporSize .goodsize').removeClass('activeexist');
			console.log(objboxsize);
		} else {
			if(lang == '') {
				alert('长度不能为空');
			} else if(wide == '') {
				alert('宽度不能为空');
			} else if(high == '') {
				alert('高度不能为空');
			} else {
				objboxsize['lang'] = lang;
				objboxsize['wide'] = wide;
				objboxsize['high'] = high;
				if(objboxsize['nums'] == '' || objboxsize['nums'] == undefined || objboxsize['nums'] == 0) {
					objboxsize['nums'] = 1;
				}
				$('.CTemporSize .goodsize').addClass('activeexist');
				$('.fatherboxsize').show();
				var inputboxsize = lang + '*' + wide + '*' + high + 'cm';
				$('.fatherboxsize #BoxType').text(inputboxsize);
				$('.fatherboxsize .gw_num .num').val('1');
				$(".setbg").hide();
				$(".goodsType").hide();
				$(".Temparea").hide();
				$(".valueaddType").hide();
				$(".BoxType").hide();
				$(".TimeType").hide();
				$(".BoxSize").show();
				console.log(objboxsize);
				if($('#Goodstypes').text() == '请选择货物类型' && $('#Tempqu').text() == '请选择温区' && $('#ChooseTimes').text() == '预约取件时间') {

					$('.btndiv button').attr('disabled', true);
				} else {

					$('.btndiv button').removeAttr("disabled");
					$(".btndiv button").css('background', '#12599B');
				}
			}
		}

	})
	//清空长宽高
	$(".BoxSize .clearboxsize").on("click", function() {
		$(this).parents('.BoxSize').find('input').val("");
	})

	//垃圾桶清空删除选择的箱型
	$("body").on("click", '.childbox .delbox', function() {
		var deltext = $(this).parents('.choosewenqu').find('.boxinput').text();
		console.log(deltext);
		for(var i = 0; i < corderboxs.length; i++) {
			if(corderboxs[i].PackageName == deltext) {
				corderboxs.splice(i, 1);
			}

		}
		console.log(corderboxs);
		$(this).parents('.childbox').remove();

	})
	//垃圾桶清空删除选择的货物尺寸
	$("body").on("click", '.fatherboxsize .delbox', function() {
		for(var key in objboxsize) {
			delete objboxsize[key];

		}
		$('.fatherboxsize').hide();
		$('.fatherboxsize #BoxType').text('');
		$('.fatherboxsize .gw_num .num').val("1");
		$(".setbg").hide();
		$(".goodsType").hide();
		$(".Temparea").hide();
		$(".valueaddType").hide();
		$(".BoxType").hide();
		$(".TimeType").hide();
		$(".BoxSize").hide();
		$('.CTemporSize .goodsize').removeClass('activeexist');
		console.log(objboxsize);

	})
//	var corderboxs = [];
	var cobjbox = {};
	$(".BoxType-btn").on('click', function() {
		corderboxs.splice(0, corderboxs.length);
		var divs = $(this).parents('.BoxType').find(".BoxType-Ways .boxone");
		$.each(divs, function(index, domEle) {
			if($(this).find('.num').val() != '' || parseInt($(this).find('.num').val()) > 0) {
				cobjbox = {
					"PackageName": $(this).find('.TboxType').text(),
					"Num": parseInt($(this).find('.num').val()),
					"PackageSize": $(this).find('.TboxTypeSize').text()
				}
				corderboxs.push(cobjbox);
			}

		});
		let obj = JSON.parse(localStorage.getItem('order'));
        obj.Box=corderboxs
        localStorage.setItem("order", JSON.stringify(obj));
		console.log(corderboxs)
		if(corderboxs.length > 3) {
			alert("多箱型");
			corderboxs.splice(0, corderboxs.length);
			return false;
		} else {
			$(".setbg").hide();
			$(".BoxType").hide();
			$(".tempbox").addClass('activeexist');
			$('.orderbox').remove();
			$(corderboxs).each(function(index, value) {
				let str = '';
				if(index == (corderboxs.length - 1)) {
					str = `<li class="childbox orderbox li">
							<div class='d1'>
								<img src="../img/box.png" class="img_temp view"  />
							</div>
							<div class="choosewenqu">
								<label class="clickbox boxinput Cchildbox" size='${value.PackageSize}'>${value.PackageName}</label>
								<span class='boxinputsize'>${value.PackageSize}</span>
								<img src="../img/xiala.png" class="xiala" />
								<p class="gw_num">
									<img src="../img/reduce.png" class="jian" />
									<input type="text" value='${value.Num}' disabled="disabled"  class="num" readonly="readonly" />
									<img src="../img/addbox.png" class="add" />
								</p>
							</div>
						</li>`;

				} else {
					str = `<li class="childbox orderbox li">
							<div>
								<img src="../img/box.png" class="img_temp" />
							</div>
							<div class="choosewenqu">
								<label class="clickbox boxinput Cchildbox" size='${value.PackageSize}'>${value.PackageName}</label>
								<span class='boxinputsize'>${value.PackageSize}</span>
								<img src="../img/delbox.png" class="delbox" />
								<p class="gw_num">
									<img src="../img/reduce.png" class="jian" />
									<input type="text" value='${value.Num}' disabled="disabled"  class="num" readonly="readonly" />
									<img src="../img/addbox.png" class="add" />
								</p>
							</div>
						</li>`;
				}
				$('.CTemporSize').after(str);

			});
		}

	});
//	var hiswd = '';
//	$('.pcwenqu').on("click", function() {
//		hiswd = $(this).val()
//	})
	//选择温区
	$('.pcwenqu').change(function() {
	    let hiswd=$(this).val()
	    if(hiswd != "请选择温区") {
           let obj = JSON.parse(localStorage.getItem('order'))==null?{}:JSON.parse(localStorage.getItem('order'));;
            obj.WDQJ=hiswd
				
            localStorage.setItem("order", JSON.stringify(obj));
	    	if(corderboxs!=undefined){
	    		corderboxs.splice(0, corderboxs.length);
	    	}
			$('.orderbox').remove();
			$('.CTemporSize .tempbox').removeClass('activeexist');

		}
			$('#Tempqu').addClass('chooseTemp');
			
	})
	
	
//	var mobileSelect1 = new MobileSelect({
//		trigger: '#Tempqu',
//		title: '',
//		wheels: [{
//			data: wdqj
//		}],
//		position: [0], 
//		transitionEnd: function(indexArr, data) {
//			//console.log(data);
//		},
//		callback: function(indexArr, data) {
//
//			if(hiswd != data || hiswd == "请选择温区") {
//				corderboxs.splice(0, corderboxs.length);
//				$('.orderbox').remove();
//				$('.CTemporSize .tempbox').removeClass('activeexist');
//
//			}
//			$('#Tempqu').addClass('chooseTemp');
//		}
//	});
	//点击下单
	$('.btndiv button').on('click', function() {
		if(JSON.parse(localStorage.getItem('SendaddData'))) {
			var sendInfo = JSON.parse(localStorage.getItem('SendaddData'));
			var _Manager = sendInfo.addressname;
			var _Telephone = sendInfo.addresstel;
			var _sendaddress = sendInfo.address.trim().split(/\s+/);
			var _Depart = _sendaddress[0];
			var _City = _sendaddress[1];
			var _Address = _sendaddress[2] + _sendaddress[3];
			var _Company = sendInfo.company;
		} else {
			alert("请选择寄件联系人");
			return false;
		}

		if(JSON.parse(localStorage.getItem('getaddData'))) {
			var getInfo = JSON.parse(localStorage.getItem('getaddData'));
			var _GetName = getInfo.addressname;
			var _GetTelephone = getInfo.addresstel;
			var _getaddress = getInfo.address.trim().split(/\s+/);
			var _GetDepart = _getaddress[0];
			var _GetCity = _getaddress[1];
			var _GetAddress = _getaddress[2] + _getaddress[3];
			var _GetCompany = getInfo.company;
		} else {
			alert("请选择收件联系人");
			return false;
		}
		var xmbh = $("#xmbh").val();
		var GoodType = $("#Goodstypes").text();
		var GoodName = $("#goodname").val();
		var TempArea = $(".pcwenqu").val();
		var iswdj = $("#usewdj").attr("isuse") == 1 ? "使用" : "不使用";
		var isInsure = $("#clicktoubao").attr("istoubao") == 1 ? "投保" : "不投保";
		var Insuremoney = $('.money').val();
		var _orderTime = $("#ChooseTimes").text();
		var _note = $(".note .time-right textarea").val();
		var box_size = $("#BoxType").text();
		var box_sizes = box_size.replace("cm", "");;
		var boxsizenum = $(".fatherboxsize .gw_num input").val();
		
		boxsizesone = {
			"Size": box_sizes,
			"Num": boxsizenum
		}
		arrsize.push(boxsizesone)
		if(sendInfo == getInfo) {
			alert('寄件人收件人信息一致');
			return false;
			localStorage.removeItem('getaddData');
		}else if(xmbh == '0'||xmbh=='') {
			alert("请选择项目编号");
			return false;
		} else if(GoodType == '请选择货物类型') {
			alert("请选择货物类型");
			return false;
		} else if(TempArea == '请选择温区') {
			alert("请选择温区");
			return false;
		} else if(isInsure == "投保" && Insuremoney == '') {
			alert("请输入投保金额");
			return false;
		} else if(_orderTime == '预约取件时间') {
			alert("请选择预约取件时间 ");
			return false;
		} else {
			$('.btndiv button').attr('disabled', true);

			var b = (JSON.stringify(objboxsize) == "{}");

			var boxsizesone = {};
			var _data = '';
			
			if(b && corderboxs.length == 0) {
				alert("请选择箱型或货物尺寸至少一种");
				return false;
			} else if(b && corderboxs.length >= 1) {
				console.log("箱型数量");
				_data = {
					AccountNumber: _tel,
					AccountTelephone: _tel,
					Token: "KHWX",
					Manager: _Manager,
					Telephone: _Telephone,
					Depart: _Depart,
					City: _City,
					Address: _Address,
					Company: _Company,
					GetName: _GetName,
					GetTelephone: _GetTelephone,
					GetDepart: _GetDepart,
					GetCity: _GetCity,
					GetAddress: _GetAddress,
					GetCompany: _GetCompany,
					WDQJ: TempArea,
					CargoName: GoodName,
					Name4: iswdj,
					OrderTime: _orderTime,
					BusinessType: GoodType,
					Note: _note,
					SafeItem: isInsure,
					SafePay: Insuremoney,
					Box: corderboxs,
					XMNO:xmbh,
					AddService:valueaddArr
				}
			} else if(!b && corderboxs.length == 0) {
				console.log("箱型尺寸");

				_data = {
					AccountNumber: _tel,
					AccountTelephone: _tel,
					Token: "KHWX",
					Manager: _Manager,
					Telephone: _Telephone,
					Depart: _Depart,
					City: _City,
					Address: _Address,
					Company: _Company,
					GetName: _GetName,
					GetTelephone: _GetTelephone,
					GetDepart: _GetDepart,
					GetCity: _GetCity,
					GetAddress: _GetAddress,
					GetCompany: _GetCompany,
					WDQJ: TempArea,
					CargoName: GoodName,
					Name4: iswdj,
					OrderTime: _orderTime,
					BusinessType: GoodType,
					Note: _note,
					SafeItem: isInsure,
					SafePay: Insuremoney,
					BoxSize: arrsize,
					XMNO:xmbh,
					AddService:valueaddArr
				}
			} else {

				console.log("尺寸及箱型数量");
				_data = {
					AccountNumber: _tel,
					AccountTelephone: _tel,
					Token: "KHWX",
					Manager: _Manager,
					Telephone: _Telephone,
					Depart: _Depart,
					City: _City,
					Address: _Address,
					Company: _Company,
					GetName: _GetName,
					GetTelephone: _GetTelephone,
					GetDepart: _GetDepart,
					GetCity: _GetCity,
					GetAddress: _GetAddress,
					GetCompany: _GetCompany,
					WDQJ: TempArea,
					CargoName: GoodName,
					Name4: iswdj,
					OrderTime: _orderTime,
					BusinessType: GoodType,
					Note: _note,
					SafeItem: isInsure,
					SafePay: Insuremoney,
					BoxSize: arrsize,
					Box: corderboxs,
					XMNO:xmbh,
					AddService:valueaddArr
				}
			}
			console.log(_data)
			
			$.ajax({
				type: "post",
				url: "http://out.ccsc58.cc/DATA_PORT_WECHAT_1.03/Clinical_Order.php",
				data: _data,
				dataType: "json",
				success: function(res) {
					console.log(res)
//					return false;
					if(res.code == '200'&&res.msg=='成功') {
							var nowtime = getNowFormatDate();
							var openids = ['oTarnv5aWyxLcCENYrs5UOR3FqvQ','oTarnv-4gXJ3TRvg415ECeck61lQ','oTarnv0C23-4KCMdFeOiHu5Zu4AU','oTarnv66MV67GI9uZ637VSGu8G_A'];
							for(i = 0; i < openids.length; i++) {
								$.ajax({
									type: "post",
									url: 'http://www.ccsc58.cc/weixinnew/Push_message.php',
									data: {
										first: "您好，正大天晴有新的订单需要处理",
										keyword1: res.ID,
										keyword2: '微信下单',
										keyword3: nowtime,
										keyword4: _Manager,
										keyword5: _Depart + ' ' + _City + ' ' + _Address,
										remark: 'TMS查看处理详细订单',
										openId: openids[i],
										app_key: '261AFF68C0E9F076420D083D66222824'
									},
									dataType: "json",
									success: function(res) {
										console.log('tuisong')
									},
									error: function(err) {
	
									}
								})
							};
							location.href = 'ordersuccess.html';
							sessionStorage.setItem("orders", JSON.stringify(_data));
					}else if(res.code == '400'&&res.msg.indexOf("请联系中集冷云以下人员") >= 0) {
//						alert(res.msg)
						$('body,html').animate({
									scrollTop: 0
						}, 0);
                        let str=`<div class="setbg ">
			                     <div class="yin"> </div> 
				                     <div class="messageshow">
				                       ${res.msg} <button class="closemsg">关闭</button>
				                     </div>
			                     </div>`;
                        $('body').append(str)
					}else {
						alert(res.msg)
					}
				},
				error: function(err) {
					console.log(err)
				}
			})
		}

	});
	$('body').on('click','.closemsg',function(){
		location.reload()
	})
	Array.prototype.remove = function(val) {
		var index = this.indexOf(val);
		if(index > -1) {
			this.splice(index, 1);
		}
	};

});